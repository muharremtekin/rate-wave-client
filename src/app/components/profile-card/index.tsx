"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { SearchModal } from '@/app/components'
import { FaLocationDot, FaLinkedin, FaTwitter } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { FaDoorOpen } from "react-icons/fa";




const UserProfile: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const handleSearchClick = () => {
        setIsModalOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setIsModalOpen(false);
        document.body.style.overflow = 'auto';
    };

    useEffect(() => {
        if (searchTerm.length > 0) {
            const results = [
                { id: 1, name: 'Muharrem', surname: 'Tekin', title: 'Back End Developer', profilePic: '/mtkn.jpeg', url: '/profile/mtkn' },
                { id: 2, name: 'Erdem', surname: 'Arslan', title: 'Front End Developer', profilePic: 'https://media.licdn.com/dms/image/v2/D4D03AQEmGI0yE-M5RA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1718235829739?e=1730332800&v=beta&t=XIk99ybAM8DKd9MHzbHhs5_NTVn6vVY1RQA4zXVWznQ', url: '/profile/mtkn' },
            ].filter(item =>
                `${item.name} ${item.surname}`.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setSearchResults(results);
        } else {
            setSearchResults([]);
        }
    }, [searchTerm]);


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
                    <div className='w-full flex items-center gap-x-2 border px-2 lg:px-4 py-2 rounded-lg cursor-text' onClick={handleSearchClick}>
                        <IoSearch className='opacity-50 text-2xl' />
                        <p className='opacity-50 hidden lg:block'>Search</p>
                    </div>
                </div>
                <Link href={"/profile/mtkn"}>
                    <Image className='h-10 w-10 object-cover rounded-lg' src={"/mtkn.jpeg"} width={100} height={100} quality={100} alt='Profile Photo' />
                </Link>
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
                <div className='w-full bg-white absolute bottom-0 left-0 py-2 md:py-4 lg:py-8'>
                    <div className='absolute bottom-20 md:bottom-16 lg:bottom-10 left-6 md:left-20 lg:left-40 transform w-1/5 lg:w-1/6 rounded-full'>
                        <Image
                            src='/mtkn.jpeg'
                            alt='profile'
                            width={400}
                            height={400}
                            quality={100}
                            className='w-full border-4 shadow-lg border-white object-cover object-center rounded-full'
                        />
                    </div>
                    <div className='w-2/5 md:w-2/5 lg:w-4/12 flex flex-col mx-auto'>
                        <p className='text-xl md:text-2xl lg:text-4xl font-bold'>Muharrem Tekin</p>
                        <p className='text-sm md:text-lg lg:text-xl font-light opacity-60'>Backend Developer <span className='text-xs'>/ 8 Yr. Experience</span></p>
                        <div className='flex flex-row opacity-60 my-4'>
                            <div className='flex flex-row items-center mr-4 text-sm md:text-base lg:text-xl cursor-pointer'>
                                <FaLocationDot />
                            </div>
                            <div className='flex flex-row items-center mr-4 text-sm md:text-base lg:text-xl cursor-pointer'>
                                <Link href='https://twitter.com' target='_blank'>
                                    <FaLinkedin />
                                </Link>
                            </div>
                            <div className='flex flex-row items-center mr-4 text-sm md:text-base lg:text-xl cursor-pointer'>
                                <Link href='https://twitter.com' target='_blank'>
                                    <FaTwitter />
                                </Link>
                            </div>
                            <div className='flex flex-row items-center mr-4 text-sm md:text-base lg:text-xl cursor-pointer'>
                                <Link href='https://twitter.com'>
                                    <IoMdMail />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <SearchModal
                isModalOpen={isModalOpen}
                closeModal={closeModal}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                searchResults={searchResults}
            />
        </div>
    );
};

export default UserProfile;
