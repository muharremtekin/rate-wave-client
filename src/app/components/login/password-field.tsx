import React from 'react';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

interface PasswordFieldProps {
    showPassword: boolean;
    togglePasswordVisibility: () => void;
    password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
}

const PasswordField: React.FC<PasswordFieldProps> = ({ showPassword, togglePasswordVisibility, password, setPassword }) => (
    <div className='w-full flex flex-col mb-2 relative'>
        <label className='font-light text-sm mb-1' htmlFor='password'>Password</label>
        <input
            type={showPassword ? 'text' : 'password'}
            id='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='px-4 py-2 font-light border border-slate-600 outline-none rounded bg-[#8080801b] text-black placeholder-opacity-20'
        />
        <div className='absolute cursor-pointer top-9 right-3' onClick={togglePasswordVisibility}>
            {showPassword ? <FaRegEyeSlash className='text-xl' /> : <FaRegEye className='text-xl' />}
        </div>
    </div>
);

export default PasswordField;
