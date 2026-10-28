import React from 'react';
import { 
  X, 
  GraduationCap, 
  Cpu, 
  Layers, 
  Code2, 
  CheckCircle2, 
  ShieldCheck, 
  HelpCircle, 
  Sparkles,
  Server,
  Database
} from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div 
        className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden relative max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#0F172A] to-[#1E293B] text-white p-6 sm:p-8 flex items-start justify-between gap-4 border-b border-slate-700">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold uppercase tracking-wider border border-teal-500/30">
              <GraduationCap className="w-4 h-4 text-teal-400" />
              <span>B.Tech AI-ML End Semester Capstone</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-white">
              WanderWise – AI Travel Planner
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Project Architecture, AI Algorithms & Examination Viva Reference
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-700 text-sm">
          {/* Section 1: Objective & Problem Statement */}
          <div className="space-y-2">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center text-xs font-bold">1</span>
              Problem Statement & Objective
            </h3>
            <p className="text-xs sm:text-sm leading-relaxed text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-200/80">
              Traditional travel planning suffers from fragmented information, unrealistic generic itineraries, and opaque pricing in foreign currencies. 
              <strong> WanderWise</strong> solves this by synthesizing contextual traveler preferences (starting point, destination, days, group size, and interests) into an actionable day-by-day itinerary with verified morning, afternoon, and evening experiences, combined with a realistic <strong>Indian Rupee (INR ₹) budget allocation model</strong>.
            </p>
          </div>

          {/* Section 2: AI-ML Architecture */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center text-xs font-bold">2</span>
              System Architecture & AI Pipeline
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-200 space-y-2">
                <div className="flex items-center gap-2 font-bold text-teal-900 text-xs uppercase tracking-wider">
                  <Server className="w-4 h-4 text-teal-700" />
                  <span>Server-Side Gemini 3.8 Flash</span>
                </div>
                <p className="text-xs text-teal-950/80 leading-relaxed">
                  Calls the modern <code>@google/genai</code> SDK strictly via the backend Express proxy (<code>POST /api/generate-itinerary</code>). The API key is kept secure on the server and is never exposed to the client.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-2">
                <div className="flex items-center gap-2 font-bold text-amber-900 text-xs uppercase tracking-wider">
                  <Cpu className="w-4 h-4 text-amber-700" />
                  <span>Rule-Based Heuristic Fallback</span>
                </div>
                <p className="text-xs text-amber-950/80 leading-relaxed">
                  If the API key is missing or quota limits are reached, the application executes a zero-failure heuristic engine that produces complete, formatted itineraries using a deep travel knowledge graph.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-2">
                <div className="flex items-center gap-2 font-bold text-blue-900 text-xs uppercase tracking-wider">
                  <Layers className="w-4 h-4 text-blue-700" />
                  <span>INR Expense Partitioning Algorithm</span>
                </div>
                <p className="text-xs text-blue-950/80 leading-relaxed">
                  Allocates user budget into five realistic categories: Transport (25%), Accommodation (40%), Food (20%), Activities (10%), and Buffer/Misc (5%) scaled by travel style.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-200 space-y-2">
                <div className="flex items-center gap-2 font-bold text-purple-900 text-xs uppercase tracking-wider">
                  <Database className="w-4 h-4 text-purple-700" />
                  <span>Client-Side LocalStorage Vault</span>
                </div>
                <p className="text-xs text-purple-950/80 leading-relaxed">
                  Saved trips and real-time activity checkmarks are stored locally in the browser, offering offline persistence and instant reload without database overhead.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: Viva FAQ for College Exam */}
          <div className="space-y-3 pt-2">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center text-xs font-bold">3</span>
              Examination Viva Questions & Answers
            </h3>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <p className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  Q1: How do you prevent API key exposure in the frontend?
                </p>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  <strong>Answer:</strong> The frontend never calls the Gemini API directly. Instead, it dispatches an HTTP request to our Express backend route (<code>server.ts</code>), which reads the environment variable <code>process.env.GEMINI_API_KEY</code> and performs server-side generation.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <p className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  Q2: How does the application ensure valid JSON responses from the LLM?
                </p>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  <strong>Answer:</strong> We enforce strict JSON output using Gemini's <code>responseMimeType: "application/json"</code> along with explicit structural prompt templates and schema verification on parse.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <p className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  Q3: What happens if there is no internet connection or Gemini API quota is exhausted?
                </p>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  <strong>Answer:</strong> The backend and frontend are built with a fault-tolerant heuristic fallback (<code>itineraryGenerator.ts</code>). It seamlessly falls back to generating a rich, authentic itinerary without throwing an error screen.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <CheckCircle2 className="w-4 h-4 text-teal-600" />
            <span>Tested & verified for end-semester demonstration</span>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Close Project Guide
          </button>
        </div>
      </div>
    </div>
  );
};
