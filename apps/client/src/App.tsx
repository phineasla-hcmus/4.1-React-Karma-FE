import React from 'react';
import { Route, Routes } from 'react-router-dom';

import ChangePassword from './pages/ChangePassword';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import TransferHistory from './pages/Home/TransferHistory';
import TransferMoney from './pages/Home/TransferMoney';
import Login from './pages/Login';
import ResetPassword from './pages/ResetPassword';
import VerifyRequest from './pages/VerifyRequest';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-request" element={<VerifyRequest />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/change-password" element={<ChangePassword />} />
      <Route path="/transaction-history" element={<TransferHistory />} />
      <Route path="/transfer" element={<TransferMoney />} />
    </Routes>
  );
}

export default App;
