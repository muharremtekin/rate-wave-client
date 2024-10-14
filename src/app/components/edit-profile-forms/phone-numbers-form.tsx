import React, { useState, useEffect } from 'react';
import { PhoneType, phoneTypeToString, PhoneNumber } from '@/types/user';

import api from '@/services/api';
import InputField from '../common/input-field';
import ErrorPopup from '../common/error-popup';

interface PhoneNumbersFormProps {
    initialPhoneNumbers?: PhoneNumber[];
}

const PhoneNumbersForm: React.FC<PhoneNumbersFormProps> = ({ initialPhoneNumbers = [] }) => {
    const [errorMessage, setErrorMessage] = useState(''); // State for error message
    const [showPopup, setShowPopup] = useState(false); // State for popup visibility
    const closePopup = () => {
        setShowPopup(false);
    };

    const [phoneNumbers, setPhoneNumbers] = useState<PhoneNumber[]>([{
        id: '',
        number: '',
        type: PhoneType.Home,
    },
    {
        id: '',
        number: '',
        type: PhoneType.Work,
    },
    {
        id: '',
        number: '',
        type: PhoneType.Mobile,
    }]);

    useEffect(() => {
        if (initialPhoneNumbers.length > 0) {
            setPhoneNumbers((prev) =>
                prev.map((phone) =>
                    initialPhoneNumbers.find((p) => p.type === phone.type) || phone
                )
            );
        }
    }, [initialPhoneNumbers]);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        type: PhoneType
    ) => {
        const { value } = e.target;
        setPhoneNumbers((prev) =>
            prev.map((phone) => (phone.type === type ? { ...phone, number: value } : phone))
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await api.put('/phone-numbers', phoneNumbers);

            if (response.status === 200) {
                window.location.reload();
            }

        } catch (error: any) {
            setErrorMessage(error.response.data.Message);
            setShowPopup(true);
            console.error('Error updating phone numbers:', error);
        }
    };

    return (
        <div>
            <h2 className="mt-24 my-8 text-xl font-normal px-0 lg:px-10">Phone Numbers</h2>
            <div className="w-full h-px px-10 bg-slate-200 mb-6"></div>

            <form className="px-2 lg:px-10 mb-10" onSubmit={handleSubmit}>
                {phoneNumbers.map((phone) => (
                    <InputField
                        key={phone.id}
                        label={phoneTypeToString(phone.type)}
                        id={`phone-${phone.id}`}
                        type="text"
                        placeholder={`${phoneTypeToString(phone.type)} Number`}
                        value={phone.number}
                        onChange={(e) => handleInputChange(e, phone.type)}
                    />
                ))}

                <button
                    type="submit"
                    className="text-base rounded text-center font-normal text-white bg-blue-600 px-4 py-2"
                >
                    Update Phone Numbers
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

export default PhoneNumbersForm;