import React from 'react';

const SignInButton: React.FC = () => (
    <div className='flex flex-col items-center'>
        <button type="submit" className='bg-blue-600 hover:bg-blue-800 text-white w-full font-semibold py-2 mt-8 mb-1 rounded'>
            Sign In
        </button>
        <div className='h-px w-40 my-4 bg-slate-600 opacity-15'></div>
    </div>
);

export default SignInButton;
