import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { IoSearch } from 'react-icons/io5';
import { useAuth } from '@/context/AuthContext';
import SearchModal from '../search-modal';
import api from '@/services/api';



const Header: React.FC = () => {
    const { isAuthenticated, logout } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

    const handleSearchClick = () => {
        setIsModalOpen(true);
        document.body.style.overflow = 'hidden';
    };

    
    const closeModal = () => {
        setIsModalOpen(false);
        document.body.style.overflow = 'auto';
    };

    useEffect(() => {
        const fetchSearchResults = async () => {
            if (searchTerm.length > 0) {
                await api.get(`/users?PageNumber=1&PageSize=10&SearchTerm=${searchTerm}`).then((response) => {
                    console.log(response.data);
                    setSearchResults(response.data);
                });

            } else {
                setSearchResults([]);
            }
        };

        fetchSearchResults();
    }, [searchTerm]);

    interface SearchResult {
        userName: number;
        fullName: string;
        profilePicture: string;
        profession: string;
    }

    return (
        <header className="w-full bg-white shadow sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo and Search Bar */}
                    <div className="flex w-full items-center">
                        {/* Logo */}
                        <Link href="/" className="flex-shrink-0 text-2xl font-bold text-slate-600">
                            RATE<span className="font-light">WAVE</span>
                        </Link>

                        {/* Divider (visible on tablet and larger screens) */}
                        <div className="hidden md:block w-px h-8 bg-slate-600 mx-4"></div>

                        {/* Search Bar */}
                        <div
                            className="hidden w-3/4 md:flex items-center gap-2 border px-4 py-2 rounded-lg cursor-pointer"
                            onClick={handleSearchClick}
                        >
                            <IoSearch className="text-2xl opacity-50" />
                            <p className="opacity-50">Search</p>
                        </div>
                    </div>

                    {/* Mobile Search Icon */}
                    <div className="md:hidden flex items-center">
                        <button onClick={handleSearchClick} className="text-2xl text-slate-600">
                            <IoSearch />
                        </button>
                    </div>

                    {/* User Info and Buttons */}
                    <div className="flex items-center space-x-4">
                        {isAuthenticated ? (
                            <>
                                {/* Profile Image */}
                                <Link href="/profile/mtkn">
                                    <Image
                                        className="h-10 w-10 object-cover rounded-lg"
                                        src="/mtkn.jpeg"
                                        width={40}
                                        height={40}
                                        quality={100}
                                        alt="Profile Photo"
                                    />
                                </Link>
                                {/* Logout Button */}
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                                    onClick={logout}
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                {/* Login Link Styled as Button */}
                                <Link
                                    href="/login"
                                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center"
                                >
                                    Login
                                </Link>
                                {/* Sign Up Link Styled as Button */}
                                <Link
                                    href="/register"
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center text-center"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Search Bar (Optional) */}
            <div className="md:hidden px-4 py-2">
                <div
                    className="flex items-center gap-2 border px-4 py-2 rounded-lg cursor-pointer"
                    onClick={handleSearchClick}
                >
                    <IoSearch className="text-2xl opacity-50" />
                    <p className="opacity-50">Search</p>
                </div>
            </div>

            <SearchModal
                isModalOpen={isModalOpen}
                closeModal={closeModal}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                searchResults={searchResults}
            />
        </header>
    );
};

export default Header;
