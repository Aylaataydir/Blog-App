import { div } from 'motion/react-client'
import { Link } from 'react-router-dom'
import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { FaEye } from "react-icons/fa";

import { EffectFade, Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useSelector } from 'react-redux';
import useBlogCall from '../hooks/useBlogCall';
import { mostReadStatus } from '../features/blogSlice';
import SkeletonHero from './skeletons/SkeletonHero';

const Hero = () => {

    const { mostRead } = useSelector(state => state.blog)
    const loadingStatus = useSelector(mostReadStatus)
    const { getDataByEndpoint } = useBlogCall()


    useEffect(() => {

        const data = async () => {
            await getDataByEndpoint("blogs", { "sort[countOfVisitors]": "desc" }, "mostRead")
        }

        data()

    }, [])


    return (

        //! title

        <div className=' px-4 sm:px-5 md:px-10 lg:px-30 mx-auto'>
            <div className="text-center mt-12 mb-4 md:mt-16 border-b border-b-black/30 h-full">
                <h1
                    className="text-5xl lg:text-6xl font-semibold italic text-gray-800 tracking-tight leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.04)] "
                    style={{ fontFamily: 'var(--font-hero)', letterSpacing: '0.03em' }}
                >
                    The Daily Blog
                </h1>
                <p className="text-xs sm:text-sm md:text-sm tracking-[0.25em] text-gray-400 mt-0 mb-7 uppercase font-light" style={{ letterSpacing: '0.25em' }}>
                    Travel, Health, World, Culture...
                </p>
            </div>


            {loadingStatus === "idle" || loadingStatus === "loading"
                ? <SkeletonHero />
                : <Swiper
                    key={mostRead?.length}
                    spaceBetween={30}
                    effect={'fade'}
                    speed={2500}
                    rewind={true}
                    autoplay={{
                        delay: 3500,
                        disableOnInteraction: false,
                    }}
                    navigation={true}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[EffectFade, Navigation, Pagination, Autoplay]}
                    className="mySwiper"
                >

                    {mostRead?.slice(0, 3).map(blog => (
                        <SwiperSlide key={blog._id}>
                            <div className="card card-side h-full bg-bg-body flex flex-col md:flex-row gap-3 md:gap-5 mt-8 md:mt-10 mb-8 md:mb-14 items-center mx-auto min-h-112.5 md:min-h-100">
                                <figure className='md:flex-1 relative w-full md:w-100 h-56 md:h-80 lg:h-90 mb-2 md:mb-0'>
                                    <img
                                        className='rounded-lg w-full h-full object-cover'
                                        src={blog.image}
                                        alt="" />
                                </figure>
                                <div className="flex-1 p-3 gap-4">
                                    <h2 className="card-title text-3xl line-clamp-2 lg:line-clamp-3  ">{blog.title}</h2>
                                    <div className='text-sm line-clamp-8 leading-relaxed text-gray-700 mt-3' dangerouslySetInnerHTML={{ __html: blog?.content }} />
                                    <div className='mt-8'> <Link to={`/blog/${blog._id}`} onClick={() => updateViewCount(blog)} className="buttons">Read More</Link></div>
                                    <div className="flex mt-4 items-center justify-between gap-2"></div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            }

        </div>

    )
}

export default Hero


