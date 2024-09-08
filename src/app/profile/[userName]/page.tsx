"use client"
import React, { useState, useEffect } from 'react'
import { ProfileCard, ReviewCard, ProfileInfo } from '@/app/components/index'
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { CiSquarePlus } from "react-icons/ci";
import { MdClose } from 'react-icons/md';


function Page() {

    const [isSticky, setIsSticky] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [hoverIndex, setHoverIndex] = useState(-1);
    const [selectedRating, setSelectedRating] = useState(0);

    const handleClick = (index: number) => {
        setSelectedRating(index + 1);
    };


    const openModal = () => {
        setIsModalOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setIsModalOpen(false);
        document.body.style.overflow = 'auto';
        window.scrollTo(0, scrollY);
    };

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    const handleScroll = () => {
        if (window.scrollY > 450) {
            setIsSticky(true);
        } else {
            setIsSticky(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className='w-full mx-auto'>
            <ProfileCard />
            <div className='w-full lg:w-5/6 mx-auto flex flex-col lg:flex-row my-0 lg:my-10 relative'>
                <div
                    className='w-full flex justify-end pr-4 bg-white py-1 text-2xl text-center cursor-pointer lg:hidden'
                    onClick={toggleVisibility}
                >
                    {isVisible ? (
                        <MdKeyboardArrowUp className='p-0 m-0' />
                    ) : (
                        <MdKeyboardArrowDown className='p-0 m-0' />
                    )}
                </div>
                <div className={`w-full mb-8 lg:mb-0 lg:w-1/4 h-auto lg:h-screen bg-white rounded ${isSticky ? 'relative lg:fixed lg:top-10 lg:w-1/5' : 'relative'} ${isVisible ? 'block' : 'hidden'} lg:block`}>
                    <ProfileInfo
                        name={"Muharrem Tekin"}
                        title={"Sr. Backend Developer"}
                        about={"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"}
                        degree={"Accountability Degree"}
                        degreeLink={"/"}
                        degreeSchool={"Gusikowski Group"}
                        degreeDate={"2024"}
                        mobile={"+90 512 345 6789"}
                        office={"+90 224 224 0000"}
                        mail={"mtkn@mail.com"}
                        rate={4}
                        star={4}
                        reviews={190}
                    />
                </div>
                <div className={`w-full lg:w-3/4 mt-10 lg:mt-0 lg:ml-3  rounded ${isSticky ? ' relative lg:absolute right-0' : 'relative'}`}>
                    <div className={`w-full h-full`}>
                        <div>
                            <iframe className='w-full rounded p-4 lg:p-0' width="560" height="405" src="https://www.youtube.com/embed/wynYgwNkdCU?si=0QYn4Cc8l4Sf6mof" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                        </div>
                        <div className='my-10 p-4 lg:p-0'>
                            <div className='text-2xl font-semibold flex justify-between items-center mb-10'>
                                <p>Muharrem Tekin&apos;e Yapılan Yorumlar</p>
                                <div onClick={openModal} className='text-xs lg:text-sm bg-blue-400 px-4 py-2 rounded text-white flex items-center gap-x-1' >
                                    <CiSquarePlus className='text-3xl' />
                                    <button>Yorum yap</button>
                                </div>
                            </div>
                            <div className=''>
                                <ReviewCard
                                    image={"https://media.licdn.com/dms/image/v2/D4D03AQEmGI0yE-M5RA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1718235829739?e=1730332800&v=beta&t=XIk99ybAM8DKd9MHzbHhs5_NTVn6vVY1RQA4zXVWznQ"}
                                    name={"Erdem Arslan"}
                                    date={"04.02.2023"}
                                    review={"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"}
                                    star={2}
                                />
                                <ReviewCard
                                    image={"https://media.licdn.com/dms/image/v2/D4D03AQEmGI0yE-M5RA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1718235829739?e=1730332800&v=beta&t=XIk99ybAM8DKd9MHzbHhs5_NTVn6vVY1RQA4zXVWznQ"}
                                    name={"Erdem Arslan"}
                                    date={"04.02.2023"}
                                    review={"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"}
                                    star={2}
                                />
                                <ReviewCard
                                    image={"https://media.licdn.com/dms/image/v2/D4D03AQEmGI0yE-M5RA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1718235829739?e=1730332800&v=beta&t=XIk99ybAM8DKd9MHzbHhs5_NTVn6vVY1RQA4zXVWznQ"}
                                    name={"Erdem Arslan"}
                                    date={"04.02.2023"}
                                    review={"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"}
                                    star={2}
                                />
                                <ReviewCard
                                    image={"https://media.licdn.com/dms/image/v2/D4D03AQEmGI0yE-M5RA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1718235829739?e=1730332800&v=beta&t=XIk99ybAM8DKd9MHzbHhs5_NTVn6vVY1RQA4zXVWznQ"}
                                    name={"Erdem Arslan"}
                                    date={"04.02.2023"}
                                    review={"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"}
                                    star={2}
                                />
                            </div>

                            {isModalOpen && (
                                <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
                                    <div className='bg-white p-6 rounded-lg max-w-lg w-full'>
                                        <div className='flex justify-between items-center mb-4'>
                                            <h2 className='text-xl font-semibold'>Yorum Yap</h2>
                                            <button onClick={closeModal} className='text-2xl'>
                                                <MdClose />
                                            </button>
                                        </div>
                                        <form>
                                            <div className='mb-4'>
                                                <label className='block text-sm font-medium mb-2' htmlFor='comment'>
                                                    Yorumunuz
                                                </label>
                                                <textarea
                                                    id='comment'
                                                    className='w-full p-2 border border-gray-300 rounded'
                                                    placeholder='Yorumunuzu buraya yazın...'
                                                ></textarea>
                                            </div>
                                            <div className='mb-4'>
                                                <label className='block text-sm font-medium mb-2' htmlFor='rating'>
                                                    Puanınız
                                                </label>
                                                <div id='rating' className='flex items-center'>
                                                    {[1, 2, 3, 4, 5].map((star, index) => (
                                                        <button
                                                            type='button'
                                                            key={star}
                                                            className={`text-2xl ${index < (hoverIndex !== -1 ? hoverIndex : selectedRating) ? 'text-yellow-400' : 'text-gray-400'}`}
                                                            onMouseEnter={() => setHoverIndex(index + 1)}
                                                            onMouseLeave={() => setHoverIndex(-1)}
                                                            onClick={() => handleClick(index)}
                                                        >
                                                            ★
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className='flex justify-end'>
                                                <button type='submit' className='bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded'>
                                                    Yorumu Gönder
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            )}


                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page