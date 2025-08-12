export const MENU_ITEMS = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'add-job', label: 'Add Job' },
  { id: 'settings', label: 'Settings' }
];

export const JOB_STATUS_CLASSES = {
  applied: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
  interview: 'bg-blue-100 text-blue-800',
  default: 'bg-gray-100 text-gray-800',
};

export const getStatusColor = (status) => {
  const key = status?.toLowerCase() || 'default';
  return JOB_STATUS_CLASSES[key] || JOB_STATUS_CLASSES.default;
};

export const JOB_STATUS_MAP = {
  1: 'Applied',
  2: 'Interview',
  3: 'Rejected',
};

export const JOB_STATUS_OPTIONS = [
  'All Status',
  'Applied',
  'Interview',
  'Rejected',
];