import React from "react";
import ViewEmployee from "../Employee/ViewEmployee";
import { useAuth } from "../../context/AuthContext";

const Profile = () => {
  const { user } = useAuth();
  return <ViewEmployee id={user?._id} />;
};

export default Profile;
