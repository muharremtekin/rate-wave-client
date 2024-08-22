import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaLocationDot, FaLinkedin, FaTwitter } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";



const UserProfile: React.FC = () => {
    return (
        <div className='w-full bg-white'>
            <div className='w-5/6 mx-auto flex flex-row justify-between items-center py-4'>
                <div className='w-3/5 flex flex-row items-center'>
                    <div className='mr-10'>
                        <p className='text-3xl font-bold text-slate-600 '>
                            RATE<span className='font-light'>WAVE</span>
                        </p>
                    </div>
                    <div className='w-px h-8 bg-slate-600 mr-10'></div>
                    <div className='w-full'>
                        <input type='text' placeholder='Search' name='search' id='search' className='w-full border py-2 px-3 border-slate-300 rounded' />
                    </div>
                </div>
                <div className='text-blue-400 border border-blue-400 px-6 py-2 rounded-3xl hover:bg-blue-400 hover:text-white cursor-pointer'>
                    <button>Sign Up</button>
                </div>
            </div>

            <div className='relative w-full'>
                <Image
                    src='/default-bg.jpeg'
                    alt='profile'
                    layout="responsive"
                    width={2000}
                    height={1000}
                    quality={100}
                    className='w-full max-h-96 min-h-96 object-cover object-bottom'
                />
                <div className='w-full bg-white absolute bottom-0 left-0 py-8'>
                    <div className='w-2/5 flex flex-col mx-auto'>
                        <p className='text-4xl font-bold'>Muharrem Tekin</p>
                        <p className='text-xl font-light opacity-60'>Backend Developer <span className='text-xs'>/ 8 Yr. Experience</span></p>
                        <div className='flex flex-row opacity-60 my-4'>
                            <div className='flex flex-row items-center mr-4 text-xl cursor-pointer'>
                                <FaLocationDot />
                            </div>
                            <div className='flex flex-row items-center mr-4 text-xl cursor-pointer'>
                                <Link href='https://twitter.com' target='_blank'>
                                    <FaLinkedin />
                                </Link>
                            </div>
                            <div className='flex flex-row items-center text-xl cursor-pointer mr-4'>
                                <Link href='https://twitter.com' target='_blank'>
                                    <FaTwitter />
                                </Link>
                            </div>
                            <div className='flex flex-row items-center text-xl cursor-pointer'>
                                <Link href='https://twitter.com'>
                                    <IoMdMail />
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className='absolute bottom-10 left-40 transform  w-1/6 rounded-full'>
                        <Image
                            src='/mtkn.jpeg'
                            alt='profile'
                            // layout="responsive"
                            width={400}
                            height={400}
                            quality={100}
                            className='w-full border-4 shadow-lg border-white object-cover object-center rounded-full'
                        />
                    </div>
                </div>
            </div>

        </div>
    );
};

export default UserProfile;
