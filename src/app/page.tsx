"use client"; 
import Image from 'next/image';
import Link from 'next/link';
import Header from './components/common/header';


const HomePage: React.FC = () => {

  return (
    <div>
      <Header />
      <div className='w-full min-h-screen bg-gray-100 flex flex-col items-center py-8'>

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
      </div>
    </div>
  );
}

export default HomePage;
