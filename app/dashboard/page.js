"use client";

import DashboardCards from "../../components/DashboardCards";
import StatusChart from "../../components/StatusChart";
import { useCRM } from "../../context/CRMContext";

export default function DashboardPage() {
  const { customers, loadingCustomers } = useCRM();

  if (loadingCustomers) return <p>Loading dashboard...</p>;

  return (
    <section>
      <h1>Dashboard</h1>
      <p>Quick summary of customers by status.</p>
      <DashboardCards customers={customers} />
      <StatusChart customers={customers} />
    </section>
  );
}
