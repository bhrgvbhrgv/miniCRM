const STATUSES = ["New", "Contacted", "Qualified", "Closed"];

function makeId(prefix) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

function nowISO() {
  return new Date().toISOString();
}

function createInitialData() {
  const customers = [
    {
      id: makeId("cust"),
      name: "Aarav Sharma",
      email: "aarav@northstar.io",
      phone: "+91 98765 11223",
      company: "Northstar Labs",
      status: "New",
      createdAt: nowISO(),
      updatedAt: nowISO()
    },
    {
      id: makeId("cust"),
      name: "Meera Patel",
      email: "meera@novapulse.com",
      phone: "+91 90123 44556",
      company: "NovaPulse",
      status: "Qualified",
      createdAt: nowISO(),
      updatedAt: nowISO()
    }
  ];

  const activities = [
    {
      id: makeId("act"),
      customerId: customers[0].id,
      note: "Initial email sent.",
      createdAt: nowISO()
    },
    {
      id: makeId("act"),
      customerId: customers[1].id,
      note: "Qualified after discovery call.",
      createdAt: nowISO()
    }
  ];

  return { customers, activities };
}

function getStore() {
  if (!globalThis.__CRM_STORE__) {
    globalThis.__CRM_STORE__ = createInitialData();
  }
  return globalThis.__CRM_STORE__;
}

export function listCustomers() {
  return [...getStore().customers].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function getCustomerById(id) {
  return getStore().customers.find((customer) => customer.id === id) || null;
}

export function createCustomer(payload) {
  const timestamp = nowISO();
  const customer = {
    id: makeId("cust"),
    name: payload.name || "",
    email: payload.email || "",
    phone: payload.phone || "",
    company: payload.company || "",
    status: STATUSES.includes(payload.status) ? payload.status : "New",
    createdAt: timestamp,
    updatedAt: timestamp
  };

  getStore().customers.push(customer);
  return customer;
}

export function updateCustomer(id, payload) {
  const store = getStore();
  const index = store.customers.findIndex((customer) => customer.id === id);
  if (index === -1) return null;

  const current = store.customers[index];
  const updated = {
    ...current,
    name: payload.name ?? current.name,
    email: payload.email ?? current.email,
    phone: payload.phone ?? current.phone,
    company: payload.company ?? current.company,
    status: payload.status && STATUSES.includes(payload.status) ? payload.status : current.status,
    updatedAt: nowISO()
  };

  store.customers[index] = updated;
  return updated;
}

export function deleteCustomer(id) {
  const store = getStore();
  const customerExists = store.customers.some((customer) => customer.id === id);
  if (!customerExists) return false;

  store.customers = store.customers.filter((customer) => customer.id !== id);
  store.activities = store.activities.filter((activity) => activity.customerId !== id);
  return true;
}

export function listActivities(customerId) {
  return getStore()
    .activities.filter((activity) => (customerId ? activity.customerId === customerId : true))
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function createActivity(payload) {
  const activity = {
    id: makeId("act"),
    customerId: payload.customerId,
    note: payload.note || "",
    createdAt: nowISO()
  };
  getStore().activities.push(activity);
  return activity;
}

export function getStatusOptions() {
  return STATUSES;
}
