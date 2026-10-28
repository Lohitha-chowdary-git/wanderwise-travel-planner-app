import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  MapPin, 
  Calendar, 
  Clock, 
  IndianRupee, 
  Users, 
  Compass, 
  AlertCircle, 
  Check, 
  RotateCcw,
  Landmark,
  Palmtree,
  Trees,
  Utensils,
  Camera,
  ShoppingBag,
  Sparkle,
  Music,
  Hotel,
  ShieldAlert
} from 'lucide-react';
import { TripFormData, TravelInterest, TravelPace, TravelStyle } from '../types/travel';
import { TRAVEL_INTEREST_OPTIONS } from '../data/destinations';

interface TripFormProps {
  initialData?: Partial<TripFormData>;
  onGenerate: (data: TripFormData) => void;
  isLoading: boolean;
  onLoadSample: () => void;
}

const INTEREST_ICONS: Record<string, React.ReactNode> = {
  'Culture & Heritage': <Landmark className="w-4 h-4" />,
  'Adventure & Trekking': <Compass className="w-4 h-4" />,
  'Beaches & Relaxation': <Palmtree className="w-4 h-4" />,
  'Nature & Wildlife': <Trees className="w-4 h-4" />,
  'Foodie & Culinary': <Utensils className="w-4 h-4" />,
  'Photography': <Camera className="w-4 h-4" />,
  'Shopping & Markets': <ShoppingBag className="w-4 h-4" />,
  'Spiritual & Wellness': <Sparkle className="w-4 h-4" />,
  'Nightlife & Social': <Music className="w-4 h-4" />
};

export const TripForm: React.FC<TripFormProps> = ({
  initialData,
  onGenerate,
  isLoading,
  onLoadSample
}) => {
  const getTomorrowDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  };

  const [destination, setDestination] = useState(initialData?.destination || 'Jaipur, Rajasthan');
  const [startingCity, setStartingCity] = useState(initialData?.startingCity || 'New Delhi');
  const [departureDate, setDepartureDate] = useState(initialData?.departureDate || getTomorrowDate());
  const [days, setDays] = useState(initialData?.days || 4);
  const [budget, setBudget] = useState(initialData?.budget || 24000);
  const [travelers, setTravelers] = useState(initialData?.travelers || 2);
  const [interests, setInterests] = useState<TravelInterest[]>(
    initialData?.interests || ['Culture & Heritage', 'Foodie & Culinary', 'Photography']
  );
  const [travelPace, setTravelPace] = useState<TravelPace>(initialData?.travelPace || 'Balanced');
  const [travelStyle, setTravelStyle] = useState<TravelStyle>(initialData?.travelStyle || 'standard');
  const [validationError, setValidationError] = useState<string | null>(null);

  // Sync if initialData changes externally (e.g. user clicked a destination card or quick tag)
  useEffect(() => {
    if (initialData) {
      if (initialData.destination) setDestination(initialData.destination);
      if (initialData.startingCity) setStartingCity(initialData.startingCity);
      if (initialData.departureDate) setDepartureDate(initialData.departureDate);
      if (initialData.days) setDays(initialData.days);
      if (initialData.budget) setBudget(initialData.budget);
      if (initialData.travelers) setTravelers(initialData.travelers);
      if (initialData.interests) setInterests(initialData.interests);
      if (initialData.travelPace) setTravelPace(initialData.travelPace);
      if (initialData.travelStyle) setTravelStyle(initialData.travelStyle);
    }
  }, [initialData]);

  // Loading animation state steps
  const [loadingStep, setLoadingStep] = useState(0);
  const loadingMessages = [
    'Analyzing destination geography & attractions...',
    'Curating morning, afternoon & evening experiences...',
    'Calculating transport, stay & food budgets in INR...',
    'Synthesizing personalized day-by-day plan...'
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoading) {
      setLoadingStep(0);
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev + 1) % loadingMessages.length);
      }, 1400);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const toggleInterest = (interest: TravelInterest) => {
    if (interests.includes(interest)) {
      if (interests.length === 1) {
        setValidationError('Please keep at least one travel interest selected.');
        return;
      }
      setInterests(interests.filter((item) => item !== interest));
      setValidationError(null);
    } else {
      setInterests([...interests, interest]);
      setValidationError(null);
    }
  };

  const handleBudgetPreset = (multiplier: number, style: TravelStyle) => {
    const calculatedBudget = multiplier * days * travelers;
    setBudget(calculatedBudget);
    setTravelStyle(style);
    setValidationError(null);
  };

  // Calculate per person per day budget
  const perPersonPerDay = travelers > 0 && days > 0 ? Math.round(budget / (travelers * days)) : 0;
  const recommendedMinBudget = travelers * days * 800; // minimum realistic daily budget per person ₹800

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!destination.trim()) {
      setValidationError('Please specify your desired travel destination.');
      return;
    }
    if (!startingCity.trim()) {
      setValidationError('Please specify your starting departure city.');
      return;
    }

    const todayStr = new Date().toISOString().split('T')[0];
    if (departureDate < todayStr) {
      setValidationError('Departure date cannot be in the past.');
      return;
    }

    if (days < 1 || days > 14) {
      setValidationError('Trip duration must be between 1 and 14 days.');
      return;
    }
    if (budget < 2000) {
      setValidationError('Please enter a realistic travel budget (minimum ₹2,000 INR).');
      return;
    }
    if (budget < recommendedMinBudget) {
      setValidationError(`For ${travelers} traveler(s) over ${days} day(s), a minimum budget of at least ₹${recommendedMinBudget.toLocaleString('en-IN')} INR is recommended for basic stay and meals.`);
      return;
    }
    if (travelers < 1) {
      setValidationError('At least 1 traveler is required.');
      return;
    }
    if (interests.length === 0) {
      setValidationError('Please choose at least 1 travel interest.');
      return;
    }

    setValidationError(null);
    onGenerate({
      destination: destination.trim(),
      startingCity: startingCity.trim(),
      departureDate,
      days,
      budget,
      travelers,
      interests,
      travelPace,
      travelStyle
    });
  };

  const resetForm = () => {
    setDestination('');
    setStartingCity('New Delhi');
    setDepartureDate(getTomorrowDate());
    setDays(3);
    setBudget(18000);
    setTravelers(2);
    setInterests(['Culture & Heritage', 'Foodie & Culinary']);
    setTravelPace('Balanced');
    setTravelStyle('standard');
    setValidationError(null);
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-amber-900/10 overflow-hidden">
      {/* Form Header */}
      <div className="bg-gradient-to-r from-[#0F172A] to-[#1E293B] text-white px-6 py-6 sm:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-700">
        <div>
          <div className="flex items-center gap-2 text-teal-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>AI Travel Recommendation Engine</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-serif text-white mt-1">
            Build Your Personalized Itinerary
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
            Provide your trip preferences to receive a tailored day-by-day plan with INR budget splits.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={resetForm}
            className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Clear Form"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>
          <button
            type="button"
            onClick={onLoadSample}
            className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-teal-950 bg-teal-400 hover:bg-teal-300 transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <span>Load Sample Trip</span>
          </button>
        </div>
      </div>

      {/* Validation Banner */}
      {validationError && (
        <div className="mx-6 mt-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 flex items-start gap-3 text-sm animate-fadeIn">
          <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Review Input</p>
            <p className="text-rose-700 text-xs mt-0.5">{validationError}</p>
          </div>
        </div>
      )}

      {/* Form Body */}
      <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-8">
        {/* Section 1: Route & Dates */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-800 text-xs flex items-center justify-center font-bold">1</span>
            Destination & Schedule
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Destination */}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Where do you want to go? *
              </label>
              <div className="relative">
                <MapPin className="w-5 h-5 text-teal-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => {
                    setDestination(e.target.value);
                    if (validationError) setValidationError(null);
                  }}
                  placeholder="e.g. Jaipur, Rajasthan or Goa or Manali"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none text-sm text-slate-900 bg-slate-50/50 font-medium"
                  required
                />
              </div>
              <div className="flex flex-wrap items-center gap-1.5 mt-2">
                <span className="text-[11px] text-slate-400">Popular:</span>
                {['Jaipur', 'Goa', 'Munnar & Alleppey', 'Manali', 'Varanasi', 'Leh Ladakh', 'Udaipur'].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setDestination(item)}
                    className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-teal-800 hover:bg-teal-50 hover:text-teal-900 border border-slate-200 font-medium cursor-pointer transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Starting City */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Starting City (Origin) *
              </label>
              <div className="relative">
                <Compass className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={startingCity}
                  onChange={(e) => setStartingCity(e.target.value)}
                  placeholder="e.g. Delhi, Mumbai, Bangalore"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none text-sm text-slate-900 bg-slate-50/50 font-medium"
                  required
                />
              </div>
            </div>

            {/* Departure Date */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Departure Date *
              </label>
              <div className="relative">
                <Calendar className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="date"
                  value={departureDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none text-sm text-slate-900 bg-slate-50/50 font-medium cursor-pointer"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Duration, Group, Budget & Travel Style */}
        <div className="pt-4 border-t border-slate-100">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-800 text-xs flex items-center justify-center font-bold">2</span>
            Duration, Travelers, Style & INR Budget
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Duration (Days) */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-teal-600" />
                  Duration
                </label>
                <span className="text-base font-extrabold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-lg border border-teal-200">
                  {days} {days === 1 ? 'Day' : 'Days'}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="14"
                value={days}
                onChange={(e) => setDays(parseInt(e.target.value, 10))}
                className="w-full accent-teal-600 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-medium">
                <span>1 Day</span>
                <span>4 Days</span>
                <span>7 Days</span>
                <span>14 Days</span>
              </div>
            </div>

            {/* Travelers */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-teal-600" />
                  Travelers
                </label>
                <span className="text-base font-extrabold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-lg border border-teal-200">
                  {travelers} {travelers === 1 ? 'Person' : 'People'}
                </span>
              </div>
              <div className="grid grid-cols-4 gap-1.5 mt-2">
                {[1, 2, 4, 6].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setTravelers(num)}
                    className={`py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                      travelers === num
                        ? 'bg-teal-600 text-white border-teal-600 shadow-sm'
                        : 'bg-white text-slate-700 border-slate-300 hover:border-teal-400'
                    }`}
                  >
                    {num === 1 ? 'Solo' : num === 2 ? 'Couple' : num === 4 ? 'Group' : 'Family'}
                  </button>
                ))}
              </div>
            </div>

            {/* Budget in INR */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 md:col-span-2 lg:col-span-1">
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <IndianRupee className="w-4 h-4 text-emerald-600" />
                  Total Budget (INR ₹) *
                </label>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  ~₹{perPersonPerDay.toLocaleString('en-IN')}/person/day
                </span>
              </div>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-slate-600 text-sm">
                  ₹
                </span>
                <input
                  type="number"
                  min="2000"
                  step="1000"
                  value={budget}
                  onChange={(e) => {
                    setBudget(Math.max(0, parseInt(e.target.value, 10) || 0));
                    if (validationError) setValidationError(null);
                  }}
                  placeholder="25000"
                  className="w-full pl-8 pr-4 py-2.5 rounded-lg border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none text-sm font-bold text-slate-900 bg-white"
                  required
                />
              </div>

              {/* Quick auto-calculate presets */}
              <div className="grid grid-cols-3 gap-1.5 mt-2">
                <button
                  type="button"
                  onClick={() => handleBudgetPreset(1800, 'budget')}
                  className={`py-1 px-1 text-[10px] font-bold rounded border text-center transition-colors cursor-pointer truncate ${
                    travelStyle === 'budget'
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
                  }`}
                  title="Budget: approx ₹1,800/person/day"
                >
                  Budget (₹1.8k/d)
                </button>
                <button
                  type="button"
                  onClick={() => handleBudgetPreset(3500, 'standard')}
                  className={`py-1 px-1 text-[10px] font-bold rounded border text-center transition-colors cursor-pointer truncate ${
                    travelStyle === 'standard'
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
                  }`}
                  title="Standard: approx ₹3,500/person/day"
                >
                  Standard (₹3.5k/d)
                </button>
                <button
                  type="button"
                  onClick={() => handleBudgetPreset(6500, 'luxury')}
                  className={`py-1 px-1 text-[10px] font-bold rounded border text-center transition-colors cursor-pointer truncate ${
                    travelStyle === 'luxury'
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
                  }`}
                  title="Luxury: approx ₹6,500/person/day"
                >
                  Luxury (₹6.5k/d)
                </button>
              </div>
            </div>
          </div>

          {/* Travel Style Selection Card */}
          <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Hotel className="w-4 h-4 text-teal-600" />
                Accommodation & Travel Category:
              </span>
              <p className="text-[11px] text-slate-500">
                Determines hotel star rating, private vs shared cabs, and dining style.
              </p>
            </div>
            <div className="flex gap-2">
              {[
                { key: 'budget', label: '🎒 Budget (Hostels/Trains)' },
                { key: 'standard', label: '🏨 Standard (3-Star & Cabs)' },
                { key: 'luxury', label: '👑 Luxury (Resorts & Flights)' }
              ].map((style) => (
                <button
                  key={style.key}
                  type="button"
                  onClick={() => setTravelStyle(style.key as TravelStyle)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer whitespace-nowrap ${
                    travelStyle === style.key
                      ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {style.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Section 3: Travel Interests & Pace */}
        <div className="pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-800 text-xs flex items-center justify-center font-bold">3</span>
              Travel Interests & Preferred Pace
            </h3>
            <span className="text-xs font-medium text-slate-500">
              {interests.length} selected
            </span>
          </div>
          <p className="text-xs text-slate-500 mb-4">
            Select one or more themes to tailor your morning, afternoon, and evening recommendations.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {TRAVEL_INTEREST_OPTIONS.map((item) => {
              const isSelected = interests.includes(item.label as TravelInterest);
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => toggleInterest(item.label as TravelInterest)}
                  className={`p-3 rounded-xl border text-left transition-all flex items-start gap-3 cursor-pointer ${
                    isSelected
                      ? 'bg-teal-50 border-teal-500 text-teal-950 shadow-sm'
                      : 'bg-slate-50/60 border-slate-200/80 text-slate-700 hover:bg-slate-100/80 hover:border-slate-300'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                      isSelected ? 'bg-teal-600 text-white' : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {INTEREST_ICONS[item.label] || <Compass className="w-4 h-4" />}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold leading-tight truncate">
                        {item.label}
                      </span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-teal-600 shrink-0 ml-1" />}
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-snug line-clamp-1">
                      {item.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Travel Pace */}
          <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Preferred Travel Pace:
            </span>
            <div className="flex gap-2">
              {(['Relaxed', 'Balanced', 'Fast-paced'] as TravelPace[]).map((pace) => (
                <button
                  key={pace}
                  type="button"
                  onClick={() => setTravelPace(pace)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                    travelPace === pace
                      ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {pace === 'Relaxed' ? '🌿 Relaxed' : pace === 'Balanced' ? '⚖️ Balanced' : '⚡ Fast-paced'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Submit Button & Progress Indicator */}
        <div className="pt-2">
          {isLoading ? (
            <div className="p-5 rounded-2xl bg-teal-50 border border-teal-200 text-center space-y-3 animate-fadeIn">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-teal-600 text-white animate-spin shadow-md">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-teal-900">
                  {loadingMessages[loadingStep]}
                </h4>
                <p className="text-xs text-teal-700 mt-1">
                  Connecting to Gemini 3.8 Flash & Heuristic Optimizer for {destination || 'your destination'}...
                </p>
              </div>
              <div className="w-48 h-1.5 bg-teal-200 rounded-full mx-auto overflow-hidden">
                <div className="h-full bg-teal-600 rounded-full animate-pulse w-3/4"></div>
              </div>
            </div>
          ) : (
            <button
              type="submit"
              className="w-full py-4 px-6 rounded-xl text-base font-bold text-white bg-gradient-to-r from-teal-600 via-teal-500 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 shadow-lg shadow-teal-600/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3 cursor-pointer"
            >
              <Sparkles className="w-5 h-5 text-white" />
              <span>Generate AI Itinerary (₹{budget.toLocaleString('en-IN')} INR)</span>
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
