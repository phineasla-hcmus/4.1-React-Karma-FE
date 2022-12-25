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
        <Datagrid>
          <TextField source="id" label="ID" />
          <TextField source="tkTrong" label="Account" />
          <TextField source="tkNgoai" label="Affiliated Account" />
          <TextField source="nganHangLK.tenNH" label="Affiliated bank" />
          <FunctionField
            source="soTien"
            label="Money"
            render={(record: any) =>
              record.soTien > 0
                ? `+${formatNumber(record.soTien)}`
                : `${formatNumber(record.soTien)}`
            }
          />
          <FunctionField
            source="thoiGian"
            label="Transaction time"
            render={(record: any) => `${formatDateTime(record.thoiGian)}`}
          />
        </Datagrid>
      )}
    </List>
  );
}
