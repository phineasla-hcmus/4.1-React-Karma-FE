/* eslint-disable import/no-cycle */
import { createSlice } from '@reduxjs/toolkit';

import { apiSlice } from './apiSlice';

const initialState = {
  savedList: [],
};

export const savedListSlice = createSlice({
  name: 'savedList',
  initialState,
  reducers: {},
});

export const savedListApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getSavedList: build.query({
      query: () => ({
        url: 'user/saved-list',
        method: 'GET',
      }),
    }),
    addUserToSavedList: build.mutation({
      query: (payload) => ({
        headers: {
          'Content-type': 'application/json',
        },
        url: 'user/saved-list',
        method: 'POST',
        body: payload,
      }),
    }),
    updateUserSavedListById: build.mutation({
      query: ({ soTK, payload }) => ({
        url: `user/saved-list/${soTK}`,
        method: 'PATCH',
        body: payload,
      }),
    }),
    deleteUserSavedListById: build.mutation({
      query: (id) => ({
        url: `user/saved-list/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export default savedListSlice.reducer;

export const {
  useGetSavedListQuery,
  useAddUserToSavedListMutation,
  useUpdateUserSavedListByIdMutation,
  useDeleteUserSavedListByIdMutation,
} = savedListApi;
