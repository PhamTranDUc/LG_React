import React from "react";
import { useSelector } from "react-redux";
import { Edit, Trash2, MapPin, Phone, Mail, User, Calendar, FileText } from "lucide-react";
import { getStatusColor } from "../constants/index";

const JobCard = ({ job, onEdit, onDelete }) => {
  const user = useSelector((state) => state.auth.user);
  const theme = useSelector((state) => state.theme.mode);
  const userEmail = user?.email;
  const role = user?.role;

  const canEdit = role === "ADMIN" || (role === "USER" && job.email === userEmail);
  const canDelete = role === "ADMIN" || (role === "USER" && job.email === userEmail);

  return (
    <div className={`
      rounded-xl border backdrop-blur-sm p-6 transition-all duration-300 flex flex-col h-full group relative overflow-hidden hover:scale-[1.02] transform
      ${theme === "dark"
        ? "bg-gradient-to-br from-slate-800/90 to-gray-800/90 border-gray-700/50 shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-black/30"
        : "bg-gradient-to-br from-white/90 to-gray-50/90 border-gray-200/50 shadow-lg shadow-gray-500/10 hover:shadow-xl hover:shadow-gray-500/20"
      }
    `}>
      <div className={`
        absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none
        ${theme === "dark"
          ? "bg-gradient-to-br from-blue-500/5 to-purple-500/5"
          : "bg-gradient-to-br from-indigo-500/5 to-purple-500/5"
        }
      `} />

      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className="flex-1 min-w-0">
          <h3 className={`
            text-lg font-semibold mb-1 truncate transition-colors duration-300
            ${theme === "dark" 
              ? "text-white group-hover:text-blue-400" 
              : "text-gray-900 group-hover:text-indigo-600"
            }
          `}>
            {job.title}
          </h3>
          <p className={`
            truncate transition-colors duration-300
            ${theme === "dark" ? "text-gray-300" : "text-gray-600"}
          `}>
            {job.company}
          </p>
        </div>
        
        <div className="ml-3 flex-shrink-0">
          <span className={`
            inline-flex px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 group-hover:scale-105
            ${getStatusColor(job.status, theme)} 
            backdrop-blur-sm border
            ${theme === "dark" ? "border-white/10" : "border-black/10"}
          `}>
            {job.status}
          </span>
        </div>
      </div>

      <div className="space-y-2.5 text-sm mb-4 relative z-10 flex-1">
        {job.employee && (
          <div className={`
            flex items-center p-2 rounded-lg transition-all duration-200 hover:scale-[1.02]
            ${theme === "dark" 
              ? "hover:bg-gray-700/50 text-gray-300" 
              : "hover:bg-gray-50 text-gray-700"
            }
          `}>
            <User className={`
              w-4 h-4 mr-3 flex-shrink-0 transition-colors duration-300
              ${theme === "dark" ? "text-blue-400" : "text-indigo-500"}
            `} />
            <span className="truncate">{job.employee}</span>
          </div>
        )}
        
        {job.phone && (
          <div className={`
            flex items-center p-2 rounded-lg transition-all duration-200 hover:scale-[1.02]
            ${theme === "dark" 
              ? "hover:bg-gray-700/50 text-gray-300" 
              : "hover:bg-gray-50 text-gray-700"
            }
          `}>
            <Phone className={`
              w-4 h-4 mr-3 flex-shrink-0 transition-colors duration-300
              ${theme === "dark" ? "text-green-400" : "text-green-500"}
            `} />
            <span className="truncate">{job.phone}</span>
          </div>
        )}
        
        {job.email && (
          <div className={`
            flex items-center p-2 rounded-lg transition-all duration-200 hover:scale-[1.02]
            ${theme === "dark" 
              ? "hover:bg-gray-700/50 text-gray-300" 
              : "hover:bg-gray-50 text-gray-700"
            }
          `}>
            <Mail className={`
              w-4 h-4 mr-3 flex-shrink-0 transition-colors duration-300
              ${theme === "dark" ? "text-purple-400" : "text-purple-500"}
            `} />
            <span className="truncate">{job.email}</span>
          </div>
        )}
        
        {job.location && (
          <div className={`
            flex items-center p-2 rounded-lg transition-all duration-200 hover:scale-[1.02]
            ${theme === "dark" 
              ? "hover:bg-gray-700/50 text-gray-300" 
              : "hover:bg-gray-50 text-gray-700"
            }
          `}>
            <MapPin className={`
              w-4 h-4 mr-3 flex-shrink-0 transition-colors duration-300
              ${theme === "dark" ? "text-red-400" : "text-red-500"}
            `} />
            <span className="truncate">{job.location}</span>
          </div>
        )}
        
        {job.appliedDate && (
          <div className={`
            flex items-center p-2 rounded-lg transition-all duration-200 hover:scale-[1.02]
            ${theme === "dark" 
              ? "hover:bg-gray-700/50 text-gray-300" 
              : "hover:bg-gray-50 text-gray-700"
            }
          `}>
            <Calendar className={`
              w-4 h-4 mr-3 flex-shrink-0 transition-colors duration-300
              ${theme === "dark" ? "text-yellow-400" : "text-yellow-500"}
            `} />
            <span className="truncate">Applied: {job.appliedDate}</span>
          </div>
        )}
        
        {job.notes && (
          <div className={`
            flex items-start p-2 rounded-lg transition-all duration-200 hover:scale-[1.02]
            ${theme === "dark" 
              ? "hover:bg-gray-700/50 text-gray-300" 
              : "hover:bg-gray-50 text-gray-700"
            }
          `}>
            <FileText className={`
              w-4 h-4 mr-3 flex-shrink-0 mt-0.5 transition-colors duration-300
              ${theme === "dark" ? "text-cyan-400" : "text-cyan-500"}
            `} />
            <span className="line-clamp-2 text-sm leading-relaxed">{job.notes}</span>
          </div>
        )}
      </div>

      <div className="mt-auto flex justify-end space-x-3 relative z-10">
        {canEdit && (
          <button
            onClick={() => onEdit(job)}
            className={`
              inline-flex items-center px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50 group/btn relative overflow-hidden hover:scale-105 active:scale-95
              ${theme === "dark"
                ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white shadow-lg shadow-blue-500/25 focus:ring-blue-400"
                : "bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-400 hover:to-indigo-500 text-white shadow-lg shadow-indigo-500/25 focus:ring-indigo-400"
              }
            `}
          >
            <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 bg-white/10" />
            <Edit className="w-4 h-4 mr-2 relative z-10 transition-transform duration-200 group-hover/btn:rotate-12" />
            <span className="relative z-10">Edit</span>
          </button>
        )}
        
        {canDelete && (
          <button
            onClick={() => onDelete(job.id)}
            className={`
              inline-flex items-center px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50 group/btn relative overflow-hidden hover:scale-105 active:scale-95
              ${theme === "dark"
                ? "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white shadow-lg shadow-red-500/25 focus:ring-red-400"
                : "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 text-white shadow-lg shadow-red-500/25 focus:ring-red-400"
              }
            `}
          >
            <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 bg-white/10" />
            <Trash2 className="w-4 h-4 mr-2 relative z-10 transition-transform duration-200 group-hover/btn:shake" />
            <span className="relative z-10">Delete</span>
          </button>
        )}
      </div>

      <div className={`
        absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none
        ${theme === "dark"
          ? "bg-gradient-to-r from-blue-500/20 via-transparent to-purple-500/20"
          : "bg-gradient-to-r from-indigo-500/20 via-transparent to-purple-500/20"
        }
      `} 
      style={{
        background: `linear-gradient(45deg, transparent 0%, ${theme === "dark" ? "rgba(59, 130, 246, 0.1)" : "rgba(99, 102, 241, 0.1)"} 50%, transparent 100%)`,
        maskImage: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        maskComposite: "xor"
      }} />
    </div>
  );
};

export default JobCard;
