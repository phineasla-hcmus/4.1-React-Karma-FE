// in src/users.tsx
import { Button, useMediaQuery } from "@mui/material";
import {
  List,
  SimpleList,
  Datagrid,
  TextField,
  EmailField,
  TextInput,
} from "react-admin";

const bankerFilters = [
  <TextInput source="q" label="Search" alwaysOn />,
  // <ReferenceInput source="userId" label="User" reference="users" />,
];

export const TransactionList = () => {
  const isSmall = useMediaQuery((theme: any) => theme.breakpoints.down("sm"));
  return (
    <List filters={bankerFilters}>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.name}
          secondaryText={(record) => record.username}
          tertiaryText={(record) => record.email}
        />
      ) : (
        <Datagrid>
          <TextField source="id" label="Transaction id" />
          <TextField source="name" label="Sent account" />
          <TextField source="username" label="Received account" />
          <TextField source="email" label="Bank" />
          <TextField source="phone" label="Money" />
          <TextField source="phone" label="Transaction time" />
        </Datagrid>
      )}
    </List>
  );
};
