import { useState } from 'react';
import axios from 'axios';
import { useAuthContext } from './useAuthContext';
import { toast } from 'react-toastify';

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (Name, Email, PNumber, Password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:4000/User/signup', {
        Name,
        Email,
        PNumber,
        Password,
      });

      localStorage.setItem('user', JSON.stringify(response.data));

      dispatch({ type: 'LOGIN', payload: response.data });
      toast.success('Sign Up Successful!');
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

  return { signup, isLoading, error };
};
