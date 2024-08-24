import React from 'react';

interface User {
  firstName: string;
  lastName: string;
  profilePicture: string;
  profession: string;
  yearsOfExperience: number;
  bio: string;
  videoUrl: string;
  emailAddress: string;
}

const ProfileCard: React.FC<{ user: User }> = ({ user }) => (
  <div className="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
    <div className="md:flex">
      <div className="md:flex-shrink-0">
        <img
          className="h-48 w-full object-cover md:w-48"
          src={user.profilePicture || 'https://via.placeholder.com/150'}
          alt={`${user.firstName} ${user.lastName} Profile`}
        />
      </div>
      <div className="p-8">
        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
          {user.firstName} {user.lastName}
        </div>
        <p className="block mt-1 text-lg leading-tight font-medium text-black">
          {user.profession}
        </p>
        <p className="mt-1 text-sm text-gray-600">
          {user.yearsOfExperience} years of experience
        </p>
        <p className="mt-2 text-gray-500">{user.bio}</p>
        <a
          href={`mailto:${user.emailAddress}`}
          className="mt-4 text-indigo-600 hover:text-indigo-900 block"
        >
          {user.emailAddress}
        </a>
        {user.videoUrl && (
          <a
            href={user.videoUrl}
            className="mt-4 text-indigo-600 hover:text-indigo-900 block"
            target="_blank"
            rel="noopener noreferrer"
          >
            Watch Video
          </a>
        )}
      </div>
    </div>
  </div>
);

export default ProfileCard;
