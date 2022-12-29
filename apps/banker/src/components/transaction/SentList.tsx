import React, { ReactNode } from 'react';
import { Button, Box } from '@mui/material';
import {
  List,
  Datagrid,
  TextField,
  TextInput,
  FunctionField,
} from 'react-admin';

import {
  formatAccountNumber,
  formatDateTime,
  formatNumber,
} from '../../utils/helpers';

export function SentList() {
  const [value, setValue] = React.useState(0);

  return (
    <Datagrid>
      <TextField source="id" label="Transaction ID" />
      <FunctionField
        source="nguoiChuyen"
        label="Sent Account"
        render={(record: any) => `${formatAccountNumber(record.nguoiChuyen)}`}
      />
      <FunctionField
        source="nguoiNhan"
        label="Received Account"
        render={(record: any) => `${formatAccountNumber(record.nguoiNhan)}`}
      />
      <FunctionField
        source="soTien"
        label="Amount"
        render={(record: any) => `${formatNumber(record.soTien)} VND`}
      />
      <FunctionField
        source="ngayCK"
        label="Transaction Time"
        render={(record: any) => `${formatDateTime(record.ngayCK)}`}
      />
      <Button>Details</Button>
    </Datagrid>
  );
}
