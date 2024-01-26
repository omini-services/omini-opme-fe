// eslint-disable-next-line import/no-unresolved
import { notificationState } from '@atoms/notification';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useRecoilValue } from 'recoil';

import 'react-toastify/dist/ReactToastify.css';

const NotificationCenter = () => {
  const notification = useRecoilValue(notificationState);

  useEffect(() => {
    if (notification) {
      toast(notification);
    }
  }, [notification]);

  return <ToastContainer />;
};

export default NotificationCenter;
