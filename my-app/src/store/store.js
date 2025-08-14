import { configureStore } from '@reduxjs/toolkit';
import jobReducer from '../store/slice/jobSlice';
import authReducer from '../store/slice/authSlice';
import addJobReducer from '../store/slice/authSlice';
import themeReducer from './slice/themeSlice';

export const store = configureStore({
  reducer: {
    job: jobReducer,
    auth: authReducer,
    addJob: addJobReducer,
    theme: themeReducer,
  },
});
