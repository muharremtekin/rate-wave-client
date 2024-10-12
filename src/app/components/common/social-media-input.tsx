import React from 'react';
import { IconType } from 'react-icons';

interface SocialMediaInputProps {
    label: string;
    name: string;
    placeholder: string;
    icon: IconType;
    iconColor: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SocialMediaInput: React.FC<SocialMediaInputProps> = ({
    label,
    name,
    placeholder,
    icon: Icon,
    iconColor,
    value,
    onChange,
}) => (
    <div className="flex flex-col mb-6">
        <label htmlFor={name} className="font-light text-sm mb-1">
            {label}
        </label>
        <div className="relative w-full">
            <input
                type="text"
                name={name}
                id={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="w-full pl-12 pr-4 py-2 font-light border border-slate-600 border-opacity-15 outline-none rounded bg-[#8080801b] text-black placeholder-opacity-20"
            />
            <Icon
                className={`absolute top-1/2 transform -translate-y-1/2 left-3 text-2xl ${iconColor}`}
            />
        </div>
    </div>
);

export default SocialMediaInput;
