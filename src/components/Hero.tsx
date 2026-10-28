import React from 'react';
import { Sparkles, Compass, ShieldCheck, IndianRupee, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';

interface HeroProps {
  onStartPlanning: () => void;
  onExploreDestinations: () => void;
  onLoadSampleTrip: () => void;
  onSelectQuickDestination: (name: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onStartPlanning,
  onExploreDestinations,
  onLoadSampleTrip,
  onSelectQuickDestination
}) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#0F172A] via-[#132A45] to-[#0A192F] text-white">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20 lg:pt-16 lg:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-950/80 border border-teal-500/30 text-teal-300 text-xs sm:text-sm font-medium">
              <Sparkles className="w-4 h-4 text-teal-400 animate-pulse" />
              <span>B.Tech AI-ML End Semester Capstone Project</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-serif leading-[1.15]">
              Plan Your Next Journey With{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-teal-200 to-amber-200">
                AI Precision
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Personalized day-by-day itineraries tailored to your destination, budget in Indian rupees (₹), travel pace, and passions. From solo backpacking to family vacations, travel wiser with intelligent expense breakdowns.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onStartPlanning}
                className="px-6 py-3.5 rounded-xl text-base font-bold bg-teal-500 hover:bg-teal-400 text-slate-950 shadow-lg shadow-teal-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2.5 cursor-pointer"
              >
                <Sparkles className="w-5 h-5 text-slate-950" />
                <span>Plan My Trip</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onLoadSampleTrip}
                className="px-5 py-3.5 rounded-xl text-sm font-semibold bg-slate-800/80 hover:bg-slate-700/80 text-white border border-slate-700 hover:border-teal-500/50 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Compass className="w-4 h-4 text-teal-400" />
                <span>Explore 5-Day Sample Trip</span>
              </button>
            </div>

            {/* Quick Destination Tags */}
            <div className="pt-4 border-t border-slate-800/80">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2.5">
                Popular Quick Picks:
              </span>
              <div className="flex flex-wrap gap-2">
                {['Jaipur', 'Goa', 'Kerala', 'Manali', 'Varanasi', 'Ladakh'].map((dest) => (
                  <button
                    key={dest}
                    onClick={() => onSelectQuickDestination(dest)}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800/70 hover:bg-teal-900/50 hover:text-teal-300 hover:border-teal-500/40 border border-slate-700/60 text-slate-300 transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <MapPin className="w-3 h-3 text-teal-400" />
                    {dest}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Card with Live Preview Peek */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative ring */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-teal-500/30 to-amber-500/20 blur-lg opacity-75"></div>

              <div className="relative rounded-2xl overflow-hidden bg-slate-900/90 border border-slate-700/80 shadow-2xl">
                {/* Hero Travel Image */}
                <div className="relative h-56 sm:h-64 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=900&q=80"
                    alt="Travel destination in India"
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  
                  {/* Floating Badge */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700 text-teal-300 text-xs font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                    <span>AI Itinerary Ready</span>
                  </div>

                  <div className="absolute bottom-3 left-4 right-4">
                    <span className="text-xs uppercase font-bold tracking-wider text-teal-400">Featured Itinerary</span>
                    <h3 className="text-lg font-bold text-white font-serif">5-Day Royal Rajasthan Tour</h3>
                    <p className="text-xs text-slate-300">Amber Fort • Hawa Mahal • Cultural Bazaars • INR ₹28,000</p>
                  </div>
                </div>

                {/* Card Features List */}
                <div className="p-5 bg-slate-900/95 space-y-3.5 text-xs text-slate-300">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <span className="text-slate-400">Budget Breakdown</span>
                    <span className="font-semibold text-emerald-400 flex items-center gap-0.5">
                      <IndianRupee className="w-3 h-3" /> Balanced Budget Model
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="p-2 rounded-lg bg-slate-800/60 border border-slate-700/50">
                      <div className="text-[10px] text-slate-400 uppercase">Transport</div>
                      <div className="font-semibold text-slate-200 mt-0.5">₹6,500</div>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-800/60 border border-slate-700/50">
                      <div className="text-[10px] text-slate-400 uppercase">Hotels</div>
                      <div className="font-semibold text-slate-200 mt-0.5">₹11,000</div>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-800/60 border border-slate-700/50">
                      <div className="text-[10px] text-slate-400 uppercase">Food & Act.</div>
                      <div className="font-semibold text-slate-200 mt-0.5">₹9,000</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1 text-slate-400">
                    <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" />
                    <span>Includes Morning, Afternoon & Evening schedules with live completion ticks.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Highlights Bar */}
        <div className="mt-14 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Gemini 3.8 Flash AI</h4>
              <p className="text-xs text-slate-400 mt-0.5">Context-aware generative travel schedules</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <IndianRupee className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">INR Budget Optimizer</h4>
              <p className="text-xs text-slate-400 mt-0.5">Splits into stays, commute & street food</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Interactive Checklists</h4>
              <p className="text-xs text-slate-400 mt-0.5">Mark activities completed on the go</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Zero Missing Data</h4>
              <p className="text-xs text-slate-400 mt-0.5">Instant rule-based heuristic fallback</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
