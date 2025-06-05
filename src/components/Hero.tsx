import React from 'react';
import { hero } from '../config/content';

export const Hero: React.FC = () => {
  return (
    <section className="relative bg-gray-50 h-screen flex items-center">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <img 
            src="/src/assets/ticket_logo_cropped_transparent.png"
            alt="Power Millions"
            className="w-96 mx-auto mb-6"
          />
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-8">
            {hero.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Next Drawing */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Next Drawing</h3>
            <p className="text-gray-600 mb-4">{hero.nextDrawing.date}</p>
            <div className="flex justify-center gap-2">
              <div className="bg-gray-900 rounded-lg px-4 py-3">
                <span className="text-3xl font-bold text-white">{hero.nextDrawing.time.hours}</span>
              </div>
              <div className="text-gray-900 text-3xl font-bold">:</div>
              <div className="bg-gray-900 rounded-lg px-4 py-3">
                <span className="text-3xl font-bold text-white">{hero.nextDrawing.time.minutes}</span>
              </div>
              <div className="text-gray-900 text-3xl font-bold">:</div>
              <div className="bg-gray-900 rounded-lg px-4 py-3">
                <span className="text-3xl font-bold text-white">{hero.nextDrawing.time.seconds}</span>
              </div>
            </div>
            <p className="text-center text-gray-500 text-sm mt-4">Results announced shortly after drawing</p>
          </div>
          
          {/* Estimated Jackpot */}
          <div className="bg-red-700 rounded-xl shadow-lg p-6 text-center">
            <h3 className="text-xl font-bold text-white mb-4">ESTIMATED JACKPOT</h3>
            <div className="text-4xl md:text-5xl font-bold text-white mb-4">
              {hero.jackpot.amount}<br />USD
            </div>
            <div className="text-xl font-medium text-white/90 mb-2">CASH VALUE</div>
            <div className="text-3xl font-bold text-white">{hero.jackpot.solAmount} SOL</div>
          </div>
          
          {/* Last 3 Winners */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Last 3 Winners</h3>
            <div className="space-y-4">
              {hero.recentWinners.map((winner, index) => (
                <div key={index} className="flex justify-between items-start">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">{winner.date}</div>
                    <div className="text-sm font-medium text-gray-800">{winner.address}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-red-600">{winner.amount}</div>
                    <div className="text-sm text-gray-600">{winner.solAmount} SOL</div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 text-center">
              <a href="#winners" className="text-red-600 hover:text-red-700 font-medium">
                View All Winners →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};