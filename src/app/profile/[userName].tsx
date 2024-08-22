import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

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

const ProfilePage: React.FC = () => {
  const router = useRouter();
  const { userName } = router.query;
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (userName) {
      const fetchUserData = async () => {
        try {
          const response = await fetch(`http://localhost:7037/api/users/Barlibay88`);
          console.log('Response object:', response);
          const data: User = await response.json();
          setUser(data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      fetchUserData();
    }
  }, [userName]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img
            className="h-48 w-full object-cover md:w-48"
            src={user.profilePicture || 'https://via.placeholder.com/150'}
            alt="Profile"
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
};

export default ProfilePage;
