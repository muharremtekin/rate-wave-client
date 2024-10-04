"use client";
import React, { useEffect, useState } from 'react';
import Header from '../common/header';
import ProfileHeader from './profile-header';
import { SocialLink } from '@/types/user';


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

    return (
        <div className='w-full bg-white'>
            <Header />
            <ProfileHeader title={title} name={name} experience={experience} profileImageSrc={profileImageSrc} backgroundImageSrc={backgroundImageSrc} socialLinks={socialLinks} />

        </div>
    );
};

export default UserProfile;
