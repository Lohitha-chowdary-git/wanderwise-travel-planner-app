export type TravelInterest = 
  | 'Culture & Heritage'
  | 'Adventure & Trekking'
  | 'Beaches & Relaxation'
  | 'Nature & Wildlife'
  | 'Foodie & Culinary'
  | 'Photography'
  | 'Shopping & Markets'
  | 'Spiritual & Wellness'
  | 'Nightlife & Social';

export type TravelPace = 'Relaxed' | 'Balanced' | 'Fast-paced';
export type TravelStyle = 'budget' | 'standard' | 'luxury';

export interface TripFormData {
  destination: string;
  startingCity: string;
  departureDate: string;
  days: number;
  budget: number;
  travelers: number;
  interests: TravelInterest[];
  travelPace: TravelPace;
  travelStyle: TravelStyle;
}

export interface Activity {
  id: string;
  title: string;
  time: string;
  duration?: string; // e.g. "Approx. 3 hours"
  description: string;
  location: string;
  estimatedCost: number; // in INR
  completed: boolean;
  category: 'sightseeing' | 'dining' | 'adventure' | 'relaxation' | 'cultural' | 'transport' | 'photography' | 'shopping' | 'spiritual' | 'nature';
  insiderTip?: string;
}

export interface DayPlan {
  dayNumber: number;
  date: string;
  theme: string;
  morning: Activity;
  afternoon: Activity;
  evening: Activity;
  staySuggestion: string;
  dayTip: string;
}

export interface ExpenseBreakdown {
  transport: number;
  accommodation: number;
  food: number;
  activities: number;
  miscellaneous: number;
  totalEstimated: number;
  budgetVariance: number; // userBudget - totalEstimated
  status: 'under' | 'exact' | 'over';
  tips: string[];
}

export interface Itinerary {
  id: string;
  title: string;
  summary: string;
  destination: string;
  startingCity: string;
  departureDate: string;
  days: number;
  budget: number; // user budget in INR
  travelers: number;
  interests: TravelInterest[];
  travelPace: TravelPace;
  travelStyle: TravelStyle;
  dailyPlans: DayPlan[];
  costBreakdown: ExpenseBreakdown;
  weatherForecast: string;
  bestTimeToVisit: string;
  travelEssentials: string[];
  localDelicacies: string[];
  generatedBy: 'gemini-ai' | 'heuristic-engine';
  createdAt: string;
  isSampleTrip?: boolean;
}

export interface Destination {
  id: string;
  name: string;
  stateOrCountry: string;
  tagline: string;
  description: string;
  image: string;
  recommendedDays: number;
  budgetRange: string;
  approxDailyBudgetINR: number;
  bestSeason: string;
  popularInterests: TravelInterest[];
  topAttractions: string[];
  startingCityHint?: string;
}
