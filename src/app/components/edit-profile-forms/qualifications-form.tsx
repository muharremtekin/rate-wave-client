import React, { useState, useEffect } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { LuPlusCircle } from 'react-icons/lu';
import { Qualification, QualificationType, qualificationTypeToString } from '@/types/user';
import api from '@/services/api';
import ErrorPopup from '../common/error-popup';

interface QualificationsFormProps {
    qualifications: Qualification[] | null;
}

const QualificationsForm: React.FC<QualificationsFormProps> = ({ qualifications }) => {
    const [formQualifications, setFormQualifications] = useState<Qualification[]>(qualifications || []);

    const [errorMessage, setErrorMessage] = useState(''); // State for error message
    const [showPopup, setShowPopup] = useState(false); // State for popup visibility

    const closePopup = () => {
        setShowPopup(false);
    };

    useEffect(() => {
        if (qualifications) {
            setFormQualifications(qualifications);
        }
    }, [qualifications]);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
        index: number,
        field: keyof Qualification
    ) => {
        setFormQualifications((prevQualifications) => {
            return prevQualifications.map((qualification, idx) => {
                if (idx !== index) return qualification;

                let updatedValue: any = e.target.value;
                if (field === 'type') {
                    updatedValue = parseInt(e.target.value, 10) as QualificationType;
                }

                return { ...qualification, [field]: updatedValue };
            });
        });
    };



    const removeQualification = (id: string) => {
        setFormQualifications(formQualifications.filter(qualification => qualification.id !== id));
    };

    const addQualification = () => {
        const newQualification: Qualification = {
            id: '00000000-0000-0000-0000-000000000000',
            type: QualificationType.Certificate,
            name: '',
            institution: '',
            verificationLink: '',
            startDate: null,
            endDate: null,
        };
        setFormQualifications([...formQualifications, newQualification]);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Form gönderimi ile ilgili işlemler burada yapılabilir
        try {
            const data = { qualifications: formQualifications }
            console.log(data);
            const response = await api.put('/qualifications', data);
            if (response.status === 200) {
                console.log('Qualifications updated successfully');
                window.location.reload();
            }
        } catch (error: any) {
            setErrorMessage(error.response.data.Message);
            setShowPopup(true);
        }
    };


    return (
        <div>
            <h2 className="mt-24 my-8 text-xl font-normal px-0 lg:px-10">Sertifika Ayarları</h2>
            <div className="w-full h-px px-10 bg-slate-200 mb-6"></div>
            <form className="px-2 lg:px-10 mb-10" onSubmit={handleSubmit}>
                {formQualifications.map((qualification, index) => (
                    <div
                        key={qualification.id}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 bg-[#808080] bg-opacity-10 p-4 rounded pt-10 relative mb-10"
                    >
                        <button
                            type="button"
                            onClick={() => removeQualification(qualification.id)}
                            className="absolute top-4 right-4 text-xl text-red-400"
                        >
                            <RiDeleteBin6Line />
                        </button>
                        {/* Sertifika Adı */}
                        <div className="flex flex-col mb-6">
                            <label className="font-light text-sm mb-1" htmlFor={`name-${qualification.id}`}>
                                Sertifika Adı
                            </label>
                            <input
                                type="text"
                                name={`name-${qualification.id}`}
                                id={`name-${qualification.id}`}
                                placeholder="Sertifika Adı"
                                value={qualification.name}
                                onChange={(e) => handleInputChange(e, index, 'name')}
                                className="px-4 py-2 font-light border outline-none rounded bg-[#8080801b]"
                            />
                        </div>
                        {/* Kurum */}
                        <div className="flex flex-col mb-6">
                            <label className="font-light text-sm mb-1" htmlFor={`institution-${qualification.id}`}>
                                Kurum
                            </label>
                            <input
                                type="text"
                                name={`institution-${qualification.id}`}
                                id={`institution-${qualification.id}`}
                                placeholder="Kurum"
                                value={qualification.institution}
                                onChange={(e) => handleInputChange(e, index, 'institution')}
                                className="px-4 py-2 font-light border outline-none rounded bg-[#8080801b]"
                            />
                        </div>
                        {/* Başlangıç Tarihi */}
                        <div className="flex flex-col mb-6">
                            <label className="font-light text-sm mb-1" htmlFor={`startDate-${qualification.id}`}>
                                Başlangıç Tarihi
                            </label>
                            <input
                                type="date"
                                name={`startDate-${qualification.id}`}
                                id={`startDate-${qualification.id}`}
                                value={qualification.startDate ? new Date(qualification.startDate).toISOString().split('T')[0] : ''}

                                onChange={(e) => handleInputChange(e, index, 'startDate')}
                                className="px-4 py-2 font-light border outline-none rounded bg-[#8080801b]"
                            />
                        </div>
                        {/* Bitiş Tarihi */}
                        <div className="flex flex-col mb-6">
                            <label className="font-light text-sm mb-1" htmlFor={`endDate-${qualification.id}`}>
                                Bitiş Tarihi
                            </label>
                            <input
                                type="date"
                                name={`endDate-${qualification.id}`}
                                id={`endDate-${qualification.id}`}
                                value={qualification.endDate ? new Date(qualification.endDate).toISOString().split('T')[0] : ''}
                                onChange={(e) => handleInputChange(e, index, 'endDate')}
                                className="px-4 py-2 font-light border outline-none rounded bg-[#8080801b]"
                            />
                        </div>
                        {/* Doğrulama Linki */}
                        <div className="flex flex-col mb-6 ">
                            <label className="font-light text-sm mb-1" htmlFor={`verificationLink-${qualification.id}`}>
                                Doğrulama Linki
                            </label>
                            <input
                                type="text"
                                name={`verificationLink-${qualification.id}`}
                                id={`verificationLink-${qualification.id}`}
                                placeholder="Doğrulama Linki"
                                value={qualification.verificationLink}
                                onChange={(e) => handleInputChange(e, index, 'verificationLink')}
                                className="px-4 py-2 font-light border outline-none rounded bg-[#8080801b]"
                            />
                        </div>
                        {/* Sertifika Türü */}
                        <div className="flex flex-col mb-6">
                            <label className="font-light text-sm mb-1" htmlFor={`type-${qualification.id}`}>
                                Sertifika Türü
                            </label>
                            <select
                                name={`type-${qualification.id}`}
                                id={`type-${qualification.id}`}
                                value={qualification.type}
                                onChange={(e) => handleInputChange(e, index, 'type')}
                                className="px-4 py-2 font-light border outline-none rounded bg-[#8080801b]"
                            >
                                {Object.values(QualificationType)
                                    .filter((type) => typeof type === 'number')
                                    .map((type) => (
                                        <option key={type} value={type}>
                                            {qualificationTypeToString(type as QualificationType)}
                                        </option>
                                    ))}
                            </select>
                        </div>
                    </div>
                ))}

                {/* Sertifika Ekleme ve Güncelleme */}
                <div className="flex flex-row items-center justify-between">
                    <button
                        type="submit"
                        className="text-base rounded text-center font-normal text-white bg-blue-600 w-1/2 lg:w-1/4 py-2"
                    >
                        Güncelle
                    </button>
                    <LuPlusCircle
                        onClick={addQualification}
                        className="text-5xl bg-[#808080] bg-opacity-10 text-black p-2 rounded-full cursor-pointer"
                    />
                </div>
            </form>
            {showPopup && (
                <div className="absolute inset-0 flex items-center justify-center z-20">
                    <ErrorPopup message={errorMessage} onClose={closePopup} />
                </div>
            )}
        </div>
    );
};

export default QualificationsForm;