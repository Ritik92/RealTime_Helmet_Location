import axios from 'axios';
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on page load
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    
    // Only parse user data if it exists
    if (token && userStr) {
      try {
        const userData = JSON.parse(userStr);
        setUser(userData);
      } catch (error) {
        console.error('Error parsing user data:', error);
        // Clear invalid data
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:4000/api/v1/auth/login',{
        email,
        password
      })

     
      const data = await response.data;
      // Only store if we have valid data
      if (data.token && data.user) {
        console.log("set")
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
      }
      return { success: true };
    } catch (error) {
      console.log(error)
      return { success: false, error: error.message };
    }
  };

  const register = async (email, 
    password,
    firstName,
    lastName,
    otp,
    confirmPassword) => {
    try {
      const response = await axios.post(
        'http://localhost:4000/api/v1/auth/signup',
        {
            email, 
            password,
            firstName,
            lastName,
            otp,
            confirmPassword
        }
    );

    console.log(response)
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    register,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
