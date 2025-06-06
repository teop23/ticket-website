import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import { hero } from '../config/content';
import ticketLogo from '../assets/ticket_logo_cropped_transparent.png';
import { getRecentWinners } from '../utils/winners';

const winners = getRecentWinners();

export const Hero: React.FC = () => {
  const [navHeight, setNavHeight] = useState(64); // Default height of navbar (16 * 4 = 64px)
  
  useEffect(() => {
    const updateNavHeight = () => {
      const navbar = document.querySelector('nav');
      if (navbar) {
        setNavHeight(navbar.offsetHeight);
      }
    };
    
    updateNavHeight();
    window.addEventListener('resize', updateNavHeight);
    return () => window.removeEventListener('resize', updateNavHeight);
  }, []);

  return (
    <section 
      className="relative flex items-center overflow-hidden" 
      style={{ height: `calc(100vh - ${navHeight}px)` }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-gray-900 to-red-900 opacity-10" />
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-red-500 rounded-full filter blur-3xl opacity-20 animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-600 rounded-full filter blur-3xl opacity-20 animate-float-delayed" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-6">
          <img 
            src={ticketLogo}
            alt="Power Millions"
            className="w-40 mx-auto mb-3 hover-scale"
          />
          <h1 className="text-4xl md:text-6xl font-extrabold text-red-600 mb-6 leading-[1.2]">
            Win Big Every Hour
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto mb-6">
            {hero.description}
          </p>
          <button className="btn-primary">
            Buy $TICKET Now
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Next Drawing */}
          <div className="glass-card rounded-2xl p-3 hover-scale flex flex-col justify-center">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 text-center">Next Drawing</h3>
            <p className="text-gray-600 mb-6 text-center text-lg">{hero.nextDrawing.date}</p>
            <div className="flex justify-center gap-3">
              <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg px-4 py-3">
                <span className="text-4xl font-bold text-white">{hero.nextDrawing.time.hours}</span>
              </div>
              <div className="text-gray-900 text-4xl font-bold self-center">:</div>
              <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg px-4 py-3">
                <span className="text-4xl font-bold text-white">{hero.nextDrawing.time.minutes}</span>
              </div>
              <div className="text-gray-900 text-4xl font-bold self-center">:</div>
              <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg px-4 py-3">
                <span className="text-4xl font-bold text-white">{hero.nextDrawing.time.seconds}</span>
              </div>
            </div>
            <p className="text-center text-gray-500 text-base mt-8">Results announced shortly after drawing</p>
          </div>
          
          {/* Estimated Jackpot */}
          <div className="bg-gradient-to-br from-red-600 to-red-800 rounded-2xl shadow-lg p-3 text-center transform hover:scale-105 transition-transform duration-300 flex flex-col justify-center">
            <h3 className="text-xl font-bold text-white mb-4">ESTIMATED JACKPOT</h3>
            <div className="text-4xl md:text-5xl font-bold text-white mb-4">
              {hero.jackpot.amount}<br />USD
            </div>
            <div className="text-xl font-medium text-white/90 mb-2">CASH VALUE</div>
            <div className="text-3xl font-bold text-white">{hero.jackpot.solAmount} SOL</div>
          </div>
          
          {/* Last 3 Winners */}
          <div className="glass-card rounded-2xl p-3 hover-scale">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Last 3 Winners</h3>
            <div className="space-y-4">
              {winners.length > 0 ? winners.map((winner, index) => (
                <div key={index} className="flex justify-between items-start p-2 bg-white/50 rounded-lg">
                  <div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck size={16} className="text-red-600" />
                      <div className="text-xs text-gray-500 whitespace-nowrap">
                        {new Date(winner.date_added).toLocaleString()}
                      </div>
                    </div>
                    <div className="text-sm font-medium font-mono break-all pr-2">
                      <a 
                        href={`https://solscan.io/account/${winner.data.split(',')[0]}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-red-600 hover:text-red-700 transition-colors"
                      >
                        {winner.data.split(',')[0]}
                      </a>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-red-600">
                      ${(winner.distributed * 152.45).toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-600">
                      {winner.distributed.toFixed(2)} SOL
                    </div>
                  </div>
                </div>
              )) : (
                <div className="text-center py-8">
                  <ShieldCheck size={32} className="text-red-600/50 mx-auto mb-3" />
                  <p className="text-gray-500">No winners yet. Be the first!</p>
                  <p className="text-sm text-gray-400 mt-1">Next draw coming soon</p>
                </div>
              )}
            </div>
            
            <div className="mt-2 text-center">
              <Link to="/winners" className="text-red-600 font-medium hover:opacity-80 transition-opacity">
                View All Winners →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};