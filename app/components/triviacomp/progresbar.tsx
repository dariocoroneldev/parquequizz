import React from 'react';

interface ProgressBarProps {
    completed?: number;
    total?: number; // Remove 'undefined' from the type definition
}

const ProgressBar: React.FC<ProgressBarProps> = ({ completed = 0, total }) => {
    completed = completed ?? 0;
    total = total ?? 1; // Set a default value for total if it's undefined or null

    completed = completed < 0 ? 0 : completed;

    const percentage = Math.round((completed / total) * 100);

    return (
        <>
        <div className="w-[150%] h-4 rounded-full overflow-hidden bg-gray-200" style={{ border: '2px solid #66fc52', borderRadius: '9999px' }}>
          <div
            className="h-full rounded-full"
            style={{
              width: `${percentage}%`,
              background: 'linear-gradient(to right, #66fc52, #29a818)', // Gradiente de color
              borderRadius: '9999px', // Bordes redondeados para el progress bar interno
            }}
          ></div>
        </div>
        <span className="ml-2 text-gray-700 font-bold mb-6">{percentage}%</span>
      </>
      
    );
};

export default ProgressBar;
