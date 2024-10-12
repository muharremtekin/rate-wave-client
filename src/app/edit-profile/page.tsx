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
import UserProfileForm from "../components/edit-profile-forms/user-informations-form";
import SocialLinksForm from "../components/edit-profile-forms/social-links-form";
import QualificationsForm from "../components/edit-profile-forms/qualifications-form";
import SecuritySettingsForm from "../components/edit-profile-forms/security-settings-form";

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

                    <UserProfileForm userData={userData}></UserProfileForm>
                    {/* Sosyal Medya Linkleri */}
                    <SocialLinksForm socialLinks={userData?.socialLinks ?? null}></SocialLinksForm>

                    {/* Sertifika Ayarları */}
                    <QualificationsForm qualifications={userData?.qualifications ?? null}></QualificationsForm>

                    {/* Güvenlik Ayarları */}
                    <SecuritySettingsForm/>
                </div>
            </div>
        </div>
    );
};

export default EditProfilePage;
