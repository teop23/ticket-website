import React from 'react';
import { hero } from '../config/content';

export const Hero: React.FC = () => {
  return (
    <section className="relative h-screen flex items-center pt-16 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-gray-900 to-red-900 opacity-10" />
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-red-500 rounded-full filter blur-3xl opacity-20 animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-600 rounded-full filter blur-3xl opacity-20 animate-float-delayed" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <img 
            src="/src/assets/ticket_logo_cropped_transparent.png"
            alt="Power Millions"
            className="w-64 mx-auto mb-6 hover-scale"
          />
          <h1 className="text-4xl md:text-6xl font-extrabold gradient-text mb-6">
            Win Big Every Hour
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto mb-8">
            {hero.description}
          </p>
          <button className="btn-primary">
            Buy $TICKET Now
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Next Drawing */}
          <div className="glass-card rounded-2xl p-6 hover-scale">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Next Drawing</h3>
            <p className="text-gray-600 mb-4">{hero.nextDrawing.date}</p>
            <div className="flex justify-center gap-2">
              <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg px-4 py-3">
                <span className="text-3xl font-bold text-white">{hero.nextDrawing.time.hours}</span>
              </div>
              <div className="text-gray-900 text-3xl font-bold">:</div>
              <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg px-4 py-3">
                <span className="text-3xl font-bold text-white">{hero.nextDrawing.time.minutes}</span>
              </div>
              <div className="text-gray-900 text-3xl font-bold">:</div>
              <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg px-4 py-3">
                <span className="text-3xl font-bold text-white">{hero.nextDrawing.time.seconds}</span>
              </div>
            </div>
            <p className="text-center text-gray-500 text-sm mt-4">Results announced shortly after drawing</p>
          </div>
          
          {/* Estimated Jackpot */}
          <div className="bg-gradient-to-br from-red-600 to-red-800 rounded-2xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-xl font-bold text-white mb-4">ESTIMATED JACKPOT</h3>
            <div className="text-4xl md:text-5xl font-bold text-white mb-4">
              {hero.jackpot.amount}<br />USD
            </div>
            <div className="text-xl font-medium text-white/90 mb-2">CASH VALUE</div>
            <div className="text-3xl font-bold text-white">{hero.jackpot.solAmount} SOL</div>
          </div>
          
          {/* Last 3 Winners */}
          <div className="glass-card rounded-2xl p-6 hover-scale">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Last 3 Winners</h3>
            <div className="space-y-4">
              {hero.recentWinners.map((winner, index) => (
                <div key={index} className="flex justify-between items-start p-3 bg-white/50 rounded-lg">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">{winner.date}</div>
                    <div className="text-sm font-medium text-gray-800">{winner.address}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold gradient-text">{winner.amount}</div>
                    <div className="text-sm text-gray-600">{winner.solAmount} SOL</div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 text-center">
              <a href="#winners" className="gradient-text font-medium hover:opacity-80 transition-opacity">
                View All Winners →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};