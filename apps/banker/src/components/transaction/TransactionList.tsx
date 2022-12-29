import React from 'react';
import { Button, useMediaQuery } from '@mui/material';
import { List, SimpleList, Datagrid, TextField, TextInput } from 'react-admin';

import { formatNumber } from '../../utils/helpers';

const bankerFilters = [
  <TextInput source="q" label="Search" alwaysOn />,
  // <ReferenceInput source="userId" label="User" reference="users" />,
];

export function TransactionList() {
  const isSmall = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
  return (
    <List filters={bankerFilters}>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => `To: ${record.nguoiNhan}`}
          secondaryText={(record) => `From: ${record.nguoiChuyen}`}
          tertiaryText={(record) => `${formatNumber(record.soTien)} VND`}
        />
      ) : (
        <Datagrid>
          <TextField source="id" label="Transaction ID" />
          <TextField source="nguoiChuyen" label="Sent Account" />
          <TextField source="nguoiNhan" label="Received Account" />
          <TextField source="soTien" label="Amount" />
          <TextField source="ngayCK" label="Transaction Time" />
          <Button>Details</Button>
        </Datagrid>
      )}
    </List>
  );
}
