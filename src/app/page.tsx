"use client";
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { IoSearch } from 'react-icons/io5';
import { SearchModal } from '@/app/components';

interface SearchResult {
  id: number;
  name: string;
  surname: string;
  title: string;
  profilePic: string;
  url: string;
}

const HomePage: React.FC = () => {
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
    if (searchTerm.length > 0) {
      const results = [
        { id: 1, name: 'Muharrem', surname: 'Tekin', title: 'Backend Developer', profilePic: '/mtkn.jpeg', url: '/profile/mtkn' },
        { id: 2, name: 'Erdem', surname: 'Arslan', title: 'Front End Developer', profilePic: '/mtkn.jpeg', url: '/profile/erdemarslan' },
      ].filter(item =>
        `${item.name} ${item.surname}`.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  return (
    <div className='w-full min-h-screen bg-gray-100 flex flex-col items-center py-8'>
      <p className='text-5xl font-bold text-slate-600'>
        RATE<span className='font-light'>WAVE</span>
      </p>
      <section className='my-10 text-center px-5'>
        <h2 className='text-xl font-semibold mb-2 text-gray-700'>İstediğiniz Danışmanı Bulun ve Yorum Yapın</h2>
        <p className='text-gray-600 max-w-2xl mx-auto text-sm'>
          Kişisel ders veren, danışmanlık hizmeti sunan profesyonelleri arayın ve onların profillerine yorum yapın. Müşteri deneyimlerinizi paylaşarak diğer kullanıcılara yardımcı olun.
        </p>
      </section>
      <div className='w-1/2 lg:w-1/3 mb-10 border-b border-black flex items-center gap-x-2 px-2 lg:px-4 py-2 cursor-text' onClick={handleSearchClick}>
        <IoSearch className='opacity-70 text-2xl' />
        <p className='opacity-70 block'>Search</p>
      </div>
      <section className='w-full max-w-4xl mx-auto px-5'>
        <h3 className='text-xl font-semibold mb-4 text-gray-700'>Popüler Danışmanlar</h3>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <Link href='/profile/mtkn'>
            <div className='bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition'>
              <Image src='/mtkn.jpeg' alt='mtkn' width={300} height={300} quality={100} className='w-full h-54 object-cover object-top rounded-t-lg' />
              <div className='mt-4'>
                <h4 className='font-bold text-lg'>Muharrem Tekin</h4>
                <p className='text-gray-600'>Back End Developer</p>
              </div>
            </div>
          </Link>
          <Link href='/profile/mtkn'>
            <div className='bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition'>
              <Image src='/mtkn.jpeg' alt='mtkn' width={300} height={300} quality={100} className='w-full h-54 object-cover object-top rounded-t-lg' />
              <div className='mt-4'>
                <h4 className='font-bold text-lg'>Muharrem Tekin</h4>
                <p className='text-gray-600'>Back End Developer</p>
              </div>
            </div>
          </Link>
          <Link href='/profile/mtkn'>
            <div className='bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition'>
              <Image src='/mtkn.jpeg' alt='mtkn' width={300} height={300} quality={100} className='w-full h-54 object-cover object-top rounded-t-lg' />
              <div className='mt-4'>
                <h4 className='font-bold text-lg'>Muharrem Tekin</h4>
                <p className='text-gray-600'>Back End Developer</p>
              </div>
            </div>
          </Link>
        </div>
      </section>
      <SearchModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        searchResults={searchResults}
      />
    </div>
  );
}

export default HomePage;
