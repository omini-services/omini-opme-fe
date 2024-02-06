import * as Sentry from '@sentry/browser';
import { useEffect } from 'react';

import ProfileContent from '@/components/Profile/ProfileContent';

const Dashboard = () => {
  useEffect(() => {
    try {
      throw new Error('test');
    } catch (error) {
      Sentry.captureException(error);
    }
  });
  return <ProfileContent />;
};

export default Dashboard;
