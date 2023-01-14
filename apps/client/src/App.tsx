/* eslint-disable eqeqeq */
/* eslint-disable consistent-return */
import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

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
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState('');
  const navigate = useNavigate();

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
        setOpen(true);
        setContent(`You received a debt reminder from ${data.tenNguoiGui}`);
      });

      socket.on('reminder.confirmed', (data: any) => {
        if (
          data.chuyenKhoanNoiBo.nguoiChuyen !==
          localStorage.getItem('SOTK')?.toString()
        ) {
          setOpen(true);
          setContent(`${data.tenNguoiChuyen} has just paid a debt`);
        }
      });

      socket.on('reminder.cancelled', (data: any) => {
        setOpen(true);
        setContent('A debt has just been cancelled');
      });

      socket.on('disconnect', () => {
        console.log('disconnected');
      });

      return () => {
        socket.off('connect');
        socket.off('disconnect');
      };
    }
  }, []);

  return (
    <>
      <LocationContextProvider>
        <Dialog
          open={open}
          onClose={() => {
            setOpen(false);
          }}
        >
          <DialogTitle>Debt reminder notification</DialogTitle>
          <DialogContent>
            <DialogContentText>{content}</DialogContentText>
          </DialogContent>
          <DialogActions sx={{ marginRight: '1rem' }}>
            <Button
              variant="outlined"
              onClick={() => {
                setOpen(false);
              }}
            >
              Close
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                setOpen(false);
                navigate('/debt-management');
              }}
            >
              View
            </Button>
          </DialogActions>
        </Dialog>
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
