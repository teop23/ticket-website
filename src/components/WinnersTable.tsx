import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ExternalLink, ShieldCheck } from 'lucide-react';

interface Winner {
  date_added: string;
  distributed: number;
  data: string;
}

interface WinnersTableProps {
  winners: Winner[];
}

export const WinnersTable: React.FC<WinnersTableProps> = ({ winners }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const winnersPerPage = 10;
  const totalPages = Math.ceil(winners.length / winnersPerPage);
  const indexOfLastWinner = currentPage * winnersPerPage;
  const indexOfFirstWinner = indexOfLastWinner - winnersPerPage;
  const currentWinners = winners.slice(indexOfFirstWinner, indexOfLastWinner);

  const goToPage = (page: number) => {
    setCurrentPage(Math.min(Math.max(1, page), totalPages));
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-red-600">Recent Winners</h2>
          {winners.length > 0 && <div className="text-gray-600 mt-2 md:mt-0">
            Showing {Math.min(winnersPerPage, winners.length - indexOfFirstWinner)} of {winners.length} distributions
          </div>}
        </div>
        
        {winners.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center shadow-lg border border-gray-200">
            <ShieldCheck size={48} className="text-red-600/50 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Winners Yet</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              The first drawing will happen soon. Make sure you hold enough $TICKET tokens to be eligible!
            </p>
          </div>
        ) : (
        <><div className="bg-white rounded-xl overflow-hidden mb-4 shadow-lg border border-gray-200">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-200 bg-gray-50">
                <th className="py-4 px-6 text-red-600 font-medium">Date</th>
                <th className="py-4 px-6 text-red-600 font-medium">Winners</th>
                <th className="py-4 px-6 text-red-600 font-medium text-right">Distributed</th>
                <th className="py-4 px-6 text-red-600 font-medium text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {currentWinners.map((winner, index) => (
                <tr key={index} className="border-b border-gray-100 text-gray-700 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    {new Date(winner.date_added).toLocaleString()}
                  </td>
                  <td className="py-4 px-6">
                    <a 
                      href={`https://solscan.io/account/${winner.data.split(',')[0]}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors group font-mono break-all max-w-[400px]"
                    >
                      <span className="text-sm">
                        {winner.data.split(',')[0]}
                      </span>
                      <ExternalLink size={14} className="opacity-50 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </td>
                  <td className="py-4 px-6 text-right font-medium text-gray-900">
                    {winner.distributed.toFixed(3)} SOL
                  </td>
                  <td className="py-4 px-6 text-right">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-600">
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
            <button 
              onClick={() => goToPage(1)} 
              disabled={currentPage === 1}
              className={`px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${
                currentPage === 1 
                ? 'text-gray-400 bg-gray-100 border-gray-200 cursor-not-allowed' 
                : 'text-white bg-red-600 border-red-700 hover:bg-red-700'
              }`}
            >
              First
            </button>
            <button 
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${
                currentPage === 1 
                ? 'text-gray-400 bg-gray-100 border-gray-200 cursor-not-allowed' 
                : 'text-white bg-red-600 border-red-700 hover:bg-red-700'
              }`}
            >
              Previous
            </button>
          </div>
          <div className="text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${
                currentPage === totalPages 
                ? 'text-gray-400 bg-gray-100 border-gray-200 cursor-not-allowed' 
                : 'text-white bg-red-600 border-red-700 hover:bg-red-700'
              }`}
            >
              Next
            </button>
            <button 
              onClick={() => goToPage(totalPages)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${
                currentPage === totalPages 
                ? 'text-gray-400 bg-gray-100 border-gray-200 cursor-not-allowed' 
                : 'text-white bg-red-600 border-red-700 hover:bg-red-700'
              }`}
            >
              Last
            </button>
          </div>
        </div></>
        )}
      </div>
    </section>
  );
};