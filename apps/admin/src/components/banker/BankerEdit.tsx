import React from 'react';
import {
  DeleteWithConfirmButton,
  Edit,
  required,
  SaveButton,
  SimpleForm,
  TextInput,
  Toolbar,
} from 'react-admin';
import { Typography } from '@mui/material';

function BankerEditToolbar(props: any) {
  return (
    <Toolbar
      {...props}
      sx={{ display: 'flex', justifyContent: 'space-between' }}
    >
      <SaveButton alwaysEnable />
      <DeleteWithConfirmButton sx={{ padding: 1 }} />
    </Toolbar>
  );
}

export function BankerEdit() {
  return (
    <Edit>
      <SimpleForm toolbar={<BankerEditToolbar />}>
        <Typography variant="h5" mb={3}>
          Update a banker
        </Typography>
        <TextInput source="id" disabled />
        <TextInput
          source="nhanVien.hoTen"
          validate={[required()]}
          label="Fullname"
        />
        <TextInput
          type="number"
          validate={[required()]}
          source="nhanVien.sdt"
          label="Phone"
        />
      </SimpleForm>
    </Edit>
  );
}
