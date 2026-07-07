import { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { useSelector } from 'react-redux';
import useBlogCall from '../hooks/useBlogCall';
import SmallBlogCard from './SmallBlogCard';
import { Link } from 'react-router-dom';

const MostRead = () => {

    const { mostRead } = useSelector(state => state.blog)
    const { getDataByEndpoint } = useBlogCall()
    // const navigate = useNavigate()

    console.log(mostRead)


    useEffect(() => {

        const getData = async () => {

            await getDataByEndpoint("blogs", { "sort[countOfVisitors]": "desc", "limit":10 }, "mostRead")
            // await getEndpointById("users",  ,{blogAuthor} )
        }

        getData()

    }, [])


    return (
        <div className='pt-2 px-2 sm:px-4 bg-bg-primary rounded-xl w-full'>
            {/* Başlık */}
            <div className='flex items-center gap-2 sm:gap-4 mb-4'>
                <div className='flex flex-col gap-0.5'>
                    <span className='w-8 h-0.5 bg-bg-secondary rounded-full'></span>
                    <span className='w-5 h-0.5 bg-bg-secondary/50 rounded-full'></span>
                </div>
                <h2 className='text-base sm:text-lg font-semibold tracking-wide text-gray-700' style={{ fontFamily: 'var(--font-poppins)' }}>
                    Most Read
                </h2>
                <div className='flex-1 h-px bg-gray-200'></div>
            </div>

            {mostRead?.length > 0 && <Swiper
                slidesPerView={2}
                breakpoints={{
                    640: { slidesPerView: 2 },
                    768: { slidesPerView: 3 },
                    1024: { slidesPerView: 5 },
                }}
                slidesPerGroup={1}
                spaceBetween={12}
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
                    return (
                        <SwiperSlide key={blog._id}>
                            <Link to={`/blog/${blog._id}`}>
                                <SmallBlogCard blog={blog} />
                            </Link>
                        </SwiperSlide>
                    )
                })}
            </Swiper>}
        </div>
    )
}

export default MostRead