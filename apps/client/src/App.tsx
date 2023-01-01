import React from 'react';
import { Route, Routes } from 'react-router-dom';

import PersistLogin from './components/PersistLogin';
import ChangePassword from './pages/ChangePassword';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import ReceiverManagement from './pages/Home/ReceiverManagement';
import DebtManagement from './pages/Home/DebtManagement';
import TransferHistory from './pages/Home/TransferHistory';
import TransferMoney from './pages/Home/TransferMoney';
import Login from './pages/Login';
import RequireAuth from './pages/RequireAuth';
import ResetPassword from './pages/ResetPassword';
import Unauthorized from './pages/Unauthorized';
import VerifyRequest from './pages/VerifyRequest';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-request" element={<VerifyRequest />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/change-password" element={<ChangePassword />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      <Route element={<PersistLogin />}>
        <Route element={<RequireAuth allowedRoles={['Client']} />}>
          <Route path="/" element={<Home />} />
          <Route path="/transaction-history" element={<TransferHistory />} />
          <Route path="/receiver-management" element={<ReceiverManagement />} />
          <Route path="/transfer" element={<TransferMoney />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
