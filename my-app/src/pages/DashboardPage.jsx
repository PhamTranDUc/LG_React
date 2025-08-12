import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Search, Plus } from 'lucide-react';
import JobCard from '../components/JobCard';
import { setSearchTerm, setStatusFilter, setJobs, deleteJob } from '../store/slice/jobSlice';
import { fetchJobsApi } from '../api/index';
import { JOB_STATUS_MAP, JOB_STATUS_OPTIONS } from '../constants/index';

const DashboardPage = () => {
  const dispatch = useDispatch();
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
  const handleAddJob = () => console.log('Add new job');
  const handleEdit = (job) => console.log('Edit job:', job);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">My Jobs</h2>
        <button
          onClick={handleAddJob}
          className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Job
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={(e) => dispatch(setSearchTerm(e.target.value))}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => dispatch(setStatusFilter(e.target.value))}
          className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          {JOB_STATUS_OPTIONS.map(option => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No jobs found matching your criteria.</p>
          <button
            onClick={handleAddJob}
            className="mt-4 inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
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
