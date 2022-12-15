// in src/users.tsx
import { useMediaQuery } from "@mui/material";
import {
  List,
  SimpleList,
  Datagrid,
  TextField,
  EmailField,
  EditButton,
  TextInput,
  ReferenceInput,
} from "react-admin";

const bankerFilters = [
  <TextInput source="q" label="Tìm kiếm" alwaysOn />,
  // <ReferenceInput source="userId" label="User" reference="users" />,
];

export const BankerList = () => {
  const isSmall = useMediaQuery((theme: any) => theme.breakpoints.down("sm"));
  return (
    <List filters={bankerFilters}>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.name}
          secondaryText={(record) => record.username}
          tertiaryText={(record) => record.email}
        />
      ) : (
        <Datagrid>
          <TextField source="id" label="Id" />
          <TextField source="name" label="Fullname" />
          <TextField source="phone" label="Phone" />
          <EditButton />
        </Datagrid>
      )}
    </List>
  );
};
