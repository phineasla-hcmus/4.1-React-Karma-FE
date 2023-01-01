import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  Link,
  TextField,
} from '@mui/material';
import React, { FormEvent } from 'react';

import useInvalidUrlAccess from '../../hooks/useInvalidUrlAccess';

function VerifyRequest() {
  useInvalidUrlAccess();

  const email = new URLSearchParams(window.location.search).get('email');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      otp: data.get('otp'),
    });
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Link href="/">
            <Avatar
              sx={{ width: '8rem', height: '8rem' }}
              alt="Karma logo"
              src="/img/logo_1.png"
            />
          </Link>

          <Box component="form" onSubmit={handleSubmit} noValidate mt={1}>
            <Alert severity="info">
              Mã OTP xác nhận đã được gửi đến email <b>{email}</b>
            </Alert>
            <TextField margin="normal" fullWidth label="Mã OTP" name="otp" />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Gửi
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default VerifyRequest;
