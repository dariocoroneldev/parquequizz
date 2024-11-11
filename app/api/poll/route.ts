import { NextResponse } from "next/server";
import prisma from "@/app/bd";

type SurveyItemType = {
  id: number;
  prompt: string;
  type: string;
  options?: string[];
  maxStars?: number | null;
};

type SurveyResponseType = {
  leadId: number;
  surveyItemId: number;
  answer: string | number;
};

// Endpoint GET: Recupera las preguntas de la encuesta
export async function GET(request: Request) {
  try {
    const surveyItems = await prisma.surveyItem.findMany();
    const formattedSurveyItems: SurveyItemType[] = surveyItems.map((item) => ({
      id: item.id,
      prompt: item.prompt,
      type: item.type as string,
      options: item.options,
      maxStars: item.maxStars,
    }));

    return NextResponse.json(formattedSurveyItems) as NextResponse<SurveyItemType[]>;
  } catch (error: any) {
    return handleError(error);
  }
}

// Endpoint POST: Guarda las respuestas de la encuesta
export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body = await request.json();

    // Extraemos leadId y responses del body
    const { userId, responses } = body;

    // Verificamos si responses es un array
    if (!Array.isArray(responses)) {
      return NextResponse.json({ error: "Invalid data format. Expected an array for 'responses'." }, { status: 400 });
    }

    // Guarda cada respuesta en la base de datos asociándola con su SurveyItem correspondiente
    await Promise.all(
      responses.map(async (response: Omit<SurveyResponseType, 'leadId'>) => {
        await prisma.surveyAnswer.create({
          data: {
            surveyItemId: response.surveyItemId,
            answer: response.answer.toString(),
            leadId: userId, // Usa userId de body como leadId
          },
        });
      })
    );

    return NextResponse.json({ message: "Respuestas guardadas exitosamente" });
  } catch (error: any) {
    return handleError(error);
  }
}

// Función para manejar errores
function handleError(error: any): NextResponse {
  console.error("An error occurred:", error);
  return new NextResponse("An error occurred", { status: 500 });
}
