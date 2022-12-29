import React from 'react';
import { useMediaQuery } from '@mui/material';
import {
  List,
  SimpleList,
  Datagrid,
  TextField,
  EditButton,
  TextInput,
  DeleteWithConfirmButton,
} from 'react-admin';

const bankerFilters = [
  <TextInput source="q" label="Search" alwaysOn />,
  // <ReferenceInput source="userId" label="User" reference="users" />,
];

export function BankerList() {
  const isSmall = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
  return (
    <List filters={bankerFilters}>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.nhanVien.hoTen}
          secondaryText={(record) => record.nhanVien.sdt}
        />
      ) : (
        <Datagrid>
          <TextField source="id" label="ID" sortable={false} />
          <TextField
            source="nhanVien.hoTen"
            label="Fullname"
            sortable={false}
          />
          <TextField source="nhanVien.sdt" label="Phone" sortable={false} />
          <EditButton />
          <DeleteWithConfirmButton />
        </Datagrid>
      )}
    </List>
  );
}
