import { useRecoilValue } from 'recoil';

import { userState } from '@/atoms/auth';

const Dashboard = () => {
  const userData = useRecoilValue(userState);
  const { userPrincipalName } = userData;

  return <>{userPrincipalName}</>;
};

export default Dashboard;
