import { Box } from '@mui/material';
import React, { ReactNode } from 'react';
import Header from '../Header';

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <Box>
      <Header />
      {children}
    </Box>
  );
}

export default Layout;
