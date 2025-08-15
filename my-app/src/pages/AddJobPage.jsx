import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setJobForm, resetJobForm } from "../store/slice/addJobSlice";
import { addJobApi, updateJobApi } from "../api/index";
import { JOB_STATUS_MAP, JOB_STATUS_REVERSE_MAP, JOB_FORM_FIELDS } from "../constants/index";
import { toast } from "react-toastify";
import { FileText, Save, Plus, Loader2, Briefcase } from "lucide-react";

export default function AddJobPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const editJob = location.state?.job;

  const role = useSelector((state) => state.auth.user?.role);
  const { user } = useSelector((state) => state.auth);
  const theme = useSelector((state) => state.theme.mode);

  const isEditing = !!editJob?.id;
  const isAdmin = role === "ADMIN";
  const isUser = role === "USER";

  const mappedStatus = isEditing
    ? JOB_STATUS_MAP[editJob?.status] || ""
    : isUser
    ? "Pending"
    : isAdmin
    ? "Accepted"
    : "";

  const initialForm = {
    id: editJob?.id || "",
    company: editJob?.company || "",
    title: editJob?.title || "",
    employee: editJob?.employee || "",
    location: editJob?.location || "",
    phone: editJob?.phone || "",
    email: editJob?.email || "",
    status: mappedStatus,
    appliedDate: editJob?.appliedDate || "",
    notes: editJob?.notes || "",
  };

  const [localForm, setLocalForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(setJobForm(localForm));
  }, [localForm, dispatch]);

  useEffect(() => {
    setLocalForm(initialForm);
  }, [editJob]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateField = (name, value) => {
    if (isEditing && isAdmin && name !== "status" && localForm.email !== user.email) return;

    let error = "";
    if (name === "company" && !value.trim()) error = "Company is required";
    if (name === "title" && !value.trim()) error = "Position is required";
    if (name === "phone") {
      if (!value.trim()) error = "Phone number is required";
      else if (!/^\d{9,15}$/.test(value)) error = "Phone must be 9-15 digits";
    }
    if (name === "email") {
      if (!value.trim()) error = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        error = "Invalid email format";
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validateForm = () => {
    let fields = ["company", "title", "phone", "email"];
    if (isEditing && isAdmin && localForm.email !== user.email) fields = ["status"];

    let isValid = true;
    fields.forEach((field) => {
      validateField(field, localForm[field]);
      if (errors[field]) isValid = false;
    });
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    const payload = {
      company: localForm.company,
      title: localForm.title,
      employee: localForm.employee,
      location: localForm.location,
      phone: localForm.phone,
      email: localForm.email,
      status: JOB_STATUS_REVERSE_MAP[localForm.status] || localForm.status,
      appliedDate: localForm.appliedDate || new Date().toISOString(),
      notes: localForm.notes,
    };

    const apiCall = localForm.id
      ? updateJobApi(localForm.id, payload)
      : addJobApi(payload);

    apiCall
      .then(() => {
        dispatch(resetJobForm());
        setErrors({});
        setLocalForm(initialForm);

        toast.success("Job submitted successfully!", {
          onClose: () => navigate("/dashboard"),
        });
      })
      .catch(() => {
        toast.error("Something went wrong!");
      })
      .finally(() => setLoading(false));
  };

  const getDisabled = (fieldName) => {
    if (!isEditing) return fieldName === "status";
    if (isAdmin && localForm.email === user.email) return false;
    if (isAdmin) return fieldName !== "status";
    if (isUser) return fieldName === "status";
    return false;
  };

  return (
    <div className={`min-h-screen py-8 px-4 transition-all duration-300 relative overflow-hidden ${theme === "dark" ? "bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800" : "bg-gradient-to-br from-gray-50 via-white to-gray-100"}`}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-20 left-10 w-72 h-72 opacity-20 blur-3xl rounded-full ${theme === "dark" ? "bg-gradient-to-r from-blue-600 to-purple-600" : "bg-gradient-to-r from-indigo-400 to-purple-500"}`} />
        <div className={`absolute bottom-20 right-10 w-96 h-96 opacity-10 blur-3xl rounded-full ${theme === "dark" ? "bg-gradient-to-r from-purple-600 to-pink-600" : "bg-gradient-to-r from-purple-400 to-pink-400"}`} />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-8">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 transition-all duration-300 ${theme === "dark" ? "bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg shadow-blue-500/25" : "bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/25"}`}>
            {isEditing ? <Save className="w-8 h-8 text-white" /> : <Plus className="w-8 h-8 text-white" />}
          </div>
          <h1 className={`text-3xl font-bold mb-2 transition-colors duration-300 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>{isEditing ? "Edit Job Application" : "Add New Job"}</h1>
          <p className={`transition-colors duration-300 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>{isEditing ? "Update job application details" : "Fill in the details to add a new job application"}</p>
        </div>

        <div className={`backdrop-blur-sm rounded-2xl border p-8 shadow-2xl transition-all duration-300 ${theme === "dark" ? "bg-slate-800/90 border-gray-700/50 shadow-black/20" : "bg-white/90 border-gray-200/50 shadow-gray-500/10"}`}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {JOB_FORM_FIELDS.map(({ label, name, type, icon: Icon, placeholder }) => (
                <div key={name} className="group">
                  <label className={`flex items-center font-semibold mb-3 transition-colors duration-300 ${theme === "dark" ? "text-gray-200" : "text-gray-700"}`}>
                    <Icon className={`w-5 h-5 mr-2 transition-colors duration-300 ${theme === "dark" ? "text-blue-400" : "text-indigo-500"}`} />
                    {label}
                  </label>
                  <div className="relative">
                    <input
                      type={type}
                      name={name}
                      value={localForm[name]}
                      onChange={handleChange}
                      onBlur={() => validateField(name, localForm[name])}
                      disabled={getDisabled(name)}
                      placeholder={placeholder}
                      className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-opacity-50 backdrop-blur-sm
                        ${getDisabled(name)
                          ? theme === "dark"
                            ? "bg-gray-700/50 border-gray-600 text-gray-400 cursor-not-allowed"
                            : "bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed"
                          : theme === "dark"
                            ? "bg-gray-700/70 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-blue-400 hover:border-gray-500"
                            : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-indigo-400 focus:ring-indigo-400 hover:border-gray-400"
                        }
                      `}
                    />
                  </div>
                  {errors[name] && <p className="text-red-500 text-sm mt-2 flex items-center"><span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>{errors[name]}</p>}
                </div>
              ))}
            </div>

            <div className="group">
              <label className={`flex items-center font-semibold mb-3 transition-colors duration-300 ${theme === "dark" ? "text-gray-200" : "text-gray-700"}`}><Briefcase className={`w-5 h-5 mr-2 transition-colors duration-300 ${theme === "dark" ? "text-purple-400" : "text-purple-500"}`} />Status</label>
              <select
                name="status"
                value={localForm.status}
                onChange={handleChange}
                disabled={getDisabled("status")}
                className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-opacity-50 backdrop-blur-sm
                  ${getDisabled("status")
                    ? theme === "dark"
                      ? "bg-gray-700/50 border-gray-600 text-gray-400 cursor-not-allowed"
                      : "bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed"
                    : theme === "dark"
                      ? "bg-gray-700/70 border-gray-600 text-white focus:border-purple-400 focus:ring-purple-400 hover:border-gray-500"
                      : "bg-white border-gray-300 text-gray-900 focus:border-purple-400 focus:ring-purple-400 hover:border-gray-400"
                  }`}
              >
                {(!isEditing && isUser && <option value="Pending">Pending</option>) ||
                  (!isEditing && isAdmin && <option value="Accepted">Accepted</option>) ||
                  (isEditing && ["Pending", "Accepted", "Rejected"].map((s) => <option key={s} value={s}>{s}</option>))}
              </select>
            </div>

            <div className="group">
              <label className={`flex items-center font-semibold mb-3 transition-colors duration-300 ${theme === "dark" ? "text-gray-200" : "text-gray-700"}`}><FileText className={`w-5 h-5 mr-2 transition-colors duration-300 ${theme === "dark" ? "text-yellow-400" : "text-yellow-500"}`} />Notes</label>
              <textarea
                name="notes"
                value={localForm.notes}
                onChange={handleChange}
                disabled={getDisabled("notes")}
                placeholder="e.g. Interview scheduled next Monday..."
                rows={4}
                className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-opacity-50 resize-none backdrop-blur-sm
                  ${getDisabled("notes")
                    ? theme === "dark"
                      ? "bg-gray-700/50 border-gray-600 text-gray-400 cursor-not-allowed"
                      : "bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed"
                    : theme === "dark"
                      ? "bg-gray-700/70 border-gray-600 text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-yellow-400 hover:border-gray-500"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-yellow-400 focus:ring-yellow-400 hover:border-gray-400"
                  }`}
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-opacity-50 relative overflow-hidden group
                  ${loading 
                    ? theme === "dark"
                      ? "bg-gray-600 cursor-not-allowed"
                      : "bg-gray-400 cursor-not-allowed"
                    : theme === "dark"
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 focus:ring-blue-400 shadow-lg shadow-blue-500/25"
                      : "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 focus:ring-indigo-400 shadow-lg shadow-indigo-500/25"
                  }
                  text-white hover:scale-[1.02] active:scale-[0.98] disabled:hover:scale-100
                `}
              >
                {!loading && <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />}
                <div className="relative z-10 flex items-center justify-center">
                  {loading ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" />Submitting...</> : (isEditing ? <><Save className="w-5 h-5 mr-2" />Update Job</> : <><Plus className="w-5 h-5 mr-2" />Add Job</>)}
                </div>
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
