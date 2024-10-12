import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import PasswordInput from '../login/password-field';

const SecuritySettingsForm: React.FC = () => {
    const [passwords, setPasswords] = useState({
        lastPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const [showPassword, setShowPassword] = useState({
        lastPassword: false,
        newPassword: false,
    });

    const isMatching =
        passwords.newPassword && passwords.confirmPassword
            ? passwords.newPassword === passwords.confirmPassword
            : null;

    const handlePasswordUpdate = () => {
        // Şifre güncelleme işlemleri burada yapılabilir
        console.log('Şifreler güncellendi:', passwords);
    };

    const toggleShowPassword = (field: keyof typeof showPassword) => {
        setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    return (
        <div>
            <h2 className="mt-24 my-8 text-xl font-normal px-10">Güvenlik Ayarları</h2>
            <div className="w-full h-px px-10 bg-slate-200 mb-6"></div>
            <form className="px-2 lg:px-10 mb-10" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 gap-x-0 lg:gap-x-10">
                    <PasswordInput
                        label="Eski Şifre"
                        name="lastPassword"
                        value={passwords.lastPassword}
                        showPassword={showPassword.lastPassword}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPasswords({ ...passwords, lastPassword: e.target.value })}
                        toggleShowPassword={() => toggleShowPassword('lastPassword')}
                    />
                    <PasswordInput
                        label="Yeni Şifre"
                        name="newPassword"
                        value={passwords.newPassword}
                        showPassword={showPassword.newPassword}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPasswords({ ...passwords, newPassword: e.target.value })}
                        toggleShowPassword={() => toggleShowPassword('newPassword')}
                    />
                    <PasswordInput
                        label="Yeni Şifre Tekrar"
                        name="confirmPassword"
                        value={passwords.confirmPassword}
                        showPassword={showPassword.newPassword}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                        toggleShowPassword={() => toggleShowPassword('newPassword')}
                    />

                    {/* Şifre Eşleşme Mesajı */}
                    <p
                        className={`${isMatching === null
                            ? 'text-gray-500'
                            : isMatching
                                ? 'text-green-500'
                                : 'text-red-500'
                            } text-sm mb-4 transition-all delay-100 ease-in-out`}
                    >
                        {isMatching === null
                            ? ''
                            : isMatching
                                ? 'Şifreler Eşleşiyor!'
                                : 'Şifreler Eşleşmiyor!'}
                    </p>
                </div>

                {/* Şifre Güncelleme Butonu */}
                <button
                    type="button"
                    onClick={handlePasswordUpdate}
                    disabled={!isMatching}
                    className={`text-base rounded text-center font-normal text-white w-1/2 lg:w-1/4 py-2 transition-all delay-100 ease-in-out ${!isMatching ? 'bg-blue-200 cursor-not-allowed' : 'bg-blue-600'
                        }`}
                >
                    Şifreyi Güncelle
                </button>
            </form>
        </div>
    );
};

export default SecuritySettingsForm;