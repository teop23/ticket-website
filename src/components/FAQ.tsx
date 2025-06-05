import React, { useState } from 'react';

type FAQItem = {
  question: string;
  answer: string;
};

const faqItems: FAQItem[] = [
  {
    question: "How does Power Millions work?",
    answer: "Power Millions is a Solana token with an integrated lottery system. Each transaction (buy, sell, or transfer) of the $TICKET token has a small tax that contributes to the lottery pool. Every hour, a random holder is selected as the winner and receives the entire pot automatically."
  },
  {
    question: "How are winners selected?",
    answer: "Winners are selected using Solana's Verifiable Random Function (VRF) technology, which ensures a fair and transparent selection process. Every 10,000 $TICKET tokens you hold gives you one entry in the lottery, increasing your chances of winning."
  },
  {
    question: "How do I claim my winnings?",
    answer: "You don't need to claim anything! If you're selected as a winner, the entire pot will be automatically transferred to your wallet. The transaction is executed on-chain and can be verified by anyone."
  },
  {
    question: "Where can I buy $TICKET tokens?",
    answer: "You can buy $TICKET tokens on major Solana DEXs including Jupiter, Raydium, and Orca. Simply connect your Solana wallet, search for $TICKET, and make your purchase."
  },
  {
    question: "Are there any transaction fees?",
    answer: "Yes, there is a 4% buy tax, a 6% sell tax, and a 2% transfer tax. The majority of these taxes go directly to the lottery pool, with small portions allocated to development, liquidity, and marketing."
  },
  {
    question: "How often are the lottery drawings?",
    answer: "Lottery drawings occur every hour, 24 hours a day, 7 days a week. That's 24 chances to win every day!"
  },
  {
    question: "Is Power Millions audited?",
    answer: "Yes, Power Millions' smart contract has been audited by leading blockchain security firms to ensure the safety and fairness of the protocol. Audit reports are available on our documentation page."
  }
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Got questions about Power Millions? We've got answers.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          {faqItems.map((item, index) => (
            <div 
              key={index} 
              className="mb-4 border-b border-gray-200 pb-4"
            >
              <button
                className="flex justify-between items-center w-full text-left font-medium text-gray-900 focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-lg">{item.question}</span>
                <svg
                  className={`w-5 h-5 text-gray-500 transform ${openIndex === index ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === index && (
                <div className="mt-3 text-gray-600">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};