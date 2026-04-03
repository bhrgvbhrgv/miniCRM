"use client";

export default function FilterBar({
  query,
  status,
  company,
  companyOptions,
  onQueryChange,
  onStatusChange,
  onCompanyChange
}) {
  return (
    <div className="card filters">
      <input
        placeholder="Search by name or email"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
      />
      <select value={status} onChange={(event) => onStatusChange(event.target.value)}>
        <option value="">All statuses</option>
        <option value="New">New</option>
        <option value="Contacted">Contacted</option>
        <option value="Qualified">Qualified</option>
        <option value="Closed">Closed</option>
      </select>
      <select value={company} onChange={(event) => onCompanyChange(event.target.value)}>
        <option value="">All companies</option>
        {companyOptions.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}
