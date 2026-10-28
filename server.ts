import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { TripFormData, Itinerary, DayPlan, Activity } from './src/types/travel.ts';
import { generateRuleBasedItinerary } from './src/utils/itineraryGenerator.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

app.use(express.json({ limit: '10mb' }));

// Helper to safely extract and parse JSON from AI model response
function extractJsonFromText(rawText: string): any {
  if (!rawText) throw new Error('Empty response from model');
  
  let clean = rawText.trim();
  // Strip markdown code fences if present
  clean = clean.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();

  try {
    return JSON.parse(clean);
  } catch (initialErr) {
    // If there's surrounding text, extract between first '{' and last '}'
    const firstBrace = clean.indexOf('{');
    const lastBrace = clean.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      const extracted = clean.substring(firstBrace, lastBrace + 1);
      return JSON.parse(extracted);
    }
    throw initialErr;
  }
}

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY'),
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

// Trip Itinerary Generation API
app.post('/api/generate-itinerary', async (req: Request, res: Response) => {
  const formData: TripFormData = req.body;

  // Basic validation
  if (!formData || !formData.destination || !formData.days || !formData.budget) {
    return res.status(400).json({
      error: 'Invalid input. Destination, days, and budget in INR are required.'
    });
  }

  const hasApiKey = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY');

  if (hasApiKey) {
    try {
      const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build'
          }
        }
      });

      const groupProfile = formData.travelers === 1 
        ? 'Solo traveler (emphasize safety, walkable routes, social cafes, efficient transport)'
        : formData.travelers === 2 
          ? 'Couple / 2 travelers (include scenic viewpoints, romantic ambiances, and balanced pacing)'
          : formData.travelers <= 4 
            ? 'Small group of friends (include interactive spots, shared cab travel, and vibrant food stops)'
            : 'Family / Large group (ensure accessible walking routes, family-friendly dining, and relaxed pacing)';

      const prompt = `
You are an expert Indian travel planner creating a realistic, high-quality, personalized travel itinerary.
Trip requirements:
- Destination: ${formData.destination}
- Starting City: ${formData.startingCity || 'Flexible Origin'}
- Departure Date: ${formData.departureDate || 'Upcoming season'}
- Duration: ${formData.days} day(s)
- Total Budget: ₹${formData.budget.toLocaleString('en-IN')} INR (Total for all ${formData.travelers} traveler(s))
- Number of Travelers: ${formData.travelers} (${groupProfile})
- Primary Travel Interests: ${formData.interests.join(', ') || 'Culture, Food, Sightseeing'}
- Travel Pace: ${formData.travelPace}
- Travel Style / Lodging Category: ${formData.travelStyle} (e.g. budget hostel/train, standard 3-star/taxi, luxury heritage 4-5 star/flights)

CRITICAL PERSONALIZATION INSTRUCTIONS:
1. Deeply align each day with the traveler's interests (${formData.interests.join(', ')}).
   - If 'Foodie & Culinary' is selected: explicitly name iconic local street stalls, heritage sweet shops, or regional culinary masters.
   - If 'Photography' is selected: recommend specific golden-hour vantage points, symmetrical courtyards, and optimal angles.
   - If 'Adventure & Trekking' is selected: include trails, ropeways, water sports, or outdoor excursions.
   - If 'Culture & Heritage' is selected: highlight historic forts, palace courtyards, artisan clusters, or UNESCO landmarks.
   - If 'Spiritual & Wellness' is selected: integrate morning aartis, peaceful ghats, meditation centers, or ancient shrines.
   - If 'Shopping & Markets' is selected: point to artisan bazaars, handlooms, and authentic local craft cooperatives.
2. Adapt to the traveler count (${formData.travelers} - ${groupProfile}).
3. For each activity, provide BOTH an approximate time slot and an explicit approximate duration (e.g. "Approx. 2.5 hours").
4. Provide estimated expenses in Indian Rupees (INR) for each activity, scaled realistically to the overall budget.
5. All costs must be algorithmic planning approximations in INR.

Generate a complete, structured JSON itinerary matching this exact schema:
{
  "title": "string: catchy trip title reflecting destination and interests",
  "summary": "string: 2-3 sentence overview of this personalized tour",
  "weatherForecast": "string: anticipated weather and clothing guidance for this season",
  "bestTimeToVisit": "string: optimal months to visit",
  "costBreakdown": {
    "transport": number (estimated cost in INR),
    "accommodation": number (estimated cost in INR),
    "food": number (estimated cost in INR),
    "activities": number (estimated cost in INR),
    "miscellaneous": number (buffer in INR),
    "totalEstimated": number (sum of the above),
    "tips": ["string: 3 specific cost-saving tips for this trip"]
  },
  "travelEssentials": ["string: 4-5 packing essentials for this destination"],
  "localDelicacies": ["string: 4-5 must-eat regional food specialties"],
  "dailyPlans": [
    {
      "dayNumber": 1,
      "date": "Day 1",
      "theme": "string: theme of the day matching interests",
      "staySuggestion": "string: specific neighborhood/hotel style suggestion suitable for ${formData.travelers} traveler(s)",
      "dayTip": "string: practical insider tip for this day",
      "morning": {
        "id": "act-1-morning",
        "title": "string: morning activity title",
        "time": "08:30 AM – 11:30 AM",
        "duration": "Approx. 3 hours",
        "description": "string: realistic activity description tailored to interests",
        "location": "string: specific landmark/neighborhood",
        "estimatedCost": number (in INR),
        "completed": false,
        "category": "sightseeing",
        "insiderTip": "string: practical insider advice"
      },
      "afternoon": {
        "id": "act-1-afternoon",
        "title": "string: afternoon activity title",
        "time": "12:30 PM – 03:30 PM",
        "duration": "Approx. 3 hours",
        "description": "string: lunch spot + exploration tailored to interests",
        "location": "string: landmark/neighborhood",
        "estimatedCost": number (in INR),
        "completed": false,
        "category": "dining",
        "insiderTip": "string: practical advice"
      },
      "evening": {
        "id": "act-1-evening",
        "title": "string: evening activity title",
        "time": "05:00 PM – 08:30 PM",
        "duration": "Approx. 3.5 hours",
        "description": "string: evening leisure/cultural spectacle/sunset tailored to interests",
        "location": "string: landmark/neighborhood",
        "estimatedCost": number (in INR),
        "completed": false,
        "category": "cultural",
        "insiderTip": "string: practical advice"
      }
    }
  ]
}

Important constraints:
- Provide exactly ${formData.days} day(s) inside "dailyPlans", numbered sequentially from 1 to ${formData.days}.
- Total estimated cost should align closely with the user's budget of ₹${formData.budget}.
- Use Indian Rupees (INR) for all numeric values without currency symbols in numeric fields.
- Make activities genuine to ${formData.destination}.
`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json'
        }
      });

      const responseText = response.text;
      if (responseText) {
        const parsed = extractJsonFromText(responseText);

        // Sanitize cost breakdown
        const transport = Math.max(0, Number(parsed.costBreakdown?.transport) || Math.round(formData.budget * 0.25));
        const accommodation = Math.max(0, Number(parsed.costBreakdown?.accommodation) || Math.round(formData.budget * 0.40));
        const food = Math.max(0, Number(parsed.costBreakdown?.food) || Math.round(formData.budget * 0.20));
        const activities = Math.max(0, Number(parsed.costBreakdown?.activities) || Math.round(formData.budget * 0.10));
        const miscellaneous = Math.max(0, Number(parsed.costBreakdown?.miscellaneous) || Math.max(0, formData.budget - (transport + accommodation + food + activities)));
        
        const totalEstimated = transport + accommodation + food + activities + miscellaneous;
        const budgetVariance = formData.budget - totalEstimated;
        let budgetStatus: 'under' | 'exact' | 'over' = 'exact';
        if (totalEstimated < formData.budget) budgetStatus = 'under';
        else if (totalEstimated > formData.budget) budgetStatus = 'over';

        // Sanitize and validate daily plans
        const baseDate = new Date(formData.departureDate || Date.now());
        const rawDailyPlans: any[] = Array.isArray(parsed.dailyPlans) ? parsed.dailyPlans : [];
        const sanitizedPlans: DayPlan[] = [];

        for (let i = 1; i <= formData.days; i++) {
          const curDate = new Date(baseDate);
          curDate.setDate(baseDate.getDate() + (i - 1));
          const formattedDate = curDate.toLocaleDateString('en-IN', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
          });

          const rawDay = rawDailyPlans.find((d) => d.dayNumber === i) || rawDailyPlans[i - 1];

          const sanitizeActivity = (act: any, period: 'morning' | 'afternoon' | 'evening'): Activity => ({
            id: act?.id || `act-${i}-${period}`,
            title: act?.title || `${period.charAt(0).toUpperCase() + period.slice(1)} in ${formData.destination}`,
            time: act?.time || (period === 'morning' ? '08:30 AM – 11:30 AM' : period === 'afternoon' ? '12:30 PM – 03:30 PM' : '05:00 PM – 08:30 PM'),
            duration: act?.duration || (period === 'morning' ? 'Approx. 3 hours' : period === 'afternoon' ? 'Approx. 2.5 hours' : 'Approx. 3.5 hours'),
            description: act?.description || `Explore ${formData.destination} highlights during the ${period}.`,
            location: act?.location || `${formData.destination} Central`,
            estimatedCost: Math.max(0, Number(act?.estimatedCost) || Math.round(activities / (formData.days * 3))),
            completed: false,
            category: act?.category || (period === 'afternoon' ? 'dining' : period === 'morning' ? 'sightseeing' : 'cultural'),
            insiderTip: act?.insiderTip || 'Arrive early to beat local queues and enjoy comfortable weather.'
          });

          if (rawDay) {
            sanitizedPlans.push({
              dayNumber: i,
              date: formattedDate,
              theme: rawDay.theme || `Day ${i}: Exploring ${formData.destination}`,
              staySuggestion: rawDay.staySuggestion || `Comfortable ${formData.travelStyle} stay in ${formData.destination}`,
              dayTip: rawDay.dayTip || `Carry a water bottle and keep small currency notes for street vendors.`,
              morning: sanitizeActivity(rawDay.morning, 'morning'),
              afternoon: sanitizeActivity(rawDay.afternoon, 'afternoon'),
              evening: sanitizeActivity(rawDay.evening, 'evening')
            });
          } else {
            // Backfill missing day if model returned fewer days
            sanitizedPlans.push({
              dayNumber: i,
              date: formattedDate,
              theme: `Day ${i}: Cultural Immersion in ${formData.destination}`,
              staySuggestion: `Centrally located ${formData.travelStyle} hotel in ${formData.destination}`,
              dayTip: `Enjoy local cuisine at authentic regional family restaurants.`,
              morning: sanitizeActivity(null, 'morning'),
              afternoon: sanitizeActivity(null, 'afternoon'),
              evening: sanitizeActivity(null, 'evening')
            });
          }
        }

        const completeItinerary: Itinerary = {
          id: `trip-ai-${Date.now()}`,
          title: parsed.title || `${formData.days}-Day Personalized Journey to ${formData.destination}`,
          summary: parsed.summary || `A custom-tailored travel plan exploring ${formData.destination}.`,
          destination: formData.destination,
          startingCity: formData.startingCity || 'Origin',
          departureDate: formData.departureDate || new Date().toISOString().split('T')[0],
          days: formData.days,
          budget: formData.budget,
          travelers: formData.travelers,
          interests: formData.interests,
          travelPace: formData.travelPace,
          travelStyle: formData.travelStyle,
          dailyPlans: sanitizedPlans,
          costBreakdown: {
            transport,
            accommodation,
            food,
            activities,
            miscellaneous,
            totalEstimated,
            budgetVariance,
            status: budgetStatus,
            tips: Array.isArray(parsed.costBreakdown?.tips) && parsed.costBreakdown.tips.length > 0
              ? parsed.costBreakdown.tips
              : [
                  'Book rail/air tickets 3-4 weeks ahead for best tariffs.',
                  'Use registered metered autos or app-based rides for local commute.',
                  'Opt for composite monument entry tickets where available.'
                ]
          },
          weatherForecast: parsed.weatherForecast || `Expected pleasant conditions for travel in ${formData.destination}.`,
          bestTimeToVisit: parsed.bestTimeToVisit || 'October to March offers ideal weather.',
          travelEssentials: Array.isArray(parsed.travelEssentials) && parsed.travelEssentials.length > 0
            ? parsed.travelEssentials
            : ['Government ID (Aadhaar / Passport)', 'Comfortable footwear', 'Power bank', 'Sun protection'],
          localDelicacies: Array.isArray(parsed.localDelicacies) && parsed.localDelicacies.length > 0
            ? parsed.localDelicacies
            : ['Regional specialty thali', 'Local street food delights', 'Authentic sweets'],
          generatedBy: 'gemini-ai',
          createdAt: new Date().toISOString()
        };

        return res.json(completeItinerary);
      }
    } catch (err) {
      console.warn('Gemini API call encountered an issue; falling back gracefully to heuristic engine:', err);
      // Seamlessly fall through to heuristic engine
    }
  }

  // Rule-based heuristic generation fallback
  const fallbackItinerary = generateRuleBasedItinerary(formData);
  return res.json(fallbackItinerary);
});

async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`WanderWise Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
