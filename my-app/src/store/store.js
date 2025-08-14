import { configureStore } from '@reduxjs/toolkit';
import jobReducer from '../store/slice/jobSlice';
import authReducer from '../store/slice/authSlice';
import addJobReducer from '../store/slice/authSlice';

export const store = configureStore({
  reducer: {
    job: jobReducer,
    auth: authReducer,
    addJob: addJobReducer,
  },
});
