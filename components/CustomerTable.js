"use client";

import Link from "next/link";

export default function CustomerTable({ customers, onEdit, onDelete }) {
  return (
    <div className="card table-wrap">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Company</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.length === 0 ? (
            <tr>
              <td colSpan={6}>No customers found.</td>
            </tr>
          ) : (
            customers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
                <td>{customer.company}</td>
                <td>
                  <span className={`badge ${customer.status.toLowerCase()}`}>{customer.status}</span>
                </td>
                <td className="actions">
                  <Link className="btn tiny" href={`/customers/${customer.id}`}>
                    View
                  </Link>
                  <button className="btn tiny ghost" onClick={() => onEdit(customer)} type="button">
                    Edit
                  </button>
                  <button className="btn tiny danger" onClick={() => onDelete(customer.id)} type="button">
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
