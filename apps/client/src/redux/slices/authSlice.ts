/* eslint-disable import/no-cycle */
import { createSlice } from '@reduxjs/toolkit';

import { apiSlice } from './apiSlice';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: '',
    token: '',
  },
  reducers: {
    setToken: (state, { payload }) => {
      state.user = 'Amy Nguyen';
      state.token = payload;
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
        url: 'login',
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

export const { setToken } = authSlice.actions;
export default authSlice.reducer;
export const { useLoginMutation, useUserInfoQuery } = authApi;
