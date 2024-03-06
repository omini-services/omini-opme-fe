import { useRecoilValue } from 'recoil';

import { userState } from '@/atoms/auth';

const Dashboard = () => {
  const userData = useRecoilValue(userState);
  const { userPrincipalName } = userData;

  return <span>{userPrincipalName}</span>;
};

export default Dashboard;
