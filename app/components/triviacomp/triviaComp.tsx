"use client";
// Import necessary libraries and types
import React, { useState, useEffect } from 'react';
import Timer from './timer';
import { question } from '../../data/Questions';
import { Question } from '../../types/interface';
import ProgressBar from './progresbar';
// Define the TrviaComp component
const TrviaComp: React.FC = () => {
        // Define state variables
        const [questions, setQuestions] = useState<Question[]>([]);
        const [points, setPoints] = useState(0);
        const [isPaused, setIsPaused] = useState(false);
        const [currentQuestion, setCurrentQuestion] = useState(0);
        const [message, setMessage] = useState("");
        const [answered, setAnswered] = useState(false); 
        const [resetTimer, setResetTimer] = useState(0);
        const [gameOver, setGameOver] = useState(false);
        const [selectedOption, setSelectedOption] = useState(null || "");

        // Load questions when the component mounts
        useEffect(() => {
                setQuestions(question);
        }, []);

        // Handle click event for answer options
        const handleClick = (option: string) => {
                if (!answered) { 
                        if (option === question[currentQuestion].answer) {
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

        // Reset the game to its initial state
        const handleReset = () => {
            setPoints(0);
            setCurrentQuestion(0);
            setMessage("");
            setAnswered(false);
            setResetTimer(resetTimer + 1);
            setIsPaused(false);
            setGameOver(false); 
        };

        // Move to the next question
        const handleNextQuestion = () => {
                if (currentQuestion < questions.length - 1) {
                        setCurrentQuestion(currentQuestion + 1);
                } else{
                        setGameOver(true);
                }
                setMessage("");
                setAnswered(false); 
                setIsPaused(false);
        };

        // Render the component
        return (
            <>
            {/* Componente contenedor */}
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    {gameOver ? (
        // Pantalla de fin de juego
        <div className="p-4 bg-white rounded shadow-md w-full sm:w-3/4 lg:w-1/2 ">
            <h2 className="text-2xl font-bold mb-4">Game Over</h2>
            <ProgressBar completed={currentQuestion + 1} total={questions.length} />

            <h2 className="text-xl font-bold mb-4">Questions and Answers</h2>
            {questions.map((q, index) => (
                <div key={index} className="mb-4">
                    <p className="font-bold">Question:</p>
                    <p>{q.question}</p>
                    <p className="font-bold">Correct Answer:</p>
                    <p>{q.answer}</p>
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
        // Pantalla de pregunta actual
        <div className="p-4 bg-red-100 rounded shadow-md w-full sm:w-3/4 lg:w-1/2">
            <div className='flex flex-col items-center justify-center h-full'>
                <h2 className="text-4xl font-bold mb-4 text-[#044bab]">Trivia</h2>
                <ProgressBar completed={currentQuestion} total={questions.length} />
                <p className="mb-4">Time: <Timer isPaused={isPaused} reset={resetTimer} /></p>
                <h1 className="text-xl font-bold mb-4">{question[currentQuestion].question}</h1>
                {message && <p className="mb-4">{message}</p>}
                {question[currentQuestion].options.map((option, index) => (
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
                <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleReset}
                >
                    Reset Game
                </button>
                <button
                    className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ${
                        !answered ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    onClick={handleNextQuestion}
                    disabled={!answered}
                >
                    Next Question
                </button>
            </div>
        </div>
    )}
</div>

        </>
        
        );
};

// Export the component
export default TrviaComp;