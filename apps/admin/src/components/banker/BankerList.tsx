import React from 'react';
import { useMediaQuery } from '@mui/material';
import {
  List,
  SimpleList,
  Datagrid,
  TextField,
  EditButton,
  DeleteWithConfirmButton,
  FunctionField,
} from 'react-admin';

import { formatPhoneNumber } from '../../utils/helpers';

export function BankerList() {
  const isSmall = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
  return (
    <List>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.nhanVien.hoTen}
          secondaryText={(record) => record.nhanVien.sdt}
        />
      ) : (
        <Datagrid bulkActionButtons={false}>
          <TextField source="id" label="ID" sortable={false} />
          <TextField
            source="nhanVien.hoTen"
            label="Fullname"
            sortable={false}
          />
          <FunctionField
            source="nhanVien.sdt"
            label="Phone"
            sortable={false}
            render={(record: any) => formatPhoneNumber(record.nhanVien.sdt)}
          />
          <EditButton />
          <DeleteWithConfirmButton />
        </Datagrid>
      )}
    </List>
  );
}
