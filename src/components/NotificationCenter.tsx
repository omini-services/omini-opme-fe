import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useRecoilState } from 'recoil';

import { notificationState } from '@/atoms/notification';

import 'react-toastify/dist/ReactToastify.css';

const NotificationCenter = () => {
  const [notification, setNotification] = useRecoilState(notificationState);

  useEffect(() => {
    if (notification) {
      toast(notification);
    }
  }, [notification]);

  useEffect(() => () => {
    setNotification('');
  });

  return <ToastContainer />;
};

export default NotificationCenter;
