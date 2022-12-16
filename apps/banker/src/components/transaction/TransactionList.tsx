import React from 'react';
import { Button, useMediaQuery } from '@mui/material';
import { List, SimpleList, Datagrid, TextField, TextInput } from 'react-admin';

const bankerFilters = [
  <TextInput source="q" label="Search" alwaysOn />,
  // <ReferenceInput source="userId" label="User" reference="users" />,
];

export function TransactionList() {
  const isSmall = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
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
          <TextField source="phone" label="Transaction time" />
          <TextField source="phone" label="Transaction type" />
          <Button>Details</Button>
        </Datagrid>
      )}
    </List>
  );
}
