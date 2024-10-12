"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import LoginForm from '../components/login/login-form';
import api from '../../services/api';
import ErrorPopup from '../components/common/error-popup';

const Page: React.FC = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState(''); // State for error message
    const [showPopup, setShowPopup] = useState(false); // State for popup visibility
    const { login } = useAuth();
    const router = useRouter();

    const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

    const closePopup = () => {
        setShowPopup(false);
    };

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (!username || !password) {
                setErrorMessage('Username and password are required.');
                setShowPopup(true);
                return; // Prevent API request if validation fails
            }

            const response = await api.post('/tokens', {
                "userName": username,
                "password": password,
            });

            if (response.status === 200) {
                const data = response.data;
                login(data.token); // Store the token securely using your login method
                router.push('/profile/' + data.userName); // Redirect to the user's profile
            } else {
                setErrorMessage('Login failed. ' + response.data.Message);
                setShowPopup(true);
                console.error(response.data.Message);
            }
        } catch (error) {
            setErrorMessage('Login failed. ' + (error as any).response.data.Message);
            setShowPopup(true);
            console.error('Error during login: ', (error as any).response.data.Message);
        }
    };

    return (
        <div className="relative h-screen">
            {/* Arka Plan Resmi ve Blur Efekti */}
            {/* <div
                className="absolute inset-0 bg-cover bg-center filter blur-sm z-0"
                style={{ backgroundImage: "https://www.pexels.com/tr-tr/fotograf/deniz-kent-sehir-peyzaj-27230180/" }}
            ></div> */}

            {/* <SideImage /> */}
            {/* Ortalanmış LoginForm */}
            <div className="relative flex items-center justify-center  z-10 mt-2">
                <LoginForm
                    showPassword={showPassword}
                    togglePasswordVisibility={togglePasswordVisibility}
                    username={username}
                    setUsername={setUsername}
                    password={password}
                    setPassword={setPassword}
                    handleSignIn={handleSignIn}
                />
            </div>

            {/* Hata Popup'ı */}
            {showPopup && (
                <div className="absolute inset-0 flex items-center justify-center z-20">
                    <ErrorPopup message={errorMessage} onClose={closePopup} />
                </div>
            )}
        </div>
    );
};

export default Page;
