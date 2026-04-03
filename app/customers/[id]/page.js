"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ActivityTimeline from "../../../components/ActivityTimeline";
import { useCRM } from "../../../context/CRMContext";

export default function CustomerDetailPage() {
  const { fetchCustomerById, fetchActivities, addActivity } = useCRM();
  const params = useParams();
  const [customer, setCustomer] = useState(null);
  const [activities, setActivities] = useState([]);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const customerId = params?.id;

  useEffect(() => {
    if (!customerId) return;

    async function load() {
      setLoading(true);
      const [customerData, activityData] = await Promise.all([
        fetchCustomerById(customerId),
        fetchActivities(customerId)
      ]);
      setCustomer(customerData);
      setActivities(activityData);
      setLoading(false);
    }
    load();
  }, [customerId, fetchCustomerById, fetchActivities]);

  const handleAddNote = async (event) => {
    event.preventDefault();
    if (!note.trim()) return;

    setError("");
    try {
      const created = await addActivity(customerId, note.trim());
      setActivities((prev) => [created, ...prev]);
      setNote("");
    } catch (e) {
      setError(e.message);
    }
  };

  if (loading) return <p>Loading customer details...</p>;
  if (!customer)
    return (
      <section>
        <h1>Customer not found</h1>
        <Link href="/customers" className="btn">
          Back to customers
        </Link>
      </section>
    );

  return (
    <section>
      <h1>{customer.name}</h1>
      <p>{customer.email}</p>
      <div className="card customer-detail">
        <p>
          <strong>Phone:</strong> {customer.phone || "N/A"}
        </p>
        <p>
          <strong>Company:</strong> {customer.company || "N/A"}
        </p>
        <p>
          <strong>Status:</strong> {customer.status}
        </p>
      </div>

      <form className="card note-form" onSubmit={handleAddNote}>
        <h2>Add Activity Note</h2>
        {error ? <p className="error">{error}</p> : null}
        <textarea
          placeholder='Example: "Called client and shared proposal."'
          rows={3}
          value={note}
          onChange={(event) => setNote(event.target.value)}
        />
        <button className="btn" type="submit">
          Add Note
        </button>
      </form>

      <ActivityTimeline activities={activities} />
    </section>
  );
}
