/* eslint-disable prefer-promise-reject-errors */
import { LineAxisOutlined } from '@mui/icons-material';
import axios from 'axios';

export const authProvider = {
  // called when the user attempts to log in
  login: ({
    tenDangNhap,
    matKhau,
    recaptchaValue,
  }: {
    tenDangNhap: string;
    matKhau: string;
    recaptchaValue: string;
  }) => {
    const request = new Request('https://karma-mb60.onrender.com/auth/admin/login', {
      method: 'POST',
      body: JSON.stringify({ tenDangNhap, matKhau, recaptchaValue }),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    return fetch(request)
      .then((response) => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((response) => {
        localStorage.setItem('ACCESS_TOKEN', response.data.accessToken);
        localStorage.setItem('REFRESH_TOKEN', response.data.refreshToken);
        return response;
      });

    // .then(({ accessToken, refreshToken }) => {
    //   console.log('fefe', accessToken, refreshToken);
    //   localStorage.setItem('ACCESS_TOKEN', accessToken);
    //   localStorage.setItem('REFRESH_TOKEN', refreshToken);
    // });
    // axios
    //   .post(
    //     'http://localhost:3003/auth/bankers/login',
    //     JSON.stringify({ tenDangNhap, matKhau, recaptchaValue }),
    //     { headers: { 'Content-Type': 'application/json' } }
    //   )
    //   .then((response) => {
    //     if (response.status < 200 || response.status >= 300) {
    //       throw new Error(response.statusText);
    //     }
    //     localStorage.setItem('ACCESS_TOKEN', response.data.data.accessToken);
    //     localStorage.setItem('REFRESH_TOKEN', response.data.data.refreshToken);
    //     return response;
    //   });
    // .then((response) => {
    //   localStorage.setItem('ACCESS_TOKEN', response.data.data.accessToken);
    //   localStorage.setItem('REFRESH_TOKEN', response.data.data.refreshToken);
    // });
  },
  // called when the user clicks on the logout button
  logout: () => {
    localStorage.removeItem('username');
    return Promise.resolve();
  },
  // called when the API returns an error
  checkError: ({ status }: { status: any }) => {
    if (status === 401 || status === 403) {
      localStorage.removeItem('username');
      return Promise.reject();
    }
    return Promise.resolve();
  },
  // called when the user navigates to a new location, to check for authentication
  checkAuth: () =>
    localStorage.getItem('ACCESS_TOKEN') ? Promise.resolve() : Promise.reject(),
  // called when the user navigates to a new location, to check for permissions / roles
  getPermissions: () =>
    localStorage.getItem('ACCESS_TOKEN') ? Promise.resolve() : Promise.reject(),
};
