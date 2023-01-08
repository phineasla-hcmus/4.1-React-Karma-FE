/* eslint-disable import/no-cycle */
import { combineReducers } from 'redux';

import authReducer from './slices/authSlice';
import savedListReducer from './slices/contactSlice';
import reminderReducer from './slices/reminderSlice';
import transferReducer from './slices/transferSlice';
import { apiSlice } from './slices/apiSlice';

export const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authReducer,
  savedList: savedListReducer,
  reminder: reminderReducer,
  transfer: transferReducer,
});
