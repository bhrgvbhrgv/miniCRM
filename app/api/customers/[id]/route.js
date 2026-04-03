import { NextResponse } from "next/server";
import {
  deleteCustomer,
  getCustomerById,
  updateCustomer
} from "../../../../lib/store";

export async function GET(_request, { params }) {
  const customer = getCustomerById(params.id);
  if (!customer) {
    return NextResponse.json({ error: "Customer not found." }, { status: 404 });
  }
  return NextResponse.json({ data: customer });
}

export async function PUT(request, { params }) {
  const body = await request.json();
  const customer = updateCustomer(params.id, body);
  if (!customer) {
    return NextResponse.json({ error: "Customer not found." }, { status: 404 });
  }
  return NextResponse.json({ data: customer });
}

export async function DELETE(_request, { params }) {
  const ok = deleteCustomer(params.id);
  if (!ok) {
    return NextResponse.json({ error: "Customer not found." }, { status: 404 });
  }
  return NextResponse.json({ data: { success: true } });
}
