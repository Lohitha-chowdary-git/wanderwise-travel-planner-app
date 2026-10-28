import React, { useState } from 'react';
import { 
  Itinerary, 
  Activity 
} from '../types/travel';
import { 
  Calendar, 
  MapPin, 
  Users, 
  IndianRupee, 
  Sun, 
  Sunrise, 
  Sunset, 
  CheckCircle2, 
  Circle, 
  Bookmark, 
  BookmarkCheck, 
  Printer, 
  Download, 
  Share2, 
  Clock, 
  Sparkles, 
  Lightbulb, 
  ShieldCheck, 
  Utensils, 
  Backpack, 
  Building2, 
  Compass, 
  Luggage,
  CloudSun,
  AlertTriangle,
  RotateCcw,
  CheckCheck
} from 'lucide-react';

interface ItineraryDisplayProps {
  itinerary: Itinerary;
  onToggleActivity: (dayNumber: number, period: 'morning' | 'afternoon' | 'evening', actId: string) => void;
  onSaveTrip: (itinerary: Itinerary) => void;
  onUnsaveTrip?: (tripId: string) => void;
  isSaved: boolean;
  onPlanAnother: () => void;
}

export const ItineraryDisplay: React.FC<ItineraryDisplayProps> = ({
  itinerary,
  onToggleActivity,
  onSaveTrip,
  onUnsaveTrip,
  isSaved,
  onPlanAnother
}) => {
  const [selectedDay, setSelectedDay] = useState<number | 'all'>('all');
  const [copiedLink, setCopiedLink] = useState(false);

  // Calculate completion statistics
  let totalActivities = 0;
  let completedActivities = 0;

  itinerary.dailyPlans.forEach((day) => {
    ['morning', 'afternoon', 'evening'].forEach((period) => {
      totalActivities += 1;
      const act = day[period as 'morning' | 'afternoon' | 'evening'];
      if (act && act.completed) completedActivities += 1;
    });
  });

  const completionPercent = totalActivities > 0 ? Math.round((completedActivities / totalActivities) * 100) : 0;

  const handlePrint = () => {
    window.print();
  };

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(itinerary, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${itinerary.destination.replace(/[^a-zA-Z0-9]/g, '_')}_itinerary.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const { costBreakdown } = itinerary;
  const budgetRatio = itinerary.budget > 0 
    ? Math.round((costBreakdown.totalEstimated / itinerary.budget) * 100) 
    : 100;

  const filteredDays = selectedDay === 'all' 
    ? itinerary.dailyPlans 
    : itinerary.dailyPlans.filter(d => d.dayNumber === selectedDay);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner & Header Summary */}
      <div className="bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0D3B43] rounded-3xl p-6 sm:p-8 lg:p-10 text-white shadow-2xl border border-slate-700/60 relative overflow-hidden">
        {/* Decorative ambient background */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-500/20 text-teal-300 border border-teal-500/40 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                {itinerary.generatedBy === 'gemini-ai' ? 'AI Optimized (Gemini 3.8 Flash)' : 'Heuristic Verified Plan'}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
                {itinerary.travelPace} Pace
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700 capitalize">
                {itinerary.travelStyle} Category
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-serif text-white leading-tight">
              {itinerary.title}
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {itinerary.summary}
            </p>

            <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-slate-300 pt-2">
              <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0" />
                <span>{itinerary.destination} (from {itinerary.startingCity})</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
                <Calendar className="w-4 h-4 text-teal-400 shrink-0" />
                <span>{itinerary.days} Days • Starts {itinerary.departureDate}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
                <Users className="w-4 h-4 text-teal-400 shrink-0" />
                <span>{itinerary.travelers} Traveler{itinerary.travelers > 1 ? 's' : ''}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons Toolbar */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0 no-print">
            <div className="flex items-center gap-2">
              <button
                onClick={() => onSaveTrip(itinerary)}
                className={`flex-1 px-5 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md ${
                  isSaved 
                    ? 'bg-emerald-500 text-slate-950 hover:bg-emerald-400' 
                    : 'bg-teal-500 text-slate-950 hover:bg-teal-400'
                }`}
              >
                {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                <span>{isSaved ? 'Saved in My Trips' : 'Save Itinerary'}</span>
              </button>

              {isSaved && onUnsaveTrip && (
                <button
                  onClick={() => onUnsaveTrip(itinerary.id)}
                  className="px-3 py-3 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-rose-900/60 hover:text-rose-200 text-slate-400 border border-slate-700 transition-colors cursor-pointer"
                  title="Remove from Saved Trips"
                >
                  Unsave
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="flex-1 px-3 py-2 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                title="Print or Save as PDF"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / PDF</span>
              </button>

              <button
                onClick={handleExportJSON}
                className="flex-1 px-3 py-2 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                title="Download JSON structure"
              >
                <Download className="w-3.5 h-3.5" />
                <span>JSON</span>
              </button>

              <button
                onClick={handleShare}
                className="px-3 py-2 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                title="Copy share link"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copiedLink ? 'Copied!' : 'Share'}</span>
              </button>
            </div>

            <button
              onClick={onPlanAnother}
              className="text-xs text-slate-400 hover:text-teal-300 underline text-center cursor-pointer pt-1"
            >
              Modify inputs / Plan new trip
            </button>
          </div>
        </div>

        {/* Live Trip Completion Progress Bar */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs uppercase font-bold tracking-wider text-slate-400">
                Live Itinerary Progress
              </div>
              <div className="text-sm font-semibold text-white">
                {completedActivities} of {totalActivities} experiences completed ({completionPercent}%)
              </div>
            </div>
          </div>

          <div className="w-full sm:w-72">
            <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
              <div 
                className="h-full bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full transition-all duration-500"
                style={{ width: `${completionPercent}%` }}
              />
            </div>
            <div className="text-[11px] text-slate-400 mt-1 text-right">
              Click activity checkboxes below to mark as done
            </div>
          </div>
        </div>
      </div>

      {/* Expense Breakdown & Budget Distribution Grid */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg border border-amber-900/10 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-700">
              <IndianRupee className="w-4 h-4" />
              <span>Budget Analysis & INR Allocations</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-slate-900 mt-1">
              Estimated Trip Cost Breakdown
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Approximate planning allocations in Indian Rupees (₹). Real-time tariffs, seasonal surcharges, and entry fees may vary.
            </p>
          </div>

          {/* Budget status badge */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="text-right">
              <span className="text-xs text-slate-500 block">User Target Budget</span>
              <span className="text-lg font-extrabold text-slate-900">
                ₹{itinerary.budget.toLocaleString('en-IN')}
              </span>
            </div>

            {/* Dynamic Status Pill */}
            {costBreakdown.totalEstimated < itinerary.budget ? (
              <div className="px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1.5 shadow-sm">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>
                  Under Budget by ₹{(itinerary.budget - costBreakdown.totalEstimated).toLocaleString('en-IN')}
                </span>
              </div>
            ) : costBreakdown.totalEstimated === itinerary.budget ? (
              <div className="px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1.5 shadow-sm">
                <CheckCheck className="w-4 h-4 text-emerald-600" />
                <span>Exactly on Budget (₹{costBreakdown.totalEstimated.toLocaleString('en-IN')})</span>
              </div>
            ) : (
              <div className="px-3.5 py-2 rounded-xl text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1.5 shadow-sm">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>
                  Over Budget by ₹{(costBreakdown.totalEstimated - itinerary.budget).toLocaleString('en-IN')}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Budget utilization visual bar */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
            <span>Budget Utilization: {budgetRatio}% of Planned Budget</span>
            <span className="text-slate-500">
              Total Estimated: ₹{costBreakdown.totalEstimated.toLocaleString('en-IN')} / Planned: ₹{itinerary.budget.toLocaleString('en-IN')}
            </span>
          </div>
          <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-500 ${
                budgetRatio <= 100 ? 'bg-gradient-to-r from-teal-500 to-emerald-500' : 'bg-gradient-to-r from-amber-500 to-rose-500'
              }`}
              style={{ width: `${Math.min(100, budgetRatio)}%` }}
            />
          </div>
        </div>

        {/* 5-Card Expense Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {/* Transport */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Transport</span>
              <Compass className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-lg font-extrabold text-slate-900">
              ₹{costBreakdown.transport.toLocaleString('en-IN')}
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Flights / Trains & Local commute
            </p>
          </div>

          {/* Accommodation */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Stay & Hotel</span>
              <Building2 className="w-4 h-4 text-teal-600" />
            </div>
            <div className="text-lg font-extrabold text-slate-900">
              ₹{costBreakdown.accommodation.toLocaleString('en-IN')}
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              {itinerary.days - 1 > 0 ? itinerary.days - 1 : 1} Night(s) in {itinerary.travelStyle} stay
            </p>
          </div>

          {/* Food */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Food & Dining</span>
              <Utensils className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-lg font-extrabold text-slate-900">
              ₹{costBreakdown.food.toLocaleString('en-IN')}
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              3 meals daily, snacks & street food
            </p>
          </div>

          {/* Activities */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Activities</span>
              <Sparkles className="w-4 h-4 text-purple-600" />
            </div>
            <div className="text-lg font-extrabold text-slate-900">
              ₹{costBreakdown.activities.toLocaleString('en-IN')}
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Monument tickets, guides, entry
            </p>
          </div>

          {/* Misc & Buffer */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Buffer / Misc</span>
              <Luggage className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-lg font-extrabold text-slate-900">
              ₹{costBreakdown.miscellaneous.toLocaleString('en-IN')}
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Shopping, auto tips, emergency
            </p>
          </div>
        </div>

        {/* Budget Tips Strip */}
        {costBreakdown.tips && costBreakdown.tips.length > 0 && (
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-amber-900 text-xs sm:text-sm space-y-1.5">
            <div className="font-bold flex items-center gap-1.5 text-amber-950">
              <Lightbulb className="w-4 h-4 text-amber-600" />
              <span>Money-Saving Tips for {itinerary.destination}:</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-xs text-amber-900/90 pl-1">
              {costBreakdown.tips.map((tip, idx) => (
                <li key={idx}>{tip}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Destination Insider Guide (Weather, Delicacies, Essentials) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Weather card */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 space-y-2.5">
          <div className="flex items-center gap-2 text-sky-700 font-bold text-xs uppercase tracking-wider">
            <CloudSun className="w-4 h-4" />
            <span>Weather & Timing</span>
          </div>
          <h4 className="text-sm font-bold text-slate-900">{itinerary.bestTimeToVisit}</h4>
          <p className="text-xs text-slate-600 leading-relaxed">{itinerary.weatherForecast}</p>
        </div>

        {/* Local Delicacies */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 space-y-2.5">
          <div className="flex items-center gap-2 text-amber-700 font-bold text-xs uppercase tracking-wider">
            <Utensils className="w-4 h-4" />
            <span>Must-Try Food Delicacies</span>
          </div>
          <ul className="space-y-1.5 text-xs text-slate-700">
            {itinerary.localDelicacies.map((item, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="text-amber-500 font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Travel Essentials */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 space-y-2.5">
          <div className="flex items-center gap-2 text-teal-700 font-bold text-xs uppercase tracking-wider">
            <Backpack className="w-4 h-4" />
            <span>Packing Essentials</span>
          </div>
          <ul className="space-y-1.5 text-xs text-slate-700">
            {itinerary.travelEssentials.map((item, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="text-teal-500 font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Day Filter Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 no-print">
        <div>
          <h3 className="text-xl font-bold font-serif text-slate-900">
            Day-by-Day Schedule
          </h3>
          <p className="text-xs text-slate-500">
            Morning, afternoon, and evening recommendations with interactive completion tracking.
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-200/70 p-1 rounded-xl overflow-x-auto scrollbar-none max-w-full">
          <button
            onClick={() => setSelectedDay('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedDay === 'all'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            All Days ({itinerary.dailyPlans.length})
          </button>
          {itinerary.dailyPlans.map((d) => (
            <button
              key={d.dayNumber}
              onClick={() => setSelectedDay(d.dayNumber)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedDay === d.dayNumber
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              Day {d.dayNumber}
            </button>
          ))}
        </div>
      </div>

      {/* Daily Plans List */}
      <div className="space-y-6">
        {filteredDays.map((day) => (
          <div 
            key={day.dayNumber}
            className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-200/80 space-y-6 transition-all print:border print:shadow-none"
          >
            {/* Day Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <span className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-teal-600 to-teal-500 text-white font-extrabold text-base flex items-center justify-center shadow-md shadow-teal-600/20 shrink-0">
                  D{day.dayNumber}
                </span>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
                      {day.date}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-xs text-slate-500">
                      Stay: {day.staySuggestion}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold font-serif text-slate-900 mt-0.5">
                    {day.theme}
                  </h3>
                </div>
              </div>

              {day.dayTip && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 text-amber-900 text-xs border border-amber-200/60 max-w-md">
                  <Lightbulb className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{day.dayTip}</span>
                </div>
              )}
            </div>

            {/* Three periods: Morning, Afternoon, Evening */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Morning */}
              <ActivityCard
                period="morning"
                activity={day.morning}
                onToggle={() => onToggleActivity(day.dayNumber, 'morning', day.morning.id)}
              />

              {/* Afternoon */}
              <ActivityCard
                period="afternoon"
                activity={day.afternoon}
                onToggle={() => onToggleActivity(day.dayNumber, 'afternoon', day.afternoon.id)}
              />

              {/* Evening */}
              <ActivityCard
                period="evening"
                activity={day.evening}
                onToggle={() => onToggleActivity(day.dayNumber, 'evening', day.evening.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

interface ActivityCardProps {
  period: 'morning' | 'afternoon' | 'evening';
  activity: Activity;
  onToggle: () => void;
}

const ActivityCard: React.FC<ActivityCardProps> = ({
  period,
  activity,
  onToggle
}) => {
  const isMorning = period === 'morning';
  const isAfternoon = period === 'afternoon';

  const periodIcon = isMorning 
    ? <Sunrise className="w-4 h-4 text-amber-500" /> 
    : isAfternoon 
      ? <Sun className="w-4 h-4 text-orange-500" /> 
      : <Sunset className="w-4 h-4 text-indigo-500" />;

  const periodLabel = isMorning ? 'Morning' : isAfternoon ? 'Afternoon' : 'Evening';

  return (
    <div 
      className={`rounded-2xl p-5 border transition-all flex flex-col justify-between ${
        activity.completed 
          ? 'bg-slate-50 border-emerald-300/80 shadow-sm' 
          : 'bg-[#FDFBF7] border-amber-900/10 hover:border-teal-400 hover:shadow-md'
      }`}
    >
      <div>
        {/* Card Header: Period + Time + Completed checkbox */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200/60 mb-3">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700">
            {periodIcon}
            <span>{periodLabel}</span>
          </div>

          <button
            type="button"
            onClick={onToggle}
            className={`flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-lg transition-colors cursor-pointer no-print ${
              activity.completed 
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-300'
            }`}
            title={activity.completed ? 'Mark as incomplete' : 'Mark as completed'}
          >
            {activity.completed ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Done</span>
              </>
            ) : (
              <>
                <Circle className="w-4 h-4 text-slate-400" />
                <span>Mark Done</span>
              </>
            )}
          </button>
        </div>

        {/* Time, approximate duration, and cost row */}
        <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 gap-1.5 mb-2.5">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="flex items-center gap-1 font-medium text-slate-700">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {activity.time}
            </span>
            {activity.duration && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200/80 font-semibold">
                {activity.duration}
              </span>
            )}
          </div>
          <span className="font-bold text-slate-900 flex items-center gap-0.5 bg-slate-100 px-2 py-0.5 rounded-md text-[11px]">
            <span className="text-[10px] text-slate-400 font-normal uppercase mr-0.5">Est.</span>
            <IndianRupee className="w-3 h-3 text-emerald-600" />
            ₹{activity.estimatedCost.toLocaleString('en-IN')}
          </span>
        </div>

        {/* Title */}
        <h4 className={`text-sm sm:text-base font-bold text-slate-900 leading-snug mb-2 ${
          activity.completed ? 'line-through text-slate-400' : ''
        }`}>
          {activity.title}
        </h4>

        {/* Description */}
        <p className="text-xs text-slate-600 leading-relaxed mb-3">
          {activity.description}
        </p>
      </div>

      {/* Footer tags: Location and Insider Tip */}
      <div className="pt-3 border-t border-slate-200/60 space-y-2 mt-auto">
        <div className="flex items-center gap-1.5 text-xs text-slate-700 font-medium truncate">
          <MapPin className="w-3.5 h-3.5 text-teal-600 shrink-0" />
          <span className="truncate">{activity.location}</span>
        </div>

        {activity.insiderTip && (
          <div className="text-[11px] text-amber-900 bg-amber-50/80 px-2.5 py-1.5 rounded-lg border border-amber-200/50 flex items-start gap-1.5">
            <Lightbulb className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
            <span className="leading-snug">{activity.insiderTip}</span>
          </div>
        )}
      </div>
    </div>
  );
};
