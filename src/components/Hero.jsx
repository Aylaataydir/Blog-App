import React from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
    return (
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
    )
}

export default Hero