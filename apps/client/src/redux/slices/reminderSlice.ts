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
      query: (type) => ({
        url: `user/reminders?type=${type}`,
        method: 'GET',
      }),
      providesTags: ['reminderList'],
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
      invalidatesTags: ['reminderList'],
    }),
    dismissReminderById: build.mutation({
      query: ({ id, payload }) => ({
        url: `user/reminders/${id}`,
        method: 'DELETE',
        body: payload,
      }),
      invalidatesTags: ['reminderList'],
    }),
    checkOutReminder: build.mutation({
      query: ({ id, payload }) => ({
        url: `user/reminders/${id}`,
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: ['reminderList'],
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
