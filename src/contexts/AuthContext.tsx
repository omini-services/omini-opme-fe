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
  COOKIE_ACCESS_TOKEN,
  AWS_CLIENT_ID,
  AWS_REGION,
  INITIAL_USER_STATE,
  ROUTES,
  COOKIE_EXPIRES_IN,
  COOKIE_ID_TOKEN,
  COOKIE_REFRESH_TOKEN,
  COOKIE_TOKEN_TYPE,
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
  const [cookies, setCookie, removeCookie] = useCookies();
  const setNotification = useSetRecoilState(notificationState);
  const [cookiesKeys] = useState([
    COOKIE_ACCESS_TOKEN,
    COOKIE_EXPIRES_IN,
    COOKIE_ID_TOKEN,
    COOKIE_REFRESH_TOKEN,
    COOKIE_TOKEN_TYPE,
  ]);

  const navigate = useNavigate();
  const isAuthenticated = !!cookies[COOKIE_ACCESS_TOKEN];

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

        if (response.AuthenticationResult) {
          cookiesKeys.forEach((key) => {
            setCookie(key, response.AuthenticationResult[key], {
              maxAge: response.AuthenticationResult[COOKIE_EXPIRES_IN],
            });
          });

          // Processar resposta e definir estado do usuário
          const foundUser = {
            // Defina as propriedades do usuário
          };

          setUser(foundUser);
          navigate(ROUTES.root.to);
        } else {
          setNotification('Erro na tentativa de login.');
          throw new Error('Erro na tentativa de login.');
        }
      } catch (error) {
        setNotification('Erro na tentativa de login.');
      }
    },
    [navigate, setCookie, setNotification],
  );

  const signOut = useCallback(() => {
    cookiesKeys.forEach((key) => {
      removeCookie(key, { path: ROUTES.root.to });
    });
    setUser(INITIAL_USER_STATE);
    navigate(ROUTES.signin.to);
  }, [navigate, removeCookie]);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
