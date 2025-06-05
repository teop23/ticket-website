import React from 'react';

export const TokenInfo: React.FC = () => {
  return (
    <section id="buy" className="py-16 md:py-24 bg-gradient-to-b from-black to-red-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">$TICKET Tokenomics</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            A fair and transparent lottery token on the Solana blockchain
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4">Token Distribution</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Public Sale</span>
                <span className="font-bold">70%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div className="bg-red-500 h-3 rounded-full" style={{ width: '70%' }}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span>Liquidity Pool</span>
                <span className="font-bold">20%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div className="bg-red-500 h-3 rounded-full" style={{ width: '20%' }}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span>Team & Development</span>
                <span className="font-bold">5%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div className="bg-red-500 h-3 rounded-full" style={{ width: '5%' }}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span>Marketing</span>
                <span className="font-bold">5%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div className="bg-red-500 h-3 rounded-full" style={{ width: '5%' }}></div>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4">Transaction Tax</h3>
            <p className="text-gray-300 mb-6">
              Every transaction has a small tax that contributes to the lottery pool:
            </p>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span>Buy Tax</span>
                  <span className="font-bold">4%</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-300">
                  <div className="bg-red-500 w-3 h-3 rounded-full"></div>
                  <span>3% to Lottery Pool</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-300">
                  <div className="bg-blue-500 w-3 h-3 rounded-full"></div>
                  <span>1% to Development</span>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span>Sell Tax</span>
                  <span className="font-bold">6%</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-300">
                  <div className="bg-red-500 w-3 h-3 rounded-full"></div>
                  <span>4% to Lottery Pool</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-300">
                  <div className="bg-blue-500 w-3 h-3 rounded-full"></div>
                  <span>1% to Liquidity</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-300">
                  <div className="bg-green-500 w-3 h-3 rounded-full"></div>
                  <span>1% to Marketing</span>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span>Transfer Tax</span>
                  <span className="font-bold">2%</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-300">
                  <div className="bg-red-500 w-3 h-3 rounded-full"></div>
                  <span>2% to Lottery Pool</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <button className="bg-white hover:bg-gray-100 text-gray-900 font-bold px-8 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl">
            Buy $TICKET Now
          </button>
          <div className="mt-4 text-gray-300">
            Available on Jupiter, Raydium, and Orca
          </div>
        </div>
      </div>
    </section>
  );
};