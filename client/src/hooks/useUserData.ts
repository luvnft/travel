import { useCallback } from 'react';

interface UserData {
  _id: string;
  username: string;
  password: string;
  email: string;
  role: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface LoginResponse {
  message: string;
  user: UserData;
  token: string;
}

export const useAuth = () => {
  const setUserData = useCallback((loginResponse: LoginResponse) => {
    localStorage.setItem('userData', JSON.stringify(loginResponse.user));
    localStorage.setItem('token', loginResponse.token);
  }, []);

  const getUserData = useCallback(() => {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) as UserData : null;
  }, []);

  const getToken = useCallback(() => {
    return localStorage.getItem('token');
  }, []);

  const clearUserData = useCallback(() => {
    localStorage.removeItem('userData');
    localStorage.removeItem('token');
  }, []);

  return {
    setUserData,
    getUserData,
    getToken,
    clearUserData,
  };
};
