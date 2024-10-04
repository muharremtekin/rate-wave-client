// pages/edit-profile.tsx
"use client";
import { Qualification, QualificationType, SocialLinkType, UserData } from "@/types/user";
import axios from "axios";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { FaEyeSlash, FaEye, FaLinkedin, FaMedium, FaSquareGithub, FaSquareInstagram, FaSquareXTwitter, FaYoutube } from "react-icons/fa6";
import { LuPlusCircle } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";
import Header from "../components/common/header";
import Image from "next/image";
import SocialMediaInput from "../components/common/social-media-input";
import api from "@/services/api";
import ProfilePictureSelector from "../components/common/profile-picture-selector";

const EditProfilePage: React.FC = () => {
    const router = useRouter();
    const [userData, setUserData] = useState<UserData | null>(null);
    const [formData, setFormData] = useState<UserData | null>(null);
    const [isMatching, setIsMatching] = useState<boolean | null>(null);
    const [showPassword, setShowPassword] = useState({
        lastPassword: false,
        newPassword: false,
    });
    const [passwords, setPasswords] = useState({
        lastPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    const handleImageChange = (file: File | null) => {
        setSelectedImage(file);
    };

    // Sayfa yüklendiğinde kullanıcı verilerini çek
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            router.push('/login');
        } else {
            const fetchUserData = async () => {
                try {
                    const response = await api.get<UserData>('users/me');
                    setUserData(response.data);
                    setFormData(response.data); // Form verilerini kullanıcı verileriyle doldur
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    router.push('/login');
                }
            };
            fetchUserData();
        }
    }, [router]);

    // Şifre eşleşme kontrolü
    useEffect(() => {
        setIsMatching(passwords.newPassword === passwords.confirmPassword);
    }, [passwords.newPassword, passwords.confirmPassword]);

    // Form verilerini güncelleme
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (formData) {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
            });
        }
    };

    // Sosyal linkleri güncelleme
    const handleSocialLinkChange = (index: number, value: string) => {
        if (formData) {
            const updatedLinks = [...formData.socialLinks];
            updatedLinks[index].url = value;
            setFormData({
                ...formData,
                socialLinks: updatedLinks,
            });
        }
    };

    // Sertifika ekleme
    const addQualification = () => {
        if (formData) {
            const newQualification: Qualification = {
                id: Math.random().toString(),
                type: QualificationType.Degree,
                name: '',
                institution: '',
                verificationLink: '',
                startDate: '',
                endDate: '',
            };
            setFormData({
                ...formData,
                qualifications: [...formData.qualifications, newQualification],
            });
        }
    };

    // Sertifika silme
    const removeQualification = (id: string) => {
        if (formData) {
            setFormData({
                ...formData,
                qualifications: formData.qualifications.filter((q) => q.id !== id),
            });
        }
    };

    // Formu gönderme
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem('authToken');
        if (token && formData) {
            try {
                await axios.put('https://localhost:7037/api/users/me', formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                alert('Profil başarıyla güncellendi!');
                router.push(`/profile/${formData.userName}`);
            } catch (error) {
                console.error('Error updating profile:', error);
                alert('Profil güncellenirken bir hata oluştu.');
            }
        }
    };

    // Şifre güncelleme fonksiyonu
    const handlePasswordUpdate = async () => {
        const token = localStorage.getItem('authToken');
        if (token && passwords.lastPassword && passwords.newPassword) {
            try {
                await api.put('api/passwords', {
                    lastPassword: passwords.lastPassword,
                    newPassword: passwords.newPassword,
                })
                alert('Şifre başarıyla güncellendi!');
                setPasswords({
                    lastPassword: '',
                    newPassword: '',
                    confirmPassword: '',
                });
            } catch (error) {
                console.error('Error changing password:', error);
                alert('Şifre değiştirilirken bir hata oluştu.');
            }
        }
    };

    if (!formData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Header />
            <div className="w-5/6 mx-auto mt-6 mb-10">

                <div className="bg-white my-10 p-4 rounded-lg">
                    {/* Genel Ayarlar */}
                    <h2 className="my-8 text-xl font-normal px-0 lg:px-10">Genel Ayarlar</h2>
                    <div className="w-full h-px px-10 bg-slate-200 mb-6"></div>

                    <form className="px-2 lg:px-10 mb-10" onSubmit={handleSubmit}>
                        {/* Kullanıcı Bilgileri */}
                        <div className="flex flex-row items-start lg:items-center justify-between w-full mb-16">
                            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-x-4">
                                {/* <div className="w-20 h-20 lg:h-24 lg:w-24 ">
                                    <Image
                                        className="h-full w-full object-cover rounded-full"
                                        src={formData?.profilePicture ?? ''}
                                        width={100}
                                        height={100}
                                        alt="Profile Photo"
                                    />
                                </div> */}
                                <ProfilePictureSelector
                                    initialImageUrl={userData?.profilePicture}
                                    onImageChange={handleImageChange}
                                />
                                <div>
                                    <p className="text-2xl font-bold">
                                        {formData.firstName} {formData.lastName}
                                    </p>
                                    <p className="text-xs font-light">{formData.profession}</p>
                                </div>
                            </div>
                            <div className="flex flex-row gap-x-4">
                                <button type="button">
                                    <RiDeleteBin6Line className="text-lg lg:text-2xl text-red-400" />
                                </button>
                                <button type="button">
                                    <FaRegEdit className="text-lg lg:text-2xl text-blue-400 " />
                                </button>
                                <input type="file" id="profilePicture" name="profilePicture" accept=".png, .jpeg, .jpg" />
                            </div>
                        </div>

                        {/* Form Alanları */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-0 lg:gap-x-10">
                            {/* İsim */}
                            <div className="flex flex-col mb-6">
                                <label className="font-light text-sm mb-1" htmlFor="firstName">
                                    İsim
                                </label>
                                <input
                                    type="text"
                                    name="firstName"
                                    id="firstName"
                                    placeholder="İsim"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    className="px-4 py-2 font-light border outline-none rounded bg-[#8080801b]"
                                />
                            </div>
                            {/* Soyisim */}
                            <div className="flex flex-col mb-6">
                                <label className="font-light text-sm mb-1" htmlFor="lastName">
                                    Soyisim
                                </label>
                                <input
                                    type="text"
                                    name="lastName"
                                    id="lastName"
                                    placeholder="Soyisim"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    className="px-4 py-2 font-light border outline-none rounded bg-[#8080801b]"
                                />
                            </div>
                            {/* Meslek */}
                            <div className="flex flex-col mb-6">
                                <label className="font-light text-sm mb-1" htmlFor="profession">
                                    Meslek
                                </label>
                                <input
                                    type="text"
                                    name="profession"
                                    id="profession"
                                    placeholder="Meslek"
                                    value={formData.profession}
                                    onChange={handleInputChange}
                                    className="px-4 py-2 font-light border outline-none rounded bg-[#8080801b]"
                                />
                            </div>
                            {/* Deneyim Yılı */}
                            <div className="flex flex-col mb-6">
                                <label className="font-light text-sm mb-1" htmlFor="yearsOfExperience">
                                    Deneyim Yılı
                                </label>
                                <input
                                    type="number"
                                    name="yearsOfExperience"
                                    id="yearsOfExperience"
                                    placeholder="Deneyim Yılı"
                                    value={formData.yearsOfExperience}
                                    onChange={handleInputChange}
                                    className="px-4 py-2 font-light border outline-none rounded bg-[#8080801b]"
                                />
                            </div>

                            {/* Sosyal Linkler */}


                            <SocialMediaInput
                                label="LinkedIn"
                                name="linkedin"
                                placeholder="LinkedIn"
                                icon={FaLinkedin}
                                iconColor="text-[#0077B5]"
                                value={formData.socialLinks.find(link => link.socialLinkType === SocialLinkType.LinkedIn)?.url || ''}
                                onChange={handleInputChange}
                            />

                            <SocialMediaInput
                                label="Instagram"
                                name="instagram"
                                placeholder="Instagram"
                                icon={FaSquareInstagram}
                                iconColor="text-[#c13584]"
                                value={formData.socialLinks.find(link => link.socialLinkType === SocialLinkType.Instagram)?.url || ''}
                                onChange={handleInputChange}
                            />

                            <SocialMediaInput
                                label="Twitter"
                                name="twitter"
                                placeholder="Twitter"
                                icon={FaSquareXTwitter}
                                iconColor="text-[#1DA1F2]"
                                value={formData.socialLinks.find(link => link.socialLinkType === SocialLinkType.Twitter)?.url || ''}
                                onChange={handleInputChange}
                            />

                            <SocialMediaInput
                                label="YouTube"
                                name="youtube"

                                placeholder="YouTube"
                                icon={FaYoutube}
                                iconColor="text-[#FF0000]"
                                value={formData.socialLinks.find(link => link.socialLinkType === SocialLinkType.YouTube)?.url || ''}
                                onChange={handleInputChange}
                            />

                            <SocialMediaInput
                                label="Medium"
                                name="medium"
                                placeholder="Medium"
                                icon={FaMedium}
                                iconColor="text-black"
                                value={formData.socialLinks.find(link => link.socialLinkType === SocialLinkType.Medium)?.url || ''}
                                onChange={handleInputChange}
                            />

                            <SocialMediaInput
                                label="GitHub"
                                name="github"
                                placeholder="GitHub"
                                icon={FaSquareGithub}
                                iconColor="text-black"
                                value={formData.socialLinks.find(link => link.socialLinkType === SocialLinkType.GitHub)?.url || ''}
                                onChange={handleInputChange}
                            />

                            {/* Biyografi */}
                            <div className="flex flex-col mb-6 lg:col-span-2">
                                <label className="font-light text-sm mb-1" htmlFor="bio">
                                    Biyografi
                                </label>
                                <textarea
                                    name="bio"
                                    id="bio"
                                    placeholder="Biyografi"
                                    value={formData.bio}
                                    onChange={handleInputChange}
                                    className="px-4 py-2 font-light border outline-none rounded bg-[#8080801b]"
                                ></textarea>
                            </div>
                        </div>

                        {/* Güncelle Butonu */}
                        <button
                            type="submit"
                            className="text-base rounded text-center font-normal text-white bg-blue-600 w-1/2 lg:w-1/4 py-2"
                        >
                            Güncelle
                        </button>
                    </form>

                    {/* Sertifika Ayarları */}
                    <h2 className="mt-24 my-8 text-xl font-normal px-0 lg:px-10">Sertifika Ayarları</h2>
                    <div className="w-full h-px px-10 bg-slate-200 mb-6"></div>
                    <form className="px-2 lg:px-10 mb-10">
                        {formData.qualifications.map((qualification, index) => (
                            <div
                                key={qualification.id}
                                className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 bg-[#808080] bg-opacity-10 p-4 rounded pt-10 relative mb-10"
                            >
                                <button
                                    type="button"
                                    onClick={() => removeQualification(qualification.id)}
                                    className="absolute top-4 right-4 text-xl text-red-400"
                                >
                                    <RiDeleteBin6Line />
                                </button>
                                {/* Sertifika Adı */}
                                <div className="flex flex-col mb-6">
                                    <label className="font-light text-sm mb-1" htmlFor={`name-${qualification.id}`}>
                                        Sertifika Adı
                                    </label>
                                    <input
                                        type="text"
                                        name={`name-${qualification.id}`}
                                        id={`name-${qualification.id}`}
                                        placeholder="Sertifika Adı"
                                        value={qualification.name}
                                        onChange={(e) => {
                                            const updatedQualifications = [...formData.qualifications];
                                            updatedQualifications[index].name = e.target.value;
                                            setFormData({
                                                ...formData,
                                                qualifications: updatedQualifications,
                                            });
                                        }}
                                        className="px-4 py-2 font-light border outline-none rounded bg-[#8080801b]"
                                    />
                                </div>
                                {/* Kurum */}
                                <div className="flex flex-col mb-6">
                                    <label className="font-light text-sm mb-1" htmlFor={`institution-${qualification.id}`}>
                                        Kurum
                                    </label>
                                    <input
                                        type="text"
                                        name={`institution-${qualification.id}`}
                                        id={`institution-${qualification.id}`}
                                        placeholder="Kurum"
                                        value={qualification.institution}
                                        onChange={(e) => {
                                            const updatedQualifications = [...formData.qualifications];
                                            updatedQualifications[index].institution = e.target.value;
                                            setFormData({
                                                ...formData,
                                                qualifications: updatedQualifications,
                                            });
                                        }}
                                        className="px-4 py-2 font-light border outline-none rounded bg-[#8080801b]"
                                    />
                                </div>
                                {/* Başlangıç Tarihi */}
                                <div className="flex flex-col mb-6">
                                    <label className="font-light text-sm mb-1" htmlFor={`startDate-${qualification.id}`}>
                                        Başlangıç Tarihi
                                    </label>
                                    <input
                                        type="month"
                                        name={`startDate-${qualification.id}`}
                                        id={`startDate-${qualification.id}`}
                                        value={qualification.startDate}
                                        onChange={(e) => {
                                            const updatedQualifications = [...formData.qualifications];
                                            updatedQualifications[index].startDate = e.target.value;
                                            setFormData({
                                                ...formData,
                                                qualifications: updatedQualifications,
                                            });
                                        }}
                                        className="px-4 py-2 font-light border outline-none rounded bg-[#8080801b]"
                                    />
                                </div>
                                {/* Bitiş Tarihi */}
                                <div className="flex flex-col mb-6">
                                    <label className="font-light text-sm mb-1" htmlFor={`endDate-${qualification.id}`}>
                                        Bitiş Tarihi
                                    </label>
                                    <input
                                        type="month"
                                        name={`endDate-${qualification.id}`}
                                        id={`endDate-${qualification.id}`}
                                        value={qualification.endDate}
                                        onChange={(e) => {
                                            const updatedQualifications = [...formData.qualifications];
                                            updatedQualifications[index].endDate = e.target.value;
                                            setFormData({
                                                ...formData,
                                                qualifications: updatedQualifications,
                                            });
                                        }}
                                        className="px-4 py-2 font-light border outline-none rounded bg-[#8080801b]"
                                    />
                                </div>
                            </div>
                        ))}

                        {/* Sertifika Ekleme ve Güncelleme */}
                        <div className="flex flex-row items-center justify-between">
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="text-base rounded text-center font-normal text-white bg-blue-600 w-1/2 lg:w-1/4 py-2"
                            >
                                Güncelle
                            </button>
                            <LuPlusCircle
                                onClick={addQualification}
                                className="text-5xl bg-[#808080] bg-opacity-10 text-black p-2 rounded-full cursor-pointer"
                            />
                        </div>
                    </form>

                    {/* Güvenlik Ayarları */}
                    <h2 className="mt-24 my-8 text-xl font-normal px-10">Güvenlik Ayarları</h2>
                    <div className="w-full h-px px-10 bg-slate-200 mb-6"></div>
                    <form className="px-2 lg:px-10 mb-10" onSubmit={(e) => e.preventDefault()}>
                        <div className="grid grid-cols-1 gap-x-0 lg:gap-x-10">
                            {/* Eski Şifre */}
                            <div className="flex flex-col mb-6 w-full lg:w-1/2 relative">
                                <label className="font-light text-sm mb-1" htmlFor="lastPassword">
                                    Eski Şifre
                                </label>
                                <input
                                    type={showPassword.lastPassword ? 'text' : 'password'}
                                    name="lastPassword"
                                    id="lastPassword"
                                    placeholder="Eski Şifre"
                                    value={passwords.lastPassword}
                                    onChange={(e) => setPasswords({ ...passwords, lastPassword: e.target.value })}
                                    className="px-4 py-2 font-light border outline-none rounded bg-[#8080801b]"
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-10"
                                    onClick={() =>
                                        setShowPassword({ ...showPassword, lastPassword: !showPassword.lastPassword })
                                    }
                                >
                                    {showPassword.lastPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                            {/* Yeni Şifre */}
                            <div className="flex flex-col mb-6 w-full lg:w-1/2 relative">
                                <label className="font-light text-sm mb-1" htmlFor="newPassword">
                                    Yeni Şifre
                                </label>
                                <input
                                    type={showPassword.newPassword ? 'text' : 'password'}
                                    name="newPassword"
                                    id="newPassword"
                                    placeholder="Yeni Şifre"
                                    value={passwords.newPassword}
                                    onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                                    className="px-4 py-2 font-light border outline-none rounded bg-[#8080801b]"
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-10"
                                    onClick={() =>
                                        setShowPassword({ ...showPassword, newPassword: !showPassword.newPassword })
                                    }
                                >
                                    {showPassword.newPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                            {/* Yeni Şifre Tekrar */}
                            <div className="flex flex-col mb-6 w-full lg:w-1/2 relative">
                                <label className="font-light text-sm mb-1" htmlFor="confirmPassword">
                                    Yeni Şifre Tekrar
                                </label>
                                <input
                                    type={showPassword.newPassword ? 'text' : 'password'}
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    placeholder="Yeni Şifre Tekrar"
                                    value={passwords.confirmPassword}
                                    onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                                    className="px-4 py-2 font-light border outline-none rounded bg-[#8080801b]"
                                />
                            </div>

                            {/* Şifre Eşleşme Mesajı */}
                            <p
                                className={`${isMatching === null
                                    ? 'text-gray-500'
                                    : isMatching
                                        ? 'text-green-500'
                                        : 'text-red-500'
                                    } text-sm mb-4 transition-all delay-100 ease-in-out`}
                            >
                                {isMatching === null
                                    ? ''
                                    : isMatching
                                        ? 'Şifreler Eşleşiyor!'
                                        : 'Şifreler Eşleşmiyor!'}
                            </p>
                        </div>

                        {/* Şifre Güncelleme Butonu */}
                        <button
                            type="button"
                            onClick={handlePasswordUpdate}
                            disabled={!isMatching}
                            className={`text-base rounded text-center font-normal text-white w-1/2 lg:w-1/4 py-2 transition-all delay-100 ease-in-out ${!isMatching ? 'bg-blue-200 cursor-not-allowed' : 'bg-blue-600'
                                }`}
                        >
                            Şifreyi Güncelle
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProfilePage;
