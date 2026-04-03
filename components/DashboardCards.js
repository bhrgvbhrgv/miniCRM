"use client";

export default function DashboardCards({ customers }) {
  const counts = customers.reduce(
    (acc, customer) => {
      acc.total += 1;
      acc[customer.status] += 1;
      return acc;
    },
    { total: 0, New: 0, Contacted: 0, Qualified: 0, Closed: 0 }
  );

  return (
    <div className="card-grid">
      <div className="card metric">
        <h3>Total Customers</h3>
        <p>{counts.total}</p>
      </div>
      <div className="card metric">
        <h3>New</h3>
        <p>{counts.New}</p>
      </div>
      <div className="card metric">
        <h3>Contacted</h3>
        <p>{counts.Contacted}</p>
      </div>
      <div className="card metric">
        <h3>Qualified</h3>
        <p>{counts.Qualified}</p>
      </div>
      <div className="card metric">
        <h3>Closed</h3>
        <p>{counts.Closed}</p>
      </div>
    </div>
  );
}
