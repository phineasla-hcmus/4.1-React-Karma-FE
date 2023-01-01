import { Avatar, Box, Button, Container, TextField } from '@mui/material';
import React, { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function ForgotPassword() {
  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // TODO: send OTP email
    console.log({
      username: data.get('username'),
    });

    navigate('/verify-request?email=abc@gmail.com');
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
          <Link to="/">
            <Avatar
              sx={{ width: '8rem', height: '8rem' }}
              alt="Karma logo"
              src="/img/logo_1.png"
            />
          </Link>
          <Box component="form" onSubmit={handleSubmit} noValidate mt={1}>
            <TextField
              margin="normal"
              fullWidth
              label="Tên đăng nhập"
              name="username"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Gửi yêu cầu
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default ForgotPassword;
