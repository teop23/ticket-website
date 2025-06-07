import React from 'react';
import { footer } from '../config/content';
import ticketBanner from '../assets/ticket_banner_cropped_transparent.png';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 dark:bg-black text-white pt-12 pb-6 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto text-left">
          <div>
            <img src={ticketBanner} alt="Power Millions" className="h-10 md:h-12 mb-4" />
            <p className="text-gray-400 dark:text-gray-300 mb-4">
              {footer.description}
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Recent Winners</h3>
            <ul className="space-y-2">
              {footer.recentWinners.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-400 dark:text-gray-300 hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {footer.resources.map((resource, index) => (
                <li key={index}>
                  <a href={resource.href} className="text-gray-400 dark:text-gray-300 hover:text-white transition-colors">
                    {resource.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 dark:border-gray-700 mt-8 pt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>{footer.copyright}</p>
          <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
              ⚠️ IMPORTANT DISCLAIMER
            </p>
            <p className="mt-2 text-sm text-yellow-700 dark:text-yellow-300">
              Not affiliated with the official Mega Millions or Powerball lottery. This is an independent Solana blockchain project.
            </p>
          </div>
          <p className="mt-4 text-xs text-gray-400 dark:text-gray-500">
            Not affiliated with the official Mega Millions or Powerball lottery. This is an independent Solana blockchain project.
          </p>
          <p className="mt-2">
            {footer.policies.map((policy, index) => (
              <React.Fragment key={index}>
                {index > 0 && " • "}
                <a href={policy.href} className="hover:text-gray-400 dark:hover:text-gray-300 transition-colors">
                  {policy.label}
                </a>
              </React.Fragment>
            ))}
          </p>
        </div>
      </div>
    </footer>
  );
};