/* eslint-disable import/no-cycle */
import { createSlice } from '@reduxjs/toolkit';

import { UserInfo } from '../../types';
import { RootState } from '../store';

import { apiSlice } from './apiSlice';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {
      hoTen: '',
      email: '',
      sdt: '',
      soTK: '',
      soDu: 0,
      taiKhoanThanhToan: {
        soTK: '',
        soDu: 0,
        maTK: 0,
        hoatDong: false,
      },
    } as UserInfo,
    token: null,
  },
  reducers: {
    setUserInfo: (state, { payload }) => {
      state.user = payload;
    },
    logOut: (state) => {
      // state.user = {
      //   hoTen: '',
      //   email: '',
      //   sdt: '',
      //   soTK: '',
      //   soDu: 0,
      // } as UserInfo;
      // state.token = null;
      localStorage.removeItem('ACCESS_TOKEN');
      localStorage.removeItem('REFRESH_TOKEN');
    },
  },
});

export const authApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (payload) => ({
        headers: {
          'Content-type': 'application/json',
        },
        url: 'auth/login',
        method: 'POST',
        body: payload,
      }),
    }),
    logout: build.mutation({
      query: () => ({
        headers: {
          'Content-type': 'application/json',
        },
        url: 'auth/logout',
        method: 'POST',
      }),
    }),
    userInfo: build.query({
      query: () => ({
        url: 'user/info',
        method: 'GET',
      }),
    }),
  }),
});

export const { setUserInfo, logOut } = authSlice.actions;
export default authSlice.reducer;
export const { useLoginMutation, useLogoutMutation, useUserInfoQuery } =
  authApi;
export const selectCurrentToken = (state: RootState) => state.auth.token;
