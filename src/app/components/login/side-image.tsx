import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const SideImage: React.FC = () => (
    <div className='hidden lg:block w-2/3 h-full relative'>
        <Image
            src='/galata-kulesi.jpg'
            alt='Galata Kulesi'
            layout="fill"
            objectFit="cover"
            className='fixed w-2/3 h-full object-cover shadow-custom'
        />
        <div className='fixed bottom-10 left-10 text-white bg-opacity-55 rounded backdrop-blur-sm text-xs px-3 py-1'>
            <Link href="https://www.pexels.com/tr-tr/fotograf/deniz-kent-sehir-peyzaj-27230180/" target='_blank'>
                Photo by: <span className='underline'>Mustafa Şimşek</span>
            </Link>
        </div>
    </div>
);

export default SideImage;
