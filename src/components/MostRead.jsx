import { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import BlogCard from './BlogCard';
import { useSelector } from 'react-redux';
import useBlogCall from '../hooks/useBlogCall';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';

const MostRead = () => {

    const { mostRead, categories } = useSelector(state => state.blog)
    const { getDataByEndpoint } = useBlogCall()
    // const navigate = useNavigate()

    console.log(mostRead)



    useEffect(() => {

        const getData = async () => {

            await getDataByEndpoint("blogs", { "sort[countOfVisitors]": "desc", "limit": 10 }, "mostRead")
            await getDataByEndpoint("categories")
            // await getEndpointById("users",  ,{blogAuthor} )
        }

        getData()

    }, [])




    return (
        <div className='py-1 px-4 bg-bg-primary rounded-xl'>
            {/* Başlık */}
            <div className='flex items-center gap-4 mb-4'>
                <div className='flex flex-col gap-0.5'>
                    <span className='w-8 h-0.5 bg-bg-secondary rounded-full'></span>
                    <span className='w-5 h-0.5 bg-bg-secondary/50 rounded-full'></span>
                </div>
                <h2 className='text-lg font-semibold tracking-wide text-gray-700' style={{ fontFamily: 'var(--font-poppins)' }}>
                    Most Read
                </h2>
                <div className='flex-1 h-px bg-gray-200'></div>
            </div>

            {mostRead?.length > 0 && <Swiper
                slidesPerView={5}
                slidesPerGroup={1}
                spaceBetween={20}
                speed={2000}
                loop={mostRead.length >= 10}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination, Autoplay]}
                className="mySwiper"
                style={{ paddingBottom: '36px' }}
            >
                {mostRead?.map(blog => {
                    const category = categories?.find(cat => cat._id === blog.categoryId)
                    return (
                        <SwiperSlide key={blog._id}>
                            <div
                                onClick={() => updateViewCount(blog)}
                                className="cursor-pointer h-[180px] flex flex-col bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 max-w-[180px] mx-auto mb-2">
                                <figure className='relative'>
                                    <img
                                        className='w-full h-25 object-cover'
                                        src={blog.image}
                                        alt="" />
                                    <span className='absolute top-2 left-2 bg-bg-secondary/90 text-white text-[9px] font-semibold px-2 py-0.5 rounded-full tracking-wide'>
                                        {category?.name ?? 'Other'}
                                    </span>
                                </figure>
                                <div className="flex flex-1 flex-col p-3">
                                    <h2 className="text-x font-semibold leading-snug line-clamp-2 mb-1">{blog.title}</h2>
                                    <div className='flex justify-between items-center mt-auto '>
                                        <p className='text-xs text-gray-400'>
                                            {new Date(blog.createdAt).toLocaleDateString('en-US', {
                                                month: 'short', day: '2-digit', year: 'numeric'
                                            })}
                                        </p>
                                        <div className='flex items-center gap-1'>
                                            <FaEye className='text-[10px] opacity-30' />
                                            <p className='text-xs text-gray-400'>{blog.countOfVisitors}</p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </SwiperSlide>
                    )
                })}
            </Swiper>}
        </div>
    )
}

export default MostRead