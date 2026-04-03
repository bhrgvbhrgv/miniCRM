"use client";

import { useMemo, useState } from "react";
import CustomerForm from "../../components/CustomerForm";
import CustomerTable from "../../components/CustomerTable";
import FilterBar from "../../components/FilterBar";
import { useCRM } from "../../context/CRMContext";

export default function CustomersPage() {
  const { customers, loadingCustomers, addCustomer, editCustomer, removeCustomer, emptyForm } =
    useCRM();

  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [companyFilter, setCompanyFilter] = useState("");
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [error, setError] = useState("");

  const companyOptions = useMemo(() => {
    return [...new Set(customers.map((item) => item.company).filter(Boolean))].sort();
  }, [customers]);

  const filteredCustomers = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return customers.filter((customer) => {
      const matchesQuery =
        !normalizedQuery ||
        customer.name.toLowerCase().includes(normalizedQuery) ||
        customer.email.toLowerCase().includes(normalizedQuery);
      const matchesStatus = !statusFilter || customer.status === statusFilter;
      const matchesCompany = !companyFilter || customer.company === companyFilter;
      return matchesQuery && matchesStatus && matchesCompany;
    });
  }, [customers, query, statusFilter, companyFilter]);

  const handleCreate = async (form) => {
    setError("");
    try {
      await addCustomer(form);
    } catch (e) {
      setError(e.message);
    }
  };

  const handleUpdate = async (form) => {
    setError("");
    try {
      await editCustomer(editingCustomer.id, form);
      setEditingCustomer(null);
    } catch (e) {
      setError(e.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this customer?")) return;
    setError("");
    try {
      await removeCustomer(id);
      if (editingCustomer?.id === id) setEditingCustomer(null);
    } catch (e) {
      setError(e.message);
    }
  };

  if (loadingCustomers) return <p>Loading customers...</p>;

  return (
    <section>
      <h1>Customers</h1>
      <p>Manage leads, update status, and track progress.</p>
      {error ? <p className="error">{error}</p> : null}

      <div className="split">
        <CustomerForm
          initialValues={editingCustomer || emptyForm}
          onSubmit={editingCustomer ? handleUpdate : handleCreate}
          submitLabel={editingCustomer ? "Update Customer" : "Add Customer"}
          onCancel={editingCustomer ? () => setEditingCustomer(null) : null}
        />

        <div>
          <FilterBar
            query={query}
            status={statusFilter}
            company={companyFilter}
            companyOptions={companyOptions}
            onQueryChange={setQuery}
            onStatusChange={setStatusFilter}
            onCompanyChange={setCompanyFilter}
          />
          <CustomerTable
            customers={filteredCustomers}
            onEdit={setEditingCustomer}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </section>
  );
}
