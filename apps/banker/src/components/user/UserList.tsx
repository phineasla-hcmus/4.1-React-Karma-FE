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
          primaryText={(record) => record.khachHang.hoTen}
          secondaryText={(record) => record.khachHang.email}
          tertiaryText={(record) => record.khachHang.sdt}
        />
      ) : (
        <Datagrid>
          <TextField source="id" label="ID" />
          <TextField source="tenDangNhap" label="Username" />
          <TextField source="khachHang.hoTen" label="Fullname" />
          <EmailField source="khachHang.email" label="Email" />
          <TextField source="khachHang.sdt" label="Phone" />
          <EditButton label="Recharge" />
        </Datagrid>
      )}
    </List>
  );
}
