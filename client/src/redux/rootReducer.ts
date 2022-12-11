import { combineReducers } from 'redux';
import homeReducer from './slices/homeSlice';
import { apiSlice } from './slices/apiSlice';

export const rootReducer = combineReducers({
  home: homeReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});
