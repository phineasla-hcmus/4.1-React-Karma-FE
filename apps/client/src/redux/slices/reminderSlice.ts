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
    }),
    getMyReminderList: build.query({
      query: () => ({
        url: 'user/myReminders',
        method: 'GET',
      }),
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
    }),
    dismissReminderById: build.mutation({
      query: ({ id, payload }) => ({
        url: `user/reminders/${id}`,
        method: 'DELETE',
        body: payload,
      }),
    }),

    // TODO
    checkOutReminder: build.mutation({
      query: () => ({
        url: `user/reminders`,
        method: 'DELETE',
      }),
    }),
  }),
});

export default reminderSlice.reducer;

export const {
  useGetReminderListQuery,
  useCreateReminderMutation,
  useDismissReminderByIdMutation,
  useCheckOutReminderMutation,
} = reminderApi;
