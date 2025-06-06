import React from 'react';
import { formatDistanceToNow } from 'date-fns';

interface Winner {
  date_added: string;
  distributed: number;
  data: string;
}

interface WinnersTableProps {
  winners: Winner[];
}

export const WinnersTable: React.FC<WinnersTableProps> = ({ winners }) => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Distribution History</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Every hour, one lucky holder wins the accumulated pot. Here are the recent winners.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-4 px-4 font-semibold text-gray-600">Date</th>
                <th className="text-left py-4 px-4 font-semibold text-gray-600">Winner</th>
                <th className="text-right py-4 px-4 font-semibold text-gray-600">Amount</th>
                <th className="text-right py-4 px-4 font-semibold text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {winners.map((winner, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="text-sm text-gray-900">
                      {new Date(winner.date_added).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-gray-500">
                      {formatDistanceToNow(new Date(winner.date_added))} ago
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-sm font-medium text-gray-900">
                      {winner.data.split(',')[0]}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="text-sm font-bold text-gray-900">
                      {winner.distributed.toFixed(2)} SOL
                    </div>
                    <div className="text-xs text-gray-500">
                      ${(winner.distributed * 152.45).toFixed(2)}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Complete
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};