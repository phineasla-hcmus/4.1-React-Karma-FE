import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  Link,
  TextField,
} from '@mui/material';
import React, { ChangeEvent, FormEvent, useCallback, useState } from 'react';

interface State {
  currentPassword: string;
  password: string;
  confirmPassword: string;
  showCurrentPassword: boolean;
  showPassword: boolean;
  showConfirmPassword: boolean;
}

function ChangePassword() {
  const [values, setValues] = useState<State>({
    currentPassword: '',
    password: '',
    confirmPassword: '',
    showCurrentPassword: false,
    showPassword: false,
    showConfirmPassword: false,
  });

  const handleChange = useCallback(
    (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
      setValues((v) => ({ ...v, [prop]: event.target.value }));
    },
    []
  );

  const handleClickShowCurrentPassword = useCallback(() => {
    setValues((v) => ({
      ...v,
      showCurrentPassword: !v.showCurrentPassword,
    }));
  }, []);

  const handleClickShowPassword = useCallback(() => {
    setValues((v) => ({
      ...v,
      showPassword: !v.showPassword,
    }));
  }, []);

  const handleClickShowConfirmPassword = useCallback(() => {
    setValues((v) => ({
      ...v,
      showConfirmPassword: !v.showConfirmPassword,
    }));
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      username: data.get('username'),
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
          <Box component='form' onSubmit={handleSubmit} noValidate mt={1}>
            <TextField
              type={values.showCurrentPassword ? 'text' : 'password'}
              margin='normal'
              fullWidth
              label='Mật khẩu hiện tại'
              name='password'
              onChange={handleChange('currentPassword')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle current password visibility'
                      onClick={handleClickShowCurrentPassword}
                      edge='end'
                    >
                      {values.showCurrentPassword ? (
                        <VisibilityOff sx={{ fontSize: '1.25rem' }} />
                      ) : (
                        <Visibility sx={{ fontSize: '1.25rem' }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              type={values.showPassword ? 'text' : 'password'}
              margin='normal'
              fullWidth
              label='Mật khẩu mới'
              name='password'
              onChange={handleChange('password')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleClickShowPassword}
                      edge='end'
                    >
                      {values.showPassword ? (
                        <VisibilityOff sx={{ fontSize: '1.25rem' }} />
                      ) : (
                        <Visibility sx={{ fontSize: '1.25rem' }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              type={values.showConfirmPassword ? 'text' : 'password'}
              margin='normal'
              fullWidth
              label='Nhập lại mật khẩu mới'
              name='confirmPassword'
              onChange={handleChange('confirmPassword')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle confirm password visibility'
                      onClick={handleClickShowConfirmPassword}
                      edge='end'
                    >
                      {values.showConfirmPassword ? (
                        <VisibilityOff sx={{ fontSize: '1.25rem' }} />
                      ) : (
                        <Visibility sx={{ fontSize: '1.25rem' }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Lưu thay đổi
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default ChangePassword;
