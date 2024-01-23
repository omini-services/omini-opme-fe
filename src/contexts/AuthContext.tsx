import { createContext, useEffect, useMemo, useState, ReactNode } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

import { api } from '@/services/api';
import { recoverUserInformation, signInRequest } from '@/services/auth';

type User = {
  name: string;
  email: string;
  avatar_url: string;
};

export type SignInData = {
  email: string;
  password: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  user: User;
  signIn: (data: SignInData) => Promise<void>;
};

type TAuthProvider = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = (props: TAuthProvider) => {
  const { children } = props;
  const [cookies, setCookie] = useCookies(['token']);
  const [user, setUser] = useState<User>({
    name: '',
    email: '',
    avatar_url: '',
  });
  const navigate = useNavigate();
  const isAuthenticated = !!user;

  useEffect(() => {
    const { token } = cookies; // TODO: change here to parse cookies

    if (token) {
      recoverUserInformation().then((response) => {
        setUser(response.user);
      });
    }
  }, []);

  const signIn = async (signInProps: SignInData) => {
    const { email, password } = signInProps;
    const { token, user: signedUser } = await signInRequest({
      email,
      password,
    });

    setCookie('token', token, {
      maxAge: 60 * 60 * 1, // 1 hour
    });

    api.defaults.headers.Authorization = `Bearer ${token}`;

    setUser(signedUser);

    console.log(signedUser);
    navigate('/');
  };

  return useMemo(
    () => (
      <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
        {children}
      </AuthContext.Provider>
    ),
    [children, isAuthenticated, user],
  );
};

export default AuthProvider;
