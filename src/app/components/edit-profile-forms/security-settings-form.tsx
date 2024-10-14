import React, { useState } from 'react';
import PasswordInput from '../login/password-field';
import api from '@/services/api';
import ErrorPopup from '../common/error-popup';

const SecuritySettingsForm: React.FC = () => {
    const [errorMessage, setErrorMessage] = useState(''); // State for error message
    const [showPopup, setShowPopup] = useState(false); // State for popup visibility

    const closePopup = () => {
        setShowPopup(false);
    };


    const [passwords, setPasswords] = useState({
        lastPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const [showPassword, setShowPassword] = useState({
        oldPassword: false,
        newPassword: false,
    });

    const isMatching =
        passwords.newPassword && passwords.confirmPassword
            ? passwords.newPassword === passwords.confirmPassword
            : null;

    const handlePasswordUpdate = async () => {
        // Şifre güncelleme işlemleri burada yapılabilir

        try {
            const response = await api.put('/passwords', {
                oldPassword: passwords.lastPassword,
                newPassword: passwords.newPassword,
            })
            
            setPasswords({
                lastPassword: '',
                newPassword: '',
                confirmPassword: '',
            });
        } catch (error: any) {
            setErrorMessage(error.response.data.Message);
            setShowPopup(true);
            console.error('Error changing password:', error);
        }

    };

    const toggleShowPassword = (field: keyof typeof showPassword) => {
        setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    return (
        <div>
            <h2 className="mt-24 my-8 text-xl font-normal px-10">Güvenlik Ayarları</h2>
            <div className="w-full h-px px-10 bg-slate-200 mb-6"></div>
            <form className="px-2 lg:px-10 mb-10" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-x-0 lg:gap-x-10">
                    <PasswordInput
                        label="Eski Şifre"
                        name="lastPassword"
                        value={passwords.lastPassword}
                        showPassword={showPassword.oldPassword}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPasswords({ ...passwords, lastPassword: e.target.value })}
                        toggleShowPassword={() => toggleShowPassword('oldPassword')}
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
            {showPopup && (
                <div className="absolute inset-0 flex items-center justify-center z-20">
                    <ErrorPopup message={errorMessage} onClose={closePopup} />
                </div>
            )}
        </div>
    );
};

export default SecuritySettingsForm;