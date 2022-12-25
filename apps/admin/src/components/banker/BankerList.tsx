import React from 'react';
import { useMediaQuery } from '@mui/material';
import {
  List,
  SimpleList,
  Datagrid,
  TextField,
  EditButton,
  TextInput,
} from 'react-admin';

const bankerFilters = [
  <TextInput source="q" label="Tìm kiếm" alwaysOn />,
  // <ReferenceInput source="userId" label="User" reference="users" />,
];

export function BankerList() {
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
          <TextField source="id" label="Id" />
          <TextField source="nhanVien.hoTen" label="Fullname" />
          <TextField source="nhanVien.sdt" label="Phone" />
          <EditButton />
        </Datagrid>
      )}
    </List>
  );
}
