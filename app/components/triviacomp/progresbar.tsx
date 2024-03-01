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
            <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500" style={{ width: `${percentage}%` }}></div>
            </div>
            <span className="ml-2 text-white font-bold mb-6">{percentage}%</span>
        </>
    );
};

export default ProgressBar;
