import React from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

interface PasswordInputProps {
    label?: string;
    name?: string;
    value: string;
    showPassword: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    toggleShowPassword: () => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
    label = 'Password',
    name = 'password',
    value,
    showPassword,
    onChange,
    toggleShowPassword,
}) => {
    return (
        <div className='w-full flex flex-col mb-2 relative'>
            <label className='font-light text-sm mb-1' htmlFor={name}>
                {label}
            </label>
            <input
                type={showPassword ? 'text' : 'password'}
                name={name}
                id={name}
                placeholder={label}
                value={value}
                onChange={onChange}
                className='px-4 py-2 font-light border border-slate-600 outline-none rounded bg-[#8080801b] text-black placeholder-opacity-20'
            />
            <div className='absolute cursor-pointer top-9 right-3' onClick={toggleShowPassword}>
                {showPassword ? <FaRegEyeSlash className='text-xl' /> : <FaRegEye className='text-xl' />}
            </div>
        </div>
    );
};

export default PasswordInput;