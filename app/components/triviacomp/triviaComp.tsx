"use client";
import React, { useState, useEffect } from "react";
import Timer from "./timer";
import ProgressBar from "@/app/components/triviacomp/progresbar";
import axios from "axios";
import { Question } from "@/app/types/interface";
import { FcAlarmClock } from "react-icons/fc";
import { BiCoinStack } from "react-icons/bi";
import DialogAnswer from "@/app/components/triviacomp/dialog";
import Image from "next/image";
import { useAppSelector, useAppDispatch } from "./../../../redux/hooks";
import { updateResult, updateTime } from "./../../../redux/features/gameResultSlice";
import { useRouter } from 'next/navigation';

const TriviaComp = () => {
  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [error, setError] = useState<any>(null);
  const [points, setPoints] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [message, setMessage] = useState("");
  const [answered, setAnswered] = useState(false);
  const [resetTimer, setResetTimer] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [milliseconds, setMilliseconds] = useState(0);
  const [quizzId, setQuizzId] = useState(0);
  const gameResult = useAppSelector((state) => state.gameResult);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("/api/questions");
        setQuestions(response.data);
        setQuizzId(response.data[0].quizzId);
      } catch (error) {
        setError(error);
      }
    };
    fetchQuestions();
  }, []);

  useEffect(() => {
    if (error) {
      console.error("Error fetching questions:", error);
    }
  }, [error]);

  const formatTime = (milliseconds: number) => {
    const minutes = String(Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
    const seconds = String(Math.floor((milliseconds % (1000 * 60)) / 1000)).padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const finishGame = () => {
    setGameOver(true);
    const finalTime = formatTime(milliseconds); // Convertir a formato MM:SS
    dispatch(updateTime({ time: finalTime })); // Actualizar el estado global con el tiempo en formato MM:SS
     // Redirigir después de la actualización
    router.push('/game-over');
  };

  const handleReset = () => {
    setPoints(0);
    setCurrentQuestion(0);
    setMessage("");
    setAnswered(false);
    setResetTimer(resetTimer + 1);
    setIsPaused(false);
    setGameOver(false);
    setMilliseconds(0); // Reiniciar el tiempo a cero
    const payload = {
      points: 0, 
      answers: [],
      questions: [],
      time: "00:00",
    };
    dispatch(updateResult(payload));
  };

  const handleNextQuestion = () => {
    if (questions && currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      finishGame(); // Llamada a finalizar el juego si es la última pregunta
    }
    setMessage("");
    setAnswered(false);
    setIsPaused(false);

    const payload = {
      leadId: gameResult?.leadId,
      points: points,
      answers: gameResult && gameResult.answers ? [...gameResult.answers, selectedOption] : [selectedOption],
      questions: questions,
      quizzId: quizzId
    };
    dispatch(updateResult(payload));
  };

  const handleClick = (option: string) => {
    if (!answered) {
      if (option === questions![currentQuestion]?.answer) {
        setPoints(points + 1);
        setMessage("Correcto");
      } else {
        setMessage("Incorrecto");
      }
      setAnswered(true);
      setIsPaused(true);
    }
    setSelectedOption(option);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="p-4 bg-[#90b7e1] rounded shadow-md w-full sm:w-3/4 lg:w-1/2">
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-4xl font-bold mb-6 text-[#ffff]">Trivia</h2>
            <ProgressBar
              completed={currentQuestion}
              total={questions?.length}
            />
            <h1 className="text-xl text-center text-[#ffff] font-bold mb-4">
              {questions?.[currentQuestion]?.question}
            </h1>
            <Image
              src={questions?.[currentQuestion]?.image as string}
              alt="Description of your image"
              width={200}
              height={100}
            />
            {message && (
              <div>
                <DialogAnswer message={message} />
              </div>
            )}
            {questions &&
              questions?.[currentQuestion]?.options.map(
                (option: any, index: any) => (
                  <button
                    key={index}
                    className={`mt-2 bg-[#006b33] hover:bg-[#1c4f35] text-white font-bold py-2 px-4 rounded  ${
                      answered && option !== selectedOption
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    onClick={() => handleClick(option)}
                    disabled={answered}
                  >
                    {option}
                  </button>
                )
              )}
          </div>
          <div className="flex justify-between mt-6">
            <button
              className="bg-[#b30707] hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleReset}
            >
              Reiniciar Trivia
            </button>
            <button
              className={`bg-[#006b33] hover:bg-[#1c4f35] text-white font-bold py-2 px-4 rounded ${
                !answered ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleNextQuestion}
              disabled={!answered}
            >
              Siguiente
            </button>
          </div>
        </div>
      <div className="flex justify-between w-full m-5 p-5">
        <div className="mt-4 flex flex-col items-center">
          <div className="flex items-center">
            <p className="mr-2 text-white">Puntos:</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-3xl font-bold text-[#ffff]">{points}</span>
            <BiCoinStack
              className="animate-spin-h"
              style={{ fontSize: "1.5em", color: "#ffff" }}
            />
          </div>
        </div>

        <div className="mt-4 flex flex-col items-center">
          <div className="flex items-center">
            <FcAlarmClock className="mr-2 animate-bounce text-3xl" />
            <p className="mr-2 text-white">Tiempo:</p>
          </div>
          <div>
            <Timer
              isPaused={isPaused}
              reset={resetTimer}
              gameOver={gameOver}
              milliseconds={milliseconds}
              setMilliseconds={setMilliseconds}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TriviaComp;
