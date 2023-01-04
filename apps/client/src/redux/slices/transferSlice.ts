/* eslint-disable import/no-cycle */
import { createSlice } from '@reduxjs/toolkit';

import { apiSlice } from './apiSlice';

const initialState = {
  transfer: [],
};

export const transferSlice = createSlice({
  name: 'transfer',
  initialState,
  reducers: {},
});

export const transferApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    makeInternalTransfer: build.mutation({
      query: (payload) => ({
        headers: {
          'Content-type': 'application/json',
        },
        url: 'user/transfer',
        method: 'POST',
        body: payload,
      }),
    }),
    requestOTPForTransfer: build.mutation({
      query: (payload) => ({
        headers: {
          'Content-type': 'application/json',
        },
        url: 'transactions/request',
        method: 'POST',
        body: payload,
      }),
    }),
    getTransactionHistory: build.query({
      query: (accountNo) => ({
        url: `user/transactions/${accountNo}`,
        method: 'GET',
      }),
    }),
  }),
});

export default transferSlice.reducer;

export const {
  useMakeInternalTransferMutation,
  useRequestOTPForTransferMutation,
  useGetTransactionHistoryQuery,
} = transferApi;
