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
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Recent Winners</h2>
          <div className="text-gray-600">
            Showing 10 of {winners.length} distributions
          </div>
        </div>
        <div className="bg-gray-900 rounded-xl overflow-hidden mb-4">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-800">
                <th className="py-4 px-6 text-cyan-400 font-medium">Date</th>
                <th className="py-4 px-6 text-cyan-400 font-medium">Winners</th>
                <th className="py-4 px-6 text-cyan-400 font-medium text-right">Distributed</th>
                <th className="py-4 px-6 text-cyan-400 font-medium text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {winners.slice(0, 10).map((winner, index) => (
                <tr key={index} className="border-b border-gray-800 text-white">
                  <td className="py-4 px-6">
                    {new Date(winner.date_added).toLocaleString()}
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm font-medium">
                      {winner.data.split(',')[0]}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right">
                    {winner.distributed.toFixed(3)} SOL
                  </td>
                  <td className="py-4 px-6 text-right">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-cyan-400/10 text-cyan-400">
                      Complete
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <button className="px-4 py-2 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-300 hover:bg-gray-100">
              First
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-300 hover:bg-gray-100">
              Previous
            </button>
          </div>
          <div className="text-sm text-gray-700">
            Page 1 of 17
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg border border-gray-700 hover:bg-gray-800">
              Next
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg border border-gray-700 hover:bg-gray-800">
              Last
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};