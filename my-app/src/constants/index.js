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