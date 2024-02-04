import { useMsal } from '@azure/msal-react';
import Button from '@mui/joy/Button';
import { useState } from 'react';

// eslint-disable-next-line import/extensions
import { ProfileData } from '@/components/Profile/ProfileData';
import { loginRequest } from '@/configs/authConfig';
import { callMsGraph } from '@/configs/graph';

// TODO: here we can see how to get a token to make requests on the API
const ProfileContent = () => {
  const { instance, accounts } = useMsal();
  const [graphData, setGraphData] = useState(null);

  const requestProfileData = () => {
    // Silently acquires an access token which is then attached to a request for MS Graph data
    instance
      .acquireTokenSilent({
        ...loginRequest,
        account: accounts[0],
      })
      .then((response) => {
        callMsGraph(response.accessToken).then((res) => setGraphData(res));
      });
  };

  return (
    <>
      <h5 className="card-title">Welcome {accounts[0].name}</h5>
      <br />
      {graphData ? (
        <ProfileData graphData={graphData} />
      ) : (
        <Button onClick={requestProfileData}>
          Request Profile Information
        </Button>
      )}
    </>
  );
};

export default ProfileContent;
