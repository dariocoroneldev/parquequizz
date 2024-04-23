"use client";
import React from "react";
import { useAppSelector } from "@/redux/hooks";

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
  time: number;
}

function Page() {
  const { leadId, name, points, answers, questions, time } = useAppSelector(
    (state) => state.gameResult as unknown as GameResult
  );

  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <div className="text-xl font-bold mb-4">Detalles del juego:</div>
      <div className="mb-4">
        <p className="font-semibold">Lead ID:</p>
        <p>{leadId}</p>
      </div>
      <div className="mb-4">
        <p className="font-semibold">Nombre:</p>
        <p>{name}</p>
      </div>
      <div className="mb-4">
        <p className="font-semibold">Puntos:</p>
        <p>{points}</p>
      </div>
      <div className="mb-4">
        {questions?.map((question, index) => (
          <div key={index} className="mb-6">
            <p className="font-semibold">Pregunta:</p>
            <p>{question.question}</p>
            <div className="flex items-center mt-2">
              <p className="font-semibold mr-4">Respuesta:</p>
              <p>
                {question.answer}
              </p>
              {question.answer !== answers[index] && (
                <p className="text-red-500">
                  <br />  
                  respuesta incorrecta: {answers[index]}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
      <div>
        <p className="font-semibold">Tiempo:</p>
        <p>{time}</p>
      </div>
    </div>
  );
}

export default Page;
