/* eslint-disable import/no-cycle */
import { createSlice } from '@reduxjs/toolkit';

import { UserInfo } from '../../types';

import { apiSlice } from './apiSlice';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userInfo: {
      hoTen: '',
      email: '',
      sdt: '',
      soTK: '',
      soDu: 0,
    } as UserInfo,
    token: '',
  },
  reducers: {
    setUserInfo: (state, { payload }) => {
      state.userInfo = payload;
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
      // query: (user) => {
      //   console.log('user login: ', user);
      //   return '';
      // },
    }),
    userInfo: build.query({
      query: () => ({
        url: 'user/info',
        method: 'GET',
      }),
    }),
  }),
});

export const { setUserInfo } = authSlice.actions;
export default authSlice.reducer;
export const { useLoginMutation, useUserInfoQuery } = authApi;
