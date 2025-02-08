import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const UserContext = createContext();

const AuthContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const verifiedUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const res = await axios.get(
            "https://employee-management-system-y3lq.vercel.app/api/v1/auth/verify",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (res?.data?.success) {
            setUser(res?.data?.user);
            toast.success(res?.data?.message);
          }
        } else {
          setUser(null);
          setLoading(false);
        }
      } catch (error) {
        if (
          error?.response &&
          error?.response?.data &&
          !error?.response?.data?.success
        ) {
          setUser(null);
          toast.error(`Error: ${error.response.data.message}`);
        } else {
          setUser(null);
          toast.error("Something went wrong. Please try again later");
        }
      } finally {
        setLoading(false);
      }
    };
    verifiedUser();
  }, []);
  const login = (user) => {
    setUser(user);
  };
  const logout = () => {
    toast.success(`We are happy to have you again in our site. Please visit again ${user.name}`)
    setUser(null);
    localStorage.removeItem("token");
  };
  return (
    <UserContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => useContext(UserContext);

export default AuthContext;
