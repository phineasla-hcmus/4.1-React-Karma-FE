import React from 'react';
import { Edit, SimpleForm, ReferenceInput, TextInput } from 'react-admin';

export function UserEdit() {
  return (
    <Edit>
      <SimpleForm>
        <TextInput source="id" disabled />
        <TextInput source="khachHang.hoTen" label="Fullname" disabled />
        <TextInput source="khachHang.email" label="Email" disabled />
        <TextInput source="khachHang.sdt" label="Phone" disabled />
        <TextInput source="Amount recharge" type="number" />
      </SimpleForm>
    </Edit>
  );
}
