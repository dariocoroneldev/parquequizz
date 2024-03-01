import React, { useState, useEffect } from 'react';

interface TimerProps {
    isPaused: boolean;
    reset: number; 
}

const Timer: React.FC<TimerProps> = ({ isPaused, reset }) => {
    const [seconds, setSeconds] = useState(0);
    const [isMounted, setIsMounted] = useState(false);

    const parseSeconds = (number: number) => {
        const hours = Math.floor(number / 3600);
        const minutes = Math.floor((number - hours * 3600) / 60);
        const seconds = number - hours * 3600 - minutes * 60;
        return `${hours}:${minutes}:${seconds}`;
    };

    useEffect(() => {
        setIsMounted(true);
        const interval = setInterval(() => {
            if (!isPaused) {
                setSeconds(seconds => seconds + 1);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [isPaused]);

    useEffect(() => {
        setSeconds(0); // Restablecer los segundos cada vez que cambie el contador de reset
    }, [reset]);

    if (!isMounted) {
        return null;
    }

    return (
        <div className="text-4xl font-bold text-[#b30707]">
            {parseSeconds(seconds)}
        </div>
    );
};

export default Timer;