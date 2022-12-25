// in src/App.tsx
import React from 'react';
import { createBrowserHistory } from 'history';
import { Admin, Resource } from 'react-admin';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';

import { BankerList } from './components/banker/BankerList';
import { BankerEdit } from './components/banker/BankerEdit';
import { BankerCreate } from './components/banker/BankerCreate';
import { authProvider } from './auth/authProvider';
import Login from './pages/Login';
import { InterbankList } from './components/interbank/InterbankList';
import dataProvider from './providers/data';

const history = createBrowserHistory();

function App() {
  return (
    <Admin
      history={history}
      dataProvider={dataProvider}
      authProvider={authProvider}
      loginPage={Login}
    >
      <Resource
        name="bankers"
        list={BankerList}
        edit={BankerEdit}
        create={BankerCreate}
        icon={AccountCircleIcon}
      />
      <Resource
        name="interbank"
        list={InterbankList}
        icon={CurrencyExchangeIcon}
      />
    </Admin>
  );
}

export default App;
