import React from 'react';
import { useMediaQuery } from '@mui/material';
import {
  List,
  SimpleList,
  Datagrid,
  TextField,
  EmailField,
  EditButton,
  TextInput,
} from 'react-admin';

const userFilters = [
  <TextInput source="q" label="Search" alwaysOn />,
  // <ReferenceInput source="userId" label="User" reference="users" />,
];

export function UserList() {
  const isSmall = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
  return (
    <List filters={userFilters}>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.name}
          secondaryText={(record) => record.username}
          tertiaryText={(record) => record.email}
        />
      ) : (
        <Datagrid>
          <TextField source="id" label="Account number" />
          <TextField source="name" label="User" />

          <EditButton label="Add money" />
        </Datagrid>
      )}
    </List>
  );
}
