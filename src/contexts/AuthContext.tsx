// eslint-disable-next-line import/no-unresolved
import { ROUTES } from '@constants';
import {
  createContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

// import { api } from '@services/api';

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
  signOut: (data: SignInData) => void;
};

type TAuthProvider = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextType);

export const delay = (amount = 750) =>
  new Promise((resolve) => {
    setTimeout(resolve, amount);
  });

const initialUserValue = {
  name: '',
  email: '',
  avatar_url: '',
};

export const AuthProvider = (props: TAuthProvider) => {
  const { children } = props;
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const [user, setUser] = useState<User>(initialUserValue);
  const navigate = useNavigate();
  const isAuthenticated = !!user;

  const recoverUserInformation = useCallback(async () => {
    await delay();

    return {
      user: {
        name: 'Guilherme Or',
        email: 'demon@zenko.tec.br',
        avatar_url:
          'https://avatars.githubusercontent.com/u/6473061?s=400&u=f9324cbc4d00a5fbce48393e3ec8ce5b5738cf66&v=4',
      },
    };
  }, []);

  const signInRequest = useCallback(async (data: SignInData) => {
    await delay();

    return {
      token: uuid(),
      user: {
        name: 'Guilherme Or',
        email: data.email,
        avatar_url:
          'https://avatars.githubusercontent.com/u/6473061?s=400&u=f9324cbc4d00a5fbce48393e3ec8ce5b5738cf66&v=4',
      },
    };
  }, []);

  useEffect(() => {
    const { token } = cookies;

    if (token) {
      recoverUserInformation().then((response) => {
        setUser(response.user);
      });
    }
  }, [recoverUserInformation]);

  const signIn = useCallback(
    async (signInProps: SignInData) => {
      const { email, password } = signInProps;
      const { token, user: signedUser } = await signInRequest({
        email,
        password,
      });
      setCookie('token', token, {
        maxAge: 60 * 60 * 1, // 1 hour
      });
      // api.defaults.headers.Authorization = `Bearer ${token}`;
      setUser(signedUser);
      navigate(ROUTES.root.to);
    },
    [navigate, setCookie, signInRequest],
  );

  const signOut = useCallback(() => {
    removeCookie('token', { path: '/' });
    // api.defaults.headers.Authorization = '';
    setUser(initialUserValue);
    navigate(ROUTES.signin.to);
  }, [navigate, removeCookie]);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
