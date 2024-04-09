import { useMsal } from '@azure/msal-react';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

// eslint-disable-next-line import/extensions
import { userState } from '@atoms/auth';
import { callMsGraph } from '@configs/api';
import { GRAPH_CONFIG } from '@configs/authConfig';

const ProtectedInformation = () => {
  const { instance, accounts } = useMsal();
  const [userData, setUserData] = useRecoilState(userState);

  useEffect(() => {
    if (userData) return;
    instance
      .acquireTokenSilent({
        scopes: GRAPH_CONFIG.scopes,
        account: accounts[0],
      })
      .then((response) => {
        callMsGraph({
          url: GRAPH_CONFIG.endpoint,
          accessToken: response.accessToken,
        }).then((res) => setUserData(res));
      });
  }, []);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <></>;
};

export default ProtectedInformation;
