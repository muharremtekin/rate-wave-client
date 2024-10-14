import api from '@/services/api';
import { SocialLink, SocialLinkType } from '@/types/user';
import { randomUUID } from 'crypto';
import React, { useState, useEffect } from 'react';
import { FaLinkedin, FaSquareInstagram, FaSquareXTwitter, FaYoutube, FaMedium, FaSquareGithub } from 'react-icons/fa6';
import ErrorPopup from '../common/error-popup';


interface SocialLinksFormProps {
    socialLinks: SocialLink[] | null;
}

const SocialLinksForm: React.FC<SocialLinksFormProps> = ({ socialLinks }) => {
    const [formLinks, setFormLinks] = useState<SocialLink[]>(socialLinks || []);
    const [errorMessage, setErrorMessage] = useState(''); // State for error message
    const [showPopup, setShowPopup] = useState(false); // State for popup visibility

    const closePopup = () => {
        setShowPopup(false);
    };


    useEffect(() => {
        if (socialLinks)
            setFormLinks(socialLinks);
    }, [socialLinks]);

    const handleSocialLinkChange = (e: React.ChangeEvent<HTMLInputElement>, type: SocialLinkType) => {
        setFormLinks((prevLinks) => {
            const existingLinkIndex = prevLinks.findIndex(link => link.socialLinkType === type);

            if (existingLinkIndex !== -1) {
                // Link mevcutsa güncelle
                const updatedLinks = [...prevLinks];
                updatedLinks[existingLinkIndex] = { ...updatedLinks[existingLinkIndex], url: e.target.value };
                return updatedLinks;
            } else {
                // Link mevcut değilse ekle
                return [...prevLinks, { id: '00000000-0000-0000-0000-000000000000', userId: '', socialLinkType: type, url: e.target.value }];
            }
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const socialLinks = formLinks.map(link => ({
            id: link.id,
            socialLinkType: link.socialLinkType,
            url: link.url,
        }));

        console.log(socialLinks);

        try {
            const response = await api.put('/social-links', { socialLinks: socialLinks });
            if (response.status === 200) {
                window.location.reload();
            }
        } catch (error: any) {
            setErrorMessage(error.response.data.Message);
            setShowPopup(true);
        }
    };

    return (
        <div>
            <h2 className="mt-24 my-8 text-xl font-normal px-0 lg:px-10">Sosyal Medya Linkleri</h2>
            <div className="w-full h-px px-10 bg-slate-200 mb-6"></div>
            <form className="px-2 lg:px-10 mb-10" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-0 lg:gap-x-10">
                    <SocialMediaInput
                        label="LinkedIn"
                        name="linkedin"
                        placeholder="LinkedIn"
                        icon={FaLinkedin}
                        iconColor="text-[#0077B5]"
                        value={formLinks.find(link => link.socialLinkType === SocialLinkType.LinkedIn)?.url || ''}
                        onChange={(e) => handleSocialLinkChange(e, SocialLinkType.LinkedIn)}
                    />
                    <SocialMediaInput
                        label="Instagram"
                        name="instagram"
                        placeholder="Instagram"
                        icon={FaSquareInstagram}
                        iconColor="text-[#c13584]"
                        value={formLinks.find(link => link.socialLinkType === SocialLinkType.Instagram)?.url || ''}
                        onChange={(e) => handleSocialLinkChange(e, SocialLinkType.Instagram)}
                    />
                    <SocialMediaInput
                        label="Twitter"
                        name="twitter"
                        placeholder="Twitter"
                        icon={FaSquareXTwitter}
                        iconColor="text-[#1DA1F2]"
                        value={formLinks.find(link => link.socialLinkType === SocialLinkType.Twitter)?.url || ''}
                        onChange={(e) => handleSocialLinkChange(e, SocialLinkType.Twitter)}
                    />
                    <SocialMediaInput
                        label="YouTube"
                        name="youtube"
                        placeholder="YouTube"
                        icon={FaYoutube}
                        iconColor="text-[#FF0000]"
                        value={formLinks.find(link => link.socialLinkType === SocialLinkType.YouTube)?.url || ''}
                        onChange={(e) => handleSocialLinkChange(e, SocialLinkType.YouTube)}
                    />
                    <SocialMediaInput
                        label="Medium"
                        name="medium"
                        placeholder="Medium"
                        icon={FaMedium}
                        iconColor="text-black"
                        value={formLinks.find(link => link.socialLinkType === SocialLinkType.Medium)?.url || ''}
                        onChange={(e) => handleSocialLinkChange(e, SocialLinkType.Medium)}
                    />
                    <SocialMediaInput
                        label="GitHub"
                        name="github"
                        placeholder="GitHub"
                        icon={FaSquareGithub}
                        iconColor="text-black"
                        value={formLinks.find(link => link.socialLinkType === SocialLinkType.GitHub)?.url || ''}
                        onChange={(e) => handleSocialLinkChange(e, SocialLinkType.GitHub)}
                    />
                </div>

                {/* Güncelle Butonu */}
                <button
                    type="submit"
                    className="text-base rounded text-center font-normal text-white bg-blue-600 w-1/2 lg:w-1/4 py-2"
                >
                    Güncelle
                </button>
            </form>
            {showPopup && (
                <div className="absolute inset-0 flex items-center justify-center z-20">
                    <ErrorPopup message={errorMessage} onClose={closePopup} />
                </div>
            )}
        </div>
    );
};

export default SocialLinksForm;

interface SocialMediaInputProps {
    label: string;
    name: string;
    placeholder: string;
    icon: React.ElementType;
    iconColor: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SocialMediaInput: React.FC<SocialMediaInputProps> = ({
    label,
    name,
    placeholder,
    icon: Icon,
    iconColor,
    value,
    onChange,
}) => {
    return (
        <div className="flex flex-col mb-6">
            <label className="font-light text-sm mb-1" htmlFor={name}>
                {label}
            </label>
            <div className="flex items-center">
                <Icon className={`mr-2 ${iconColor}`} />
                <input
                    type="text"
                    name={name}
                    id={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className="px-4 py-2 font-light border outline-none rounded bg-[#8080801b] flex-1"
                />
            </div>
        </div>
    );
};