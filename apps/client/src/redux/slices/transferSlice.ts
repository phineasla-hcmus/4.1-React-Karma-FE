/* eslint-disable import/no-cycle */
import { createSlice } from '@reduxjs/toolkit';

import { apiSlice } from './apiSlice';

const initialState = {
  transferInfo: {
    soTK: '',
    nguoiNhan: '',
    tenTK: '',
    nganHang: '',
    soTien: 0,
    noiDung: '',
    loaiCK: '',
    phiCK: '',
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
    makeExternalTransfer: build.mutation({
      query: (payload) => ({
        headers: {
          'Content-type': 'application/json',
        },
        url: 'external/transfer',
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
      query: () => ({
        url: 'user/transactions',
        method: 'GET',
      }),
    }),
    getReminderCheckoutHistory: build.query({
      query: () => ({
        url: 'user/transactions/reminders',
        method: 'GET',
      }),
    }),
    getInternalPaymentAccountInfo: build.query({
      query: (id) => ({
        url: `payment-accounts/${id}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { setTransferInfo } = transferSlice.actions;

export default transferSlice.reducer;

export const {
  useMakeInternalTransferMutation,
  useMakeExternalTransferMutation,
  useRequestOTPForTransferMutation,
  useGetTransactionHistoryQuery,
  useGetReminderCheckoutHistoryQuery,
  useGetInternalPaymentAccountInfoQuery,
} = transferApi;
