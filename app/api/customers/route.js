import { NextResponse } from "next/server";
import { createCustomer, listCustomers } from "../../../lib/store";

export async function GET() {
  return NextResponse.json({ data: listCustomers() });
}

export async function POST(request) {
  const body = await request.json();

  if (!body?.name || !body?.email) {
    return NextResponse.json(
      { error: "Name and email are required." },
      { status: 400 }
    );
  }

  const customer = createCustomer(body);
  return NextResponse.json({ data: customer }, { status: 201 });
}
