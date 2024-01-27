// // eslint-disable-next-line import/no-unresolved
// import { tokenState } from '@atoms/auth';
// import { notificationState } from '@atoms/notification';
// import {
//   CognitoIdentityProviderClient,
//   InitiateAuthCommand,
// } from '@aws-sdk/client-cognito-identity-provider';
// import { SignInData, User } from '@types/SignIn';
// import { createContext, useState, useCallback, ReactNode } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useSetRecoilState } from 'recoil';

// import {
//   AWS_CLIENT_ID,
//   AWS_REGION,
//   INITIAL_TOKEN_STATE,
//   INITIAL_USER_STATE,
//   ROUTES,
// } from '@/constants';

// type AuthContextType = {
//   isAuthenticated: boolean;
//   user: User;
//   signIn: (data: SignInData) => Promise<void>;
//   signOut: () => void;
// };

// type TAuthProvider = {
//   children: ReactNode;
// };

// export const AuthContext = createContext({} as AuthContextType);

// export const AuthProvider = (props: TAuthProvider) => {
//   const { children } = props;
//   const [user, setUser] = useState<User>(INITIAL_USER_STATE);

//   const setToken = useSetRecoilState(tokenState);
//   const setNotification = useSetRecoilState(notificationState);

//   const navigate = useNavigate();
//   const isAuthenticated = !!user;

//   const signIn = useCallback(
//     async (signInData: SignInData) => {
//       const client = new CognitoIdentityProviderClient({
//         region: AWS_REGION,
//       });
//       const command = new InitiateAuthCommand({
//         AuthFlow: 'USER_PASSWORD_AUTH',
//         ClientId: AWS_CLIENT_ID,
//         AuthParameters: {
//           USERNAME: signInData.email,
//           PASSWORD: signInData.password,
//         },
//       });

//       try {
//         const response = await client.send(command);
//         console.log('response => ', response);

//         // Processar resposta e definir estado do usuário
//         const foundUser = {
//           // Defina as propriedades do usuário
//         };

//         setToken(response.AuthenticationResult);
//         setUser(foundUser);
//         navigate(ROUTES.root.to);
//       } catch (error) {
//         setNotification('Erro na tentativa de login.');
//       }
//     },
//     [navigate, setNotification, setToken],
//   );

//   const signOut = useCallback(() => {
//     setUser(INITIAL_USER_STATE);
//     setToken(INITIAL_TOKEN_STATE);
//     navigate(ROUTES.signin.to);
//   }, [navigate]);

//   return (
//     // eslint-disable-next-line react/jsx-no-constructed-context-values
//     <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import {
  createContext,
  useState,
  useCallback,
  ReactNode,
  useEffect,
} from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import { notificationState } from '@/atoms/notification';
import {
  AUTH_TOKEN,
  AWS_CLIENT_ID,
  AWS_REGION,
  INITIAL_USER_STATE,
  ROUTES,
} from '@/constants';
import { SignInData, User } from '@/types/SignIn';

type TAuthProvider = {
  children: ReactNode;
};

type AuthContextType = {
  isAuthenticated: boolean;
  user: User;
  signIn: (data: SignInData) => Promise<void>;
  signOut: () => void;
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: TAuthProvider) => {
  const [user, setUser] = useState<User>(INITIAL_USER_STATE);
  const [cookies, setCookie, removeCookie] = useCookies([AUTH_TOKEN]);
  const setNotification = useSetRecoilState(notificationState);
  const navigate = useNavigate();
  const isAuthenticated = !!cookies.auth;

  const signIn = useCallback(
    async (signInData: SignInData) => {
      const client = new CognitoIdentityProviderClient({ region: AWS_REGION });
      const command = new InitiateAuthCommand({
        AuthFlow: 'USER_PASSWORD_AUTH',
        ClientId: AWS_CLIENT_ID,
        AuthParameters: {
          USERNAME: signInData.email,
          PASSWORD: signInData.password,
        },
      });

      try {
        const response = await client.send(command);

        const keys = Object.keys(response.AuthenticationResult);
        keys.forEach((key) => {
          setCookie(key, response.AuthenticationResult[key], {
            maxAge: response.AuthenticationResult.ExpiresIn,
          });
        });

        // Processar resposta e definir estado do usuário
        const foundUser = {
          // Defina as propriedades do usuário
        };

        setUser(foundUser);
        navigate(ROUTES.root.to);
      } catch (error) {
        setNotification('Erro na tentativa de login.');
      }
    },
    [navigate, setCookie, setNotification],
  );

  const signOut = useCallback(() => {
    removeCookie(AUTH_TOKEN, { path: ROUTES.root.to });
    setUser(INITIAL_USER_STATE);
    navigate(ROUTES.signin.to);
  }, [navigate, removeCookie]);

  useEffect(() => {
    console.log('cookies => ', { cookies });
  }, [cookies]);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
