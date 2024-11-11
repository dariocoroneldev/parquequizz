import React, { useEffect } from 'react';

interface TimerProps {
    isPaused: boolean;
    reset: number; 
    gameOver: boolean;
    milliseconds: number;
    setMilliseconds: React.Dispatch<React.SetStateAction<number>>;
}

const Timer: React.FC<TimerProps> = ({ isPaused, reset, gameOver, milliseconds, setMilliseconds }) => {

    const parseMilliseconds = (milliseconds: number) => {
        const minutes = String(Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
        const seconds = String(Math.floor((milliseconds % (1000 * 60)) / 1000)).padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (!isPaused && !gameOver) {
                setMilliseconds(prevMilliseconds => prevMilliseconds + 1000);
            }
        }, 1000);

        if (gameOver) {
            clearInterval(interval); // Detener el intervalo si el juego ha terminado
        }

        return () => clearInterval(interval);
    }, [isPaused, gameOver, setMilliseconds, milliseconds]);

    useEffect(() => {
        if (reset > 0) {
            setMilliseconds(0);
        }
    }, [reset]);

    return (
        <div className="text-4xl font-bold text-[#b30707]">
            {parseMilliseconds(milliseconds)}
        </div>
    );
};

export default Timer;
