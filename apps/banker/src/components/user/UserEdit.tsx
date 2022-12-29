import React from 'react';
import { Edit, SimpleForm, TextInput, required } from 'react-admin';
import { Typography } from '@mui/material';

export function UserEdit() {
  return (
    <Edit>
      <SimpleForm>
        <Typography variant="h5" mb={3}>
          Recharge
        </Typography>
        <TextInput source="id" disabled />
        <TextInput source="khachHang.hoTen" label="Fullname" disabled />
        <TextInput source="khachHang.email" label="Email" disabled />
        <TextInput source="khachHang.sdt" label="Phone" disabled />
        <TextInput
          source="Amount recharge"
          type="number"
          validate={[required()]}
        />
      </SimpleForm>
    </Edit>
  );
}
