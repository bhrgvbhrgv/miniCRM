"use client";

const COLORS = {
  New: "#3b82f6",
  Contacted: "#f59e0b",
  Qualified: "#8b5cf6",
  Closed: "#10b981"
};

export default function StatusChart({ customers }) {
  const counts = customers.reduce(
    (acc, customer) => {
      acc[customer.status] += 1;
      return acc;
    },
    { New: 0, Contacted: 0, Qualified: 0, Closed: 0 }
  );

  const max = Math.max(...Object.values(counts), 1);

  return (
    <div className="card">
      <h2>Status Overview</h2>
      <div className="chart">
        {Object.entries(counts).map(([status, value]) => (
          <div key={status} className="bar-row">
            <span>{status}</span>
            <div className="bar-track">
              <div
                className="bar-fill"
                style={{
                  width: `${(value / max) * 100}%`,
                  backgroundColor: COLORS[status]
                }}
              />
            </div>
            <strong>{value}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}
