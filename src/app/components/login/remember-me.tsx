import React from 'react';
import Link from 'next/link';

const RememberMe: React.FC = () => (
    <div className='flex flex-row justify-between'>
        <div className='flex items-center'>
            <input type='checkbox' id='remember' className='mr-1' />
            <label htmlFor='remember' className='text-xs'>Remember Me</label>
        </div>
        <Link href='#' className='text-blue-400 text-xs'>Forgot Password?</Link>
    </div>
);

export default RememberMe;
