import React, { useState } from "react";
import { addJobApi } from "../api/index";

const statusOptions = [
  { value: 1, label: "Interview" },
  { value: 2, label: "Applied" },
  { value: 3, label: "Offer" },
  { value: 4, label: "Rejected" },
];

export default function AddJobPage() {
  const [form, setForm] = useState({
    company: "",
    title: "",
    location: "",
    status: 2,
    appliedDate: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    addJobApi({
      company: form.company,
      title: form.title,
      location: form.location,
      status: Number(form.status),
      appliedDate: form.appliedDate || new Date().toISOString(),
      notes: form.notes,
    })
      .then(() => {
        setSuccess(true);
        setForm({
          company: "",
          title: "",
          location: "",
          status: 2,
          appliedDate: "",
          notes: "",
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="flex justify-center mt-16">
      <div className="bg-white p-8 rounded-xl shadow-2xl min-w-96 border border-black">
        <h2 className="mb-6 text-2xl font-semibold">Add Job</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block">
              <span className="font-bold">Company</span>
              <input
                type="text"
                name="company"
                value={form.company}
                onChange={handleChange}
                placeholder="e.g. Google"
                required
                className="w-full mt-1 p-2 border border-black-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block">
              <span className="font-bold">Position</span>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="e.g. Frontend Developer"
                required
                className="w-full mt-1 p-2 border border-black-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block">
              <span className="font-bold">Location</span>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="e.g. HaNoi"
                className="w-full mt-1 p-2 border border-black-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block">
              <span className="font-bold">Status</span>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-black-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {statusOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="mb-4">
            <label className="block">
              <span className="font-bold">Applied Date</span>
              <input
                type="date"
                name="appliedDate"
                value={form.appliedDate}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-black-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
          </div>
          <div className="mb-6">
            <label className="block">
              <span className="font-bold">Notes</span>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                placeholder="e.g. Interview scheduled next Monday..."
                rows={3}
                className="w-full mt-1 p-2 border border-black-200 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white p-3 rounded-md font-semibold text-base cursor-pointer transition-colors duration-200"
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