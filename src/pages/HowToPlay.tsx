import React, { useEffect } from 'react';
import { Clock, Ticket, Trophy, ShieldCheck } from 'lucide-react';

export const HowToPlay: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-16 bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">How to Play Power Millions</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The first hourly lottery token on Solana. Every transaction adds to the pot, and every hour someone wins big!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex justify-center mb-4">
              <Clock className="w-12 h-12 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Hourly Draws</h3>
            <p className="text-gray-600">New winner every hour</p>
          </div>

          <div className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex justify-center mb-4">
              <Ticket className="w-12 h-12 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Raffle Entries</h3>
            <p className="text-gray-600">100 tokens = 1 entry</p>
          </div>

          <div className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex justify-center mb-4">
              <Trophy className="w-12 h-12 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Better Odds</h3>
            <p className="text-gray-600">More tokens = more chances</p>
          </div>

          <div className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex justify-center mb-4">
              <ShieldCheck className="w-12 h-12 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">VRF Verified</h3>
            <p className="text-gray-600">Verifiable on-chain</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Step-by-Step Guide</h2>
          
          <div className="space-y-8">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-4">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Set Up Your Solana Wallet</h3>
                  <p className="text-gray-600 mb-4">
                    You'll need a Solana wallet to participate. Make sure you have some SOL for transaction costs.
                  </p>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-blue-700">
                      Recommended wallets: Phantom, Solflare, or any Solana-compatible wallet
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-4">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Buy $TICKET Tokens</h3>
                  <p className="text-gray-600 mb-4">
                    Every 100 $TICKET tokens you hold gives you one entry in the hourly drawings. The more tokens you hold, the better your chances of winning!
                  </p>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <p className="text-sm text-yellow-800 font-medium mb-2">Entry System:</p>
                    <ul className="text-sm text-yellow-800 space-y-1">
                      <li>• 100 tokens = 1 entry</li>
                      <li>• 500 tokens = 5 entries</li>
                      <li>• 1,000 tokens = 10 entries</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-4">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Wait for the Hourly Draw</h3>
                  <p className="text-gray-600 mb-4">
                    Every hour, the system takes a snapshot of all eligible $TICKET holders and their token amounts. Each 100 tokens becomes a raffle ticket. A random ticket is then selected using verifiable random functions (VRF) to ensure complete fairness.
                  </p>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm text-green-700">
                      Example: If you hold 500 tokens, you get 5 raffle tickets in each draw!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-4">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Check Results & Claim Winnings</h3>
                  <p className="text-gray-600">
                    Winners are automatically paid out to their wallet! Check the results page to see if you won. Prizes are distributed automatically after each draw, with no need to claim manually.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};