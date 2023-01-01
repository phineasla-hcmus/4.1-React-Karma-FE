import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Unauthorized() {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <Box>
      <Typography variant="h1">Unauthorized</Typography>
      <br />
      <Typography>You do not have access to the requested page.</Typography>
      <Box className="flexGrow">
        <Button onClick={goBack}>Go Back</Button>
      </Box>
    </Box>
  );
}

export default Unauthorized;
