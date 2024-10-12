import { SocialLink, SocialLinkType } from '@/types/user';
import React, { useState, useEffect } from 'react';
import { FaLinkedin, FaSquareInstagram, FaSquareXTwitter, FaYoutube, FaMedium, FaSquareGithub } from 'react-icons/fa6';



interface SocialLinksFormProps {
    socialLinks: SocialLink[] | null;
}

const SocialLinksForm: React.FC<SocialLinksFormProps> = ({ socialLinks }) => {
    const [formLinks, setFormLinks] = useState<SocialLink[]>(socialLinks || []);

    useEffect(() => {
        if (socialLinks)
            setFormLinks(socialLinks);
    }, [socialLinks]);

    const handleSocialLinkChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        socialLinkType: SocialLinkType
    ) => {
        const updatedLinks = formLinks.map(link =>
            link.socialLinkType === socialLinkType
                ? { ...link, url: e.target.value }
                : link
        );
        setFormLinks(updatedLinks);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Form gönderimi ile ilgili işlemler burada yapılabilir
        console.log('Social Links Data:', formLinks);
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