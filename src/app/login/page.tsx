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
    const { login } = useAuth();
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState(''); // State for error message
    const [showPopup, setShowPopup] = useState(false); // State for popup visibility



    const closePopup = () => {
        setShowPopup(false);
    };

    const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (!username || !password) {
                setErrorMessage('Username and password are required.');
                setShowPopup(true);
                return;
            }

            const response = await api.post('/tokens', {
                "userName": username,
                "password": password,
            });

            if (response.status === 200) {
                const data = response.data;
                login(data.token);
                router.push('/profile/' + data.userName);
            }

        } catch (error: any) {
            setErrorMessage('Login failed. ' + error.response.data.Message);
            setShowPopup(true);
            console.error('Error during login: ', error.response.data.Message);
        }
    };

    return (
        <div className="relative h-screen">
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
