import { NextResponse } from "next/server";
import prisma from "@/app/bd";

type ResultInput = {
  leadId: number;
  quizzId: number;
  score: number;
  time: string;
};

export async function POST(request: Request): Promise<NextResponse> {
  try {
    // Parse the JSON body from the request
    const body = await request.json();

    // Extraemos los datos necesarios y convertimos `score` a entero
    const resultInput: ResultInput = {
      leadId: body.leadId,
      quizzId: body.quizzId,
      score: parseInt(body.points, 10), // Convertimos `points` a entero
      
      time: body.time,
    };

    // Create a new result in the database
    const newResult = await prisma.result.create({
      data: {
        leadId: resultInput.leadId,
        quizzId: resultInput.quizzId,
        score: resultInput.score,
        time: resultInput.time,
      },
    });

    // Return the newly created result
    return NextResponse.json(newResult);
  } catch (error: any) {
    return handleError(error);
  }
}

function handleError(error: any): NextResponse {
  console.error("An error occurred:", error);
  return new NextResponse("An error occurred", { status: 500 });
}
