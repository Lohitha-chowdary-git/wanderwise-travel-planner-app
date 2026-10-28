import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TripForm } from './components/TripForm';
import { ItineraryDisplay } from './components/ItineraryDisplay';
import { DestinationGrid } from './components/DestinationGrid';
import { MyTrips } from './components/MyTrips';
import { AboutModal } from './components/AboutModal';
import { Footer } from './components/Footer';
import { TripFormData, Itinerary, Destination } from './types/travel';
import { SAMPLE_TRIP } from './data/sampleTrip';
import { generateRuleBasedItinerary } from './utils/itineraryGenerator';
import { CheckCircle2, AlertCircle, Info, Sparkles, X } from 'lucide-react';

const STORAGE_KEY = 'wanderwise_saved_trips_v1';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'planner' | 'destinations' | 'my-trips'>('home');
  const [currentItinerary, setCurrentItinerary] = useState<Itinerary | null>(null);
  const [savedTrips, setSavedTrips] = useState<Itinerary[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [plannerInitialData, setPlannerInitialData] = useState<Partial<TripFormData>>({});
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  // Initialize saved trips from localStorage (and preload sample trip if first time)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setSavedTrips(parsed);
          return;
        }
      }
      // First visit: pre-populate with sample trip for instant inspection
      setSavedTrips([SAMPLE_TRIP]);
      localStorage.setItem(STORAGE_KEY, JSON.stringify([SAMPLE_TRIP]));
    } catch (e) {
      console.warn('Could not read from localStorage:', e);
      setSavedTrips([SAMPLE_TRIP]);
    }
  }, []);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  const handleGenerateItinerary = async (formData: TripFormData) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/generate-itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        let errMessage = `Server returned status ${response.status}`;
        try {
          const errData = await response.json();
          if (errData && errData.error) errMessage = errData.error;
        } catch (_) {}
        throw new Error(errMessage);
      }

      const data: Itinerary = await response.json();
      setCurrentItinerary(data);
      setActiveTab('planner');
      const badgeText = data.generatedBy === 'gemini-ai' ? 'Gemini 3.8 Flash AI' : 'Smart Heuristic Engine';
      showToast(`Itinerary for ${data.destination} generated via ${badgeText}!`, 'success');
      
      // Smooth scroll to itinerary
      setTimeout(() => {
        const element = document.getElementById('itinerary-view-section');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } catch (err: any) {
      console.warn('Network or generation exception; activating rule-based heuristic optimizer:', err);
      try {
        const fallback = generateRuleBasedItinerary(formData);
        setCurrentItinerary(fallback);
        setActiveTab('planner');
        showToast(
          `AI service encountered a temporary network delay. Personalized itinerary generated via Heuristic Optimizer!`,
          'info'
        );
        setTimeout(() => {
          const element = document.getElementById('itinerary-view-section');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      } catch (fallbackErr) {
        showToast(`Could not generate itinerary: ${err?.message || 'Please check your inputs and try again.'}`, 'error');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveTrip = (itinerary: Itinerary) => {
    try {
      const existsIndex = savedTrips.findIndex((t) => t.id === itinerary.id);
      let updated: Itinerary[];
      if (existsIndex >= 0) {
        updated = [...savedTrips];
        updated[existsIndex] = itinerary;
        showToast('Saved trip updated with latest checklist status.', 'success');
      } else {
        updated = [itinerary, ...savedTrips];
        showToast('Trip successfully saved to My Trips!', 'success');
      }
      setSavedTrips(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
      showToast('Could not save trip to browser storage.', 'error');
    }
  };

  const handleUnsaveTrip = (tripId: string) => {
    try {
      const updated = savedTrips.filter((t) => t.id !== tripId);
      setSavedTrips(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      showToast('Trip removed from My Trips vault.', 'info');
    } catch (e) {
      console.error('Failed to unsave trip:', e);
      showToast('Error removing trip.', 'error');
    }
  };

  const handleDeleteTrip = (tripId: string) => {
    try {
      const updated = savedTrips.filter((t) => t.id !== tripId);
      setSavedTrips(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      showToast('Trip deleted from My Trips.', 'info');
      
      if (currentItinerary && currentItinerary.id === tripId) {
        setCurrentItinerary(null);
      }
    } catch (e) {
      console.error('Failed to delete from localStorage:', e);
      showToast('Error removing trip.', 'error');
    }
  };

  const handleToggleActivity = (
    dayNumber: number,
    period: 'morning' | 'afternoon' | 'evening',
    actId: string
  ) => {
    if (!currentItinerary) return;

    let wasCompleted = false;

    const updatedDailyPlans = currentItinerary.dailyPlans.map((day) => {
      if (day.dayNumber !== dayNumber) return day;

      const currentAct = day[period];
      if (!currentAct) return day;

      wasCompleted = currentAct.completed;

      return {
        ...day,
        [period]: {
          ...currentAct,
          completed: !currentAct.completed
        }
      };
    });

    const updatedItinerary: Itinerary = {
      ...currentItinerary,
      dailyPlans: updatedDailyPlans
    };

    setCurrentItinerary(updatedItinerary);

    if (!wasCompleted) {
      showToast('Activity marked as done! (+1 progress)', 'success');
    }

    // If trip is saved in savedTrips, sync status in storage
    const exists = savedTrips.some((t) => t.id === updatedItinerary.id);
    if (exists) {
      const newSaved = savedTrips.map((t) => (t.id === updatedItinerary.id ? updatedItinerary : t));
      setSavedTrips(newSaved);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newSaved));
    }
  };

  const handleLoadSampleTrip = () => {
    const existing = savedTrips.find((t) => t.id === SAMPLE_TRIP.id);
    const toLoad = existing || SAMPLE_TRIP;
    setCurrentItinerary(toLoad);
    setActiveTab('planner');
    showToast('Loaded 5-Day Jaipur Royal Heritage Sample Trip!', 'info');
    setTimeout(() => {
      const element = document.getElementById('itinerary-view-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleSelectDestination = (dest: Destination) => {
    setPlannerInitialData({
      destination: `${dest.name}, ${dest.stateOrCountry}`,
      startingCity: dest.startingCityHint || 'New Delhi',
      days: dest.recommendedDays,
      budget: dest.approxDailyBudgetINR * dest.recommendedDays,
      interests: dest.popularInterests,
      travelers: 2,
      travelPace: 'Balanced',
      travelStyle: 'standard'
    });
    setActiveTab('planner');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast(`Loaded ${dest.name} details into planner form.`, 'info');
  };

  const handleSelectQuickDestination = (name: string) => {
    setPlannerInitialData({
      destination: name,
      days: 4,
      budget: 24000,
      travelers: 2
    });
    setActiveTab('planner');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isCurrentTripSaved = Boolean(
    currentItinerary && savedTrips.some((t) => t.id === currentItinerary.id)
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6F0] text-slate-900 selection:bg-teal-200 selection:text-teal-900">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce duration-300">
          <div className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl shadow-xl text-xs sm:text-sm font-semibold border ${
            toast.type === 'success'
              ? 'bg-emerald-950 text-emerald-100 border-emerald-600'
              : toast.type === 'error'
                ? 'bg-rose-950 text-rose-100 border-rose-600'
                : 'bg-slate-900 text-teal-200 border-teal-500'
          }`}>
            {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
            {toast.type === 'error' && <AlertCircle className="w-4 h-4 text-rose-400" />}
            {toast.type === 'info' && <Sparkles className="w-4 h-4 text-teal-400" />}
            <span>{toast.message}</span>
            <button
              onClick={() => setToast(null)}
              className="ml-2 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        savedTripsCount={savedTrips.length}
        onOpenAbout={() => setIsAboutOpen(true)}
        onLoadSampleTrip={handleLoadSampleTrip}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <div className="space-y-16">
            <Hero
              onStartPlanning={() => {
                setActiveTab('planner');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onExploreDestinations={() => {
                setActiveTab('destinations');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onLoadSampleTrip={handleLoadSampleTrip}
              onSelectQuickDestination={handleSelectQuickDestination}
            />

            {/* Featured Destinations Preview on Home */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <DestinationGrid onSelectDestination={handleSelectDestination} />
            </div>

            {/* Quick Interactive Trip Planner teaser */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
              <div className="bg-gradient-to-r from-teal-900 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2 max-w-xl">
                  <span className="text-teal-400 text-xs font-bold uppercase tracking-wider">
                    Ready to set off?
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold font-serif">
                    Generate Your Custom Day-by-Day Travel Plan Now
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300">
                    Input your departure city, budget in INR, and select your interests. WanderWise handles morning, afternoon, and evening schedules with verified expenses.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => {
                      setActiveTab('planner');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-6 py-3.5 rounded-xl text-sm font-bold bg-teal-400 hover:bg-teal-300 text-slate-950 transition-colors shadow-lg cursor-pointer"
                  >
                    Open Planner Form
                  </button>
                  <button
                    onClick={handleLoadSampleTrip}
                    className="px-5 py-3.5 rounded-xl text-sm font-semibold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-colors cursor-pointer"
                  >
                    View Sample Trip
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'planner' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
            {/* Form Section */}
            <section id="planner-form-section">
              <TripForm
                initialData={plannerInitialData}
                onGenerate={handleGenerateItinerary}
                isLoading={isLoading}
                onLoadSample={handleLoadSampleTrip}
              />
            </section>

            {/* Itinerary Display Section */}
            {currentItinerary ? (
              <section id="itinerary-view-section" className="pt-4">
                <ItineraryDisplay
                  itinerary={currentItinerary}
                  onToggleActivity={handleToggleActivity}
                  onSaveTrip={handleSaveTrip}
                  onUnsaveTrip={handleUnsaveTrip}
                  isSaved={isCurrentTripSaved}
                  onPlanAnother={() => {
                    const el = document.getElementById('planner-form-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                />
              </section>
            ) : (
              <div className="bg-white rounded-3xl p-8 sm:p-12 text-center border border-dashed border-slate-300 max-w-xl mx-auto space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200 text-teal-600 flex items-center justify-center mx-auto">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-slate-800">Ready to Plan Your Journey</h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Fill out the form above to generate your customized day-by-day itinerary with verified INR budget breakdowns, or explore the pre-built sample trip.
                  </p>
                </div>
                <button
                  onClick={handleLoadSampleTrip}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-teal-600 hover:bg-teal-500 text-white transition-colors cursor-pointer shadow-sm"
                >
                  Load 5-Day Jaipur Sample Trip
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'destinations' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <DestinationGrid onSelectDestination={handleSelectDestination} />
          </div>
        )}

        {activeTab === 'my-trips' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <MyTrips
              trips={savedTrips}
              onSelectTrip={(trip) => {
                setCurrentItinerary(trip);
                setActiveTab('planner');
                setTimeout(() => {
                  const element = document.getElementById('itinerary-view-section');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }, 100);
              }}
              onDeleteTrip={handleDeleteTrip}
              onLoadSampleTrip={handleLoadSampleTrip}
              onStartPlanning={() => {
                setActiveTab('planner');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        )}
      </main>

      {/* About & College Project Viva Modal */}
      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />

      {/* Footer */}
      <Footer
        onNavClick={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAbout={() => setIsAboutOpen(true)}
      />
    </div>
  );
}
