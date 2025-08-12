import { configureStore } from '@reduxjs/toolkit';
import jobReducer from '../store/slice/jobSlice';

export const store = configureStore({
  reducer: {
    job: jobReducer,
  },
});
