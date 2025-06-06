import React, { useState } from 'react';

type FAQItem = {
  question: string;
  answer: string;
};

const faqItems: FAQItem[] = [
  {
    question: "How does Power Millions work?",
    answer: "Power Millions is a Solana token with an integrated lottery system. Every transaction has an 8% transfer fee that goes to the prize pool. Every hour, one random holder is selected as the winner and receives the prize automatically."
  },
  {
    question: "How are winners selected?",
    answer: "One winner is randomly selected every hour. Every 100 $TICKET tokens you hold gives you one ticket for the raffle. Your tickets remain valid for all future drawings as long as you hold the tokens."
  },
  {
    question: "How do I claim my winnings?",
    answer: "You don't need to claim anything! If you're selected as a winner, the entire pot will be automatically transferred to your wallet. The transaction is executed on-chain and can be verified by anyone."
  },
  {
    question: "Where can I buy $TICKET tokens?",
    answer: "You can buy $TICKET tokens on major Solana DEXs. The token has been fair launched with 100% of the supply (1,000,000 tokens) added to the liquidity pool, and LP tokens are locked for 1 year."
  },
  {
    question: "Are there any transaction fees?",
    answer: "Yes, there is an 8% transfer fee on all transactions. This fee goes directly to the prize pool treasury, which is distributed to winners."
  },
  {
    question: "How often are the lottery drawings?",
    answer: "One winner is randomly selected every hour, 24 hours a day, 7 days a week. That's 24 chances to win every day!"
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