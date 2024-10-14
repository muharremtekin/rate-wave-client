import React from 'react';

const Header: React.FC = () => (
    <a href='/'>
        <div className='mt-20'>
            <p className='text-5xl font-bold text-slate-600'>
                RATE<span className='font-light'>WAVE</span>
            </p>
            <p className='font-medium italic text-base text-slate-600 my-2 opacity-65'>
                Nice to see you again.
            </p>
        </div>
    </a>
);

export default Header;
