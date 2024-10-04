import React, { useState, useRef } from 'react';

interface ProfilePictureSelectorProps {
  initialImageUrl?: string;
  onImageChange: (file: File | null) => void;
}

const ProfilePictureSelector: React.FC<ProfilePictureSelectorProps> = ({
  initialImageUrl,
  onImageChange,
}) => {
  const [imageUrl, setImageUrl] = useState<string | undefined>(initialImageUrl);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageUrl(URL.createObjectURL(file));
      onImageChange(file);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div
        className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden bg-gray-100 cursor-pointer"
        onClick={handleImageClick}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500 text-sm">
            Fotoğraf Yükle
          </div>
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />
      <button
        type="button"
        className="mt-2 px-3 py-1 bg-blue-600 text-white rounded text-sm"
        onClick={handleImageClick}
      >
        Fotoğraf Seç
      </button>
    </div>
  );
};

export default ProfilePictureSelector;
