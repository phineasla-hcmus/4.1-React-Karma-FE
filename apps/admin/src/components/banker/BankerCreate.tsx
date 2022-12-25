import React from 'react';
import { Create, SimpleForm, TextInput } from 'react-admin';
import { Typography } from '@mui/material';

export function BankerCreate() {
  return (
    <Create>
      <SimpleForm>
        <Typography variant="h5" mb={3}>
          Create a new banker
        </Typography>
        <TextInput source="nhanVien.hoTen" label="Fullname" />
        <TextInput source="nhanVien.sdt" label="Phone" />
      </SimpleForm>
    </Create>
  );
}
