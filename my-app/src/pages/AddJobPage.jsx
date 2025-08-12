import React, { useState } from "react";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL + "/v1/jobs/job";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company: form.company,
          title: form.title,
          location: form.location,
          status: Number(form.status),
          appliedDate: form.appliedDate || new Date().toISOString(),
          notes: form.notes,
        }),
      });
      if (res.ok) {
        setSuccess(true);
        setForm({
          company: "",
          title: "",
          location: "",
          status: 3,
          appliedDate: "",
          notes: "",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 60 }}>
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#fff",
          padding: 32,
          borderRadius: 12,
          boxShadow: "0 4px 24px #0001",
          minWidth: 400,
        }}
      >
        <h2 style={{ marginBottom: 24 }}>Add Job</h2>
        <div style={{ marginBottom: 16 }}>
          <label>
            <b>Company</b>
            <input
              type="text"
              name="company"
              value={form.company}
              onChange={handleChange}
              placeholder="e.g. Google"
              required
              style={{ width: "100%", marginTop: 4, padding: 8 }}
            />
          </label>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>
            <b>Position</b>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. Frontend Developer"
              required
              style={{ width: "100%", marginTop: 4, padding: 8 }}
            />
          </label>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>
            <b>Location</b>
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="e.g. HaNoi"
              style={{ width: "100%", marginTop: 4, padding: 8 }}
            />
          </label>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>
            <b>Status</b>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              style={{ width: "100%", marginTop: 4, padding: 8 }}
            >
              {statusOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>
            <b>Applied Date</b>
            <input
              type="date"
              name="appliedDate"
              value={form.appliedDate}
              onChange={handleChange}
              style={{ width: "100%", marginTop: 4, padding: 8 }}
            />
          </label>
        </div>
        <div style={{ marginBottom: 24 }}>
          <label>
            <b>Notes</b>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="e.g. Interview scheduled next Monday..."
              rows={3}
              style={{ width: "100%", marginTop: 4, padding: 8 }}
            />
          </label>
        </div>
        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            background: "#5542e0",
            color: "#fff",
            padding: 12,
            border: "none",
            borderRadius: 6,
            fontWeight: 600,
            fontSize: 16,
            cursor: "pointer",
          }}
        >
          {loading ? "Submitting..." : "Submit Job"}
        </button>
        {success && (
          <div style={{ color: "green", marginTop: 16 }}>
            Job submitted successfully!
          </div>
        )}
      </form>
    </div>
  );
}
