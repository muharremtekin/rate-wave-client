import { useState, useEffect } from 'react';

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

const useFetchUserData = (userName: string) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (userName) {
      const fetchUserData = async () => {
        try {
          console.log('Fetching user data for:', userName);
          
          const response = await fetch(`https://localhost:7037/api/users/${userName}`);
          console.log('Fetch response:', response);

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data: User = await response.json();
          console.log('User data received:', data);
          setUser(data);
        } catch (error) {
          console.error('Error fetching user data:', error);
          setError('Failed to load user data.');
        } finally {
          setLoading(false);
        }
      };

      fetchUserData();
    }
  }, [userName]);

  return { user, error, loading };
};

export default useFetchUserData;
