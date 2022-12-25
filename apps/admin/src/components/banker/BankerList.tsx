import React from 'react';
import { useMediaQuery, Button } from '@mui/material';
import {
  List,
  SimpleList,
  Datagrid,
  TextField,
  EditButton,
  TextInput,
  FunctionField,
} from 'react-admin';
import DeleteIcon from '@mui/icons-material/Delete';

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
          primaryText={(record) => record.name}
          secondaryText={(record) => record.username}
          tertiaryText={(record) => record.email}
        />
      ) : (
        <Datagrid>
          <TextField source="id" label="ID" />
          <TextField source="nhanVien.hoTen" label="Fullname" />
          <TextField source="nhanVien.sdt" label="Phone" />
          <EditButton />
          <Button color="error">
            <DeleteIcon />
            Delete
          </Button>
        </Datagrid>
      )}
    </List>
  );
}
