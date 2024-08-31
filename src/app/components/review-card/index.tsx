import Image from 'next/image'
import React from 'react'
import { IoIosStar, IoIosStarOutline } from 'react-icons/io'

function index({ image, name, date, review, star }) {

    const placeholderImage = '/mtkn.jpeg';

    const renderStars = (star) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= star) {
                stars.push(<IoIosStar key={i} className='text-yellow-500' />);
            } else {
                stars.push(<IoIosStarOutline key={i} className='text-black' />);
            }
        }
        return stars;
    };

    return (

        <div className='bg-white p-4 rounded shadow-secondary mb-6'>
            <div className='flex flex-row gap-x-6 items-start'>
                <div className='w-20 h-20 rounded-full'>
                    <Image
                        src={image || placeholderImage}
                        alt='profile'
                        width={500}
                        height={500}
                        quality={100}
                        className='w-full object-cover rounded-full'
                    />
                </div>
                <div className='flex flex-col w-full'>
                    <div className='flex flex-row justify-between items-start mb-4'>
                        <div>
                            <p className='text-xl font-semibold'>{name}</p>
                            <p className='text-sm font-normal'>{date}</p>
                        </div>
                        <div className='flex flex-row'>
                            {renderStars(star)}
                        </div>
                    </div>
                    <div className='font-light text-sm'>
                        <p>{review}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default index;
