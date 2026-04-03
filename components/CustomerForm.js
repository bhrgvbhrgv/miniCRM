"use client";

import { useEffect, useState } from "react";

const STATUSES = ["New", "Contacted", "Qualified", "Closed"];

export default function CustomerForm({ initialValues, onSubmit, submitLabel, onCancel }) {
  const [form, setForm] = useState(initialValues);

  useEffect(() => {
    setForm(initialValues);
  }, [initialValues]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await onSubmit(form);
  };

  return (
    <form className="card form-grid" onSubmit={handleSubmit}>
      <h2>{submitLabel}</h2>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
      <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" />
      <input name="company" value={form.company} onChange={handleChange} placeholder="Company" />
      <select name="status" value={form.status} onChange={handleChange}>
        {STATUSES.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
      <div className="row">
        <button className="btn" type="submit">
          {submitLabel}
        </button>
        {onCancel ? (
          <button className="btn ghost" type="button" onClick={onCancel}>
            Cancel
          </button>
        ) : null}
      </div>
    </form>
  );
}
