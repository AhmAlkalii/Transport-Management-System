import { useState } from 'react';
import axios from 'axios';
import { useAuthContext } from './useAuthContext';
import { toast } from 'react-toastify';


export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (Email, Password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:4000/User/login', {
        Email, Password
      });

      localStorage.setItem('user', JSON.stringify(response.data));

      dispatch({ type: 'LOGIN', payload: response.data });
      toast.success('Logged in Successfully')

    } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
          setError(error.response.data.error); // Show backend error
        } else {
          setError('An unexpected error occurred'); // Fallback error
        }
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};