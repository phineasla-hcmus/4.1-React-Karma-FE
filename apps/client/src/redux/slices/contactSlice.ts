/* eslint-disable import/no-cycle */
import { createSlice } from '@reduxjs/toolkit';

import { Receiver } from '../../types';

import { apiSlice } from './apiSlice';

const initialState = {
  contactList: [] as Receiver[],
};

export const contacSlice = createSlice({
  name: 'contactList',
  initialState,
  reducers: {},
});

export const savedListApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getContactList: build.query({
      query: () => ({
        url: 'user/contacts',
        method: 'GET',
      }),
      providesTags: ['contactList'],
    }),
    addUserToContactList: build.mutation({
      query: (payload) => ({
        headers: {
          'Content-type': 'application/json',
        },
        url: 'user/contacts',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['contactList'],
    }),
    updateUserContactListById: build.mutation({
      query: ({ soTK, payload }) => ({
        url: `user/contacts/${soTK}`,
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: ['contactList'],
    }),
    deleteUserContactListById: build.mutation({
      query: (id) => ({
        url: `user/contacts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['contactList'],
    }),
  }),
});

export default contacSlice.reducer;

export const {
  useGetContactListQuery,
  useAddUserToContactListMutation,
  useUpdateUserContactListByIdMutation,
  useDeleteUserContactListByIdMutation,
} = savedListApi;
