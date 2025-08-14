import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setJobForm, resetJobForm } from "../store/slice/addJobSlice";
import { addJobApi, updateJobApi } from "../api/index";
import { JOB_STATUS_MAP, JOB_STATUS_REVERSE_MAP } from "../constants/index";
import { toast } from "react-toastify";

export default function AddJobPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const editJob = location.state?.job;

  const role = useSelector((state) => state.auth.user?.role);
  const { user } = useSelector((state) => state.auth); 
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
    if (!isEditing) {
      if (fieldName === "status") return true;
      return false;
    }

    if (isAdmin && localForm.email === user.email) return false;

    if (isAdmin) return fieldName !== "status";
    if (isUser) return fieldName === "status"; 

    return false;
  };

  return (
    <div className="flex justify-center mt-5 px-2">
      <div className="bg-white p-8 rounded-xl shadow-2xl border border-black
                      w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl">
        <h2 className="mb-6 text-2xl font-semibold">
          {isEditing ? "Edit Job" : "Add Job"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: "Company", name: "company", type: "text" },
              { label: "Position", name: "title", type: "text" },
              { label: "Employee Name", name: "employee", type: "text" },
              { label: "Phone Number", name: "phone", type: "text" },
              { label: "Email", name: "email", type: "email" },
              { label: "Location", name: "location", type: "text" },
            ].map(({ label, name, type }) => (
              <div className="mb-4" key={name}>
                <label className="block font-bold">{label}</label>
                <input
                  type={type}
                  name={name}
                  value={localForm[name]}
                  onChange={handleChange}
                  onBlur={() => validateField(name, localForm[name])}
                  disabled={getDisabled(name)}
                  className={`w-full mt-1 p-2 border rounded ${
                    getDisabled(name)
                      ? "bg-gray-200 cursor-not-allowed"
                      : "border-black-200"
                  }`}
                  placeholder={`Enter ${label}`}
                />
                {errors[name] && (
                  <p className="text-red-600 text-sm">{errors[name]}</p>
                )}
              </div>
            ))}

            {/* Status */}
            <div className="mb-4">
              <label className="block font-bold">Status</label>
              <select
                name="status"
                value={localForm.status}
                onChange={handleChange}
                disabled={getDisabled("status")}
                className={`w-full mt-1 p-2 border rounded ${
                  getDisabled("status")
                    ? "bg-gray-200 cursor-not-allowed"
                    : "border-black-200"
                }`}
              >
                {(!isEditing && isUser && <option value="Pending">Pending</option>) ||
                  (!isEditing && isAdmin && <option value="Accepted">Accepted</option>) ||
                  (isEditing &&
                    ["Pending", "Accepted", "Rejected"].map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    )))}
              </select>
            </div>

            {/* Applied Date */}
            <div className="mb-4">
              <label className="block font-bold">Applied Date</label>
              <input
                type="date"
                name="appliedDate"
                value={localForm.appliedDate}
                onChange={handleChange}
                disabled={getDisabled("appliedDate")}
                className={`w-full mt-1 p-2 border rounded ${
                  getDisabled("appliedDate")
                    ? "bg-gray-200 cursor-not-allowed"
                    : "border-black-200"
                }`}
              />
            </div>

            {/* Notes */}
            <div className="mb-6 md:col-span-2">
              <label className="block font-bold">Notes</label>
              <textarea
                name="notes"
                value={localForm.notes}
                onChange={handleChange}
                disabled={getDisabled("notes")}
                placeholder="e.g. Interview scheduled next Monday..."
                rows={3}
                className={`w-full mt-1 p-2 border rounded resize-none ${
                  getDisabled("notes")
                    ? "bg-gray-200 cursor-not-allowed"
                    : "border-black-200"
                }`}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white p-3 rounded-md font-semibold text-base"
          >
            {loading ? "Submitting..." : isEditing ? "Update Job" : "Add Job"}
          </button>
        </form>
      </div>
    </div>
  );
}
