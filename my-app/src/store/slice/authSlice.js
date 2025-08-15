import { createSlice } from '@reduxjs/toolkit';

const savedAuth = JSON.parse(localStorage.getItem('auth')) || {
  isLoggedIn: false,
  user: {
    email: '',
    role: '',
    fullName: '',
    dateOfBirth: '',
    location: '',
    gender: '',
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState: savedAuth,
  reducers: {
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
      localStorage.setItem('auth', JSON.stringify(state));
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = {
        email: '',
        role: '',
        fullName: '',
        dateOfBirth: '',
        location: '',
        gender: '',
      };
      localStorage.removeItem('auth');
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
