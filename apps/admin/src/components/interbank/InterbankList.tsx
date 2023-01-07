import React from 'react';
import { useMediaQuery } from '@mui/material';
import {
  List,
  SimpleList,
  Datagrid,
  TextField,
  TextInput,
  FunctionField,
} from 'react-admin';

import { formatDateTime, formatNumber } from '../../utils/helpers';

const bankerFilters = [
  <TextInput source="q" label="Search" alwaysOn />,
  // <ReferenceInput source="userId" label="User" reference="users" />,
];

export function InterbankList() {
  const isSmall = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));

  return (
    <List filters={bankerFilters}>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.name}
          secondaryText={(record) => record.username}
          tertiaryText={(record) => record.email}
        />
      ) : (
        <Datagrid bulkActionButtons={false}>
          <TextField source="id" label="ID" sortable={false} />
          <TextField source="tkTrong" label="Account" sortable={false} />
          <TextField
            source="tkNgoai"
            label="External Account"
            sortable={false}
          />
          <TextField
            source="nganHangLK.tenNH"
            label="External Bank"
            sortable={false}
          />
          <FunctionField
            sortable={false}
            source="soTien"
            label="Amount"
            render={(record: any) =>
              record.soTien > 0
                ? `+${formatNumber(record.soTien)} VND`
                : `${formatNumber(record.soTien)} VND`
            }
          />
          <FunctionField
            sortable={false}
            source="thoiGian"
            label="Transaction time"
            render={(record: any) => `${formatDateTime(record.thoiGian)}`}
          />
        </Datagrid>
      )}
    </List>
  );
}
