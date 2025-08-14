import React from "react";
import { Edit, Trash2, MapPin, Phone, Mail, User, Calendar, FileText } from "lucide-react";
import { getStatusColor } from "../constants/index";

const JobCard = ({ job, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow flex flex-col h-full">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
          <p className="text-gray-600">{job.company}</p>
        </div>
        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
          {job.status}
        </span>
      </div>

      {/* Info */}
      <div className="space-y-1 text-sm text-gray-700 mb-4">
        {job.employee && (
          <p className="flex items-center"><User className="w-4 h-4 mr-2 text-gray-500" /> {job.employee}</p>
        )}
        {job.phone && (
          <p className="flex items-center"><Phone className="w-4 h-4 mr-2 text-gray-500" /> {job.phone}</p>
        )}
        {job.email && (
          <p className="flex items-center"><Mail className="w-4 h-4 mr-2 text-gray-500" /> {job.email}</p>
        )}
        {job.location && (
          <p className="flex items-center"><MapPin className="w-4 h-4 mr-2 text-gray-500" /> {job.location}</p>
        )}
        {job.appliedDate && (
          <p className="flex items-center"><Calendar className="w-4 h-4 mr-2 text-gray-500" /> Applied: {job.appliedDate}</p>
        )}
        {job.notes && (
          <p className="flex items-start"><FileText className="w-4 h-4 mr-2 text-gray-500 mt-1" /> {job.notes}</p>
        )}
      </div>

      {/* Actions */}
      <div className="mt-auto flex justify-end space-x-2">
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
