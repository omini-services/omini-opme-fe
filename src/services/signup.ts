import {
  SignUpCommand,
  CognitoIdentityProviderClient,
} from '@aws-sdk/client-cognito-identity-provider';
// eslint-disable-next-line import/no-unresolved
import { SignUpData } from '@types/SignUpData';

interface ISignUp {
  username: string;
  clientId: string;
  email: string;
  password: string;
}

export const createUser = async (userData: SignUpData) => {
  const requestData = {
    clientId: '1eroc789rnnkb1a756l7gijd5h',
    username: userData.email,
    email: userData.email,
    password: userData.password,
  };

  try {
    const signUp = ({ clientId, username, password, email }: ISignUp) => {
      const client = new CognitoIdentityProviderClient({
        region: 'us-east-1',
      });

      const command = new SignUpCommand({
        ClientId: clientId,
        Username: username,
        Password: password,
        UserAttributes: [{ Name: 'email', Value: email }],
      });

      return client.send(command);
    };

    const data = await signUp(requestData);

    console.log('data ==> ', data);

    // const response = await fetch('/api/users', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(userData),
    // });
    // const data = await response.json();
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};
