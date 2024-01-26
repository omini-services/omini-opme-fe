/* eslint-disable import/no-unresolved */
import { ROUTES } from '@constants';
import { SignUpData } from '@types/SignUpData';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { createUser } from '@services/signup';

export const useSignUp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  const signUp = async (signUpData: SignUpData) => {
    setLoading(true);
    const result = await createUser(signUpData);
    console.log('signUpData => ', { signUpData, result });
    if (result.error) {
      setError(result.error);
    } else {
      setData(result.data);
      navigate(ROUTES.signin.to);
    }
    setLoading(false);
  };

  return { signUp, loading, error, data };
};
