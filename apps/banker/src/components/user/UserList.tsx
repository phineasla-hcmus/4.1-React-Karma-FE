import React from 'react';
import { useMediaQuery } from '@mui/material';
import {
  List,
  SimpleList,
  Datagrid,
  TextField,
  EmailField,
  EditButton,
  TextInput,
  FunctionField,
} from 'react-admin';

import { formatPhoneNumber } from '../../utils/helpers';

const userFilters = [
  <TextInput source="q" label="Search" alwaysOn />,
  // <ReferenceInput source="userId" label="User" reference="users" />,
];

export function UserList() {
  const isSmall = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
  return (
    <List filters={userFilters} exporter={false}>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.khachHang.hoTen}
          secondaryText={(record) => record.khachHang.email}
          tertiaryText={(record) => record.khachHang.sdt}
        />
      ) : (
        <Datagrid bulkActionButtons={false}>
          <TextField source="id" label="ID" sortable={false} />
          <TextField source="tenDangNhap" label="Username" sortable={false} />
          <TextField
            source="taiKhoanThanhToan.soTK"
            label="Account number"
            sortable={false}
          />
          <TextField
            source="khachHang.hoTen"
            label="Fullname"
            sortable={false}
          />
          <EmailField source="khachHang.email" label="Email" sortable={false} />
          <FunctionField
            source="nhanVien.sdt"
            label="Phone"
            sortable={false}
            render={(record: any) => formatPhoneNumber(record.khachHang.sdt)}
          />
          <EditButton label="Recharge" />
        </Datagrid>
      )}
    </List>
  );
}
