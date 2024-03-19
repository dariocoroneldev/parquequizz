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
import { updateResult } from "./../../../redux/features/gameResultSlice";

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
  const [lastTime, setLastTime] = useState(0);
  const gameResult = useAppSelector((state) => state.gameResultReducer);
  const [milliseconds, setMilliseconds] = useState(0)
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("/api/questions");
        setQuestions(response.data);
      } catch (error) {
        setError(error);
      }
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("/api/questions");
        setQuestions(response.data);
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

  const handleReset = () => {
    setPoints(0);
    setCurrentQuestion(0);
    setMessage("");
    setAnswered(false);
    setResetTimer(resetTimer + 1);
    setIsPaused(false);
    setGameOver(false);
    const payload = {
      leadId: null, // Reinicia el leadId
      points: 0, // Reinicia los puntos
      answers: [], // Reinicia las respuestas
      questions: [], // Reinicia las preguntas
      time: 0, // Reinicia los temporizadores
    };
    dispatch(updateResult(payload));
  };

  const handleNextQuestion = () => {
    if (questions && currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setGameOver(true);
    }
    setMessage("");
    setAnswered(false);
    setIsPaused(false);
    

    const payload = {
      leadId: gameResult.leadId, // Mantén el leadId existente
      points: points, // Actualiza los puntos
      answers: [...gameResult.answers, selectedOption],
      questions: questions, // Mantén las preguntas anteriores
      // time: milliseconds, // Aqui debe actualizerse el tiempo actual al finalizar cada respuesta dejandoa asi el ultimo tiempo en la ultima pregunta
    };
    dispatch(updateResult(payload));
    console.log(gameResult)
    console.log(milliseconds)
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
  console.log(gameResult)
  return (
    // GAME OVER SCREEN
    <div className="flex flex-col items-center justify-center h-full">
      {gameOver ? (
        <div className="p-4 bg-white rounded shadow-md w-full sm:w-3/4 lg:w-1/2 ">
          <h2 className="text-2xl font-bold mb-4">Game Over</h2>
          <ProgressBar
            completed={currentQuestion + 1}
            total={questions?.length}
          />
          <h2 className="text-xl font-bold mb-4">Questions and Answers</h2>
          {questions &&
            questions.map((question: Question) => (
              <div key={question.id} className="mb-4">
                <p className="font-bold">Question:</p>
                <p>{question.question}</p>
                <p className="font-bold">Correct Answer:</p>
                <p>{question.answer}</p>
              </div>
            ))}

          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleReset}
          >
            Play Again
          </button>
        </div>
      ) : (
        // GAME RUNNING SCREEN
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
      )}
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
              lastTime={lastTime}
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
