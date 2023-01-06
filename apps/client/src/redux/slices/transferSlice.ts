/* eslint-disable import/no-cycle */
import { createSlice } from '@reduxjs/toolkit';

import { apiSlice } from './apiSlice';

const initialState = {
  transferInfo: {
    soTK: '',
    soTien: 0,
    noiDungCK: '',
    hinhThucThanhToan: '',
  },
};

export const transferSlice = createSlice({
  name: 'transfer',
  initialState,
  reducers: {
    setTransferInfo: (state, { payload }) => {
      state.transferInfo = payload;
    },
  },
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

export const { setTransferInfo } = transferSlice.actions;

export default transferSlice.reducer;

export const {
  useMakeInternalTransferMutation,
  useRequestOTPForTransferMutation,
  useGetTransactionHistoryQuery,
} = transferApi;
