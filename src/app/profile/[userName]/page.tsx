"use client";
import React, { useState, useEffect } from 'react';
import {
    ProfileCard,
    ReviewCard,
    ProfileInfo,
} from '@/app/components/index';
import {
    MdKeyboardArrowDown,
    MdKeyboardArrowUp,
    MdClose,
} from 'react-icons/md';
import { CiSquarePlus } from 'react-icons/ci';
import { useParams } from 'next/navigation';
import api from '../../../services/api';
import { UserData, Review } from '../../../types/user';

function Page() {
    // State variables
    const [isSticky, setIsSticky] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [hoverIndex, setHoverIndex] = useState<number>(-1);
    const [selectedRating, setSelectedRating] = useState<number>(0);
    const [userData, setUserData] = useState<UserData | null>(null);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const pageSize = 8;
    const { username } = useParams();

    // Fetch user data
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await api.get<UserData>(`/users/${username}`);
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUserData();
    }, [username]);

    // Fetch reviews
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await api.get<Review[]>(
                    `/users/${username}/reviews?pageNumber=${currentPage}&pageSize=${pageSize}`
                );
                setReviews(response.data);

                // Parse the x-pagination header
                const paginationHeader = response.headers['x-pagination'];
                if (paginationHeader) {
                    const pagination = JSON.parse(paginationHeader);
                    setTotalPages(pagination.TotalPage);
                    console.log('Pagination data:', pagination);
                } else {
                    console.warn('No x-pagination header found');
                }
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };
        fetchReviews();
    }, [username, currentPage]);

    // Handle scrolling for sticky sidebar
    // useEffect(() => {
    //     const handleScroll = () => {
    //         setIsSticky(window.scrollY > 450);
    //     };
    //     window.addEventListener('scroll', handleScroll);
    //     return () => {
    //         window.removeEventListener('scroll', handleScroll);
    //     };
    // }, []);

    // Toggle visibility for mobile view
    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    // Modal controls
    const openModal = () => {
        setIsModalOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setIsModalOpen(false);
        document.body.style.overflow = 'auto';
        window.scrollTo(0, window.scrollY);
    };

    // Pagination handlers
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    };

    if (!userData) return <p>Kullanıcı verisi bulunamadı.</p>;

    return (
        <div className='w-full mx-auto'>
            {/* Profile Card */}
            <ProfileCard
                name={`${userData.firstName} ${userData.lastName}`}
                title={userData.profession || 'Bilinmiyor'}
                experience={userData.yearsOfExperience || 0}
                profileImageSrc={
                    userData.profilePicture ||
                    'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg'
                }
                backgroundImageSrc='https://images.pexels.com/photos/281260/pexels-photo-281260.jpeg'
                socialLinks={userData.socialLinks || []}
            />

            {/* Main Content */}
            <div className='w-full lg:w-5/6 mx-auto flex flex-col lg:flex-row my-0 lg:my-10 relative'>
                {/* Mobile View Toggle Button */}
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

                {/* Sidebar */}
                <div
                    className={`w-full mb-8 lg:mb-0 lg:w-1/4 h-auto lg:h-screen bg-white rounded
                                ${isSticky ? 'relative lg:top-10 lg:w-1/4' : 'relative'} 
                                ${isVisible ? 'block' : 'hidden'} lg:block`}
                >
                    <ProfileInfo
                        name={`${userData.firstName} ${userData.lastName}`}
                        title={userData.profession || 'Bilinmiyor'}
                        about={userData.bio || 'Bilgi yok.'}
                        mail={userData.emailAddress || 'Bilinmiyor'}
                        rate={userData.ratingAvg || 0}
                        star={userData.ratingAvg || 0}
                        reviewCount={userData.reviewCount || 0}
                        numbers={userData.phoneNumbers || []}
                        qualifications={userData.qualifications || []}
                    />
                </div>

                {/* Reviews Section */}
                <div
                    className={`w-full lg:w-3/4 mt-10 lg:mt-0 lg:ml-3 rounded 
                        ${isSticky ? 'relative lg:absolute lg:right-0' : 'relative'}`}
                >
                    <div className='my-10 p-4 lg:p-0'>
                        {/* Header */}
                        <div className='text-2xl font-semibold flex justify-between items-center mb-10'>
                            <p>Yorumlar</p>
                            <button
                                onClick={openModal}
                                className='text-xs lg:text-sm bg-blue-400 px-4 py-2 rounded text-white flex items-center gap-x-1'
                            >
                                <CiSquarePlus className='text-3xl' />
                                Yorum yap
                            </button>
                        </div>

                        {/* Review Cards */}
                        <div>
                            {reviews.map(review => (
                                <ReviewCard
                                    key={review.id}
                                    author={review.author}
                                    content={review.content}
                                    rating={review.rating}
                                    visibility={review.visibility}
                                    createdAt={review.createdAt}
                                    updatedAt={review.updatedAt}
                                    id={review.id}
                                />
                            ))}
                        </div>

                        {/* Pagination Controls */}
                        <div className='pagination-controls flex justify-center items-center gap-4 mt-4'>
                            <button
                                onClick={handlePrevPage}
                                disabled={currentPage === 1}
                                className={`px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition ${currentPage === 1
                                    ? 'opacity-50 cursor-not-allowed'
                                    : ''
                                    }`}
                            >
                                Önceki
                            </button>
                            <span className='text-gray-700 font-medium'>
                                Sayfa {currentPage} / {totalPages}
                            </span>
                            <button
                                onClick={handleNextPage}
                                disabled={currentPage >= totalPages}
                                className={`px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition ${currentPage >= totalPages
                                    ? 'opacity-50 cursor-not-allowed'
                                    : ''
                                    }`}
                            >
                                Sonraki
                            </button>
                        </div>

                        {/* Modal for Adding a Review */}
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
                                            <label
                                                className='block text-sm font-medium mb-2'
                                                htmlFor='comment'
                                            >
                                                Yorumunuz
                                            </label>
                                            <textarea
                                                id='comment'
                                                className='w-full p-2 border border-gray-300 rounded'
                                                placeholder='Yorumunuzu buraya yazın...'
                                            ></textarea>
                                        </div>
                                        <div className='mb-4'>
                                            <label
                                                className='block text-sm font-medium mb-2'
                                                htmlFor='rating'
                                            >
                                                Puanınız
                                            </label>
                                            <div id='rating' className='flex items-center'>
                                                {[1, 2, 3, 4, 5].map(index => (
                                                    <button
                                                        type='button'
                                                        key={index}
                                                        className={`text-2xl ${index <=
                                                            (hoverIndex !== -1 ? hoverIndex : selectedRating)
                                                            ? 'text-yellow-400'
                                                            : 'text-gray-400'
                                                            }`}
                                                        onMouseEnter={() => setHoverIndex(index)}
                                                        onMouseLeave={() => setHoverIndex(-1)}
                                                        onClick={() => setSelectedRating(index)}
                                                    >
                                                        ★
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <div className='flex justify-end'>
                                            <button
                                                type='submit'
                                                className='bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded'
                                            >
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
    );
}

export default Page;
