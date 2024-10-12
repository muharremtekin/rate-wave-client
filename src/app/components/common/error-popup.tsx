import React from 'react';

interface ErrorPopupProps {
    message: string;
    onClose: () => void;
}

const ErrorPopup: React.FC<ErrorPopupProps> = ({ message, onClose }) => {
    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
            <div className='bg-white p-6 rounded shadow-lg max-w-md w-full'>
                <p>{message}</p>
                <button
                    onClick={onClose}
                    className='mt-4 px-4 py-2 bg-blue-600 text-white rounded'
                >
                    Kapat
                </button>
            </div>
        </div>
    );
};

export default ErrorPopup;
