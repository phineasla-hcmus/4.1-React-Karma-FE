/* eslint-disable consistent-return */
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { io } from 'socket.io-client';
import { Box } from '@mui/material';

import PersistLogin from './components/PersistLogin';
import { LocationContextProvider } from './context/LocationProvider';
import ChangePassword from './pages/ChangePassword';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import ReceiverManagement from './pages/Home/ReceiverManagement';
import DebtManagement from './pages/Home/DebtManagement';
import TransferHistory from './pages/Home/TransferHistory';
import TransferMoney from './pages/Home/TransferMoney';
import Login from './pages/Login';
import ResetPassword from './pages/ResetPassword';
import Unauthorized from './pages/Unauthorized';
import VerifyRequest from './pages/VerifyRequest';
import RequireAuth from './components/RequireAuth';
import Profile from './pages/Profile';

function App() {
  const [noti, setNoti] = useState('');

  useEffect(() => {
    if (localStorage.getItem('ACCESS_TOKEN')) {
      const socket = io('localhost:3005', {
        auth: {
          token: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
        },
      });

      socket.on('connect', () => {
        console.log('connected with socket id: ', socket.id);
      });

      socket.on('reminder.created', (data: any) => {
        console.log('data', data);
        setNoti('Received');
      });

      socket.on('disconnect', () => {
        console.log('disconnected');
      });

      return () => {
        socket.off('connect');
        socket.off('disconnect');
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   if (localStorage.getItem('ACCESS_TOKEN')) {
  //     const socket = io('localhost:3005', {
  //       auth: {
  //         token: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
  //       },
  //     });

  //     socket.on('connect', () => {
  //       console.log('connected');
  //     });

  //     socket.on('reminder.created', () => {
  //       console.log('hello');
  //       setNoti('Created');
  //     });

  //     socket.on('reminder.confirmed', () => {
  //       setNoti('Confirmed');
  //     });

  //     socket.on('reminder.cancelled', () => {
  //       setNoti('Cancelled');
  //     });

  //     // return () => {
  //     //   socket.off('reminder.created');
  //     //   socket.off('reminder.confirmed');
  //     //   socket.off('reminder.cancelled');
  //     // };
  //   }
  // }, []);

  return (
    <>
      <LocationContextProvider>
        {noti && (
          <Box sx={{ marginTop: '5rem', padding: '1.25rem' }}>{noti}</Box>
        )}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-request" element={<VerifyRequest />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Home />} />
            <Route path="/transaction-history" element={<TransferHistory />} />
            <Route
              path="/receiver-management"
              element={<ReceiverManagement />}
            />
            <Route path="/debt-management" element={<DebtManagement />} />
            <Route path="/transfer" element={<TransferMoney />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route element={<PersistLogin />}>
            <Route path="/change-password" element={<ChangePassword />} />
          </Route>
        </Routes>
      </LocationContextProvider>
    </>
  );
}

export default App;
