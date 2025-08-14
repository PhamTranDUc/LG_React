import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { addJobApi, updateJobApi } from "../api/index";

const statusOptions = [
  { value: 0, label: "Pending" },
  { value: 1, label: "Interview" },
  { value: 2, label: "Applied" },
  { value: 3, label: "Offer" },
  { value: 4, label: "Rejected" },
];

export default function AddJobPage() {
  const location = useLocation();
  const editJob = location.state?.job;

  const [form, setForm] = useState({
    id: "",
    company: "",
    title: "",
    employee: "",
    location: "",
    phone: "",
    email: "",
    status: 0,
    appliedDate: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editJob) {
      setForm({
        id: editJob.id || "",
        company: editJob.company || "",
        title: editJob.title || "",
        employee: editJob.employee || "",
        location: editJob.location || "",
        phone: editJob.phone || "",
        email: editJob.email || "",
        status:
          statusOptions.find((opt) => opt.label === editJob.status)?.value || 0,
        appliedDate: editJob.appliedDate || "",
        notes: editJob.notes || "",
      });
    }
  }, [editJob]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateField = (name, value) => {
    let error = "";

    if (name === "company" && !value.trim()) {
      error = "Company is required";
    }

    if (name === "title" && !value.trim()) {
      error = "Position is required";
    }

    if (name === "phone") {
      if (!value.trim()) error = "Phone number is required";
      else if (!/^\d{9,15}$/.test(value))
        error = "Phone must be 9-15 digits";
    }

    if (name === "email") {
      if (!value.trim()) error = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        error = "Invalid email format";
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const validateForm = () => {
    const fieldsToValidate = ["company", "title", "phone", "email"];
    let isValid = true;
    fieldsToValidate.forEach((field) => {
      validateField(field, form[field]);
      if (
        field in errors &&
        errors[field] &&
        errors[field].trim().length > 0
      ) {
        isValid = false;
      }
    });
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setSuccess(false);

    const payload = {
      company: form.company,
      title: form.title,
      employee: form.employee,
      location: form.location,
      phone: form.phone,
      email: form.email,
      status: Number(form.status),
      appliedDate: form.appliedDate || new Date().toISOString(),
      notes: form.notes,
    };

    const apiCall = form.id
      ? updateJobApi(form.id, payload)
      : addJobApi(payload);

    apiCall
      .then(() => {
        setSuccess(true);
        setForm({
          id: "",
          company: "",
          title: "",
          employee: "",
          location: "",
          phone: "",
          email: "",
          status: 0,
          appliedDate: "",
          notes: "",
        });
        setErrors({});
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="flex justify-center mt-5 ">
      <div className="bg-white p-8 rounded-xl shadow-2xl min-w-96 border border-black">
        <h2 className="mb-6 text-2xl font-semibold">
          {form.id ? "Edit Job" : "Add Job"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-bold">Company</label>
            <input
              type="text"
              name="company"
              value={form.company}
              onChange={handleChange}
              onBlur={(e) => validateField(e.target.name, e.target.value)}
              placeholder="e.g. Google"
              className="w-full mt-1 p-2 border border-black-200 rounded"
            />
            {errors.company && (
              <p className="text-red-600 text-sm">{errors.company}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block font-bold">Position</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              onBlur={(e) => validateField(e.target.name, e.target.value)}
              placeholder="e.g. Frontend Developer"
              className="w-full mt-1 p-2 border border-black-200 rounded"
            />
            {errors.title && (
              <p className="text-red-600 text-sm">{errors.title}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block font-bold">Employee Name</label>
            <input
              type="text"
              name="employee"
              value={form.employee}
              onChange={handleChange}
              placeholder="e.g. John Doe"
              className="w-full mt-1 p-2 border border-black-200 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block font-bold">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              onBlur={(e) => validateField(e.target.name, e.target.value)}
              placeholder="e.g. 0912345678"
              className="w-full mt-1 p-2 border border-black-200 rounded"
            />
            {errors.phone && (
              <p className="text-red-600 text-sm">{errors.phone}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block font-bold">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              onBlur={(e) => validateField(e.target.name, e.target.value)}
              placeholder="e.g. example@gmail.com"
              className="w-full mt-1 p-2 border border-black-200 rounded"
            />
            {errors.email && (
              <p className="text-red-600 text-sm">{errors.email}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block font-bold">Location</label>
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="e.g. HaNoi"
              className="w-full mt-1 p-2 border border-black-200 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block font-bold">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-black-200 rounded"
            >
              {statusOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block font-bold">Applied Date</label>
            <input
              type="date"
              name="appliedDate"
              value={form.appliedDate}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-black-200 rounded"
            />
          </div>

          <div className="mb-6">
            <label className="block font-bold">Notes</label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="e.g. Interview scheduled next Monday..."
              rows={3}
              className="w-full mt-1 p-2 border border-black-200 rounded resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white p-3 rounded-md font-semibold text-base"
          >
            {loading ? "Submitting..." : "Submit Job"}
          </button>

          {success && (
            <div className="text-green-600 mt-4 text-center font-medium">
              Job submitted successfully!
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
