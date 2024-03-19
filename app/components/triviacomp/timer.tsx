import React, { useEffect } from 'react';
import { updateTime } from "./../../../redux/features/gameResultSlice";
import { useAppDispatch } from "./../../../redux/hooks";

interface TimerProps {
    isPaused: boolean;
    reset: number; 
    gameOver: boolean;
    lastTime: number;
    milliseconds:number;
    setMilliseconds: React.Dispatch<React.SetStateAction<number>>;
}

const Timer: React.FC<TimerProps> = ({ isPaused, reset, gameOver, lastTime, milliseconds, setMilliseconds }) => {

    const parseMilliseconds = (milliseconds: number) => {
        const hours = Math.floor(milliseconds / (1000 * 60 * 60));
        const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
        return `${hours}:${minutes}:${seconds}`;
    };

    const dispatch = useAppDispatch();

    useEffect(() => {
        const interval = setInterval(() => {
            if (!isPaused && !gameOver) {
                setMilliseconds(prevMilliseconds => prevMilliseconds + 1000);
            }
        }, 1000);

        // Si el juego está terminado, detener el intervalo para pausar el tiempo
        if (gameOver) {
            clearInterval(interval); // Detener el intervalo
            dispatch(updateTime({ time: parseMilliseconds(milliseconds) })); // Actualizar solo el tiempo en el estado global
        }

        return () => clearInterval(interval);
    }, [isPaused, gameOver, setMilliseconds, milliseconds, dispatch]);

    useEffect(() => {
        if (reset > 0) {
            setMilliseconds(0);
        }
    }, [reset]);

    return (
        <div className="text-4xl font-bold text-[#b30707]">
            { parseMilliseconds(milliseconds)}
        </div>
    );
};

export default Timer;
