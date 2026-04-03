import { NextResponse } from "next/server";
import {
  createActivity,
  getCustomerById,
  listActivities
} from "../../../lib/store";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const customerId = searchParams.get("customerId");
  return NextResponse.json({ data: listActivities(customerId) });
}

export async function POST(request) {
  const body = await request.json();
  if (!body?.customerId || !body?.note) {
    return NextResponse.json(
      { error: "customerId and note are required." },
      { status: 400 }
    );
  }

  const customer = getCustomerById(body.customerId);
  if (!customer) {
    return NextResponse.json({ error: "Customer not found." }, { status: 404 });
  }

  const activity = createActivity(body);
  return NextResponse.json({ data: activity }, { status: 201 });
}
