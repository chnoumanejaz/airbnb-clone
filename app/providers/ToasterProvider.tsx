'use client';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToasterProvider = () => {
  return (
    <ToastContainer
      position="bottom-right"
      autoClose={3000}
      pauseOnFocusLoss={false}
      theme="light"
    />
  );
};

export default ToasterProvider;
