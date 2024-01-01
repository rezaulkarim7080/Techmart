/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react'

const CallToAction4 = () => {
    return (
        <div className=''>
            <div class="relative  text-white overflow-hidden py-5 rounded-2xl">
                <div class="absolute inset-0">
                    <img src="https://getpaidstock.com/tmp/[GetPaidStock.com]-658862eb8694c.jpg" alt="Background Image" class="object-cover object-center w-full h-full" />
                    <div class="absolute inset-0 bg-black opacity-50"></div>
                </div>


                <div class="relative z-10 flex flex-col justify-center items-center h-full text-center">
                    <h1 class="text-2xl font-medium leading-tight mb-4">SUBSCRIBE NOW</h1>
                    <h1 class="text-5xl font-bold leading-tight mb-4">GET OUR UPDATES ALWAYS FAST</h1>
                    <p class="text-lg text-gray-300 mb-8">Discover amazing features and services that await you.</p>
                    <input type="email" placeholder='e-mail ' className='rounded-lg p-3 w-[25%] mb-5' />
                    <a href="#" class="bg-white text-gray-900 hover:bg-indigo-600 py-2 px-6 rounded-xl text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg ">Get Started</a>
                </div>
            </div>
        </div>
    )
}

export default CallToAction4
