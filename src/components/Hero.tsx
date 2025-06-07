import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import { hero } from '../config/content';
import ticketLogo from '../assets/ticket_logo_cropped_transparent.png';
import { getRecentWinners } from '../utils/winners';

const winners = getRecentWinners();

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 sm:pt-24 md:pt-16 pb-12 sm:pb-16 overflow-hidden bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-gray-900 to-red-900 opacity-10 dark:opacity-20" />
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-red-500 rounded-full filter blur-3xl opacity-20 animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-600 rounded-full filter blur-3xl opacity-20 animate-float-delayed" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-8 sm:mb-12">
          <img 
            src={ticketLogo}
            alt="Power Millions"
            className="w-32 sm:w-40 md:w-48 mx-auto mb-6 sm:mb-8 hover-scale"
          />
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-red-600 mb-6 leading-[1.2]">
            Win Big Every Hour
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-8 px-2 sm:px-4">
            {hero.description}
          </p>
          <button className="btn-primary">
            Buy $TICKET Now
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {/* Next Drawing */}
          <div className="glass-card rounded-2xl p-4 sm:p-6 hover-scale flex flex-col justify-center min-h-[220px] sm:min-h-[280px] md:min-h-[300px]">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3 text-center">Next Drawing</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 text-center text-lg">{hero.nextDrawing.date}</p>
            <div className="flex justify-center gap-3">
              <div className="bg-gradient-to-b from-red-600 to-red-700 rounded-lg px-3 sm:px-4 py-2 sm:py-3 shadow-lg">
                <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">{hero.nextDrawing.time.hours}</span>
              </div>
              <div className="text-gray-900 dark:text-gray-100 text-2xl sm:text-3xl md:text-4xl font-bold self-center">:</div>
              <div className="bg-gradient-to-b from-red-600 to-red-700 rounded-lg px-3 sm:px-4 py-2 sm:py-3 shadow-lg">
                <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">{hero.nextDrawing.time.minutes}</span>
              </div>
              <div className="text-gray-900 dark:text-gray-100 text-2xl sm:text-3xl md:text-4xl font-bold self-center">:</div>
              <div className="bg-gradient-to-b from-red-600 to-red-700 rounded-lg px-3 sm:px-4 py-2 sm:py-3 shadow-lg">
                <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">{hero.nextDrawing.time.seconds}</span>
              </div>
            </div>
            <p className="text-center text-gray-500 dark:text-gray-400 text-base mt-8">Results announced shortly after drawing</p>
          </div>
          
          {/* Estimated Jackpot */}
          <div className="bg-gradient-to-br from-red-600 to-red-800 rounded-2xl shadow-lg p-4 sm:p-6 text-center transform hover:scale-105 transition-transform duration-300 flex flex-col justify-center min-h-[220px] sm:min-h-[280px] md:min-h-[300px]">
            <h3 className="text-xl font-bold text-white mb-4">ESTIMATED JACKPOT</h3>
            <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              {hero.jackpot.amount}<br />USD
            </div>
            <div className="text-xl font-medium text-white/90 mb-2">CASH VALUE</div>
            <div className="text-3xl font-bold text-white">{hero.jackpot.solAmount} SOL</div>
          </div>
          
          {/* Last 3 Winners */}
          <div className="glass-card rounded-2xl p-3 hover-scale min-h-[220px] sm:min-h-[280px] md:min-h-[300px] flex flex-col">
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">Last 3 Winners</h3>
            <div className="space-y-3 flex-grow">
              {winners.length > 0 ? winners.map((winner, index) => (
                <div key={index} className="flex justify-between items-start p-2 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                  <div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck size={16} className="text-red-600" />
                      <div className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                        {new Date(winner.date_added).toLocaleString()}
                      </div>
                    </div>
                    <div className="text-sm font-medium font-mono break-all pr-2">
                      <a 
                        href={`https://solscan.io/account/${winner.data.split(',')[0]}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                      >
                        {winner.data.split(',')[0]}
                      </a>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-500">
                      ${(winner.distributed * 152.45).toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {winner.distributed.toFixed(2)} SOL
                    </div>
                  </div>
                </div>
              )) : (
                <div className="text-center py-8">
                  <ShieldCheck size={32} className="text-red-600/50 mx-auto mb-3" />
                  <p className="text-gray-500 dark:text-gray-400">No winners yet. Be the first!</p>
                  <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Next draw coming soon</p>
                </div>
              )}
            </div>
            
            <div className="mt-auto pt-3 text-center">
              <Link to="/winners" className="text-red-600 dark:text-red-400 font-medium hover:opacity-80 transition-opacity">
                View All Winners →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};