import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Search, Plus, ChevronDown, Filter, Briefcase, Users, TrendingUp, Eye } from "lucide-react";
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

const Select = ({ value, onChange, options, placeholder = "Select an option", theme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative group">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full flex items-center justify-between px-4 py-3.5 rounded-xl border backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-opacity-50
          ${theme === "dark"
            ? "bg-gray-800/70 border-gray-600/50 text-gray-100 hover:bg-gray-700/70 hover:border-gray-500 focus:ring-blue-400"
            : "bg-white/70 border-gray-300/50 text-gray-900 hover:bg-gray-50 hover:border-gray-400 focus:ring-indigo-400"
          }
          ${isOpen ? "ring-2 ring-opacity-50" + (theme === "dark" ? " ring-blue-400" : " ring-indigo-400") : ""}
        `}
      >
        <span className="truncate">{value || placeholder}</span>
        <ChevronDown
          className={`w-4 h-4 ml-2 flex-shrink-0 transition-all duration-300 
                     ${isOpen ? "rotate-180" : ""} 
                     ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
        />
      </button>

      {/* Background glow effect */}
      <div className={`
        absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none
        ${theme === "dark" 
          ? "bg-gradient-to-r from-blue-500/10 to-purple-500/10" 
          : "bg-gradient-to-r from-indigo-500/10 to-purple-500/10"
        }
      `} />

      {isOpen && (
        <div className={`
          absolute z-20 w-full mt-2 rounded-xl border backdrop-blur-sm shadow-2xl max-h-60 overflow-auto transition-all duration-300 transform origin-top
          ${theme === "dark"
            ? "bg-gray-800/95 border-gray-700/50 shadow-black/20"
            : "bg-white/95 border-gray-200/50 shadow-gray-500/20"
          }
        `}>
          {options.map((option, index) => (
            <button
              key={option}
              type="button"
              onClick={() => handleSelect(option)}
              className={`
                w-full text-left px-4 py-3 transition-all duration-200 first:rounded-t-xl last:rounded-b-xl hover:scale-[1.02] transform
                ${value === option
                  ? theme === "dark"
                    ? "bg-gradient-to-r from-blue-600/70 to-purple-600/70 text-white"
                    : "bg-gradient-to-r from-indigo-500/80 to-purple-500/80 text-white"
                  : theme === "dark"
                    ? "text-gray-100 hover:bg-gray-700/50"
                    : "text-gray-900 hover:bg-gray-50"
                }
              `}
              style={{ animationDelay: `${index * 30}ms` }}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const Pagination = ({ totalPages, currentPage, onPageChange, theme }) => {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const getVisiblePages = () => {
    if (totalPages <= 7) return pages;
    
    if (currentPage <= 4) {
      return [...pages.slice(0, 5), '...', totalPages];
    }
    
    if (currentPage >= totalPages - 3) {
      return [1, '...', ...pages.slice(totalPages - 5)];
    }
    
    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
  };

  return (
    <div className="flex justify-center items-center mt-8 gap-2 flex-wrap">
      {getVisiblePages().map((page, index) => (
        page === '...' ? (
          <span key={`ellipsis-${index}`} className={`px-3 py-2 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`
              px-4 py-2.5 rounded-xl border transition-all duration-300 font-medium hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-opacity-50
              ${currentPage === page
                ? theme === "dark"
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white border-transparent shadow-lg shadow-blue-500/25 focus:ring-blue-400"
                  : "bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-transparent shadow-lg shadow-indigo-500/25 focus:ring-indigo-400"
                : theme === "dark"
                  ? "bg-gray-800/70 text-gray-200 border-gray-600/50 hover:bg-gray-700/70 hover:border-gray-500 focus:ring-gray-400"
                  : "bg-white/70 text-gray-700 border-gray-300/50 hover:bg-gray-50 hover:border-gray-400 focus:ring-gray-300"
              }
            `}
          >
            {page}
          </button>
        )
      ))}
    </div>
  );
};

const StatsCard = ({ icon: Icon, title, value, color, theme }) => (
  <div className={`
    rounded-xl p-4 backdrop-blur-sm border transition-all duration-300 hover:scale-[1.02] transform group relative overflow-hidden
    ${theme === "dark"
      ? "bg-gray-800/70 border-gray-700/50 shadow-lg shadow-black/10"
      : "bg-white/70 border-gray-200/50 shadow-lg shadow-gray-500/10"
    }
  `}>
    {/* Background glow */}
    <div className={`
      absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none
      bg-gradient-to-br ${color}/10
    `} />
    
    <div className="relative z-10 flex items-center">
      <div className={`
        p-2 rounded-lg mr-3
        ${theme === "dark" ? `bg-${color}-600/20` : `bg-${color}-100`}
      `}>
        <Icon className={`w-5 h-5 ${theme === "dark" ? `text-${color}-400` : `text-${color}-600`}`} />
      </div>
      <div>
        <p className={`text-sm font-medium ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
          {title}
        </p>
        <p className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
          {value}
        </p>
      </div>
    </div>
  </div>
);

const DashboardPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { jobs, searchTerm, statusFilter } = useSelector((state) => state.job);
  const { user } = useSelector((state) => state.auth);
  const theme = useSelector((state) => state.theme.mode);

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

  // Stats calculations
  const myJobs = jobs.filter(job => job.email === user.email);
  const totalJobs = jobs.length;
  const pendingJobs = jobs.filter(job => job.status === "Pending").length;
  const acceptedJobs = jobs.filter(job => job.status === "Accepted").length;

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
  const handleEdit = (job) => navigate("/add-job", { state: { job, isEditing: true } });

  return (
    <div className={`
      min-h-screen transition-all duration-300 relative overflow-hidden
      ${theme === "dark" 
        ? "bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800" 
        : "bg-gradient-to-br from-gray-50 via-white to-gray-100"
      }
    `}>
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`
          absolute top-20 right-10 w-96 h-96 opacity-10 blur-3xl rounded-full
          ${theme === "dark" 
            ? "bg-gradient-to-r from-blue-600 to-purple-600" 
            : "bg-gradient-to-r from-indigo-400 to-purple-500"
          }
        `} />
        <div className={`
          absolute bottom-20 left-10 w-72 h-72 opacity-20 blur-3xl rounded-full
          ${theme === "dark" 
            ? "bg-gradient-to-r from-purple-600 to-pink-600" 
            : "bg-gradient-to-r from-purple-400 to-pink-400"
          }
        `} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className={`
              text-2xl sm:text-3xl font-bold mb-2 transition-colors duration-300
              ${theme === "dark" 
                ? "bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400" 
                : "text-gray-900"
              }
            `}>
              Job Dashboard
            </h1>
            <p className={`
              transition-colors duration-300
              ${theme === "dark" ? "text-gray-400" : "text-gray-600"}
            `}>
              Manage and track your job applications
            </p>
          </div>
          
          <button
            onClick={handleAddJob}
            className={`
              group relative overflow-hidden px-6 py-3 rounded-xl font-semibold transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-opacity-50 hover:scale-105 active:scale-95
              ${theme === "dark"
                ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg shadow-blue-500/25 focus:ring-blue-400"
                : "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white shadow-lg shadow-indigo-500/25 focus:ring-indigo-400"
              }
            `}
          >
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10 flex items-center">
              <Plus className="w-5 h-5 mr-2" />
              Add New Job
            </div>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard
            icon={Briefcase}
            title="Total Jobs"
            value={totalJobs}
            color="blue"
            theme={theme}
          />
          <StatsCard
            icon={Users}
            title="My Jobs"
            value={myJobs.length}
            color="green"
            theme={theme}
          />
          <StatsCard
            icon={TrendingUp}
            title="Pending"
            value={pendingJobs}
            color="yellow"
            theme={theme}
          />
          <StatsCard
            icon={Eye}
            title="Accepted"
            value={acceptedJobs}
            color="purple"
            theme={theme}
          />
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          {/* Search Input */}
          <div className="flex-1 relative group">
            <Search className={`
              absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-300
              ${theme === "dark" ? "text-gray-400" : "text-gray-500"}
            `} />
            <input
              type="text"
              placeholder="Search jobs by title or company..."
              value={searchTerm}
              onChange={(e) => dispatch(setSearchTerm(e.target.value))}
              className={`
                w-full pl-12 pr-4 py-3.5 rounded-xl border backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-opacity-50
                ${theme === "dark"
                  ? "bg-gray-800/70 border-gray-600/50 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-blue-400 hover:bg-gray-700/70"
                  : "bg-white/70 border-gray-300/50 text-gray-900 placeholder-gray-500 focus:border-indigo-400 focus:ring-indigo-400 hover:bg-gray-50"
                }
              `}
            />
            {/* Search glow effect */}
            <div className={`
              absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none
              ${theme === "dark" 
                ? "bg-gradient-to-r from-blue-500/5 to-purple-500/5" 
                : "bg-gradient-to-r from-indigo-500/5 to-purple-500/5"
              }
            `} />
          </div>

          {/* Filter Select */}
          <div className="w-full lg:w-64">
            <Select
              value={statusFilter}
              onChange={(value) => dispatch(setStatusFilter(value))}
              options={[...JOB_STATUS_OPTIONS, "My Jobs"]}
              placeholder="Filter by status"
              theme={theme}
            />
          </div>
        </div>

        {/* Jobs Grid */}
        {currentJobs.length > 0 ? (
          <>
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mb-8">
              {currentJobs.map((job, index) => (
                <div
                  key={job.id}
                  style={{ animationDelay: `${index * 100}ms` }}
                  className="animate-fade-in"
                >
                  <JobCard
                    job={job}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                </div>
              ))}
            </div>

            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
              theme={theme}
            />
          </>
        ) : (
          /* Empty State */
          <div className={`
            text-center py-16 px-4 rounded-2xl backdrop-blur-sm border transition-all duration-300
            ${theme === "dark"
              ? "bg-gray-800/50 border-gray-700/50"
              : "bg-white/50 border-gray-200/50"
            }
          `}>
            <div className={`
              w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center transition-colors duration-300
              ${theme === "dark"
                ? "bg-gradient-to-r from-blue-600/20 to-purple-600/20"
                : "bg-gradient-to-r from-indigo-100 to-purple-100"
              }
            `}>
              <Briefcase className={`
                w-12 h-12 transition-colors duration-300
                ${theme === "dark" ? "text-blue-400" : "text-indigo-500"}
              `} />
            </div>
            <h3 className={`
              text-xl font-semibold mb-2 transition-colors duration-300
              ${theme === "dark" ? "text-white" : "text-gray-900"}
            `}>
              No jobs found
            </h3>
            <p className={`
              mb-6 transition-colors duration-300
              ${theme === "dark" ? "text-gray-400" : "text-gray-600"}
            `}>
              {searchTerm || statusFilter !== "All Status" 
                ? "Try adjusting your search or filter criteria"
                : "Get started by adding your first job application"
              }
            </p>
            <button
              onClick={handleAddJob}
              className={`
                group relative overflow-hidden px-6 py-3 rounded-xl font-semibold transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-opacity-50 hover:scale-105 active:scale-95
                ${theme === "dark"
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg shadow-blue-500/25 focus:ring-blue-400"
                  : "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white shadow-lg shadow-indigo-500/25 focus:ring-indigo-400"
                }
              `}
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10 flex items-center">
                <Plus className="w-5 h-5 mr-2" />
                Add Your First Job
              </div>
            </button>
          </div>
        )}
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default DashboardPage;