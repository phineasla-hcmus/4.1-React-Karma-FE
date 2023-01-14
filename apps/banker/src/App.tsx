import React from 'react';
import { createBrowserHistory } from 'history';
import { Admin, Resource } from 'react-admin';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';

import { UserList } from './components/user/UserList';
import { UserEdit } from './components/user/UserEdit';
import { UserCreate } from './components/user/UserCreate';
import { authProvider } from './auth/authProvider';
import Login from './pages/Login';
import { TransactionList } from './components/transaction/TransactionList';
import dataProvider from './providers/data';
import { theme } from './theme';

const history = createBrowserHistory();

function App() {
  return (
    <Admin
      theme={theme}
      history={history}
      dataProvider={dataProvider}
      authProvider={authProvider}
      loginPage={Login}
      requireAuth
    >
      <Resource
        name="clients"
        list={UserList}
        edit={UserEdit}
        create={UserCreate}
        icon={AccountCircleIcon}
      />
      <Resource
        name="transactions"
        list={TransactionList}
        icon={CurrencyExchangeIcon}
      />
    </Admin>
  );
}

export default App;
