"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

function Page() {

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    return (
        <div className='w-full h-screen flex flex-row'>
            <div className='hidden lg:block w-2/3 h-full relative'>
                <Image src='/galata-kulesi.jpg' alt='Galata Kulesi' width={2000} height={1000} quality={100} className='fixed w-2/3 h-full object-cover shadow-costum' />
                <div className='fixed bottom-10 left-10 text-white bg-opacity-55 rounded backdrop-blur-sm text-xs px-3 py-1'>
                    <Link target='_blank' href={"https://www.pexels.com/tr-tr/fotograf/deniz-kent-sehir-peyzaj-27230180/"}>Photo by : <span className='underline'>Mustafa Şimşek</span></Link>
                </div>
            </div>
            <div className='w-full lg:w-1/3 p-10'>
                <div className='mt-20'>
                    <p className='text-5xl font-bold text-slate-600'>
                        RATE<span className='font-light'>WAVE</span>
                    </p>
                    <p className=' font-medium italic text-base text-slate-600 my-2 opacity-65'>Nice to see you again.</p>
                </div>
                <div>
                    <form className='py-6'>
                        <div className='w-full flex flex-col mb-6'>
                            <label className='font-light text-sm mb-1' htmlFor='username'>Username</label>
                            <input type='text' name='username' id='username' placeholder='Username' className='px-4 py-2 font-light border border-slate-600 border-opacity-15 outline-none rounded bg-[#8080801b] text-black placeholder:text-black placeholder:opacity-20' />
                        </div>
                        <div className='w-full flex flex-col mb-2 relative'>
                            <label className='font-light text-sm mb-1' htmlFor='password'>Password</label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name='password'
                                id='password'
                                placeholder='Password'
                                className='px-4 py-2 font-light border border-slate-600 border-opacity-15 outline-none rounded bg-[#8080801b] text-black placeholder:text-black placeholder:opacity-20'
                            />
                            <div className='absolute cursor-pointer top-9 right-3' onClick={togglePasswordVisibility}>
                                {showPassword ? <FaRegEyeSlash className='text-xl' /> : <FaRegEye className='text-xl' />}
                            </div>
                        </div>
                        <div className='flex flex-row justify-between'>
                            <div className='flex flex-row-reverse text-xs items-center'>
                                <label htmlFor='remember'>Remember Me</label>
                                <input type='checkbox' name='remember' id='remember' className='mr-1' />
                            </div>
                            <div className='text-blue-400 font-light text-xs'>
                                <Link href='#'>
                                    Forgot Password?
                                </Link>
                            </div>
                        </div>
                        <div className='flex flex-col items-center'>
                            <button className='bg-blue-600 hover:bg-blue-800 text-white w-full font-semibold py-2 mt-8 mb-1 rounded'>Sign In</button>
                            <div className='h-px w-40 my-4 bg-slate-600 opacity-15'></div>
                            <Link href='/register' className='text-xs font-light text-center'>
                                Don&apos;t have an account? <span className='text-blue-400 ml-1'>Sign Up now!</span>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default Page