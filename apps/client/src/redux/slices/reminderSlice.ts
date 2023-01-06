/* eslint-disable import/no-cycle */
import { createSlice } from '@reduxjs/toolkit';

import { apiSlice } from './apiSlice';

const initialState = {
  reminder: [],
};

export const reminderSlice = createSlice({
  name: 'reminder',
  initialState,
  reducers: {},
});

export const reminderApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getReminderList: build.query({
      query: () => ({
        url: 'user/reminders',
        method: 'GET',
      }),
      providesTags: ['Data'],
    }),
    getMyReminderList: build.query({
      query: () => ({
        url: 'user/myReminders',
        method: 'GET',
      }),
      providesTags: ['Data'],
    }),
    createReminder: build.mutation({
      query: (payload) => ({
        headers: {
          'Content-type': 'application/json',
        },
        url: 'user/reminders',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Data'],
    }),
    dismissReminderById: build.mutation({
      query: ({ id, payload }) => ({
        url: `user/reminders/${id}`,
        method: 'DELETE',
        body: payload,
      }),
      invalidatesTags: ['Data'],
    }),
    checkOutReminder: build.mutation({
      query: (id) => ({
        url: `user/reminders/${id}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Data'],
    }),
  }),
});

export default reminderSlice.reducer;

export const {
  useGetReminderListQuery,
  useGetMyReminderListQuery,
  useCreateReminderMutation,
  useDismissReminderByIdMutation,
  useCheckOutReminderMutation,
} = reminderApi;
