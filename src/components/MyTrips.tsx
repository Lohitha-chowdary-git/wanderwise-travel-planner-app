import React, { useState } from 'react';
import { Itinerary } from '../types/travel';
import { 
  Bookmark, 
  Trash2, 
  Calendar, 
  MapPin, 
  IndianRupee, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Compass,
  AlertTriangle,
  Clock
} from 'lucide-react';

interface MyTripsProps {
  trips: Itinerary[];
  onSelectTrip: (trip: Itinerary) => void;
  onDeleteTrip: (tripId: string) => void;
  onLoadSampleTrip: () => void;
  onStartPlanning: () => void;
}

export const MyTrips: React.FC<MyTripsProps> = ({
  trips,
  onSelectTrip,
  onDeleteTrip,
  onLoadSampleTrip,
  onStartPlanning
}) => {
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const calculateProgress = (trip: Itinerary) => {
    let total = 0;
    let done = 0;
    trip.dailyPlans?.forEach((day) => {
      ['morning', 'afternoon', 'evening'].forEach((period) => {
        total += 1;
        const act = day[period as 'morning' | 'afternoon' | 'evening'];
        if (act && act.completed) done += 1;
      });
    });
    const percent = total > 0 ? Math.round((done / total) * 100) : 0;
    const remaining = total - done;
    return { total, done, percent, remaining };
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-teal-700">
            <Bookmark className="w-4 h-4" />
            <span>Saved Itineraries Vault</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900 mt-1">
            My Planned Trips ({trips.length})
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Access saved itineraries, check off finished activities, or review budget splits.
          </p>
        </div>

        <button
          onClick={onStartPlanning}
          className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-teal-600 hover:bg-teal-500 text-white shadow-md transition-colors flex items-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <Sparkles className="w-4 h-4" />
          <span>Plan a New Trip</span>
        </button>
      </div>

      {/* Trips List or Empty State */}
      {trips.length === 0 ? (
        <div className="bg-white rounded-3xl p-8 sm:p-14 text-center shadow-sm border border-slate-200/80 max-w-xl mx-auto space-y-5">
          <div className="w-16 h-16 rounded-3xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-600 mx-auto">
            <Bookmark className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold font-serif text-slate-900">
              No Saved Trips in Your Vault
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
              Your saved trip itineraries and checklist progress are securely stored in your browser's local storage for instant offline access.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={onLoadSampleTrip}
              className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-slate-900 text-white hover:bg-slate-800 transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <Compass className="w-4 h-4 text-teal-400" />
              <span>Load 5-Day Jaipur Sample Trip</span>
            </button>
            <button
              onClick={onStartPlanning}
              className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-teal-500 text-slate-950 hover:bg-teal-400 transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <Sparkles className="w-4 h-4" />
              <span>Create First Itinerary</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map((trip) => {
            const progress = calculateProgress(trip);
            const isDeleting = deleteConfirmId === trip.id;

            return (
              <div
                key={trip.id}
                className="bg-white rounded-3xl p-6 shadow-md hover:shadow-xl border border-slate-200/80 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Top tags */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200/60">
                      {trip.days} Days • {trip.travelers} Traveler{trip.travelers > 1 ? 's' : ''}
                    </span>

                    {trip.isSampleTrip ? (
                      <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                        Sample Trip
                      </span>
                    ) : (
                      <span className="text-[10px] font-semibold text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(trip.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                      </span>
                    )}
                  </div>

                  {/* Destination & Title */}
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1">
                    <MapPin className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span className="truncate">{trip.destination} (from {trip.startingCity})</span>
                  </div>

                  <h3 className="text-lg font-bold font-serif text-slate-900 leading-snug line-clamp-2 mb-3">
                    {trip.title}
                  </h3>

                  {/* Date & Budget */}
                  <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-2xl border border-slate-200/60 mb-4">
                    <div>
                      <span className="text-slate-400 text-[10px] block uppercase font-bold">Departure</span>
                      <span className="font-semibold text-slate-700 flex items-center gap-1 mt-0.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        {trip.departureDate}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] block uppercase font-bold">Planned Budget</span>
                      <span className="font-bold text-slate-900 flex items-center gap-0.5 mt-0.5">
                        <IndianRupee className="w-3.5 h-3.5 text-emerald-600" />
                        ₹{trip.budget.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  {/* Completion Progress Bar */}
                  <div className="space-y-1.5 mb-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                        Checklist Progress:
                      </span>
                      <span className="font-bold text-slate-700">
                        {progress.done}/{progress.total} done ({progress.percent}%)
                      </span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200/60">
                      <div
                        className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full transition-all duration-300"
                        style={{ width: `${progress.percent}%` }}
                      />
                    </div>
                    <div className="text-[10px] text-slate-400 text-right">
                      {progress.remaining > 0 ? `${progress.remaining} activity remaining` : 'All activities completed!'}
                    </div>
                  </div>
                </div>

                {/* Card Actions / Delete Confirmation */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
                  {isDeleting ? (
                    <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-xs">
                      <span className="text-rose-800 font-semibold flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                        Delete this trip?
                      </span>
                      <div className="flex items-center gap-1.5 self-end sm:self-auto">
                        <button
                          onClick={() => {
                            onDeleteTrip(trip.id);
                            setDeleteConfirmId(null);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold cursor-pointer"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(null)}
                          className="px-2 py-1 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <button
                        onClick={() => setDeleteConfirmId(trip.id)}
                        className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Delete saved trip"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => onSelectTrip(trip)}
                        className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-teal-700 text-white transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm ml-auto"
                      >
                        <span>View Itinerary</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
