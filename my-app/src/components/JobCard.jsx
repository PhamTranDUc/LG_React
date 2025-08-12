import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { getStatusColor } from '../constants/index';

const JobCard = ({ job, onEdit, onDelete }) => {
  return (
    <div className="bg-ưhite rounded-lg shadow-sm border border-black-200 p-6 hover:shadow-md transition-shadow">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{job.title}</h3>
        <p className="text-gray-600 mb-3">{job.company}</p>
        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
          {job.status}
        </span>
      </div>

      <p className="text-sm text-gray-500 mb-4">Applied: {job.appliedDate}</p>

      <div className="flex space-x-2">
        <button
          onClick={() => onEdit(job)}
          className="inline-flex items-center px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
        >
          <Edit className="w-3 h-3 mr-1" />
          Edit
        </button>
        <button
          onClick={() => onDelete(job.id)}
          className="inline-flex items-center px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors"
        >
          <Trash2 className="w-3 h-3 mr-1" />
          Delete
        </button>
      </div>
    </div>
  );
};

export default JobCard;
