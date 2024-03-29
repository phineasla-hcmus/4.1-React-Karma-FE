import React from 'react';
import { List, Datagrid, FunctionField, TextField } from 'react-admin';

import {
  formatAccountNumber,
  formatDateTime,
  formatNumber,
} from '../../utils/helpers';

export function TransactionList() {
  return (
    <List exporter={false}>
      <Datagrid
        bulkActionButtons={false}
        sx={{
          '.MuiTableCell-head': {
            background: '#e6e0f3',
            fontWeight: 700,
          },
        }}
      >
        <TextField source="id" label="Transaction ID" sortable={false} />
        <FunctionField
          source="nguoiChuyen"
          label="Sent Account"
          sortable={false}
          render={(record: any) => `${formatAccountNumber(record.nguoiChuyen)}`}
        />
        <FunctionField
          source="nguoiNhan"
          sortable={false}
          label="Received Account"
          render={(record: any) => `${formatAccountNumber(record.nguoiNhan)}`}
        />
        <FunctionField
          source="soTien"
          label="Amount"
          sortable={false}
          render={(record: any) => `${formatNumber(record.soTien)} VND`}
        />
        <FunctionField
          source="ngayCK"
          sortable={false}
          label="Transaction Time"
          render={(record: any) => `${formatDateTime(record.ngayCK)}`}
        />
      </Datagrid>
    </List>
  );
}
