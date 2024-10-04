"use client"
import api from '@/services/api';
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

function Page() {

    const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [profession, setProfession] = useState('');
    const [experience, setExperience] = useState('');
    // const [videoUrl, setVideoUrl] = useState('');
    const [profilePhoto, setProfilePhoto] = useState('');
    const [biography, setBiography] = useState('');

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {

            console.log(name, surname, email, username, password, profession, experience, profilePhoto, biography);
            const response = await api.post('/users', {
                "firstName": name,
                "lastName": surname,
                "emailAddress": email,
                "userName": username,
                "password": password,
                "profession": profession,
                "yearsOfExperience": experience,
                "profilePicture": profilePhoto,
                "bio": biography,
            });

            if (response.status === 200) {
                const data = response.data;
                console.log(data);
            } else {
                console.error(response.data.Message);
            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    return (
        <div className='w-full h-screen flex flex-row'>
            <div className='hidden lg:block w-1/2 h-full relative'>
                <Image src='/moon-bg.jpg' alt='Manzara Fotoğrafı' width={2000} height={2000} quality={100} className='fixed w-1/2 h-full object-cover shadow-costum' />
                <div className='fixed bottom-10 left-10 text-white bg-opacity-55 rounded backdrop-blur-sm text-xs px-3 py-1'>
                    <Link target='_blank' href={"https://www.pexels.com/tr-tr/fotograf/gun-batiminda-gosterilen-ayin-illustrasyonu-884788/"}>Photo by : <span className='underline'>David Besh</span></Link>
                </div>
            </div>
            <div className='w-full lg:w-1/2 px-10 py-2'>
                <div className='mt-10'>
                    <p className='text-5xl font-bold text-slate-600'>
                        RATE<span className='font-light'>WAVE</span>
                    </p>
                    <p className=' font-medium italic text-base text-slate-600 my-2 opacity-65'>Welcome to RATEWAVE. Are you ready?</p>
                </div>
                <div>
                    <form className='py-6' onSubmit={handleRegister}>
                        <div className='grid grid-cols-2 gap-x-4'>
                            <div className='flex flex-col mb-6'>
                                <label className='font-light text-sm mb-1' htmlFor='name'>Name</label>
                                <input type='text' name='name' id='name' placeholder='Name' onChange={(e) => setName(e.target.value)} className='px-4 py-2 font-light border border-slate-600 border-opacity-15 outline-none rounded bg-[#8080801b] text-black placeholder:text-black placeholder:opacity-20' />
                            </div>
                            <div className=' flex flex-col mb-6'>
                                <label className='font-light text-sm mb-1' htmlFor='surname'>Surname</label>
                                <input type='text' name='surname' id='surname' placeholder='Surname' onChange={(e) => setSurname(e.target.value)} className='px-4 py-2 font-light border border-slate-600 border-opacity-15 outline-none rounded bg-[#8080801b] text-black placeholder:text-black placeholder:opacity-20' />
                            </div>
                        </div>

                        <div className='grid grid-cols-2 gap-x-4'>
                            <div className='flex flex-col mb-6'>
                                <label className='font-light text-sm mb-1' htmlFor='email'>E-Mail</label>
                                <input type='email' name='email' id='email' placeholder='E-Mail' onChange={(e) => setEmail(e.target.value)} className='px-4 py-2 font-light border border-slate-600 border-opacity-15 outline-none rounded bg-[#8080801b] text-black placeholder:text-black placeholder:opacity-20' />
                            </div>
                            <div className=' flex flex-col mb-6'>
                                <label className='font-light text-sm mb-1' htmlFor='surname'>Username</label>
                                <input type='text' name='username' id='username' placeholder='Username' onChange={(e) => setUsername(e.target.value)} className='px-4 py-2 font-light border border-slate-600 border-opacity-15 outline-none rounded bg-[#8080801b] text-black placeholder:text-black placeholder:opacity-20' />
                            </div>
                        </div>

                        <div className='grid grid-cols-2 gap-x-4'>
                            <div className='w-full flex flex-col mb-6 relative'>
                                <label className='font-light text-sm mb-1' htmlFor='password'>Password</label>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name='password'
                                    id='password'
                                    placeholder='Password'
                                    onChange={(e) => setPassword(e.target.value)}
                                    className='px-4 py-2 font-light border border-slate-600 border-opacity-15 outline-none rounded bg-[#8080801b] text-black placeholder:text-black placeholder:opacity-20'
                                />
                                <div className='absolute cursor-pointer top-9 right-3' onClick={togglePasswordVisibility}>
                                    {showPassword ? <FaRegEyeSlash className='text-xl' /> : <FaRegEye className='text-xl' />}
                                </div>
                            </div>
                            <div className=' flex flex-col mb-6'>
                                <label className='font-light text-sm mb-1' htmlFor='profession'>Profession</label>
                                <input type='text' name='profession' id='profession' placeholder='Profession' onChange={(e) => setProfession(e.target.value)} className='px-4 py-2 font-light border border-slate-600 border-opacity-15 outline-none rounded bg-[#8080801b] text-black placeholder:text-black placeholder:opacity-20' />
                            </div>
                        </div>



                        <div className='grid grid-cols-2 gap-x-4'>
                            <div className='flex flex-col mb-6'>
                                <label className='font-light text-sm mb-1' htmlFor='experience'>Experience</label>
                                <input type='number' name='experience' id='experience' placeholder='3'
                                    onChange={(e) => setExperience(e.target.value)}
                                    className='px-4 py-2 font-light border border-slate-600 border-opacity-15 outline-none rounded bg-[#8080801b] text-black placeholder:text-black placeholder:opacity-20' />
                            </div>
                            {/* <div className=' flex flex-col mb-6'>
                                <label className='font-light text-sm mb-1' htmlFor='video-url'>Video Url</label>
                                <input type='text' name='video-url' id='video-url' placeholder='Video Url' className='px-4 py-2 font-light border border-slate-600 border-opacity-15 outline-none rounded bg-[#8080801b] text-black placeholder:text-black placeholder:opacity-20' />
                            </div> */}
                        </div>

                        <div className='grid grid-cols-1 gap-x-4'>
                            <div className='flex flex-col mb-6'>
                                <label className='font-light text-sm mb-1' htmlFor='profile-photo'>Profile Photo</label>
                                <input type='file' name='profile-photo' id='profile-photo'
                                    onChange={(e) => setProfilePhoto(e.target.value)}
                                    className='px-4 py-2 font-light border border-slate-600 border-opacity-15 outline-none rounded bg-[#8080801b] text-black placeholder:text-black placeholder:opacity-20' />
                            </div>
                        </div>

                        <div className='grid grid-cols-1 gap-x-4'>
                            <div className='flex flex-col mb-6'>
                                <label className='font-light text-sm mb-1' htmlFor='biography'>Biography</label>
                                <textarea placeholder='Biography'
                                    onChange={(e) => setBiography(e.target.value)}
                                    className="min-h-16 max-h-40 resize-y px-3 py-2 font-light border border-slate-600 border-opacity-15 outline-none rounded bg-[#8080801b] text-black placeholder:text-black placeholder:opacity-20"></textarea>

                            </div>
                        </div>


                        <div className='flex flex-col items-center  mb-10'>
                            <button className='bg-blue-600 hover:bg-blue-800 text-white w-2/3 font-semibold py-2 mt-8 mb-1 rounded'>Register</button>
                            <div className='h-px w-40 my-4 bg-slate-600 opacity-15'></div>
                            <Link href='/login' className='text-xs font-light text-center'>
                                Do you have an account? <span className='text-blue-400 ml-1'>Log In now!</span>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default Page