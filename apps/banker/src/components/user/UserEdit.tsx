import React from 'react';
import { Edit, SimpleForm, ReferenceInput, TextInput } from 'react-admin';

export function UserEdit() {
  return (
    <Edit>
      <SimpleForm>
        <ReferenceInput source="userId" reference="users" />
        <TextInput source="id" />
        <TextInput source="title" />
        <TextInput source="body" />
      </SimpleForm>
    </Edit>
  );
}
