import { Box } from '@mui/material';
import React, { ReactNode } from 'react';

interface TabPanelProps {
  children: ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index } = props;

  return (
    <Box role="tabpanel" hidden={value !== index}>
      {value === index && <Box>{children}</Box>}
    </Box>
  );
}

export default TabPanel;
