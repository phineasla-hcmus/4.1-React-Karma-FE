// in src/App.tsx
import React from "react";
import { createBrowserHistory } from "history";
import { Admin, Resource } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import { BankerList } from "./components/banker/BankerList";
import { BankerEdit } from "./components/banker/BankerEdit";
import { BankerCreate } from "./components/banker/BankerCreate";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { authProvider } from "./auth/authProvider";
const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com");

const history = createBrowserHistory();

const App = () => (
  <Admin
    history={history}
    dataProvider={dataProvider}
    authProvider={authProvider}
  >
    <Resource
      name="users"
      list={BankerList}
      edit={BankerEdit}
      create={BankerCreate}
      icon={AccountCircleIcon}
    />
  </Admin>
);

export default App;
