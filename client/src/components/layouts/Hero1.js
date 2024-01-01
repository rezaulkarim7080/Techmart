import React from 'react'
import { TypeAnimation } from 'react-type-animation';
import { Link } from 'react-router-dom';
import hero from '../layouts/hero.png'

const Hero1 = () => {
    return (
        <div className="px-5 my-5">
            <div class="h-[500px]  bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg shadow-lg p-8 grid grid-cols-12" >
                <div className='col-span-6 mt-10'>
                    <TypeAnimation className=' text-2xl font-semibold text-white py-2 '
                        sequence={[
                            'Choose Your ',
                            1000,
                            'Favourite One',
                            1000,
                            'End Of year Sale',
                            1000,
                            '20% Off',
                            1000
                        ]}
                        wrapper="span"
                        speed={50}
                        style={{ fontSize: '2em', display: 'inline-block' }}
                        repeat={Infinity}
                    />
                    <h1 class="md:text-7xl text-4xl  font-bold text-white mb-4">
                        By Intellect
                        Driven by values
                    </h1>
                    <p class="hidden md:block text-lg text-white mb-8">
                        the world's hardest working staff running the show from Santa Monica, California.digital Products all over the world.
                    </p>

                    <div className='flex justify-items-start gap-5'>
                        <Link to={'/shop-page'}>
                            <button className='bg-[#ffffff] text-[#000000] px-2 md:py-3 md:px-8 rounded-lg  text-center font-medium hover:shadow-2xl'> Shop Now</button>
                        </Link>


                        <Link to={'/register'}>
                            <button className='bg-[#ffffff] text-[#000000] px-2 md:py-3 md:px-8 rounded-lg  text-center font-medium hover:shadow-2xl'> Sign-up</button>
                        </Link>


                    </div>
                </div>

                {/* image  */}

                <div className='hidden md:flex col-span-6 p-0  justify-center '>
                    <img src={hero} alt='hero' />
                </div>
            </div>
        </div>
    )
}

export default Hero1