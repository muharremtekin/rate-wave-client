import React from 'react';
import Link from 'next/link';

const SignUpLink: React.FC = () => (
    <Link href='/register' className='text-xs font-light text-center'>
        Don&apos;t have an account? <span className='text-blue-400 ml-1'>Sign Up now!</span>
    </Link>
);

export default SignUpLink;
