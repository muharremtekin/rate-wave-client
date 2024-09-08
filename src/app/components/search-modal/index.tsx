import { AiOutlineClose } from 'react-icons/ai';
import Link from 'next/link';
import Image from 'next/image';

type SearchModalProps = {
    isModalOpen: boolean;
    closeModal: () => void;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    searchResults: {
        id: number;
        profilePic: string;
        name: string;
        surname: string;
        title: string;
        url: string;
    }[];
};

const SearchModal = ({
    isModalOpen,
    closeModal,
    searchTerm,
    setSearchTerm,
    searchResults,
}: SearchModalProps) => {
    if (!isModalOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70 backdrop-blur-xl">
            <div className="bg-white p-6 rounded-lg w-2/3 max-w-2xl">
                <button
                    className="mb-4 text-2xl text-gray-500 w-full flex justify-end"
                    onClick={closeModal}
                    aria-label="Close"
                >
                    <AiOutlineClose />
                </button>
                <input
                    type="text"
                    placeholder="Search..."
                    className="border-b outline-none w-full p-2 mb-4 font-semibold text-xl"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                {/* Search Results */}
                <div className="max-h-60 overflow-y-auto transition-all ease-in-out">
                    {searchResults.length > 0 ? (
                        searchResults.map((result) => (
                            <div key={result.id} className="flex items-center border-b py-2">
                                <Image
                                    width={40}
                                    height={40}
                                    quality={100}
                                    src={result.profilePic}
                                    alt={`${result.name} ${result.surname}`}
                                    className="h-10 w-10 rounded-full object-cover mr-4"
                                />
                                <div>
                                    <Link href={result.url} rel="noopener noreferrer">
                                        <p className="font-bold">
                                            {result.name} {result.surname}
                                        </p>
                                    </Link>
                                    <Link href={result.url} rel="noopener noreferrer">
                                        <p className="text-xs text-gray-500">{result.title}</p>
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 text-center">No results found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchModal;
