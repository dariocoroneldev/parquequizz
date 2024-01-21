import React from 'react';

interface ProgressBarProps {
    completed?: number; // Hacer que completed sea opcional
    total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ completed = 0, total }) => { // Establecer un valor predeterminado para completed
    
    completed = completed < 0 ? 0 : completed; // Asegurarse de que completed no sea menor que 0

    const percentage = Math.round((completed / total) * 100); // Usa Math.round() para redondear el porcentaje

    return (
        <div className=''>
            <progress className='w-full' value={completed} max={total} />
            {/* <span className='m-4 text-black'>{`${percentage}%`}</span> */}
        </div>
    );
};

export default ProgressBar;