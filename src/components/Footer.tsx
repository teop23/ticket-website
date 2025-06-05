import React from 'react';
import { Twitter, Github, Send } from 'lucide-react';
import { footer } from '../config/content';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <img src="/src/assets/ticket_banner_cropped_transparent.png" alt="Power Millions" className="h-10 md:h-12 mb-4" />
            <p className="text-gray-400 mb-4">
              {footer.description}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Send size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {footer.quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-400 hover:text-white transition-colors">
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
                  <a href={resource.href} className="text-gray-400 hover:text-white transition-colors">
                    {resource.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">{footer.newsletter.title}</h3>
            <p className="text-gray-400 mb-4">{footer.newsletter.description}</p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-gray-800 border border-gray-700 px-4 py-2 rounded-l-md focus:outline-none focus:border-red-500 w-full"
              />
              <button 
                type="submit" 
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-r-md transition-colors"
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm text-gray-500">
          <p>{footer.copyright}</p>
          <p className="mt-2">
            {footer.policies.map((policy, index) => (
              <React.Fragment key={index}>
                {index > 0 && " • "}
                <a href={policy.href} className="hover:text-gray-400 transition-colors">
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