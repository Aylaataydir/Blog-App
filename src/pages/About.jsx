import React from 'react'
import image from "../../assets/about1.webp"

const About = () => {
  return (
    <div className=" px-3 md:px-16 lg:px-30 pt-12 md:pt-16 lg:pt-20 pb-24 md:pb-30 min-h-screen bg-bg-primary  ">
      <h1 className="text-center text-2xl md:text-3xl font-bold font-[Poppins] text-gray-800 mb-12 md:mb-15 lg:mb-18 tracking-tight">Welcome to <span className='text-bg-secondary font-[inter]'> The Daily Blog</span></h1>

      <div className='flex flex-col lg:flex-row items-stretch max-w-6xl mx-auto gap-5 md:gap-10'>
        <div className="flex-1 w-full lg:h-[400px] h-[250px] mb-6">
          <img
            className="rounded-2xl w-full h-full object-cover"
            src={image}
            alt="About Blog"
          />
        </div>
        <div className="flex-1 flex items-center md:items-start text-center md:text-left max-w-2xl">
          <p className="text-base md:text-md text-gray-600 leading-relaxed">
            Knowledge and experiences gain their true value only when shared. Established in 2025, this platform is a vibrant community where creative minds come together to write, explore, and inspire one another. Whether you are sharing travel memories, diving deep into art, or offering health tips; our core mission is to provide an inclusive space where every story finds its own audience.<br /><br />
            This is more than just a website; it is becoming a global archive of human experiences. Every journey, every piece of art, and every step toward wellness begins with a single word.<br /><br />
            Now, it’s your turn to take up the pen, write your first blog post, and leave your mark on this digital library. Your story finds its meaning here!
          </p>
        </div>
      </div>
      <div className='mt-20'>
        <div className="italic text-2xl md:text-4xl font-semibold text-[#7c6f57] text-center  tracking-[0.6px] leading-relaxed">
          <span className="text-2xl md:text-3xl text-[#b8826a] align-middle select-none">“</span>
          <span style={{ fontFamily: 'Caveat, cursive' }}>Your thoughts deserve to be heard.</span>
          <span className="text-2xl md:text-3xl text-[#b8826a] align-middle select-none"> ”</span>
        </div>
        <div className="text-base md:text-lg text-[#a58d6f] text-center font-normal max-w-md italic font-pinyon mx-auto">
          Write, share, and discover your community here.
        </div>
      </div>
    </div>
  )
}

export default About