import React from 'react';
import { Compass, GraduationCap, Heart, ShieldCheck, Sparkles, MapPin } from 'lucide-react';

interface FooterProps {
  onNavClick: (tab: 'home' | 'planner' | 'destinations' | 'my-trips') => void;
  onOpenAbout: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick, onOpenAbout }) => {
  return (
    <footer className="bg-[#0A1322] text-slate-300 border-t border-slate-800 mt-20 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand & Project Info */}
          <div className="lg:col-span-2 space-y-4">
            <div 
              onClick={() => onNavClick('home')}
              className="flex items-center gap-3 cursor-pointer group inline-flex"
            >
              <div className="w-10 h-10 rounded-xl bg-teal-500 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-teal-500/20 group-hover:scale-105 transition-transform">
                <Compass className="w-6 h-6 stroke-[2.2]" />
              </div>
              <span className="text-2xl font-bold font-serif text-white tracking-tight">
                Wander<span className="text-teal-400">Wise</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              An intelligent, responsive travel itinerary and Indian Rupee budget planner powered by Gemini 3.8 Flash AI and heuristic algorithms.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700 text-teal-300 text-xs font-medium">
              <GraduationCap className="w-4 h-4 text-amber-400" />
              <span>B.Tech AI-ML End Semester Exam Project</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavClick('home')}
                  className="hover:text-teal-300 transition-colors cursor-pointer"
                >
                  Home Landing
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('planner')}
                  className="hover:text-teal-300 transition-colors cursor-pointer"
                >
                  Plan an Itinerary
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('destinations')}
                  className="hover:text-teal-300 transition-colors cursor-pointer"
                >
                  Trending Destinations
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('my-trips')}
                  className="hover:text-teal-300 transition-colors cursor-pointer"
                >
                  My Saved Trips
                </button>
              </li>
            </ul>
          </div>

          {/* Featured Destinations */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Top Destinations
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavClick('destinations')}
                  className="hover:text-teal-300 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <MapPin className="w-3 h-3 text-teal-400" />
                  <span>Jaipur, Rajasthan</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('destinations')}
                  className="hover:text-teal-300 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <MapPin className="w-3 h-3 text-teal-400" />
                  <span>Goa Coast & Old Goa</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('destinations')}
                  className="hover:text-teal-300 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <MapPin className="w-3 h-3 text-teal-400" />
                  <span>Munnar & Alleppey, Kerala</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('destinations')}
                  className="hover:text-teal-300 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <MapPin className="w-3 h-3 text-teal-400" />
                  <span>Manali & Solang Valley</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Project Details & Tech Stack */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Engineering Specs
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>• React 19 + TypeScript</li>
              <li>• Express 4 Full-Stack Proxy</li>
              <li>• Gemini 3.8 Flash AI Model</li>
              <li>• Tailwind CSS v4 Engine</li>
              <li>• LocalStorage Persistence</li>
            </ul>
            <button
              onClick={onOpenAbout}
              className="text-xs text-amber-400 hover:text-amber-300 underline font-semibold cursor-pointer block pt-1"
            >
              View Exam Viva Architecture →
            </button>
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="flex items-center gap-1 text-center sm:text-left">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-400 shrink-0" />
            <span>
              All budget figures and costs are algorithmic approximations in Indian Rupees (INR ₹). Please confirm local tariffs and opening timings before traveling.
            </span>
          </p>
          <p className="shrink-0 text-slate-400">
            © {new Date().getFullYear()} WanderWise. Built for B.Tech AI-ML.
          </p>
        </div>
      </div>
    </footer>
  );
};
