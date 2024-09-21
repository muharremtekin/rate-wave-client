import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { IoSearch } from 'react-icons/io5';
import { useAuth } from '@/context/AuthContext';

interface HeaderProps {
    handleSearchClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ handleSearchClick }) => {
    const { isAuthenticated, logout } = useAuth();

    return (
        <header className="w-full bg-white shadow sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo and Search Bar */}
                    <div className="flex items-center">
                        {/* Logo */}
                        <Link href="/" className="flex-shrink-0 text-2xl font-bold text-slate-600">
                            RATE<span className="font-light">WAVE</span>
                        </Link>

                        {/* Divider (visible on tablet and larger screens) */}
                        <div className="hidden md:block w-px h-8 bg-slate-600 mx-4"></div>

                        {/* Search Bar */}
                        <div
                            className="hidden md:flex items-center gap-2 border px-4 py-2 rounded-lg cursor-pointer"
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
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center"
                                >
                                    Sign Up
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
        </header>
    );
};

export default Header;
