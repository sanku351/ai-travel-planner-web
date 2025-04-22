import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

function Hero() {
    return (
        <div className='flex flex-col items-center px-5 md:mx-56 gap-9'>
            <h1 className='font-extrabold text-[40px] text-center mt-12'>
                <span className='text-[#f56551] block'>Discover Your Next Adventure with AI:</span>
                Personalized Iternaries at Your Fingerprints.</h1>
            <p className='text-md text-gray-500 text-center'>Your personal trip planner and travel curator, creating custom iternaries tailored to your interests and budget.</p>
            <Link to='/create-trip' className='z-10'>
                <Button className="cursor-pointer">Get Started, It's Free</Button>
            </Link>
            <img src="/landing.png" className='md:-mt-20 pointer-events-none' />
        </div>
    )
}

export default Hero