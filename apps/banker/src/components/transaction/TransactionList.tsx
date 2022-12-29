import React, { ReactNode } from 'react';
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
  TextField,
  TextInput,
  FunctionField,
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

const bankerFilters = [
  <TextInput source="q" label="Search" alwaysOn />,
  // <ReferenceInput source="userId" label="User" reference="users" />,
];

export function TransactionList() {
  const isSmall = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <List filters={bankerFilters}>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Sent" {...a11yProps(0)} />
            <Tab label="Received" {...a11yProps(1)} />
            <Tab label="Debt payment" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Box pt={3}>
            <SentList />
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Box pt={3}>
            <ReceivedList />
          </Box>
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
      </Box>
    </List>
  );
}
