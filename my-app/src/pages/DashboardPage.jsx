import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Search, Plus, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import JobCard from "../components/JobCard";
import {
  setSearchTerm,
  setStatusFilter,
  setJobs,
  deleteJob,
} from "../store/slice/jobSlice";
import { fetchJobsApi, deleteJobApi } from "../api/index";
import { JOB_STATUS_MAP, JOB_STATUS_OPTIONS } from "../constants/index";
import { toast } from "react-toastify";

const Select = ({ value, onChange, options, placeholder = "Select an option" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3.5 border border-black-300 rounded-md bg-white"
      >
        <span className="text-gray-900">{value || placeholder}</span>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-black-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => handleSelect(option)}
              className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors ${
                value === option ? "bg-indigo-50 text-indigo-600" : "text-gray-900"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center items-center mt-6 gap-2">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded-md border ${
            currentPage === page
              ? "bg-indigo-600 text-white border-indigo-600"
              : "bg-white text-gray-700 border-gray-300"
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

const DashboardPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { jobs, searchTerm, statusFilter } = useSelector((state) => state.job);
  const { user } = useSelector((state) => state.auth);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const didFetch = useRef(false);

  useEffect(() => {
    if (didFetch.current) return;
    didFetch.current = true;

    fetchJobsApi()
      .then((response) => {
        const jobsData = response.data.map((job) => ({
          ...job,
          status: JOB_STATUS_MAP[job.status] || "Unknown",
          appliedDate: job.appliedDate?.split("T")[0] || "",
        }));
        dispatch(setJobs(jobsData));
      })
      .catch((err) => console.error("Failed to fetch jobs", err));
  }, [dispatch]);

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All Status" ||
      job.status === statusFilter ||
      (statusFilter === "My Jobs" && job.email === user.email);

    return matchesSearch && matchesStatus;
  });

  const indexOfLastJob = currentPage * itemsPerPage;
  const indexOfFirstJob = indexOfLastJob - itemsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);

  const handleDelete = async (jobId) => {
    if (window.confirm("Bạn có chắc chắn muốn xoá job này?")) {
      try {
        await deleteJobApi(jobId);
        dispatch(deleteJob(jobId));
        toast.success("Xoá job thành công!");
      } catch (err) {
        toast.error("Xoá job thất bại!");
      }
    }
  };
  const handleAddJob = () => navigate("/add-job");
  const handleEdit = (job) =>
    navigate("/add-job", { state: { job, isEditing: true } });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-black-900">
          My Jobs
        </h1>
        <button
          onClick={handleAddJob}
          className="w-full h-11 sm:w-auto inline-flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Job
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={(e) => dispatch(setSearchTerm(e.target.value))}
            className="w-full pl-10 pr-4 py-3 border border-black-300 rounded-md focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        <div className="w-full sm:w-auto sm:min-w-35">
          <Select
            value={statusFilter}
            onChange={(value) => dispatch(setStatusFilter(value))}
            options={[...JOB_STATUS_OPTIONS, "My Jobs"]}
            placeholder="Select Status"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {currentJobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <div className="text-center py-8 sm:py-12 px-4">
          <p className="text-black-500 text-base sm:text-lg mb-4">
            No jobs found matching your criteria.
          </p>
          <button
            onClick={handleAddJob}
            className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Your First Job
          </button>
        </div>
      )}

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default DashboardPage;
