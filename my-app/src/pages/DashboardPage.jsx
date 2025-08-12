import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Search, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import JobCard from '../components/JobCard';
import { setSearchTerm, setStatusFilter, setJobs, deleteJob } from '../store/slice/jobSlice';
import { fetchJobsApi } from '../api/index';
import { JOB_STATUS_MAP, JOB_STATUS_OPTIONS } from '../constants/index';

const DashboardPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { jobs, searchTerm, statusFilter } = useSelector(state => state.job);

  useEffect(() => {
    fetchJobsApi()
      .then(response => {
        const jobsData = response.data.map(job => ({
          ...job,
          status: JOB_STATUS_MAP[job.status] || 'Unknown',
          appliedDate: job.appliedDate.split('T')[0],
        }));
        dispatch(setJobs(jobsData));
      })
      .catch(err => {
        console.error('Failed to fetch jobs', err);
      });
  }, [dispatch]);

  const filteredJobs = jobs.filter(job => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'All Status' || job.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleDelete = (jobId) => dispatch(deleteJob(jobId));
  const handleAddJob = () => navigate('/add-job');
  const handleEdit = (job) => console.log('Edit job:', job);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-black-900">My Jobs</h1>
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
        
        <div className="w-full sm:w-auto sm:min-w-[140px]">
          <select
            value={statusFilter}
            onChange={(e) => dispatch(setStatusFilter(e.target.value))}
            className="w-full appearance-none px-4 py-3.5 pr-8 border border-black-300 rounded-md bg-white focus:ring-indigo-500 focus:border-transparent cursor-pointer"
          >
            {JOB_STATUS_OPTIONS.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {filteredJobs.map((job) => (
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
          <p className="text-black-500 text-base sm:text-lg mb-4">No jobs found matching your criteria.</p>
          <button
            onClick={handleAddJob}
            className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Your First Job
          </button>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;