import React from 'react';
import { Edit, SimpleForm, ReferenceInput, TextInput } from 'react-admin';
import { Typography } from '@mui/material';

export function BankerEdit() {
  return (
    <Edit>
      <SimpleForm>
        <Typography variant="h5" mb={3}>
          Update a banker
        </Typography>
        <TextInput source="id" disabled />
        <TextInput source="nhanVien.hoTen" label="Fullname" />
        <TextInput source="nhanVien.sdt" label="Phone" />
      </SimpleForm>
    </Edit>
  );
}
