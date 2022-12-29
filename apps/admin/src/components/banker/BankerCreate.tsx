import React from 'react';
import { Create, required, SimpleForm, TextInput } from 'react-admin';
import { Typography } from '@mui/material';

export function BankerCreate() {
  return (
    <Create>
      <SimpleForm>
        <Typography variant="h5" mb={3}>
          Create a new banker
        </Typography>
        <TextInput source="hoTen" validate={[required()]} label="Fullname" />
        <TextInput source="sdt" validate={[required()]} label="Phone" />
      </SimpleForm>
    </Create>
  );
}
