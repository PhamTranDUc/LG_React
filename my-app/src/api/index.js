import axiosServices from "./axiosService";

export const fetchJobsApi = () => {
  return axiosServices.get('v1/jobs/job');
};