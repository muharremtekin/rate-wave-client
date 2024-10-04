import React from 'react';

interface InputFieldProps {
    label: string;
    id: string;
    type: string;
    placeholder: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({ label, id, type, placeholder, value, onChange }) => (
    <div className='flex flex-col mb-6'>
        <label className='font-light text-sm mb-1' htmlFor={id}>{label}</label>
        <input
            type={type}
            name={id}
            id={id}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className='px-4 py-2 font-light border border-slate-600 border-opacity-15 outline-none rounded bg-[#8080801b] text-black placeholder:text-black placeholder:opacity-20'
        />
    </div>
);

export default InputField;
