import axiosServices from "./axiosService";

export const fetchJobsApi = () => {
  return axiosServices.get('v1/jobs/job');
};

export const addJobApi = (data) => {
  return axiosServices.post('v1/jobs/job', data);
};

export const updateJobApi = (id, data) => {
  return axiosServices.put(`v1/jobs/job/${id}`, data);
};

export const loginApi = (data) => {
  return axiosServices.post("http://localhost:8080/api/v1/login", data, {
    headers: { "Content-Type": "application/json" },
  });
};