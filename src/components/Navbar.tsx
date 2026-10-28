import React, { useState } from 'react';
import { Compass, MapPin, Bookmark, Info, Sparkles, Menu, X, PlaneTakeoff } from 'lucide-react';

interface NavbarProps {
  activeTab: 'home' | 'planner' | 'destinations' | 'my-trips';
  setActiveTab: (tab: 'home' | 'planner' | 'destinations' | 'my-trips') => void;
  savedTripsCount: number;
  onOpenAbout: () => void;
  onLoadSampleTrip: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  savedTripsCount,
  onOpenAbout,
  onLoadSampleTrip
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (tab: 'home' | 'planner' | 'destinations' | 'my-trips') => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0F172A]/95 backdrop-blur-md border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-teal-500 to-teal-400 flex items-center justify-center text-slate-950 shadow-lg shadow-teal-500/20 group-hover:scale-105 transition-transform">
              <Compass className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-white font-serif">
                  Wander<span className="text-teal-400">Wise</span>
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-teal-900/60 text-teal-300 border border-teal-700/60 rounded-full">
                  AI Planner
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Smart Itinerary & Budget Engine
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <button
              onClick={() => handleNavClick('home')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'home'
                  ? 'bg-slate-800 text-teal-400'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => handleNavClick('planner')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'planner'
                  ? 'bg-teal-600 text-white shadow-sm shadow-teal-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Sparkles className="w-4 h-4 text-teal-300" />
              Plan a Trip
            </button>

            <button
              onClick={() => handleNavClick('destinations')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'destinations'
                  ? 'bg-slate-800 text-teal-400'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <MapPin className="w-4 h-4" />
              Destinations
            </button>

            <button
              onClick={() => handleNavClick('my-trips')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors relative ${
                activeTab === 'my-trips'
                  ? 'bg-slate-800 text-teal-400'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              <span>My Trips</span>
              {savedTripsCount > 0 && (
                <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-semibold rounded-full bg-teal-500 text-slate-950">
                  {savedTripsCount}
                </span>
              )}
            </button>

            <button
              onClick={onOpenAbout}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
              title="B.Tech AI-ML Exam Project Details"
            >
              <Info className="w-4 h-4 text-amber-400" />
              <span>Project Info</span>
            </button>
          </nav>

          {/* Quick Action Button */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={onLoadSampleTrip}
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-slate-800/80 hover:bg-slate-800 hover:text-white border border-slate-700 transition-all flex items-center gap-1.5"
            >
              <PlaneTakeoff className="w-3.5 h-3.5 text-teal-400" />
              Load Sample Trip
            </button>

            <button
              onClick={() => handleNavClick('planner')}
              className="px-4 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-teal-500 to-teal-400 text-slate-950 hover:from-teal-400 hover:to-teal-300 shadow-md shadow-teal-500/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Plan My Trip</span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => handleNavClick('my-trips')}
              className="p-2 text-slate-300 hover:text-white relative"
              aria-label="Saved trips"
            >
              <Bookmark className="w-5 h-5" />
              {savedTripsCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-teal-400 text-slate-950 shadow-sm">
                  {savedTripsCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-[#0F172A] px-4 pt-3 pb-5 space-y-2">
          <button
            onClick={() => handleNavClick('home')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
              activeTab === 'home' ? 'bg-slate-800 text-teal-400' : 'text-slate-300'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('planner')}
            className={`w-full flex items-center gap-2 text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
              activeTab === 'planner' ? 'bg-teal-600 text-white' : 'text-slate-300'
            }`}
          >
            <Sparkles className="w-4 h-4 text-teal-300" />
            Plan a Trip (Form & AI)
          </button>
          <button
            onClick={() => handleNavClick('destinations')}
            className={`w-full flex items-center gap-2 text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
              activeTab === 'destinations' ? 'bg-slate-800 text-teal-400' : 'text-slate-300'
            }`}
          >
            <MapPin className="w-4 h-4" />
            Explore Destinations
          </button>
          <button
            onClick={() => handleNavClick('my-trips')}
            className={`w-full flex items-center justify-between text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
              activeTab === 'my-trips' ? 'bg-slate-800 text-teal-400' : 'text-slate-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <Bookmark className="w-4 h-4" />
              My Saved Trips
            </div>
            {savedTripsCount > 0 && (
              <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-teal-500 text-slate-950">
                {savedTripsCount}
              </span>
            )}
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenAbout();
            }}
            className="w-full flex items-center gap-2 text-left px-3 py-2.5 rounded-lg text-sm font-medium text-amber-300 hover:bg-slate-800"
          >
            <Info className="w-4 h-4" />
            B.Tech Project Architecture
          </button>
          <div className="pt-2 border-t border-slate-800 flex gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onLoadSampleTrip();
              }}
              className="flex-1 py-2 px-3 text-xs text-center rounded-lg bg-slate-800 text-teal-300 border border-slate-700"
            >
              Load Sample Trip
            </button>
            <button
              onClick={() => handleNavClick('planner')}
              className="flex-1 py-2 px-3 text-xs text-center font-bold rounded-lg bg-teal-500 text-slate-950"
            >
              Plan Trip Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
