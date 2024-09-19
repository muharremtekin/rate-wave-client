import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { IoSearch } from 'react-icons/io5';

interface HeaderProps {
    handleSearchClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ handleSearchClick }) => {
    return (
        <div className='w-5/6 mx-auto flex flex-row justify-between items-center py-4'>
            <div className='flex flex-col md:flex-row items-center w-full px-4'>
                {/* Logo Bölümü */}
                <div className='flex items-center mb-4 md:mb-0 md:mr-4'>
                    <p className='text-3xl md:text-4xl font-bold text-slate-600 text-center md:text-left'>
                        RATE<span className='font-light'>WAVE</span>
                    </p>
                </div>
                {/* Ayırıcı Çizgi */}
                <div className='hidden md:block w-px h-8 bg-slate-600 mx-4'></div>
                {/* Arama Çubuğu */}
                <div
                    className='flex items-center gap-2 border px-4 py-2 rounded-lg cursor-pointer w-full md:flex-auto'
                    onClick={handleSearchClick}
                >
                    <IoSearch className='text-2xl opacity-50' />
                    <p className='opacity-50 hidden md:block'>Search</p>
                </div>
            </div>



            <Link href={"/profile/mtkn"}>
                <Image
                    className='h-10 w-10 object-cover rounded-lg'
                    src={"/mtkn.jpeg"}
                    width={100}
                    height={100}
                    quality={100}
                    alt='Profile Photo'
                />
            </Link>
        </div>
    );
};

export default Header;
