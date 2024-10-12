import React, { useState, useEffect } from 'react';

interface UserData {
    firstName: string;
    lastName: string;
    profilePicture: string;
    profession: string;
    yearsOfExperience: number;
    bio: string;
    emailAddress: string;
    userName: string;
}

interface UserProfileFormProps {
    userData: UserData | null;
}

const UserProfileForm: React.FC<UserProfileFormProps> = ({ userData }) => {
    const [formData, setFormData] = useState<UserData>({
        firstName: '',
        lastName: '',
        profilePicture: '',
        profession: '',
        yearsOfExperience: 0,
        bio: '',
        emailAddress: '',
        userName: '',
    });

    useEffect(() => {
        if (userData) {
            setFormData(userData);
        }
    }, [userData]);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Form gönderimi ile ilgili işlemler burada yapılabilir
        console.log('Form Data:', formData);
    };

    return (
        <div>
            <h2 className="my-8 text-xl font-normal px-0 lg:px-10">Genel Ayarlar</h2>
            <div className="w-full h-px px-10 bg-slate-200 mb-6"></div>

            <form className="px-2 lg:px-10 mb-10" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-0 lg:gap-x-10">
                    {/* İsim */}
                    <div className="flex flex-col mb-6">
                        <label className="font-light text-sm mb-1" htmlFor="firstName">
                            İsim
                        </label>
                        <input
                            type="text"
                            name="firstName"
                            id="firstName"
                            placeholder="İsim"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className="px-4 py-2 font-light border outline-none rounded bg-[#8080801b]"
                        />
                    </div>
                    {/* Soyisim */}
                    <div className="flex flex-col mb-6">
                        <label className="font-light text-sm mb-1" htmlFor="lastName">
                            Soyisim
                        </label>
                        <input
                            type="text"
                            name="lastName"
                            id="lastName"
                            placeholder="Soyisim"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className="px-4 py-2 font-light border outline-none rounded bg-[#8080801b]"
                        />
                    </div>
                    {/* Meslek */}
                    <div className="flex flex-col mb-6">
                        <label className="font-light text-sm mb-1" htmlFor="profession">
                            Meslek
                        </label>
                        <input
                            type="text"
                            name="profession"
                            id="profession"
                            placeholder="Meslek"
                            value={formData.profession}
                            onChange={handleInputChange}
                            className="px-4 py-2 font-light border outline-none rounded bg-[#8080801b]"
                        />
                    </div>
                    {/* Deneyim Yılı */}
                    <div className="flex flex-col mb-6">
                        <label className="font-light text-sm mb-1" htmlFor="yearsOfExperience">
                            Deneyim Yılı
                        </label>
                        <input
                            type="number"
                            name="yearsOfExperience"
                            id="yearsOfExperience"
                            placeholder="Deneyim Yılı"
                            value={formData.yearsOfExperience}
                            onChange={handleInputChange}
                            className="px-4 py-2 font-light border outline-none rounded bg-[#8080801b]"
                        />
                    </div>

                    {/* Biyografi */}
                    <div className="flex flex-col mb-6 lg:col-span-2">
                        <label className="font-light text-sm mb-1" htmlFor="bio">
                            Biyografi
                        </label>
                        <textarea
                            name="bio"
                            id="bio"
                            placeholder="Biyografi"
                            value={formData.bio}
                            onChange={handleInputChange}
                            className="px-4 py-2 font-light border outline-none rounded bg-[#8080801b] h-40"
                        ></textarea>
                    </div>
                </div>

                {/* Güncelle Butonu */}
                <button
                    type="submit"
                    className="text-base rounded text-center font-normal text-white bg-blue-600 w-1/2 lg:w-1/4 py-2"
                >
                    Güncelle
                </button>
            </form>
        </div>
    );
};

export default UserProfileForm;
