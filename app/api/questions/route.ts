import { NextResponse } from "next/server";
import prisma from "@/app/bd";

type Question = {
  id: number;
  question: string;
  answer: string;
  options: string[];
};

export async function GET(request: Request): Promise<NextResponse<Question[]>> {
  try {
    const questions = await prisma.questions.findMany();
    return NextResponse.json(questions);
  } catch (error: any) {
    return handleError(error);
  }
}

function handleError(error: any): NextResponse<Question[]> {
  console.error("An error occurred:", error);
  return new NextResponse("An error occurred", { status: 500 });
}
