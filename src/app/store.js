import { configureStore } from '@reduxjs/toolkit';
import tvReducer from '../features/tvSlice';

export const store = configureStore({
  reducer: {
    tv: tvReducer,
  },
});
