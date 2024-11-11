"use client";
import React from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { updateResult, updateTime } from "@/redux/features/gameResultSlice";

interface Question {
  question: string;
  answer: string;
}

interface GameResult {
  leadId: string;
  name: string;
  points: number;
  answers: string[];
  questions: Question[];
  time: string; // Asumimos que el tiempo está en formato MM:SS
  quizzId: number;
}

function Page() {
  const { leadId, points, time, quizzId } = useAppSelector(
    (state) => state.gameResult as unknown as GameResult
  );
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleNext = async () => {
    try {
      // Datos a enviar en el POST
      const payload = {
        leadId: parseInt(leadId, 10), // Convertimos `leadId` a entero si es necesario
        quizzId,
        time,
        points,
      };

      // Hacemos el POST a la API
      const response = await fetch("/api/result", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        // Si el POST fue exitoso, reseteamos el estado del juego
        handleReset();
        // Redirigimos a la página de agradecimiento
        router.push("/thankyou");
      } else {
        console.error("Error en la solicitud POST");
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };

  const handleReset = () => {
    // Payload para resetear el estado global del juego, asignando un valor predeterminado a `quizzId`
    const resetPayload = {
      points: 0,
      answers: [],
      questions: [],
      time: "00:00",
      quizzId: 0,
      
    };
    dispatch(updateResult(resetPayload));
    dispatch(updateTime("00:00")); // Reiniciar el tiempo a cero en el estado global
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <div className="text-xl font-bold mb-4">Detalles del juego:</div>
      <div className="mb-4">
        <p className="font-semibold">Lead ID:</p>
        <p>{leadId}</p>
      </div>
      <div className="mb-4">
        <p className="font-semibold">Quizz ID:</p>
        <p>{quizzId || "No asignado"}</p> {/* Muestra un valor por defecto si `quizzId` es `undefined` */}
      </div>
      <div className="mb-4">
        <p className="font-semibold">Puntos:</p>
        <p>{points}</p>
      </div>
      <div className="mb-4">
        <p className="font-semibold">Tiempo:</p>
        <p>{time}</p>
      </div>
      <button
        onClick={handleNext}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Siguiente
      </button>
    </div>
  );
}

export default Page;
