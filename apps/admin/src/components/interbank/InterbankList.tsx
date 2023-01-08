import React from 'react';
import { useMediaQuery } from '@mui/material';
import {
  List,
  SimpleList,
  Datagrid,
  TextField,
  TextInput,
  FunctionField,
  DateInput,
  SelectInput,
  useGetList,
  ReferenceInput,
} from 'react-admin';

import { formatDateTime, formatNumber } from '../../utils/helpers';

const bankerFilters = [
  <DateInput source="from" label="Start Date" />,
  <DateInput source="to" label="End Date" />,
  <ReferenceInput source="bankID" reference="banks" label="Bank">
    <SelectInput label="Bank" />
  </ReferenceInput>,
];

export function InterbankList() {
  const isSmall = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));

  return (
    <List filters={bankerFilters} exporter={false}>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.name}
          secondaryText={(record) => record.username}
          tertiaryText={(record) => record.email}
        />
      ) : (
        <Datagrid
          bulkActionButtons={false}
          sx={{
            '.MuiTableCell-head': {
              background: '#e6e0f3',
              fontWeight: 700,
            },
          }}
        >
          <TextField source="id" label="ID" sortable={false} />
          <TextField
            source="tkTrong"
            label="External Account"
            sortable={false}
          />
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
              record.loaiCK === 'receiver'
                ? `+${formatNumber(record.soTien)} VND`
                : `-${formatNumber(record.soTien)} VND`
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
