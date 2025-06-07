import { ExternalLink, ShieldCheck } from 'lucide-react';
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
  const totalPages = Math.ceil(winners.length / winnersPerPage);
  const indexOfLastWinner = currentPage * winnersPerPage;
  const indexOfFirstWinner = indexOfLastWinner - winnersPerPage;
  const currentWinners = winners.slice(indexOfFirstWinner, indexOfLastWinner);
  console.log('Current Winners:', currentWinners);
  const goToPage = (page: number) => {
    setCurrentPage(Math.min(Math.max(1, page), totalPages));
  };

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-red-600 dark:text-red-400">Recent Winners</h2>
          {winners.length > 0 && (
            <div className="text-gray-600 dark:text-gray-300 mt-2 md:mt-0">
              Showing {Math.min(winnersPerPage, winners.length - indexOfFirstWinner)} of {winners.length} distributions
              {loading && <span className="ml-2 text-sm">(updating...)</span>}
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
          <><div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden mb-4 shadow-lg border border-gray-200 dark:border-gray-700">
            {loading && (
              <div className="bg-blue-50 dark:bg-blue-900/30 px-6 py-2 border-b border-blue-200 dark:border-blue-700">
                <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300 text-sm">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  Updating winner data...
                </div>
              </div>
            )}
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
                  <th className="py-4 px-6 text-red-600 dark:text-red-400 font-medium">Date</th>
                  <th className="py-4 px-6 text-red-600 dark:text-red-400 font-medium">Winners</th>
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
                        href={`https://solscan.io/account/${(() => {
                          if (winner.data == null || winner.data === '') {
                            return '';
                          }
                          if (winner.data.includes(',')) {
                            return winner.data.split(',')[0];
                          }

                          return winner.data;
                        })()}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors font-mono break-all max-w-[400px] inline-flex items-center gap-2"
                      >
                        <span className="text-sm">
                          {(() => {
                            if (winner.data == null || winner.data === '') {
                              return '';
                            }
                            if (winner.data.includes(',')) {
                              return winner.data.split(',')[0];
                            }

                            return winner.data;
                          })()}
                        </span>
                        <ExternalLink size={14} className="opacity-50 group-hover:opacity-100 transition-opacity" />
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
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <button
                  onClick={() => goToPage(1)}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${currentPage === 1
                      ? 'text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600 cursor-not-allowed'
                      : 'text-white bg-red-600 border-red-700 hover:bg-red-700'
                    }`}
                >
                  First
                </button>
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${currentPage === 1
                      ? 'text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600 cursor-not-allowed'
                      : 'text-white bg-red-600 border-red-700 hover:bg-red-700'
                    }`}
                >
                  Previous
                </button>
              </div>
              <div className="text-sm text-gray-700 dark:text-gray-300">
                Page {currentPage} of {totalPages}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${currentPage === totalPages
                      ? 'text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600 cursor-not-allowed'
                      : 'text-white bg-red-600 border-red-700 hover:bg-red-700'
                    }`}
                >
                  Next
                </button>
                <button
                  onClick={() => goToPage(totalPages)}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${currentPage === totalPages
                      ? 'text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600 cursor-not-allowed'
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