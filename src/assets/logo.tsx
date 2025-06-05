import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`flex items-center ${className}`}>
      {['T', 'I', 'C', 'K', 'E', 'T'].map((letter, index) => (
        <div key={index} className="relative mx-0.5 flex items-center justify-center">
          <div className="h-8 w-8 md:h-10 md:w-10 bg-white rounded-full flex items-center justify-center shadow-md">
            <span className="text-gray-800 font-bold text-sm md:text-lg">{letter}</span>
          </div>
        </div>
      ))}
      <div className="relative ml-1 flex items-center justify-center">
        <div className="h-8 w-8 md:h-10 md:w-10 bg-red-600 rounded-full flex flex-col items-center justify-center shadow-md">
          <span className="text-white font-bold text-[7px] md:text-[9px] leading-none">POWER</span>
          <span className="text-white font-bold text-[7px] md:text-[9px] leading-none">MILLIONS</span>
        </div>
      </div>
    </div>
  );
};