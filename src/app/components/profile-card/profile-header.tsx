import React from 'react';
import Image from 'next/image';
import ProfileDetails from './profile-details';
import { SocialLink } from '@/types/user';
import SocialLinks from './social-links';

type ProfileHeaderProps = {
    backgroundImageSrc: string;
    profileImageSrc: string;
    name: string;
    title: string;
    experience: number;
    socialLinks: SocialLink[];
};

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
    backgroundImageSrc,
    profileImageSrc,
    name,
    title,
    experience,
    socialLinks
}) => {
    return (
        <div className='relative w-full'>
            <div className='relative w-full h-96'>
                
                <Image
                    src={"https://images.pexels.com/photos/281260/pexels-photo-281260.jpeg"}
                    alt='Background Image'
                    layout='fill'
                    objectFit='cover'
                    objectPosition='bottom'
                    quality={100}
                    className='w-full h-full'
                />
            </div>
            <ProfileDetails
                imageSrc={profileImageSrc}
                name={name}
                title={title}
                experience={experience}
                socialLinks={socialLinks}
            />
        </div>
    );
};

export default ProfileHeader;
