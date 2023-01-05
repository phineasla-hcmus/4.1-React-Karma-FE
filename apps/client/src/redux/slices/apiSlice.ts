/* eslint-disable import/no-cycle */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { RootState } from '../store';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3003/',
    prepareHeaders: (headers, { getState }) => {
      const { token } = (getState() as RootState).auth;

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ['Data'],
  endpoints: () => ({}),
});
