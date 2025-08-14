import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  form: {
    id: "",
    company: "",
    title: "",
    employee: "",
    location: "",
    phone: "",
    email: "",
    status: "",
    appliedDate: "",
    notes: "",
  },
};

const addJobSlice = createSlice({
  name: "addJob",
  initialState,
  reducers: {
    // Merge form với payload
    setJobForm: (state, action) => {
      state.form = { ...state.form, ...action.payload };
    },
    // Reset về form mặc định
    resetJobForm: (state) => {
      state.form = { ...initialState.form };
    },
  },
});

export const { setJobForm, resetJobForm } = addJobSlice.actions;
export default addJobSlice.reducer;
