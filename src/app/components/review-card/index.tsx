import { Review } from '@/types/user';
import Image from 'next/image'
import React from 'react'
import { IoIosStar, IoIosStarOutline } from 'react-icons/io'



function index({ author, content, rating, visibility, createdAt, updatedAt }: Review) {

    const renderStars = (star: number) => {
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
                        src={author.profilePicture ?? 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg'}
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
                            <p className='text-xl font-semibold'>{author.fullName}</p>
                            <p className='text-sm font-normal'>{createdAt}</p>
                        </div>
                        <div className='flex flex-row'>
                            {renderStars(rating)}
                        </div>
                    </div>
                    <div className='font-light text-sm'>
                        <p>{content}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default index;
