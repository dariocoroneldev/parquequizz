"use client"
import React, { useState, useEffect } from 'react';
import Timer from './timer';
import ProgressBar from '@/app/components/triviacomp/progresbar';
import axios from 'axios';

type Question = {
    id: number;
    question: string;
    answer: string;
    options: string[];
  };
  
  const TriviaComp = () => {
    const [questions, setQuestions] = useState<Question[] | null>(null);
    const [error, setError] = useState<any>(null);
    const [points, setPoints] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [message, setMessage] = useState('');
    const [answered, setAnswered] = useState(false);
    const [resetTimer, setResetTimer] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchQuestions = async () => {
        try {
          const response = await axios.get('/api/questions');
          setQuestions(response.data);
        } catch (error) {
          setError(error);
        }
      };
  
      fetchQuestions();
    }, []);
  
    useEffect(() => {
      if (error) {
        console.error('Error fetching questions:', error);
      }
    }, [error]);
  
    const handleReset = () => {
      setPoints(0);
      setCurrentQuestion(0);
      setMessage('');
      setAnswered(false);
      setResetTimer(resetTimer + 1);
      setIsPaused(false);
      setGameOver(false);
    };
  
    const handleNextQuestion = () => {
      if (questions && currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setGameOver(true);
      }
      setMessage('');
      setAnswered(false);
      setIsPaused(false);
    };
  
    const handleClick = (option: string) => {
      if (!answered) {
        if (option === questions![currentQuestion]?.answer) {
          setPoints(points + 1);
          setMessage('Correcto');
        } else {
          setMessage('Incorrecto');
        }
        setAnswered(true);
        setIsPaused(true);
      }
      setSelectedOption(option);
    };

 
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {gameOver ? (
        <div className="p-4 bg-white rounded shadow-md w-full sm:w-3/4 lg:w-1/2 ">
          <h2 className="text-2xl font-bold mb-4">Game Over</h2>
          <ProgressBar completed={currentQuestion + 1} total={questions?.length} />
          <h2 className="text-xl font-bold mb-4">Questions and Answers</h2>
          {questions && questions.map((q:any, index:any) => (
            <div key={index} className="mb-4">
              <p className="font-bold">Question:</p>
              <p>{q.question}</p>
              <p className="font-bold">Correct Answer:</p>
              <p>{q.answer}</p>
            </div>
          ))}
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleReset}>Play Again</button>
        </div>
      ) : (
        <div className="p-4 bg-red-100 rounded shadow-md w-full sm:w-3/4 lg:w-1/2">
          <div className='flex flex-col items-center justify-center h-full'>
            <h2 className="text-4xl font-bold mb-4 text-[#044bab]">Trivia</h2>
            <ProgressBar completed={currentQuestion} total={questions?.length} />
            <p className="mb-4">Time: <Timer isPaused={isPaused} reset={resetTimer} /></p>
            <h1 className="text-xl text-center [text-[#044bab] font-bold mb-4">{questions?.[currentQuestion]?.question}</h1>
            {message && <p className="mb-4">{message}</p>}
            {questions && questions?.[currentQuestion]?.options.map((option:any, index:any) => (
              <button
                key={index}
                className={`mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
                  answered && option !== selectedOption ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => handleClick(option)}
                disabled={answered}
              >
                {option}
              </button>
            ))}
            <p className="mt-4">Total Points: {points}</p>
          </div>
          <div className="flex justify-between mt-4">
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleReset}>Reset Game</button>
            <button className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ${!answered ? "opacity-50 cursor-not-allowed" : ""}`} onClick={handleNextQuestion} disabled={!answered}>Next Question</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TriviaComp;
