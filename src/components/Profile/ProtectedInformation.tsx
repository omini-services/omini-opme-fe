import { useMsal } from '@azure/msal-react';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

// eslint-disable-next-line import/extensions
import { userState } from '@/atoms/auth';
import { loginRequest } from '@/configs/authConfig';
import { callMsGraph } from '@/configs/graph';

// TODO: here we can see how to get a token to make requests on the API
const ProtectedInformation = () => {
  const { instance, accounts } = useMsal();
  const [userData, setUserData] = useRecoilState(userState);

  useEffect(() => {
    if (userData) return;
    instance
      .acquireTokenSilent({
        ...loginRequest,
        account: accounts[0],
      })
      .then((response) => {
        callMsGraph(response.accessToken).then((res) => setUserData(res));
      });
  });

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <></>;
};

export default ProtectedInformation;
