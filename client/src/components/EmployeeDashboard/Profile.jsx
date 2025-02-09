import React from 'react';
import ViewEmployee from '../Employee/ViewEmployee';
import { useAuth } from '../../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="p-6 sm:p-8 md:p-12 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold text-center mb-6 sm:mb-8">Profile</h2>
      <ViewEmployee id={user?._id} />
    </div>
  );
}

export default Profile;
