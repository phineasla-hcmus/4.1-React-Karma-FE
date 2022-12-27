import React from 'react';
import { Create, SimpleForm, TextInput } from 'react-admin';

export function UserCreate() {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="khachHang.hoTen" label="Fullname" />
        <TextInput source="khachHang.email" label="Email" />
        <TextInput source="khachHang.sdt" label="Phone" />
      </SimpleForm>
    </Create>
  );
}
