"use client";
import React from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { updateResult, updateTime } from "@/redux/features/gameResultSlice";
import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import Prize from "../components/prize/prize";
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
  leadName: string;
}


function Page() {
  const { leadId, points, time, quizzId, name } = useAppSelector(
    (state) => state.gameResult as unknown as GameResult
  );
  const dispatch = useAppDispatch();
  const router = useRouter();

  
useEffect(() => {
  // Configuración básica del confeti
  const fireConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 }, // Altura desde donde inicia el confeti
    });
  };

  // Ejecutar el confeti una vez al cargar la página
  fireConfetti();
  
  // Opcional: Repetir el efecto cada pocos segundos
  const interval = setInterval(fireConfetti, 6000); // Dispara cada 3 segundos

  // Limpieza para detener el confeti al desmontar el componente
  return () => clearInterval(interval);
}, []);
  
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
        // handleReset();
        // Redirigimos a la página de agradecimiento
        // router.push("/thankyou");
      } else {
        console.error("Error en la solicitud POST");
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };

  //TODO: revisar si esta funcion sera necesaria en alguna parte o eliminarla de aqui
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

  handleNext();

  return (
    <>
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center text-white">
      <h1 className="text-4xl">¡<span className="font-bold">{name}</span> Gracias por tu paticipación!</h1>
      <p className="text-2xl mt-4">Tu Puntuacion fue de ⭐ {points} puntos.</p>
      <p className="text-2xl mt-4">Tu tiempo fue de ⏰ {time}</p>
     <div className="mb-5">
     <br />
     <Prize  />
     </div>
    </div>
    
    </>
  );
}

export default Page;
