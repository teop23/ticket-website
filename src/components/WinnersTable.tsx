import { ExternalLink, ShieldCheck, Calendar, Trophy, CheckCircle } from 'lucide-react';
import React, { useState } from 'react';

interface Winner {
  date_added: string;
  distributed: number;
  data: string;
}

interface WinnersTableProps {
  winners: Winner[];
  loading?: boolean;
}

export const WinnersTable: React.FC<WinnersTableProps> = ({ winners, loading = false }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const winnersPerPage = 10;
  
  // Reverse the order so most recent winners appear first
  const sortedWinners = [...winners].sort((a, b) => 
    new Date(b.date_added).getTime() - new Date(a.date_added).getTime()
  );
  
  const totalPages = Math.ceil(sortedWinners.length / winnersPerPage);
  const indexOfLastWinner = currentPage * winnersPerPage;
  const indexOfFirstWinner = indexOfLastWinner - winnersPerPage;
  const currentWinners = sortedWinners.slice(indexOfFirstWinner, indexOfLastWinner);
  
  const goToPage = (page: number) => {
    setCurrentPage(Math.min(Math.max(1, page), totalPages));
  };

  const formatAddress = (data: string) => {
    if (!data) return '';
    const address = data.includes(',') ? data.split(',')[0] : data;
    return address;
  };

  const truncateAddress = (address: string, startChars = 6, endChars = 4) => {
    if (!address || address.length <= startChars + endChars) return address;
    return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
  };

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-red-600 dark:text-red-400">Recent Winners</h2>
          {winners.length > 0 && (
            <div className="text-gray-600 dark:text-gray-300 mt-2 md:mt-0">
              Showing {Math.min(winnersPerPage, sortedWinners.length - indexOfFirstWinner)} of {sortedWinners.length} distributions
            </div>
          )}
        </div>

        {loading && winners.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-12 text-center shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Loading Winners</h3>
            <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto">
              Fetching the latest winner data...
            </p>
          </div>
        ) : winners.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-12 text-center shadow-lg border border-gray-200 dark:border-gray-700">
            <ShieldCheck size={48} className="text-red-600/50 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">No Winners Yet</h3>
            <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto">
              The first drawing will happen soon. Make sure you hold enough $TICKET tokens to be eligible!
            </p>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block bg-white dark:bg-gray-800 rounded-xl overflow-hidden mb-4 shadow-lg border border-gray-200 dark:border-gray-700">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
                    <th className="py-4 px-6 text-red-600 dark:text-red-400 font-medium">Date</th>
                    <th className="py-4 px-6 text-red-600 dark:text-red-400 font-medium">Winner</th>
                    <th className="py-4 px-6 text-red-600 dark:text-red-400 font-medium text-right">Distributed</th>
                    <th className="py-4 px-6 text-red-600 dark:text-red-400 font-medium text-right">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {currentWinners.map((winner, index) => (
                    <tr key={index} className="border-b border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <td className="py-4 px-6">
                        <span className="whitespace-nowrap">
                          {new Date(winner.date_added).toLocaleString()}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <a
                          href={`https://solscan.io/account/${formatAddress(winner.data)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors font-mono inline-flex items-center gap-2"
                        >
                          <span className="text-sm">
                            {formatAddress(winner.data)}
                          </span>
                          <ExternalLink size={14} className="opacity-50 hover:opacity-100 transition-opacity" />
                        </a>
                      </td>
                      <td className="py-4 px-6 text-right font-medium text-gray-900 dark:text-gray-100">
                        {winner.distributed.toFixed(3)} SOL
                      </td>
                      <td className="py-4 px-6 text-right">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400">
                          Complete
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4 mb-6">
              {currentWinners.map((winner, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-red-600 dark:text-red-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {new Date(winner.date_added).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle size={14} className="text-red-600 dark:text-red-400" />
                      <span className="text-xs font-medium text-red-600 dark:text-red-400">Complete</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <Trophy size={16} className="text-red-600 dark:text-red-400" />
                    <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
                      {winner.distributed.toFixed(3)} SOL
                    </span>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Winner Address</div>
                    <a
                      href={`https://solscan.io/account/${formatAddress(winner.data)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors font-mono text-sm flex items-center justify-between"
                    >
                      <span className="break-all">
                        {truncateAddress(formatAddress(winner.data), 8, 8)}
                      </span>
                      <ExternalLink size={14} className="opacity-50 hover:opacity-100 transition-opacity ml-2 flex-shrink-0" />
                    </a>
                  </div>
                  
                  <div className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                    {new Date(winner.date_added).toLocaleTimeString()}
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex gap-2 order-2 sm:order-1">
                <button
                  onClick={() => goToPage(1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-2 text-sm font-medium rounded-lg border transition-colors ${
                    currentPage === 1
                      ? 'text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600 cursor-not-allowed'
                      : 'text-white bg-red-600 border-red-700 hover:bg-red-700'
                  }`}
                >
                  First
                </button>
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-2 text-sm font-medium rounded-lg border transition-colors ${
                    currentPage === 1
                      ? 'text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600 cursor-not-allowed'
                      : 'text-white bg-red-600 border-red-700 hover:bg-red-700'
                  }`}
                >
                  Prev
                </button>
              </div>
              
              <div className="text-sm text-gray-700 dark:text-gray-300 order-1 sm:order-2">
                Page {currentPage} of {totalPages}
              </div>
              
              <div className="flex gap-2 order-3">
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-2 text-sm font-medium rounded-lg border transition-colors ${
                    currentPage === totalPages
                      ? 'text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600 cursor-not-allowed'
                      : 'text-white bg-red-600 border-red-700 hover:bg-red-700'
                  }`}
                >
                  Next
                </button>
                <button
                  onClick={() => goToPage(totalPages)}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-2 text-sm font-medium rounded-lg border transition-colors ${
                    currentPage === totalPages
                      ? 'text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600 cursor-not-allowed'
                      : 'text-white bg-red-600 border-red-700 hover:bg-red-700'
                  }`}
                >
                  Last
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};