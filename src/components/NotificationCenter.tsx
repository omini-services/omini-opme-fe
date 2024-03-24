import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useRecoilValue } from 'recoil';

import { notificationState } from '@/atoms/notification';

import 'react-toastify/dist/ReactToastify.css';

const NotificationCenter = () => {
  const notification = useRecoilValue(notificationState);

  useEffect(() => {
    console.log('NotificationCenter => ', notification);
    if (notification) {
      toast(notification);
    }
  }, [notification]);

  return <ToastContainer />;
};

export default NotificationCenter;
