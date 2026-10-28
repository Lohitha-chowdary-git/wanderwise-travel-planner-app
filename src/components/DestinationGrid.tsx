import React, { useState } from 'react';
import { Destination, TravelInterest } from '../types/travel';
import { POPULAR_DESTINATIONS } from '../data/destinations';
import { MapPin, Calendar, IndianRupee, Sparkles, ArrowRight, Search, Filter } from 'lucide-react';

interface DestinationGridProps {
  onSelectDestination: (dest: Destination) => void;
}

export const DestinationGrid: React.FC<DestinationGridProps> = ({ onSelectDestination }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  const filterOptions = [
    'All',
    'Culture & Heritage',
    'Beaches & Relaxation',
    'Adventure & Trekking',
    'Nature & Wildlife',
    'Spiritual & Wellness'
  ];

  const filteredDestinations = POPULAR_DESTINATIONS.filter((item) => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.stateOrCountry.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter = 
      selectedFilter === 'All' || 
      item.popularInterests.includes(selectedFilter as TravelInterest);

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Curated Travel Catalogs</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-slate-900">
          Explore Trending Destinations
        </h2>
        <p className="text-sm sm:text-base text-slate-600">
          Browse verified Indian getaways with realistic INR budget estimates, recommended stays, and 1-click AI planning.
        </p>
      </div>

      {/* Search and Interest Filter Controls */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200/80 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by city, fort, or beach..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none text-xs sm:text-sm text-slate-800"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          <Filter className="w-4 h-4 text-slate-400 shrink-0 hidden sm:block mr-1" />
          {filterOptions.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedFilter === filter
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Destinations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredDestinations.map((dest) => (
          <div
            key={dest.id}
            className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-slate-200/80 transition-all flex flex-col justify-between"
          >
            <div>
              {/* Card Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                
                {/* Duration badge */}
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold">
                  {dest.recommendedDays} Days Trip
                </span>

                {/* Best Season */}
                <span className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-teal-900/80 backdrop-blur-md text-teal-300 text-[11px] font-bold border border-teal-500/30">
                  {dest.bestSeason}
                </span>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="flex items-center gap-1 text-[11px] text-teal-300 font-medium">
                    <MapPin className="w-3 h-3" />
                    <span>{dest.stateOrCountry}</span>
                  </div>
                  <h3 className="text-xl font-bold font-serif leading-tight">
                    {dest.name}
                  </h3>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-4 space-y-3">
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {dest.description}
                </p>

                {/* Top attractions chips */}
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    Key Highlights:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {dest.topAttractions.slice(0, 3).map((attr, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium truncate max-w-[200px]"
                      >
                        {attr}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Card Footer: Budget & CTA */}
            <div className="p-4 pt-3 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between gap-3 mt-auto">
              <div>
                <span className="text-[10px] text-slate-400 block uppercase font-bold">
                  Estimated Budget
                </span>
                <span className="text-xs sm:text-sm font-extrabold text-slate-900 flex items-center gap-0.5">
                  <IndianRupee className="w-3.5 h-3.5 text-emerald-600" />
                  {dest.budgetRange}
                </span>
              </div>

              <button
                onClick={() => onSelectDestination(dest)}
                className="px-3 py-2 rounded-xl text-xs font-bold text-slate-950 bg-teal-400 hover:bg-teal-300 transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <span>Plan Trip</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredDestinations.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8">
          <p className="text-slate-500 text-sm">
            No destinations found matching "{searchQuery}". Try searching for Goa, Jaipur, Manali, Kerala, or Varanasi.
          </p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedFilter('All'); }}
            className="mt-3 px-4 py-2 rounded-lg bg-teal-600 text-white text-xs font-semibold cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};
