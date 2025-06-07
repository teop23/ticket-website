import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Copy, ExternalLink } from 'lucide-react';
import { hero } from '../config/content';
import ticketLogo from '../assets/ticket_logo_cropped_transparent.png';
import { getRecentWinners } from '../utils/winners';

const winners = getRecentWinners();

export const Hero: React.FC = () => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  return (
    <section className="relative min-h-screen flex items-center pt-20 sm:pt-24 md:pt-16 pb-12 sm:pb-16 overflow-hidden bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-gray-900 to-red-900 opacity-10 dark:opacity-20" />
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-red-500 rounded-full filter blur-3xl opacity-20 animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-600 rounded-full filter blur-3xl opacity-20 animate-float-delayed" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-4 sm:mb-6">
          <img 
            src={ticketLogo}
            alt="Power Millions"
            className="w-24 sm:w-32 md:w-40 mx-auto mb-3 sm:mb-4 hover-scale"
          />
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-red-600 mb-3 leading-[1.2]">
            Win Big Every Hour
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-4 px-2 sm:px-4">
            {hero.description}
          </p>
        </div>

        {/* Contract Address Section */}
              <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-1">Official Contract Address</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">Verify you're interacting with the authentic $TICKET token</p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
              <div className="bg-white dark:bg-gray-800 rounded-xl px-3 py-2 border border-gray-200 dark:border-gray-700 flex-1 max-w-md">
                <div className="font-mono text-xs text-gray-900 dark:text-gray-100 break-all text-center">
                  {hero.contractAddress}
                </div>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => copyToClipboard(hero.contractAddress)}
                  className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg transition-colors duration-200 text-xs font-medium"
                  title="Copy to clipboard"
                >
                  <Copy size={14} />
                  Copy
                </button>
                
                <a
                  href={`https://solscan.io/token/${hero.contractAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-lg transition-colors duration-200 text-xs font-medium"
                  title="View on Solscan"
                >
                  <ExternalLink size={14} />
                  Verify
                </a>
              </div>
            </div>
            
            <div className="text-center mb-3">
              <button className="btn-primary text-base px-8 py-3">
                Buy $TICKET Now
              </button>
            </div>
            
            <div className="mt-2 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Always verify the contract address before making any transactions
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
          {/* Next Drawing */}
          <div className="glass-card rounded-2xl p-3 sm:p-4 hover-scale flex flex-col justify-center min-h-[180px] sm:min-h-[200px] md:min-h-[220px]">
            <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 text-center">Next Drawing</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4 text-center text-sm">{hero.nextDrawing.date}</p>
            <div className="flex justify-center gap-2">
              <div className="bg-gradient-to-b from-red-600 to-red-700 rounded-lg px-2 sm:px-3 py-1 sm:py-2 shadow-lg">
                <span className="text-xl sm:text-2xl md:text-3xl font-bold text-white">{hero.nextDrawing.time.hours}</span>
              </div>
              <div className="text-gray-900 dark:text-gray-100 text-xl sm:text-2xl md:text-3xl font-bold self-center">:</div>
              <div className="bg-gradient-to-b from-red-600 to-red-700 rounded-lg px-2 sm:px-3 py-1 sm:py-2 shadow-lg">
                <span className="text-xl sm:text-2xl md:text-3xl font-bold text-white">{hero.nextDrawing.time.minutes}</span>
              </div>
              <div className="text-gray-900 dark:text-gray-100 text-xl sm:text-2xl md:text-3xl font-bold self-center">:</div>
              <div className="bg-gradient-to-b from-red-600 to-red-700 rounded-lg px-2 sm:px-3 py-1 sm:py-2 shadow-lg">
                <span className="text-xl sm:text-2xl md:text-3xl font-bold text-white">{hero.nextDrawing.time.seconds}</span>
              </div>
            </div>
            <p className="text-center text-gray-500 dark:text-gray-400 text-xs mt-4">Results announced shortly after drawing</p>
          </div>
          
          {/* Estimated Jackpot */}
          <div className="bg-gradient-to-br from-red-600 to-red-800 rounded-2xl shadow-lg p-3 sm:p-4 text-center transform hover:scale-105 transition-transform duration-300 flex flex-col justify-center min-h-[180px] sm:min-h-[200px] md:min-h-[220px]">
            <h3 className="text-base font-bold text-white mb-2">ESTIMATED JACKPOT</h3>
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
              {hero.jackpot.amount}<br />USD
            </div>
            <div className="text-sm font-medium text-white/90 mb-1">CASH VALUE</div>
            <div className="text-xl font-bold text-white">{hero.jackpot.solAmount} SOL</div>
          </div>
          
          {/* Last 3 Winners */}
          <div className="glass-card rounded-2xl p-3 hover-scale min-h-[180px] sm:min-h-[200px] md:min-h-[220px] flex flex-col">
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">Last 3 Winners</h3>
            <div className="space-y-2 flex-grow">
              {winners.length > 0 ? winners.map((winner, index) => (
                <div key={index} className="flex justify-between items-start p-2 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                  <div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck size={14} className="text-red-600" />
                      <div className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                        {new Date(winner.date_added).toLocaleString()}
                      </div>
                    </div>
                    <div className="text-xs font-medium font-mono break-all pr-2">
                      <a 
                        href={`https://solscan.io/account/${winner.data.split(',')[0]}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-black dark:text-gray-200 hover:text-gray-700 dark:hover:text-white transition-colors"
                      >
                        {winner.data.split(',')[0]}
                      </a>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-green-500">
                      ${(winner.distributed * 152.45).toFixed(2)}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {winner.distributed.toFixed(2)} SOL
                    </div>
                  </div>
                </div>
              )) : (
                <div className="text-center py-4">
                  <ShieldCheck size={24} className="text-red-600/50 mx-auto mb-2" />
                  <p className="text-gray-500 dark:text-gray-400">No winners yet. Be the first!</p>
                  <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Next draw coming soon</p>
                </div>
              )}
            </div>
            
            <div className="mt-auto pt-2 text-center">
              <Link to="/winners" className="text-red-600 dark:text-red-400 font-medium hover:opacity-80 transition-opacity text-sm">
                View All Winners →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};