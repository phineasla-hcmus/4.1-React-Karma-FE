import { createSlice } from '@reduxjs/toolkit';
import { GET_ITEMS } from '../../api/endpoints';
import { Item } from '../../types';
import { apiSlice } from './apiSlice';

const initialState = {
  items: [],
};

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
});

export const homeApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getItems: build.query({
      query: (id) => ({
        url: `${GET_ITEMS}/${id}`,
        method: 'GET',
      }),
      transformResponse: (response: Item[], meta: any, arg: any) => {
        return response;
      },
    }),
  }),
});

export default homeSlice.reducer;

export const { useGetItemsQuery } = homeApi;
