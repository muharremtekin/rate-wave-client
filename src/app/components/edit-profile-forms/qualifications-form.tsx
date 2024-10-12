import React, { useState, useEffect } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { LuPlusCircle } from 'react-icons/lu';
import { Qualification, QualificationType } from '@/types/user';



interface QualificationsFormProps {
    qualifications: Qualification[] | null;
}

const QualificationsForm: React.FC<QualificationsFormProps> = ({ qualifications }) => {
    const [formQualifications, setFormQualifications] = useState<Qualification[]>(qualifications || []);

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
        const updatedQualifications = [...formQualifications];
        if (field === 'type') {
            updatedQualifications[index][field] = e.target.value as QualificationType;
        } else {
            updatedQualifications[index][field] = e.target.value;
        }
        setFormQualifications(updatedQualifications);
    };

    const removeQualification = (id: string) => {
        setFormQualifications(formQualifications.filter(qualification => qualification.id !== id));
    };

    const addQualification = () => {
        const newQualification: Qualification = {
            id: Math.random().toString(36).substr(2, 9),
            type: QualificationType.Certificate,
            name: '',
            institution: '',
            verificationLink: '',
            startDate: '',
            endDate: '',
        };
        setFormQualifications([...formQualifications, newQualification]);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Form gönderimi ile ilgili işlemler burada yapılabilir
        console.log('Qualifications Data:', formQualifications);
    };

    const formatDate = (dateString: string) => {
        const [month, year] = dateString.split('-');
        return `${year}-${month}`;
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
                                type="month"
                                name={`startDate-${qualification.id}`}
                                id={`startDate-${qualification.id}`}
                                value={qualification.startDate ? formatDate(qualification.startDate) : ''}
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
                                type="month"
                                name={`endDate-${qualification.id}`}
                                id={`endDate-${qualification.id}`}
                                value={qualification.endDate ? formatDate(qualification.endDate) : ''}
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
                                {Object.values(QualificationType).map((type) => (
                                    <option key={type} value={type}>
                                        {type}
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
        </div>
    );
};

export default QualificationsForm;