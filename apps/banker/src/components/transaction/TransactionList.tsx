import React, { ReactNode, useState } from 'react';
import {
  Button,
  useMediaQuery,
  Tabs,
  Tab,
  Typography,
  Box,
} from '@mui/material';
import {
  List,
  SimpleList,
  Datagrid,
  TextInput,
  FunctionField,
  useListContext,
  TextField,
  useFilterState,
  useListParams,
  useListFilterContext,
} from 'react-admin';

import {
  formatAccountNumber,
  formatDateTime,
  formatNumber,
} from '../../utils/helpers';

import { SentList } from './SentList';
import { ReceivedList } from './ReceivedList';

interface TabPanelProps {
  children: ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const transactionFilters = [
  <TextInput source="q" label="Search" alwaysOn />,
  // <ReferenceInput source="userId" label="User" reference="users" />,
];

export function TransactionList() {
  return (
    <List exporter={false}>
      <Datagrid bulkActionButtons={false}>
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
