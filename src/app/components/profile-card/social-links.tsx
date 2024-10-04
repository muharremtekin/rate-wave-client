import React from 'react';
import {
    FaFacebook,
    FaTwitter,
    FaInstagram,
    FaLinkedin,
    FaYoutube,
    FaTiktok,
    FaGlobe,
} from 'react-icons/fa6';
import Link from 'next/link';
import { SocialLink } from '@/types/user';



interface SocialLinksProps {
    socialLinks: SocialLink[];
}

const SocialLinks: React.FC<SocialLinksProps> = ({ socialLinks }) => {
    const getIconAndLabel = (type: number) => {
        switch (type) {
            case 0: // Facebook
                return { icon: <FaFacebook />, label: 'Facebook' };
            case 1: // Twitter
                return { icon: <FaTwitter />, label: 'Twitter' };
            case 2: // Instagram
                return { icon: <FaInstagram />, label: 'Instagram' };
            case 3: // LinkedIn
                return { icon: <FaLinkedin />, label: 'LinkedIn' };
            case 4: // YouTube
                return { icon: <FaYoutube />, label: 'YouTube' };
            case 5: // TikTok
                return { icon: <FaTiktok />, label: 'TikTok' };
            default: // Other
                return { icon: <FaGlobe />, label: 'Website' };
        }
    };

    return (
        <div className='flex flex-row opacity-60 my-4'>
            {socialLinks.map((link) => {
                const { icon, label } = getIconAndLabel(link.socialLinkType);
                return (
                    <div
                        key={link.id}
                        className='flex items-center mr-4 text-sm md:text-base lg:text-xl cursor-pointer'
                    >
                        <Link href={link.url} target='_blank' aria-label={label}>
                            {icon}
                        </Link>
                    </div>
                );
            })}
        </div>
    );
};

export default SocialLinks;

