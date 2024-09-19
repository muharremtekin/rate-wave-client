"use client";
import React, { useEffect, useState } from 'react';

import { SearchModal } from '@/app/components';
import Header from '../common/header';
import ProfileHeader from './profile-header';
import { Suranna } from 'next/font/google';
import api from '../../../services/api';
import { SocialLink } from '@/types/user';

interface SearchResult {
    userName: number;
    fullName: string;
    profilePicture: string;
    profession: string;
}

type UserProfileProps = {
    backgroundImageSrc: string;
    profileImageSrc: string;
    name: string;
    title: string;
    experience: number;
    socialLinks: SocialLink[];
};

const UserProfile: React.FC<UserProfileProps> = ({
    backgroundImageSrc,
    profileImageSrc,
    name,
    title,
    experience,
    socialLinks,
}) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

    const handleSearchClick = () => {
        setIsModalOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setIsModalOpen(false);
        document.body.style.overflow = 'auto';
    };

    useEffect(() => {
        const fetchSearchResults = async () => {
            if (searchTerm.length > 0) {
                await api.get(`/users?PageNumber=1&PageSize=10&SearchTerm=${searchTerm}`).then((response) => {
                    console.log(response.data);
                    setSearchResults(response.data);
                });

            } else {
                setSearchResults([]);
            }
        };

        fetchSearchResults();
    }, [searchTerm]);

    return (
        <div className='w-full bg-white'>
            <Header handleSearchClick={handleSearchClick} />
            <ProfileHeader title={title} name={name} experience={experience} profileImageSrc={profileImageSrc} backgroundImageSrc={backgroundImageSrc} socialLinks={socialLinks} />
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
