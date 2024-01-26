import {
  SignUpCommand,
  CognitoIdentityProviderClient,
} from '@aws-sdk/client-cognito-identity-provider';
// eslint-disable-next-line import/no-unresolved
import { AWS_CLIENT_ID } from '@constants';
import { SignUpData } from '@types/SignUpData';

// import { generateSecretHash } from '@utils/crypto';

interface ISignUp {
  username: string;
  clientId: string;
  email: string;
  password: string;
}

export const createUser = async (userData: SignUpData) => {
  // const secretHash = generateSecretHash(userData.username, AWS_CLIENT_ID, clientSecret);

  const requestData = {
    clientId: AWS_CLIENT_ID,
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
        UserAttributes: [
          { Name: 'email', Value: email },
          { Name: 'given_name', Value: userData.name },
          { Name: 'family_name', Value: 'Or' },
          { Name: 'middle_name', Value: 'Stefan' },
        ],
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
