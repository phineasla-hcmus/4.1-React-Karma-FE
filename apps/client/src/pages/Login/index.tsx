import React, {
  FormEvent,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Alert, Avatar, IconButton, InputAdornment } from '@mui/material';
import ReCAPTCHA from 'react-google-recaptcha';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import axios from '../../api/axios';

import { StyledCaptchaWrapper } from './styles';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleClickShowPassword = useCallback(() => {
    setShowPassword((v) => !v);
  }, []);

  /**
   * https://blog.logrocket.com/implement-recaptcha-react-application/
   */

  const captchaRef = useRef<ReCAPTCHA>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const token = captchaRef.current?.getValue();
    captchaRef.current?.reset();

    if (token?.length === 0) {
      setError('Vui lòng nhấn vào ô Recaptcha');
      return;
    }

    const data = new FormData(event.currentTarget);

    try {
      const response = await axios.post(
        '/login',
        JSON.stringify({
          username: data.get('username'),
          password: data.get('password'),
        }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      console.log('response', response);
      const accessToken = response?.data?.accessToken;
      setError('');
    } catch (err) {
      setError('Đăng nhập thất bại');
    }
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
            {error.length > 0 && <Alert severity="error">{error}</Alert>}
            <TextField
              margin="normal"
              fullWidth
              label="Tên đăng nhập"
              name="username"
            />
            <TextField
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
                <Link href="/forgot-password" variant="body2">
                  Quên mật khẩu
                </Link>
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
    </Box>
  );
}

export default Login;
