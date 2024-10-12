import React, { useState, FormEvent, ChangeEvent } from 'react';
import { MdClose } from 'react-icons/md';
import api from '@/services/api';
import ErrorPopup from '../common/error-popup';

interface CommentModalProps {
    isModalOpen: boolean;
    closeModal: () => void;
    revieweeUserName: string;
}

const CommentModal: React.FC<CommentModalProps> = ({
    isModalOpen,
    closeModal,
    revieweeUserName,
}) => {
    const [comment, setComment] = useState('');
    const [selectedRating, setSelectedRating] = useState(0);
    const [hoverIndex, setHoverIndex] = useState(-1);
    const [errorMessage, setErrorMessage] = useState(''); // State for error message
    const [showPopup, setShowPopup] = useState(false); // State for popup visibility

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        // Validasyon
        if (!comment.trim() || selectedRating === 0) {
            alert('Lütfen yorumunuzu ve puanınızı girin.');
            return;
        }

        const data = {
            revieweeUserName,
            content: comment,
            rating: selectedRating,
        };

        try {
            const response = await api.post('/reviews', data);
            if (response.status === 200) {
                closeModal();
                window.location.href = '/profile/' + revieweeUserName;
            } else {
                setErrorMessage('Yorum gönderilemedi. ' + response.data.Message);
                setShowPopup(true);
                console.error(response.data.Message);
            }
        } catch (error) {
            setErrorMessage((error as any).response.data.Message);
            setShowPopup(true);
            console.error('Error during sending review: ', (error as any).response.data.Message);
        }
    };


    return isModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg max-w-lg w-full">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Yorum Yap</h2>
                    <button onClick={closeModal} className="text-2xl">
                        <MdClose />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2" htmlFor="comment">
                            Yorumunuz
                        </label>
                        <textarea
                            id="comment"
                            className="w-full p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Yorumunuzu buraya yazın..."
                            value={comment}
                            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setComment(e.target.value)}
                            rows={4}
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Puanınız</label>
                        <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((index) => (
                                <button
                                    type="button"
                                    key={index}
                                    className={`text-2xl ${index <= (hoverIndex !== -1 ? hoverIndex : selectedRating)
                                        ? 'text-yellow-400'
                                        : 'text-gray-400'
                                        }`}
                                    onMouseEnter={() => setHoverIndex(index)}
                                    onMouseLeave={() => setHoverIndex(-1)}
                                    onClick={() => setSelectedRating(index)}

                                >
                                    ★
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors duration-200"
                        >
                            Yorumu Gönder
                        </button>
                    </div>
                </form>
            </div>
            {showPopup && (
                <ErrorPopup message={errorMessage} onClose={() => setShowPopup(false)} />)}
        </div>
    ) : null;
};

export default CommentModal;
