import { Avatar, Box, Button, Container, Link, TextField } from '@mui/material';
import React from 'react';

function VerifyRequest() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      username: data.get('otp'),
    });
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
      <Container component='main' maxWidth='xs'>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Link href='/'>
            <Avatar
              sx={{ width: '8rem', height: '8rem' }}
              alt='Karma logo'
              src='/img/logo_1.png'
            />
          </Link>
          <Box
            component='form'
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField margin='normal' fullWidth label='Mã OTP' name='otp' />
            <Button
              type='submit'
              fullWidth
              variant='contained'
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
