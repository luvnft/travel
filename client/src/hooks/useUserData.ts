import { useCallback, useEffect, useState } from 'react';

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
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsClient(true);
    }
  }, []);

  const setUserData = useCallback((loginResponse: LoginResponse) => {
    if (isClient) {
      localStorage.setItem('userData', JSON.stringify(loginResponse.user));
      localStorage.setItem('token', loginResponse.token);
    }
  }, [isClient]);

  const getUserData = useCallback((): UserData | null => {
    if (isClient) {
      const userData = localStorage.getItem('userData');
      return userData ? (JSON.parse(userData) as UserData) : null;
    }
    return null;
  }, [isClient]);

  const getToken = useCallback((): string | null => {
    if (isClient) {
      return localStorage.getItem('token');
    }
    return null;
  }, [isClient]);

  const clearUserData = useCallback(() => {
    if (isClient) {
      localStorage.removeItem('userData');
      localStorage.removeItem('token');
      window.location.reload();
    }
  }, [isClient]);

  return {
    setUserData,
    getUserData,
    getToken,
    clearUserData,
  };
};
