import React from 'react';
import { Edit, SimpleForm, ReferenceInput, TextInput } from 'react-admin';

export function BankerEdit() {
  return (
    <Edit>
      <SimpleForm>
        <ReferenceInput source="id" reference="bankers" />
        <TextInput source="id" />
        <TextInput source="nhanVien.hoTen" label="Fullname" />
        <TextInput source="nhanVien.sdt" label="Phone" />
      </SimpleForm>
    </Edit>
  );
}
