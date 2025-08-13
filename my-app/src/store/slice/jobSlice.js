import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jobs: [],
  activeItem: "dashboard",
  searchTerm: "",
  statusFilter: "All Status",
};

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
    setStatusFilter(state, action) {
      state.statusFilter = action.payload;
    },
    setJobs(state, action) {
      state.jobs = action.payload;
    },
    deleteJob(state, action) {
      state.jobs = state.jobs.filter((job) => job.id !== action.payload);
    },
  },
});

export const { setSearchTerm, setStatusFilter, setJobs, deleteJob } =
  jobSlice.actions;
export default jobSlice.reducer;
