"use client";

import { UserData } from "@/types/user";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import Header from "../components/common/header";
import api from "@/services/api";
import UserProfileForm from "../components/edit-profile-forms/user-informations-form";
import SocialLinksForm from "../components/edit-profile-forms/social-links-form";
import QualificationsForm from "../components/edit-profile-forms/qualifications-form";
import SecuritySettingsForm from "../components/edit-profile-forms/security-settings-form";
import ErrorPopup from "../components/common/error-popup";
import PhoneNumbersForm from "../components/edit-profile-forms/phone-numbers-form";

const EditProfilePage: React.FC = () => {
    const router = useRouter();
    const [userData, setUserData] = useState<UserData | null>(null);

    const [errorMessage, setErrorMessage] = useState(''); // State for error message
    const [showPopup, setShowPopup] = useState(false); // State for popup visibility

    const closePopup = () => {
        setShowPopup(false);
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
                } catch (error: any) {
                    setErrorMessage(error.response.data.Message);
                    console.error('Error fetching user data:', error);
                    router.push('/login');
                }
            };
            fetchUserData();
        }
    }, [router]);



    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Header />
            <div className="w-5/6 mx-auto mt-6 mb-10">

                <div className="bg-white my-10 p-4 rounded-lg">
                    {/* Genel Ayarlar */}

                    <UserProfileForm userData={userData} userName={userData.userName} ></UserProfileForm>
                    {/* Sosyal Medya Linkleri */}
                    <SocialLinksForm socialLinks={userData?.socialLinks ?? null}></SocialLinksForm>

                    {/* Sertifika Ayarları */}
                    <QualificationsForm qualifications={userData?.qualifications ?? null}></QualificationsForm>

                    {/* Telefon numaraları */}
                    <PhoneNumbersForm initialPhoneNumbers={userData?.phoneNumbers}></PhoneNumbersForm>

                    {/* Güvenlik Ayarları */}
                    <SecuritySettingsForm />
                </div>
            </div>
            {showPopup && (
                <div className="absolute inset-0 flex items-center justify-center z-20">
                    <ErrorPopup message={errorMessage} onClose={closePopup} />
                </div>
            )}
        </div>
    );
};

export default EditProfilePage;
