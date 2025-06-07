import React from 'react';

type Step = {
  number: string;
  title: string;
  description: string;
};

const steps: Step[] = [
  {
    number: "1",
    title: "Buy $TICKET",
    description: "Every 100 $TICKET tokens you hold = 1 raffle entry"
  },
  {
    number: "2",
    title: "More Entries = Better Odds",
    description: "500 tokens = 5 entries, 1,000 tokens = 10 entries"
  },
  {
    number: "3",
    title: "Hourly Draws",
    description: "One winner selected every hour, prize paid automatically from 8% transfer fee pool"
  }
];

export const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-16 md:py-24" style={{ backgroundColor: 'rgba(119, 27, 27, 0.2)' }}>

      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">How It Works</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Power Millions combines the excitement of lottery with the innovation of Solana blockchain
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="bg-white/80 dark:bg-black/40 backdrop-blur-lg border border-white/20 dark:border-gray-700/20 shadow-xl rounded-xl p-6 text-center relative transition-all duration-300 hover:shadow-xl hover:transform hover:-translate-y-1"
            >
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xl" style={{ backgroundColor: '#771b1b' }}>
                {step.number}
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mt-4 mb-3">{step.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 max-w-4xl mx-auto bg-white/80 dark:bg-black/40 backdrop-blur-lg border border-white/20 dark:border-gray-700/20 shadow-xl rounded-xl p-6">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 text-center">The Power Millions Advantage</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-4">
              <div className="p-2 rounded-full text-white" style={{ backgroundColor: '#771b1b' }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">100% Transparent</h4>
                <p className="text-gray-600 dark:text-gray-300">All drawings and winners are verified on-chain with Solana's VRF</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="p-2 rounded-full text-white" style={{ backgroundColor: '#771b1b' }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">Hourly Draws</h4>
                <p className="text-gray-600 dark:text-gray-300">No waiting for weeks - drawings happen every hour, 24/7/365</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="p-2 rounded-full text-white" style={{ backgroundColor: '#771b1b' }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">Prize Pool</h4>
                <p className="text-gray-600 dark:text-gray-300">8% transfer fee goes directly to the prize pool</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="p-2 rounded-full text-white" style={{ backgroundColor: '#771b1b' }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">Secure & Fair</h4>
                <p className="text-gray-600 dark:text-gray-300">Using blockchain technology ensures complete fairness and security</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};