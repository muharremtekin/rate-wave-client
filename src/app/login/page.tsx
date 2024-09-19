"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import SideImage from '../components/login/side-image';
import LoginForm from '../components/login/login-form';
import api from '../../services/api';

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

            const response = await api.post('/authentication', {
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
        <div className='flex h-screen'>
            <SideImage />
            <LoginForm
                showPassword={showPassword}
                togglePasswordVisibility={togglePasswordVisibility}
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
                handleSignIn={handleSignIn}
            />
            {showPopup && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
                    <div className='bg-white p-6 rounded shadow-lg'>
                        <p>{errorMessage}</p>
                        <button onClick={closePopup} className='mt-4 px-4 py-2 bg-blue-600 text-white rounded'>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Page;
