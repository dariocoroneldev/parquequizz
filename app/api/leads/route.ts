import { NextResponse } from "next/server";
import prisma from "@/app/bd";

type Lead = {
  id: number;
  name: string;
  lastname: string;
  email: string;
  phone: string;
  location: string;
};

type LeadInput = {
  name: string;
  lastname: string;
  email: string;
  phone: string;
  location: string;
};

export async function POST(request: Request): Promise<NextResponse<Lead>> {
  try {
    // Parse the JSON body from the request
    const body = await request.json();

    // Validate the incoming data
    const leadInput: LeadInput = {
      name: body.name,
      lastname: body.lastname,
      email: body.email,
      phone: body.phone,
      location: body.location
    };

    // Create a new lead in the database
    const newLead = await prisma.lead.create({
      data: leadInput,
    });

    // Return the newly created lead
    return NextResponse.json(newLead);
  } catch (error: any) {
    return handleError(error);
  }
}

function handleError(error: any): NextResponse<Lead> {
  console.error("An error occurred:", error);
  return new NextResponse("An error occurred", { status: 500 });
}
