import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { IoSearch } from 'react-icons/io5';
import { useAuth } from '@/context/AuthContext';
import SearchModal from '../search-modal';
import api from '@/services/api';

interface SearchResult {
    userName: string;
    fullName: string;
    profilePicture: string;
    profession: string;
}

const Header: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isAuthenticated, logout, payloadData } = useAuth();


    const handleSearchClick = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            document.body.style.overflow = isModalOpen ? 'hidden' : 'auto';
        }
    }, [isModalOpen]);

    useEffect(() => {
        const fetchSearchResults = async () => {
            if (searchTerm.length > 0) {
                try {
                    const response = await api.get(
                        `/users?PageNumber=1&PageSize=10&SearchTerm=${searchTerm}`
                    );
                    console.log(response.data);
                    console.log(payloadData?.FirstName);
                    setSearchResults(response.data);
                } catch (error) {
                    console.error('Arama sonuçları alınırken bir hata oluştu:', error);
                }
            } else {
                setSearchResults([]);
            }
        };

        fetchSearchResults();
    }, [searchTerm]);

    return (

        <header className="w-full bg-white shadow sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo and Search Bar */}
                    <div className="flex w-full items-center">
                        {/* Logo */}
                        <Link href="/" legacyBehavior>
                            <a className="flex-shrink-0 text-2xl font-bold text-slate-600">
                                RATE<span className="font-light">WAVE</span>
                            </a>
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
                            <div className="relative inline-block text-left">
                                <div>
                                    <button
                                        type="button"
                                        className="inline-flex justify-center w-full h-10 object-cover rounded-full"
                                        id="menu-button"
                                        aria-expanded={isMenuOpen}
                                        aria-haspopup="true"
                                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    >
                                        {payloadData?.ProfilePicture ? (
                                            <Image
                                                className="h-10 w-10 object-cover rounded-full"
                                                src={payloadData.ProfilePicture}
                                                width={40}
                                                height={40}
                                                quality={100}
                                                alt="Profile Photo"
                                            />
                                        ) : (
                                            <div className="h-10 w-10 bg-gray-300 rounded-full flex items-center justify-center">
                                                <span className="text-gray-600">
                                                    {payloadData?.FirstName?.charAt(0) || 'K'}
                                                </span>
                                            </div>
                                        )}
                                    </button>
                                </div>

                                {isMenuOpen && (
                                    <div
                                        className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-20"
                                        role="menu"
                                        aria-orientation="vertical"
                                        aria-labelledby="menu-button"
                                    >
                                        <div className="py-1" role="none">
                                            <Link href={`/profile/${payloadData?.UserName}`} legacyBehavior >
                                                <a
                                                    className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
                                                    role="menuitem"
                                                    onClick={() => setIsMenuOpen(false)}
                                                >
                                                    Profilim {payloadData?.FirstName || 'Kullanıcı'}
                                                </a>
                                            </Link>
                                            <Link href="/edit-profile" legacyBehavior>
                                                <a
                                                    className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
                                                    role="menuitem"
                                                    onClick={() => setIsMenuOpen(false)}
                                                >
                                                    Profili Düzenle
                                                </a>
                                            </Link>
                                            <button
                                                className="text-gray-700 block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                                                role="menuitem"
                                                onClick={() => {
                                                    logout();
                                                    setIsMenuOpen(false);
                                                }}
                                            >
                                                Çıkış Yap
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                {/* Login Link Styled as Button */}
                                <Link href="/login" legacyBehavior>
                                    <a className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center">
                                        Login
                                    </a>
                                </Link>
                                {/* Sign Up Link Styled as Button */}
                                <Link href="/register" legacyBehavior>
                                    <a className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center text-center">
                                        Register
                                    </a>
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
