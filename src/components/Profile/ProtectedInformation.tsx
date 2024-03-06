import { useMsal } from '@azure/msal-react';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

// eslint-disable-next-line import/extensions
import { userState } from '@/atoms/auth';
import { callMsGraph } from '@/configs/api';
import { graphConfig } from '@/configs/authConfig';

const ProtectedInformation = () => {
  const { instance, accounts } = useMsal();
  const [userData, setUserData] = useRecoilState(userState);

  useEffect(() => {
    if (userData) return;
    instance
      .acquireTokenSilent({
        scopes: graphConfig.scopes,
        account: accounts[0],
      })
      .then((response) => {
        console.log('response => ', { graphConfig, response });
        callMsGraph(graphConfig.endpoint, response.accessToken).then((res) =>
          setUserData(res),
        );
      });
  });

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <></>;
};

export default ProtectedInformation;
