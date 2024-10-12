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
import CommentModal from '@/app/components/comment-modal';
import { useAuth } from '@/context/AuthContext';

function Page() {
    // State variables
    const [isVisible, setIsVisible] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userData, setUserData] = useState<UserData | null>(null);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const pageSize = 8;
    const { username } = useParams();
    const { isAuthenticated, payloadData } = useAuth();

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
                    `/reviews?revieweeUserName=${username}&pageNumber=${currentPage}&pageSize=${pageSize}`
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


    // Toggle visibility for mobile view
    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    // Modal controls
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
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
            <div className='w-full lg:w-5/6 mx-auto flex flex-col lg:flex-row my-0 lg:my-10 relative '>
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
                    // className={`w-full mb-8 lg:mb-0 lg:w-1/4 h-auto lg:h-full bg-white rounded 
                    //             ${isSticky ? 'relative lg:top-10 lg:w-1/4' : 'relative'} 
                    //             ${isVisible ? 'block' : 'hidden'} lg:block`}
                    className={`w-full mb-8 lg:mb-0 lg:w-1/4 h-auto lg:h-full bg-white rounded `}
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
                    className={`w-full lg:w-3/4 mt-10 lg:mt-0 lg:ml-3 rounded`}
                >
                    <div className='my-5 p-4 lg:p-0'>
                        {/* Header */}
                        <div className='text-2xl font-semibold flex justify-between items-center mb-10'>
                            <p>Reviews</p>
                            {
                                (isAuthenticated && payloadData?.UserName != username) && 
                                <button
                                    onClick={openModal}
                                    className='text-xs lg:text-sm bg-blue-400 px-4 py-2 rounded text-white flex items-center gap-x-1'
                                >
                                    <CiSquarePlus className='text-3xl' />
                                    Yorum yap
                                </button>
                            }
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
                        {isAuthenticated && <CommentModal isModalOpen={isModalOpen} closeModal={closeModal} revieweeUserName={username.toString()} />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Page;
