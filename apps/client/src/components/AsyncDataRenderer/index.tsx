import React, { ReactNode } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export interface AsyncDataRendererProps {
  children: ReactNode;
  loading: boolean;
}

function AsyncDataRenderer({ children, loading }: AsyncDataRendererProps) {
  if (loading) {
    return (
      <Box sx={{ marginTop: '1rem' }}>
        <CircularProgress />
      </Box>
    );
  }
  return <>{children}</>;
}

export default AsyncDataRenderer;
