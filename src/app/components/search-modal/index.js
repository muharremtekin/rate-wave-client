import { AiOutlineClose } from "react-icons/ai";
import Link from 'next/link';
import Image from "next/image";

const SearchModal = ({ isModalOpen, closeModal, searchTerm, setSearchTerm, searchResults }) => {
    if (!isModalOpen) return null;

    return (
        <div className='fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70 backdrop-blur-xl'>
            <div className='bg-white p-6 rounded-lg w-2/3 max-w-2xl'>
                <button className='mb-4 text-2xl text-gray-500 w-full flex justify-end' onClick={closeModal}>
                    <AiOutlineClose />
                </button>
                <input
                    type="text"
                    placeholder="Search..."
                    className="border-b outline-none w-full p-2 mb-4 font-semibold text-xl"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                {/* Arama Sonuçları */}
                <div className="max-h-60 overflow-y-auto transition-all delay-300 ease-in-out">
                    {searchResults.length > 0 ? (
                        searchResults.map((result, index) => (
                            <div key={result.id} className="flex items-center border-b py-2">
                                <Image width={40} height={30} quality={100} src={result.profilePic} alt={result.name} className="h-10 w-10 rounded-full object-cover mr-4" />
                                <div>
                                    <Link href={result.url} target='_blank'>
                                        <p className="font-bold">{result.name} {result.surname}</p>
                                    </Link>
                                    <Link href={result.url}>
                                        <p className="text-xs text-gray-500">{result.title}</p>
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p></p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchModal;
