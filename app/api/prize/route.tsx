import { NextResponse } from "next/server";
import prisma from "@/app/bd";
import QRCode from "qrcode";
import { randomUUID } from 'crypto';

// Genera un UUID y un código simplificado
function generateUserCode() {
  const uuid = randomUUID();
  const userCode = uuid.split('-')[0]; // Extrae los primeros 8 caracteres (puedes ajustar)
  return { uuid, userCode };
}

// Ejemplo de uso
const { uuid, userCode } = generateUserCode();
console.log(`UUID completo: ${uuid}`);  // Ejemplo: '3b12f1df-52a9-4b5f-82a5-0f5a3d8b5f1a'
console.log(`Código simplificado para el usuario: ${userCode}`);  // Ejemplo: '3b12f1df'

type PrizeType = {
  id: string;
  name: string;
  description?: string;
  code: string;
  qrCode?: string;
  status: "AVAILABLE" | "ASSIGNED" | "USED" | "EXPIRED";
  type: "DISCOUNT" | "PRODUCT" | "TICKET" | "VOUCHER" | "SERVICE";
  value?: number | null;
  userId?: string | null;
  createdAt: Date;
  expiresAt?: Date | null;
};



// Endpoint GET: Recupera un premio específico por ID o todos los premios si no hay ID
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (id) {
      // Si se proporciona un ID, busca solo ese premio
      const prize = await prisma.prize.findUnique({
        where: { id },
      });

      if (!prize) {
        return NextResponse.json({ error: "Premio no encontrado" }, { status: 404 });
      }

      // Formateo de datos para el premio específico
      const formattedPrize: PrizeType = {
        id: prize.id,
        name: prize.name,
        description: prize.description || "",
        code: prize.code,
        qrCode: prize.qrCode || "",
        status: prize.status as "AVAILABLE" | "ASSIGNED" | "USED" | "EXPIRED",
        type: prize.type as "DISCOUNT" | "PRODUCT" | "TICKET" | "VOUCHER" | "SERVICE",
        value: prize.value || null,
        userId: prize.leadId ? prize.leadId.toString() : null,
        createdAt: prize.createdAt,
        expiresAt: prize.expiresAt || null,
      };

      return NextResponse.json(formattedPrize);
    } else {
      // Si no hay ID, devuelve todos los premios
      const prizes = await prisma.prize.findMany();
      const formattedPrizes: PrizeType[] = prizes.map((prize) => ({
        id: prize.id,
        name: prize.name,
        description: prize.description || "",
        code: prize.code,
        qrCode: prize.qrCode || "",
        status: prize.status as "AVAILABLE" | "ASSIGNED" | "USED" | "EXPIRED",
        type: prize.type as "DISCOUNT" | "PRODUCT" | "TICKET" | "VOUCHER" | "SERVICE",
        value: prize.value || null,
        userId: prize.leadId ? prize.leadId.toString() : null,
        createdAt: prize.createdAt,
        expiresAt: prize.expiresAt || null,
      }));

      return NextResponse.json(formattedPrizes) as NextResponse<PrizeType[]>;
    }
  } catch (error: any) {
    return handleError(error);
  }
}

// Función para manejar errores



// Endpoint POST: Crea un nuevo premio y genera un código QR
export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body = await request.json();
    const { name, description, type, value, expiresAt } = body;

    // Generar un código único para el premio
    const code = generateUniqueCode();

    // Generar el QR Code en base64
    const qrCodeDataUrl = await QRCode.toDataURL(code);

    // Crear un nuevo premio en la base de datos
    const newPrize = await prisma.prize.create({
      data: {
        name,
        description,
        type,
        value,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
        status: "AVAILABLE",
        code,
        qrCode: qrCodeDataUrl, // Guardar el QR en formato base64
      },
    });

    return NextResponse.json(newPrize);
  } catch (error: any) {
    return handleError(error);
  }
}

// Función para manejar errores
function handleError(error: any): NextResponse {
  console.error("An error occurred:", error);
  return new NextResponse("An error occurred", { status: 500 });
}

// Función para generar un código único
function generateUniqueCode(): string {
  return uuid;
}


// Endpoint PATCH: Modifica un premio para agregar leadId y cambiar status a USED
export async function PATCH(request: Request): Promise<NextResponse> {
    try {
      const body = await request.json();
      const { id, leadId } = body;
  
      if (!id || !leadId) {
        return NextResponse.json({ error: "ID y leadId son requeridos" }, { status: 400 });
      }
  
      // Actualizar el premio
      const updatedPrize = await prisma.prize.update({
        where: { id },
        data: {
          leadId,
          status: "ASSIGNED",
        },
      });
  
      return NextResponse.json(updatedPrize);
    } catch (error: any) {
      return handleError(error);
    }
  }
  
  
  