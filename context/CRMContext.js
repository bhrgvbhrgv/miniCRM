"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const CRMContext = createContext(null);

const EMPTY_FORM = {
  name: "",
  email: "",
  phone: "",
  company: "",
  status: "New"
};

export function CRMProvider({ children }) {
  const [customers, setCustomers] = useState([]);
  const [loadingCustomers, setLoadingCustomers] = useState(true);

  const fetchCustomers = useCallback(async () => {
    setLoadingCustomers(true);
    try {
      const response = await fetch("/api/customers");
      const payload = await response.json();
      setCustomers(payload.data || []);
    } finally {
      setLoadingCustomers(false);
    }
  }, []);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const addCustomer = useCallback(
    async (data) => {
      const response = await fetch("/api/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error("Could not add customer.");
      const payload = await response.json();
      setCustomers((prev) => [payload.data, ...prev]);
      return payload.data;
    },
    []
  );

  const editCustomer = useCallback(async (id, data) => {
    const response = await fetch(`/api/customers/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error("Could not update customer.");
    const payload = await response.json();
    setCustomers((prev) => prev.map((item) => (item.id === id ? payload.data : item)));
    return payload.data;
  }, []);

  const removeCustomer = useCallback(async (id) => {
    const response = await fetch(`/api/customers/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Could not delete customer.");
    setCustomers((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const fetchCustomerById = useCallback(async (id) => {
    const response = await fetch(`/api/customers/${id}`);
    if (!response.ok) return null;
    const payload = await response.json();
    return payload.data;
  }, []);

  const fetchActivities = useCallback(async (customerId) => {
    const response = await fetch(`/api/activities?customerId=${customerId}`);
    const payload = await response.json();
    return payload.data || [];
  }, []);

  const addActivity = useCallback(async (customerId, note) => {
    const response = await fetch("/api/activities", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ customerId, note })
    });
    if (!response.ok) throw new Error("Could not add activity.");
    const payload = await response.json();
    return payload.data;
  }, []);

  const value = useMemo(
    () => ({
      customers,
      loadingCustomers,
      emptyForm: EMPTY_FORM,
      fetchCustomers,
      addCustomer,
      editCustomer,
      removeCustomer,
      fetchCustomerById,
      fetchActivities,
      addActivity
    }),
    [
      customers,
      loadingCustomers,
      fetchCustomers,
      addCustomer,
      editCustomer,
      removeCustomer,
      fetchCustomerById,
      fetchActivities,
      addActivity
    ]
  );

  return <CRMContext.Provider value={value}>{children}</CRMContext.Provider>;
}

export function useCRM() {
  const ctx = useContext(CRMContext);
  if (!ctx) {
    throw new Error("useCRM must be used within CRMProvider");
  }
  return ctx;
}
