/* eslint-disable no-restricted-globals */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable import/no-cycle */
import {
  BaseQueryApi,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

import axios from '../../api/axios';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://karma-mb60.onrender.com',
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('ACCESS_TOKEN');

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: {}
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    // send refresh token to get new access token
    const refreshResult = await axios
      .post('/auth/refresh', undefined, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('REFRESH_TOKEN')}`,
        },
      })
      .catch((error) => {
        if (error.response.status === 401) {
          localStorage.removeItem('ACCESS_TOKEN');
          localStorage.removeItem('REFRESH_TOKEN');
          location.reload();
        }
      });
    if (refreshResult?.data) {
      const data = refreshResult?.data;

      localStorage.setItem('ACCESS_TOKEN', data.accessToken);
      localStorage.setItem('REFRESH_TOKEN', data.refreshToken);
      // retry the original query with new access token
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ['contactList', 'reminderList'],
  endpoints: () => ({}),
});
