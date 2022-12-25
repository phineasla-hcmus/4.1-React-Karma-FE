import React from 'react';
import { Create, SimpleForm, ReferenceInput, TextInput } from 'react-admin';

export function BankerCreate() {
  return (
    <Create>
      <SimpleForm>
        <ReferenceInput source="id" reference="bankers" />
        <TextInput source="title" />
        <TextInput source="body" multiline rows={5} />
      </SimpleForm>
    </Create>
  );
}
