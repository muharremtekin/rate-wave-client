"use client";
import api from '@/services/api';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import InputField from '../components/common/input-field';
import ErrorPopup from '../components/common/error-popup';

function RegisterPage() {
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        username: '',
        password: '',
        profession: '',
        experience: '',
        profilePhoto: '',
        biography: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState(''); // State for error message
    const [showPopup, setShowPopup] = useState(false); // State for popup visibility



    const closePopup = () => {
        setShowPopup(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {

            if (!formData.name || !formData.surname || !formData.email || !formData.username 
                || !formData.password || !formData.profession || !formData.experience || !formData.biography) {
                setErrorMessage('All fields are required.');
                setShowPopup(true);
                return;
            }

            const data = {
                firstName: formData.name,
                lastName: formData.surname,
                emailAddress: formData.email,
                userName: formData.username,
                password: formData.password,
                profession: formData.profession,
                yearsOfExperience: formData.experience,
                // profilePicture: formData.profilePhoto,
                bio: formData.biography,
            }
            console.log(data);
            const response = await api.post('/users', data);

            if (response.status === 200) {
                setErrorMessage('Registration successful. You have to verify your e-mail address. Please check your inbox.');
                setShowPopup(true);
            }
        } catch (error: any) {
            let message = 'Registration failed. ';
            if (error.response.data.Message) {
                message += error.response.data.Message;
            }
            setErrorMessage(message);
            setShowPopup(true);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className='relative flex items-center justify-center z-10 mt-2'>
            <div className='w-full lg:w-1/2 px-10 py-2'>
                <div className='mt-10'>
                    <Link href='/'>
                        <p className='text-5xl font-bold text-slate-600'>
                            RATE<span className='font-light'>WAVE</span>
                        </p>
                    </Link>
                    <p className='font-medium italic text-base text-slate-600 my-2 opacity-65'>Welcome to RATEWAVE</p>
                </div>

                <div>
                    <form className='py-6' onSubmit={handleRegister}>
                        <div className='grid grid-cols-2 gap-x-4'>
                            <InputField label='Name' id='name' type='text' placeholder='Name' value={formData.name} onChange={handleInputChange} />
                            <InputField label='Surname' id='surname' type='text' placeholder='Surname' value={formData.surname} onChange={handleInputChange} />
                        </div>

                        <div className='grid grid-cols-2 gap-x-4'>
                            <InputField label='E-Mail' id='email' type='email' placeholder='E-Mail' value={formData.email} onChange={handleInputChange} />
                            <InputField label='Username' id='username' type='text' placeholder='Username' value={formData.username} onChange={handleInputChange} />
                        </div>

                        <div className='grid grid-cols-2 gap-x-4'>
                            <div className='w-full flex flex-col mb-6 relative'>
                                <label className='font-light text-sm mb-1' htmlFor='password'>Password</label>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name='password'
                                    id='password'
                                    placeholder='Password'
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className='px-4 py-2 font-light border border-slate-600 border-opacity-15 outline-none rounded bg-[#8080801b] text-black placeholder:text-black placeholder:opacity-20'
                                />
                                <div className='absolute cursor-pointer top-9 right-3' onClick={togglePasswordVisibility}>
                                    {showPassword ? <FaRegEyeSlash className='text-xl' /> : <FaRegEye className='text-xl' />}
                                </div>
                            </div>
                            <InputField label='Profession' id='profession' type='text' placeholder='Profession' value={formData.profession} onChange={handleInputChange} />
                        </div>

                        <div className='grid grid-cols-2 gap-x-4'>
                            <InputField label='Experience' id='experience' type='number' placeholder='Experience' value={formData.experience} onChange={handleInputChange} />
                        </div>

                        {/* <div className='grid grid-cols-1 gap-x-4'>
                            <InputField label='Profile Photo' id='profilePhoto' type='file' placeholder='Profile Photo' onChange={handleInputChange} />
                        </div> */}

                        <div className='grid grid-cols-1 gap-x-4'>
                            <div className='flex flex-col mb-6'>
                                <label className='font-light text-sm mb-1' htmlFor='biography'>Biography</label>
                                <textarea
                                    name='biography'
                                    id='biography'
                                    placeholder='Biography'
                                    value={formData.biography}
                                    onChange={handleInputChange}
                                    className='min-h-16 max-h-40 resize-y px-3 py-2 font-light border border-slate-600 border-opacity-15 outline-none rounded bg-[#8080801b] text-black placeholder:text-black placeholder:opacity-20'
                                ></textarea>
                            </div>
                        </div>

                        <div className='flex flex-col items-center mb-10'>
                            <button className='bg-blue-600 hover:bg-blue-800 text-white w-1/4 font-semibold py-2 mt-8 mb-1 rounded'>Register</button>
                            <div className='h-px w-40 my-4 bg-slate-600 opacity-15'></div>
                            <Link href='/login' className='text-xs font-light text-center'>
                                Do you have an account? <span className='text-blue-400 ml-1'>Log In now!</span>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
            {showPopup && (
                <div className="absolute inset-0 flex items-center justify-center z-20">
                    <ErrorPopup message={errorMessage} onClose={closePopup} />
                </div>
            )}
        </div>
    );
}

export default RegisterPage;