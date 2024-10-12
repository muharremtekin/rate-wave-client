import React from 'react';
import Image from 'next/image';
import SocialLinks from './social-links';
import { SocialLink } from '@/types/user';

type ProfileDetailsProps = {
    imageSrc: string;
    name: string;
    title: string;
    experience: number;
    socialLinks: SocialLink[];
};

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ imageSrc, name, title, experience, socialLinks }) => {
    return (
        <div className='w-full bg-white absolute bottom-0 left-0 py-2 md:py-4 lg:py-8'>
            <div className='absolute left-6 md:left-20 lg:left-44 bottom-20 md:bottom-16 lg:bottom-4 w-1/5 lg:w-1/6 rounded-full overflow-hidden'>
                <Image
                    src={imageSrc ?? 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg'}
                    alt={name}
                    width={400}
                    height={400}
                    layout="responsive"
                    className='w-full h-auto border-4 shadow-lg border-white object-cover object-center rounded-full'
                />
            </div>

            <div className='w-2/5 md:w-2/5 lg:w-4/12 flex flex-col mx-auto'>
                <p className='text-xl md:text-2xl lg:text-4xl font-bold'>{name}</p>
                <p className='text-sm md:text-lg lg:text-xl font-light opacity-60'>
                    {title} <span className='text-xs'>/ {experience} Yr. Experience</span>
                </p>
                <SocialLinks socialLinks={socialLinks} />
            </div>
        </div>
    );
};

export default ProfileDetails;
