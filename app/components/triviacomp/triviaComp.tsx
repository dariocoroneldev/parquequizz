"use client";
// Import necessary libraries and types
import React, { useState, useEffect } from 'react';
import { question } from '../../data/Questions';
import { Question } from '../../types/interface';
import ProgressBar from './progresbar';

// Define the TrviaComp component
const TrviaComp: React.FC = () => {
        // Define state variables
        const [questions, setQuestions] = useState<Question[]>([]);
        const [points, setPoints] = useState(0);
        const [currentQuestion, setCurrentQuestion] = useState(0);
        const [answered, setAnswered] = useState(false); 
        const [resetTimer, setResetTimer] = useState(0);
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
                }
                setAnswered(true); 
            }
            setSelectedOption(option);

            handleNextQuestion();
        };

        // Reset the game to its initial state
        const handleReset = () => {
            setPoints(0);
            setCurrentQuestion(0);
            setAnswered(false);
            setResetTimer(resetTimer + 1);
        };

        // Move to the next question
        const handleNextQuestion = () => {
            if (currentQuestion < questions.length - 1) {
                setCurrentQuestion(currentQuestion + 1);
            }
            setAnswered(false); 
        };

        // Render the component
        return (
            // <div className="flex flex-col items-center justify-center min-h-screen w-full h-full">
            <div className="p-10 bg-white rounded shadow-md h-full">
                <div className='flex justify-between w-full mb-5'>
                    <span className="text-4xl font-bold text-black">Trivia</span>
                    <span className="text-black text-lg">Points: {points}</span>
                </div>
                <ProgressBar completed={currentQuestion} total={questions.length} />
                <h3 className='text-3xl text-black my-5'>{question[currentQuestion].question} </h3>
                <div className='flex flex-col justify-between my-10 h-3/4 py-8'>
                    {question[currentQuestion].options.map((option) => (
                        <button
                            key={option}
                            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-6 px-4 m rounded ${
                                answered && option !== selectedOption
                                    ? "opacity-50 cursor-not-allowed"
                                    : ""
                            }`}
                            onClick={() => handleClick(option)}
                            disabled={answered} 
                        >
                            {option}
                        </button> 
                    ))}
                </div>
            </div>
        );
};

// Export the component
export default TrviaComp;