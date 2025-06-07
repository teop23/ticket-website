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
        {/* Header Section */}
        <div className="text-center mb-8">
          <img 
            src={ticketLogo}
            alt="Power Millions"
            className="w-32 sm:w-40 md:w-48 mx-auto mb-6 hover-scale"
          />
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-red-600 mb-6 leading-[1.2]">
            Win Big Every Hour
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-8 px-2 sm:px-4">
            {hero.description}
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          
          {/* Left Column - Contract Address & Buy Button */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contract Address Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4 text-center">Contract Address</h3>
              
              <div className="bg-gray-900 dark:bg-gray-700 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-green-400 text-sm font-medium">CA:</span>
                  <button
                    onClick={() => copyToClipboard(hero.contractAddress)}
                    className="text-gray-400 hover:text-white transition-colors"
                    title="Copy to clipboard"
                  >
                    <Copy size={16} />
                  </button>
                </div>
                <div className="font-mono text-sm text-white break-all mt-2">
                  {hero.contractAddress}
                </div>
              </div>
              
              <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200">
                Buy $TICKET Now
              </button>
              
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-3">
                Always verify the contract address before making any transactions
              </p>
            </div>

            {/* Next Drawing Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4 text-center">Next Drawing</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 text-center">{hero.nextDrawing.date}</p>
              
              <div className="flex justify-center gap-3 mb-6">
                <div className="bg-gradient-to-b from-red-600 to-red-700 rounded-lg px-4 py-3 shadow-lg">
                  <span className="text-2xl md:text-3xl font-bold text-white">{hero.nextDrawing.time.hours}</span>
                </div>
                <div className="text-gray-900 dark:text-gray-100 text-2xl md:text-3xl font-bold self-center">:</div>
                <div className="bg-gradient-to-b from-red-600 to-red-700 rounded-lg px-4 py-3 shadow-lg">
                  <span className="text-2xl md:text-3xl font-bold text-white">{hero.nextDrawing.time.minutes}</span>
                </div>
                <div className="text-gray-900 dark:text-gray-100 text-2xl md:text-3xl font-bold self-center">:</div>
                <div className="bg-gradient-to-b from-red-600 to-red-700 rounded-lg px-4 py-3 shadow-lg">
                  <span className="text-2xl md:text-3xl font-bold text-white">{hero.nextDrawing.time.seconds}</span>
                </div>
              </div>
              
              <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
                Results announced shortly after drawing
              </p>
            </div>
          </div>

          {/* Center Column - Jackpot */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-red-600 to-red-800 rounded-2xl shadow-lg p-8 text-center h-full flex flex-col justify-center">
              <h3 className="text-xl font-bold text-white mb-6">ESTIMATED JACKPOT</h3>
              <div className="text-4xl md:text-6xl font-bold text-white mb-6">
                {hero.jackpot.amount}
                <div className="text-lg font-medium text-white/90 mt-2">USD</div>
              </div>
              <div className="text-xl font-medium text-white/90 mb-2">CASH VALUE</div>
              <div className="text-3xl font-bold text-white">{hero.jackpot.solAmount} SOL</div>
            </div>
          </div>

          {/* Right Column - Recent Winners */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 h-full">
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-6">Recent Winners</h3>
              
              <div className="space-y-4">
                {winners.length > 0 ? winners.map((winner, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <ShieldCheck size={16} className="text-red-600" />
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(winner.date_added).toLocaleString()}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex-1 min-w-0">
                        <a 
                          href={`https://solscan.io/account/${winner.data.split(',')[0]}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-mono text-gray-900 dark:text-gray-100 hover:text-red-600 dark:hover:text-red-400 transition-colors truncate block"
                        >
                          {winner.data.split(',')[0]}
                        </a>
                      </div>
                      
                      <div className="text-right ml-4">
                        <div className="text-lg font-bold text-green-600">
                          ${(winner.distributed * 152.45).toFixed(0)}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {winner.distributed.toFixed(2)} SOL
                        </div>
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
              
              <div className="mt-6 text-center">
                <Link to="/winners" className="text-red-600 dark:text-red-400 font-medium hover:opacity-80 transition-opacity">
                  View All Winners →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};