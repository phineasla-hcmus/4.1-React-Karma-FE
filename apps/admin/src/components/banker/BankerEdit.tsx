import { Edit, SimpleForm, ReferenceInput, TextInput } from "react-admin";

export const BankerEdit = () => (
  <Edit>
    <SimpleForm>
      <ReferenceInput source="userId" reference="users" />
      <TextInput source="id" />
      <TextInput source="title" />
      <TextInput source="body" />
    </SimpleForm>
  </Edit>
);
