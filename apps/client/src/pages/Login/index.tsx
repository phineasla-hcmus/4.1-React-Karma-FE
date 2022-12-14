import React, {
  ChangeEvent,
  FormEvent,
  useCallback,
  useRef,
  useState,
} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Avatar, IconButton, InputAdornment } from '@mui/material';
import ReCAPTCHA from 'react-google-recaptcha';
import { StyledCaptchaWrapper } from './styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface State {
  username: string;
  password: string;
  showPassword: boolean;
}

function Login() {
  const [values, setValues] = useState<State>({
    username: '',
    password: '',
    showPassword: false,
  });

  const handleChange = useCallback(
    (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
      setValues((v) => ({ ...v, [prop]: event.target.value }));
    },
    []
  );

  const handleClickShowPassword = useCallback(() => {
    setValues((v) => ({
      ...v,
      showPassword: !v.showPassword,
    }));
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      username: data.get('username'),
      password: data.get('password'),
    });
  };

  const captchaRef = useRef(null);

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
              margin='normal'
              fullWidth
              label='Tên đăng nhập'
              name='username'
            />
            <TextField
              label='Mật khẩu'
              name='password'
              sx={{ margin: '0.5rem 0', width: '100%' }}
              type={values.showPassword ? 'text' : 'password'}
              value={values.password}
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
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Đăng nhập
            </Button>
            <Grid
              sx={{ marginBottom: '1.25rem' }}
              container
              justifyContent='flex-end'
            >
              <Grid item>
                <Link href='/forgot-password' variant='body2'>
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