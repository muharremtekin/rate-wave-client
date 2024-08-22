"use client";

import React from 'react';
import useFetchUserData from '../../hooks/useFetchUserData';
import ProfileCard from '../../components/ProfileCard';

interface ProfilePageProps {
  params: {
    userName: string;
  };
}

const ProfilePage: React.FC<ProfilePageProps> = ({ params }) => {
  const { userName } = params;
  const { user, error, loading } = useFetchUserData(userName);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!user) return <div>User not found</div>;

  return <ProfileCard user={user} />;
};

export default ProfilePage;
