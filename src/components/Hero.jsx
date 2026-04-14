import { div } from 'motion/react-client'

import { Link } from 'react-router-dom'
import heroImg from "../../assets/hero.jpg"
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

        <div className='px-20'>
            <div className="text-center mt-12  md:mt-16 border-b-1 border-b-black/30">
                <h1
                    className="text-4xl sm:text-3xl md:text-4xl lg:text-6xl font-semibold italic text-gray-800 tracking-tight leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
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
                    spaceBetween={30}
                    effect={'fade'}
                    speed={2500}
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
                            <div className="card card-side bg-bg-body gap-5 mt-16 mb-14 items-center ">
                                <figure className='relative flex-5'>
                                    {/* <p className='absolute bg-bg-primary top-11 left-0 py-1 px-3 h-7 w-fit'>{new Date(blog.createdAt).toLocaleDateString('en-US', {
                                    month: 'long', day: '2-digit', year: 'numeric'
                                })}</p> */}
                                    <img
                                        className='rounded-lg w-100 h-100'
                                        src={blog.image}
                                        alt="" />
                                </figure>
                                <div className="flex-4 p-3 gap-4">
                                    {/* <p className='text-xs text-bg-secondary font-semibold'>{category?.name}</p> */}
                                    <h2 className="card-title text-3xl ">{blog.title}</h2>
                                    <p className='text-sm line-clamp-8 leading-relaxed text-gray-700 mt-3'>{blog.content}</p>
                                    <div className='mt-8'> <Link to={`/blog/${blog._id}`} onClick={() => updateViewCount(blog)} className="buttons">Read More</Link></div>
                                    <div className="flex mt-4 items-center justify-between gap-2">
                                        {/* <div className='flex items-center gap-1'>
                                        <FaEye className='text-xl opacity-20' />
                                        <p className='text-xs'>{blog.countOfVisitors}</p>
                                    </div> */}
                                    </div>
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



{/* <div>
            
            <div className="card lg:card-side max-w-4xl mx-auto mt-8 bg-base-100 shadow-sm">
                <figure className='flex-1'>
                    <img
                        src="https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp"
                        alt="Album" />
                </figure>
                <div className="card-body flex-1">
                    <h2 className="card-title">New album is released!</h2>
                    <p>Click the button to listen on Spotiwhy app.</p>
                    <div className="card-actions justify-end">
                        <Link to="/" className="btn btn-primary">Read More</Link>
                    </div>
                </div>
            </div>
        </div> */}