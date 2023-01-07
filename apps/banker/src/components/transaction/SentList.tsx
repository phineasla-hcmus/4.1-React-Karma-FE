import React from 'react';
import { Datagrid, TextField, FunctionField } from 'react-admin';

import {
  formatAccountNumber,
  formatDateTime,
  formatNumber,
} from '../../utils/helpers';

export function SentList() {
  return (
    <Datagrid>
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
  );
}
