import React, { FormEvent, useCallback, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  Alert,
  Avatar,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import ReCAPTCHA from 'react-google-recaptcha';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import { StyledCaptchaWrapper } from './styles';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleClickShowPassword = useCallback(() => {
    setShowPassword((v) => !v);
  }, []);

  const captchaRef = useRef<ReCAPTCHA>(null);

  // const [login, { isLoading: loginLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const token = captchaRef.current?.getValue();
    captchaRef.current?.reset();

    if (token?.length === 0) {
      setError('Vui lòng nhấn vào ô Recaptcha');
      return;
    }

    const data = new FormData(event.currentTarget);

    // try {
    //   const result = await login(
    //     JSON.stringify({
    //       tenDangNhap: data.get('username'),
    //       matKhau: data.get('password'),
    //       recaptchaValue: token,
    //     })
    //   );

    //   if ('error' in result) {
    //     setError('Tên đăng nhập hoặc mật khẩu không hợp lệ');
    //     return;
    //   }

    //   localStorage.setItem('ACCESS_TOKEN', result.data.data.accessToken);
    //   localStorage.setItem('REFRESH_TOKEN', result.data.data.refreshToken);

    // dispatch(setCredentials({ ...result.data.data, user: 'Tam Nguyen' }));
    // } catch (error) {
    //   console.log('error', error);
    // }

    navigate('/');
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
            <Typography
              variant="h5"
              sx={{ fontWeight: 600, textAlign: 'center' }}
            >
              Login as a Banker
            </Typography>
            {error.length > 0 && <Alert severity="error">{error}</Alert>}
            <TextField
              required
              margin="normal"
              fullWidth
              label="Tên đăng nhập"
              name="username"
            />
            <TextField
              required
              label="Mật khẩu"
              name="password"
              sx={{ margin: '0.5rem 0', width: '100%' }}
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? (
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
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Đăng nhập
            </Button>
            <Grid
              sx={{ marginBottom: '1.25rem' }}
              container
              justifyContent="flex-end"
            >
              <Grid item>
                <Link to="/forgot-password">Forgot password</Link>
              </Grid>
            </Grid>
            <StyledCaptchaWrapper>
              <ReCAPTCHA
                sitekey={process.env.REACT_APP_SITE_KEY || ''}
                ref={captchaRef}
              />
            </StyledCaptchaWrapper>
          </Box>
        </Box>
      </Container>
      {/* <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loginLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop> */}
    </Box>
  );
}

export default Login;
