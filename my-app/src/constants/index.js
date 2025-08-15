import { Building2, Briefcase, User, Phone, Mail, MapPin, Calendar, Users, Shield } from "lucide-react";

export const MENU_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', path: '/dashboard' },
  { id: 'add-job', label: 'Manager job', path: '/add-job' },
  { id: 'settings', label: 'Settings', path: '/settings' }
];

export const JOB_STATUS_CLASSES = {
  accepted: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
  default: 'bg-gray-100 text-gray-800',
};

export const getStatusColor = (status) => {
  const key = status?.toLowerCase() || 'default';
  return JOB_STATUS_CLASSES[key] || JOB_STATUS_CLASSES.default;
};

export const JOB_STATUS_MAP = {
  1: 'Accepted',
  2: 'Rejected',
  3: 'Pending',
};

export const JOB_STATUS_OPTIONS = [
  'All Status',
  'Accepted',
  'Rejected',
  'Pending',
];

export const JOB_STATUS_REVERSE_MAP = {
  Accepted: 1,
  Rejected: 2,
  Pending: 3,
};

export const JOB_FORM_FIELDS = [
  { label: "Company", name: "company", type: "text", icon: Building2, placeholder: "Enter company name" },
  { label: "Position", name: "title", type: "text", icon: Briefcase, placeholder: "Enter job position" },
  { label: "Employee Name", name: "employee", type: "text", icon: User, placeholder: "Enter employee name" },
  { label: "Phone Number", name: "phone", type: "text", icon: Phone, placeholder: "Enter phone number" },
  { label: "Email", name: "email", type: "email", icon: Mail, placeholder: "Enter email address" },
  { label: "Location", name: "location", type: "text", icon: MapPin, placeholder: "Enter location" },
];


export const PROFILE_FIELDS = (user) => [
  { icon: Mail, label: "Email", value: user.email },
  { icon: Calendar, label: "Date of Birth", value: user.dateOfBirth },
  { icon: MapPin, label: "Location", value: user.location },
  { icon: Users, label: "Gender", value: user.gender },
  { icon: Shield, label: "Role", value: user.role },
];

export const PROFILE_THEME = {
  dark: {
    bgGradient: "bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800",
    blob1: "bg-blue-600",
    blob2: "bg-purple-600",
    blob3: "bg-indigo-600",
    card: "bg-gray-800/90 border-gray-700/50 shadow-xl shadow-gray-900/50",
    avatar: "bg-gradient-to-br from-blue-500 to-purple-600 shadow-blue-500/30",
    online: "bg-green-500 border-gray-800",
    fieldBg: "bg-gray-700/50 hover:bg-gray-700/70 border border-gray-600/50",
    fieldIcon: "bg-blue-500/20 text-blue-400",
    fieldLabel: "text-gray-300",
    fieldValue: "text-white",
    btnEdit:
      "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg shadow-blue-500/25 focus:ring-blue-400",
    btnLogout:
      "bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-500/25 focus:ring-red-400",
    roleBadge: "bg-blue-500/20 text-blue-300 border border-blue-500/30",
  },
  light: {
    bgGradient: "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50",
    blob1: "bg-blue-300",
    blob2: "bg-purple-300",
    blob3: "bg-indigo-300",
    card: "bg-white/90 border-white/50 shadow-xl shadow-indigo-200/50",
    avatar: "bg-gradient-to-br from-indigo-500 to-purple-600 shadow-indigo-500/30",
    online: "bg-green-500 border-white",
    fieldBg: "bg-gray-50/80 hover:bg-gray-100 border border-gray-200/50",
    fieldIcon: "bg-indigo-100 text-indigo-600",
    fieldLabel: "text-gray-600",
    fieldValue: "text-gray-800",
    btnEdit:
      "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-500/25 focus:ring-indigo-400",
    btnLogout:
      "bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/25 focus:ring-red-400",
    roleBadge: "bg-indigo-100 text-indigo-700 border border-indigo-200",
  },
};
