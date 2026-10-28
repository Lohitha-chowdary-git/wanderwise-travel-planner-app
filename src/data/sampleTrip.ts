import { Itinerary } from '../types/travel';

export const SAMPLE_TRIP: Itinerary = {
  id: 'sample-jaipur-royal-5days',
  title: '5-Day Royal Heritage & Cultural Odyssey in Jaipur',
  summary: 'A curated journey through the pink sandstone ramparts, regal palaces, vibrant textile bazaars, and savory culinary flavors of Jaipur, Rajasthan.',
  destination: 'Jaipur, Rajasthan',
  startingCity: 'New Delhi',
  departureDate: '2026-11-15',
  days: 5,
  budget: 28000,
  travelers: 2,
  interests: ['Culture & Heritage', 'Photography', 'Foodie & Culinary', 'Shopping & Markets'],
  travelPace: 'Balanced',
  travelStyle: 'standard',
  weatherForecast: 'Pleasant winter sun, 23°C daytime, cooler evenings around 14°C. Carry a light jacket or shawl.',
  bestTimeToVisit: 'October to March (Ideal dry, breezy weather)',
  generatedBy: 'heuristic-engine',
  createdAt: new Date().toISOString(),
  isSampleTrip: true,
  travelEssentials: [
    'Comfortable slip-on shoes for fort climbs & stone stairs',
    'Light jacket or pashmina shawl for breezy winter nights',
    'Sun protection: polarized sunglasses, sunscreen SPF 50',
    'UPI payment app (accepted across 99% of Jaipur street vendors)',
    'Camera with a wide-angle lens for palace courtyards'
  ],
  localDelicacies: [
    'Dal Baati Churma with pure desi ghee',
    'Pyaaz Kachori from Rawat Mishthan Bhandar',
    'Mawa Kachori & Ghewar from LMB (Laxmi Misthan Bhandar)',
    'Laal Maas (traditional fiery mutton curry) or Ker Sangri (vegetarian)',
    'Kulhad Lassi at Lassiwala on MI Road (since 1944)'
  ],
  costBreakdown: {
    transport: 6500, // Round-trip Vande Bharat train + local cabs/autos
    accommodation: 11000, // 4 nights boutique heritage haveli (shared for 2)
    food: 5800, // Authentic dining, street foods, kulhad lassi
    activities: 3200, // Fort composite entry tickets, audio guides, light show
    miscellaneous: 1500, // Souvenirs, emergency auto rides, tips
    totalEstimated: 28000,
    budgetVariance: 0,
    status: 'exact',
    tips: [
      'Get the Rajasthan Tourism Composite Entry Ticket (₹400 for Indian nationals / ₹1000 for foreign visitors) covering Amber, Nahargarh, Hawa Mahal, Jantar Mantar, and Albert Hall for 2 days to save 40%.',
      'Hire verified Rajasthan Tourism audio guides or registered guides instead of unauthorized solicitors at fort gates.',
      'Auto-rickshaw fares within the walled city should be negotiated or booked via ride apps like Uber Auto.'
    ]
  },
  dailyPlans: [
    {
      dayNumber: 1,
      date: 'Day 1',
      theme: 'Arrival, Iconic Pink Facades & Historical Bazaars',
      staySuggestion: 'Heritage Haveli near Bani Park or MI Road',
      dayTip: 'Start early around Hawa Mahal to capture morning sunlight reflecting off the pink honeycomb facade without traffic photobombs.',
      morning: {
        id: 'act-1-1',
        title: 'Morning arrival & Breakfast at Lassiwala MI Road',
        time: '08:30 AM – 10:30 AM',
        duration: 'Approx. 2 hours',
        location: 'MI Road, Pink City',
        description: 'Arrive via morning express train or flight, check into your heritage stay, and grab a chilled clay-cup kulhad lassi with thick malai layer at the original Lassiwala (Shop 312).',
        estimatedCost: 240,
        completed: true,
        category: 'dining',
        insiderTip: 'Look for Shop 312 with blue signboards; knockoffs operate next door.'
      },
      afternoon: {
        id: 'act-1-2',
        title: 'Hawa Mahal & The Wind Palace Rooftop Views',
        time: '11:00 AM – 02:00 PM',
        duration: 'Approx. 3 hours',
        location: 'Badi Chaupar, Walled City',
        description: 'Admire the 953 honeycomb jharokhas (windows) built in 1799 for royal women to witness street festivals undetected. Cross over to Tattoo Cafe or Wind View Cafe for elevated photos.',
        estimatedCost: 350,
        completed: true,
        category: 'sightseeing',
        insiderTip: 'Carry wide lens and take stairs to the 5th floor for panorama of the old city.'
      },
      evening: {
        id: 'act-1-3',
        title: 'Bapu Bazaar & Johari Bazaar Walk + Pyaaz Kachori',
        time: '04:30 PM – 08:30 PM',
        duration: 'Approx. 4 hours',
        location: 'Johari Bazaar & Bapu Bazaar',
        description: 'Stroll through bustling pink colonnades shopping for Jaipuri block-printed quilts, bandhani dupattas, and camel leather mojris. Stop at Rawat Mishthan Bhandar for piping hot onion kachoris.',
        estimatedCost: 1200,
        completed: false,
        category: 'cultural',
        insiderTip: 'Polite bargaining is standard in Bapu Bazaar; start counteroffers at 60-70% of quoted price.'
      }
    },
    {
      dayNumber: 2,
      date: 'Day 2',
      theme: 'Royal Fortresses & Golden Sunset Over Nahargarh',
      staySuggestion: 'Heritage Haveli near Bani Park',
      dayTip: 'Amber Fort is extensive; wear sturdy walking footwear for exploring its ramparts and hidden passages.',
      morning: {
        id: 'act-2-1',
        title: 'Amber Fort Exploration & Sheesh Mahal Mirrors',
        time: '08:30 AM – 12:30 PM',
        duration: 'Approx. 4 hours',
        location: 'Amer, 11km north of Jaipur',
        description: 'Explore the grand 16th-century fortress, Diwan-e-Aam, and the breathtaking Mirror Palace (Sheesh Mahal) inlaid with concave Belgian glass that illuminates the entire hall with a single candle.',
        estimatedCost: 600,
        completed: false,
        category: 'sightseeing',
        insiderTip: 'Visit the historic subterranean tunnel linking Amber Fort to Jaigarh Fort!'
      },
      afternoon: {
        id: 'act-2-2',
        title: 'Panna Meena Ka Kund Stepwell & Jal Mahal Photostop',
        time: '01:00 PM – 03:30 PM',
        duration: 'Approx. 2.5 hours',
        location: 'Amer & Man Sagar Lake',
        description: 'Marvel at the symmetrical geometric staircases of the 16th-century Panna Meena Stepwell. On the drive back, pause along the promenade overlooking Jal Mahal floating serenely in Man Sagar Lake.',
        estimatedCost: 200,
        completed: false,
        category: 'photography',
        insiderTip: 'Stepping down the stepwell is restricted, but the geometric angles from the top ledge make sensational photos.'
      },
      evening: {
        id: 'act-2-3',
        title: 'Nahargarh Fort Sunset & Dinner at Padao Cafe',
        time: '04:30 PM – 08:00 PM',
        duration: 'Approx. 3.5 hours',
        location: 'Aravalli Ridge, Nahargarh',
        description: 'Watch the sun sink behind the rugged Aravalli mountains as the vast expanse of the Pink City lights up in shimmering golden hues beneath the fortress walls.',
        estimatedCost: 950,
        completed: false,
        category: 'relaxation',
        insiderTip: 'Hire a return taxi beforehand; getting cabs from Nahargarh post-sunset can be tricky.'
      }
    },
    {
      dayNumber: 3,
      date: 'Day 3',
      theme: 'Astronomical Wonders, Royal Courtyards & Folk Arts',
      staySuggestion: 'Heritage Haveli near Bani Park',
      dayTip: 'Hire an astronomer guide at Jantar Mantar to truly appreciate how the 18th-century stone instruments calculate planetary movements within 2 seconds of accuracy.',
      morning: {
        id: 'act-3-1',
        title: 'City Palace & The Blue Room (Sukh Niwas)',
        time: '09:00 AM – 12:00 PM',
        duration: 'Approx. 3 hours',
        location: 'City Palace Complex, Gangori Bazaar',
        description: 'Walk through the Pritam Niwas Chowk peacock gates, the royal costume museum, and the giant silver water vessels (Gangajalis) certified by the Guinness Book of Records.',
        estimatedCost: 700,
        completed: false,
        category: 'sightseeing',
        insiderTip: 'Book the composite museum ticket for full courtyard access.'
      },
      afternoon: {
        id: 'act-3-2',
        title: 'Jantar Mantar UNESCO Astronomical Observatory',
        time: '12:30 PM – 02:30 PM',
        duration: 'Approx. 2 hours',
        location: 'Tripolia Bazaar',
        description: 'Stand beside the world’s largest stone sundial (Vrihat Samrat Yantra) built by Maharaja Sawai Jai Singh II in 1734.',
        estimatedCost: 350,
        completed: false,
        category: 'cultural',
        insiderTip: 'Stand next to the shadow marker at exactly 12 noon for the sharpest demonstration.'
      },
      evening: {
        id: 'act-3-3',
        title: 'Traditional Rajasthani Thali Feast at LMB or Thali and More',
        time: '07:30 PM – 09:30 PM',
        duration: 'Approx. 2 hours',
        location: 'MI Road / C-Scheme',
        description: 'Feast on an elaborate 14-dish thali featuring Gatte ki Sabzi, Ker Sangri, Dal Baati Churma, Gulab Jamun, and Bajra Roti with fresh churned white butter.',
        estimatedCost: 1100,
        completed: false,
        category: 'dining',
        insiderTip: 'Pace yourself—the warm churma and ghee refills keep coming!'
      }
    },
    {
      dayNumber: 4,
      date: 'Day 4',
      theme: 'Handicrafts, Indigo Block Printing & Albert Hall Museum',
      staySuggestion: 'Heritage Haveli near Bani Park',
      dayTip: 'Carry cash for artisan workshops in Bagru or Sanganer.',
      morning: {
        id: 'act-4-1',
        title: 'Anokhi Museum of Hand Printing & Workshop',
        time: '09:30 AM – 12:30 PM',
        duration: 'Approx. 3 hours',
        location: 'Kheri Gate, Amer',
        description: 'Housed in a restored haveli, observe master block carvers and try stamping your own hand-printed scarf using natural vegetable dyes.',
        estimatedCost: 500,
        completed: false,
        category: 'cultural',
        insiderTip: 'You get to take home your hand-stamped textile creation as a memorable souvenir.'
      },
      afternoon: {
        id: 'act-4-2',
        title: 'Jaipur Blue Pottery Workshop in Kot Jeweler / Sanganer',
        time: '02:00 PM – 04:30 PM',
        duration: 'Approx. 2.5 hours',
        location: 'Sanganer artisan cluster',
        description: 'Discover the Turko-Persian craft of quartz-based Blue Pottery—sculpted without clay and painted with cobalt blue motifs.',
        estimatedCost: 650,
        completed: false,
        category: 'shopping',
        insiderTip: 'Pick up coasters or ceramic tiles—they are sturdy and easy to pack in luggage.'
      },
      evening: {
        id: 'act-4-3',
        title: 'Albert Hall Museum Illuminated Night View & Pigeon Square',
        time: '06:00 PM – 08:30 PM',
        duration: 'Approx. 2.5 hours',
        location: 'Ram Niwas Garden',
        description: 'Marvel at Indo-Saracenic architectural towers lit by 16 color-changing spotlights. Inside, view Persian carpets, arms, armor, and a 2,300-year-old Egyptian mummy named Tutu.',
        estimatedCost: 350,
        completed: false,
        category: 'sightseeing',
        insiderTip: 'The museum illuminated from outside at night is one of Jaipur’s most photogenic scenes.'
      }
    },
    {
      dayNumber: 5,
      date: 'Day 5',
      theme: 'Spiritual Monkey Temple, Souvenir Bazaars & Farewell Feast',
      staySuggestion: 'Departure Day',
      dayTip: 'Keep small change for temple offerings and auto rides back to the station/airport.',
      morning: {
        id: 'act-5-1',
        title: 'Galtaji Temple (The Sacred Sun & Monkey Temple)',
        time: '07:30 AM – 10:30 AM',
        duration: 'Approx. 3 hours',
        location: 'Galta Gorge, East of Jaipur',
        description: 'Tucked between mountain cliffs, this historic pilgrimage site features natural freshwater springs filling sacred kunds, inhabited by friendly rhesus macaque monkeys.',
        estimatedCost: 300,
        completed: false,
        category: 'spiritual',
        insiderTip: 'Climb up to the Sun Temple viewpoint at the crest for a sweeping look over the entire Jaipur valley.'
      },
      afternoon: {
        id: 'act-5-2',
        title: 'Last-minute Spice & Textile Bazaars at Kishanpole',
        time: '11:30 AM – 02:30 PM',
        duration: 'Approx. 3 hours',
        location: 'Kishanpole Bazaar & Chaura Rasta',
        description: 'Pick up authentic handloom Jaipuri razai (lightweight cotton quilts), hand-ground Rajasthani red chili powder, and lacquer bangles from Maniharon ka Rasta.',
        estimatedCost: 1500,
        completed: false,
        category: 'shopping',
        insiderTip: 'Buy genuine Jaipuri razais made of 100% carded mulmul cotton.'
      },
      evening: {
        id: 'act-5-3',
        title: 'Farewell Royal Rooftop Dinner & Return Departure',
        time: '04:30 PM – 07:30 PM',
        duration: 'Approx. 3 hours',
        location: 'Peacock Rooftop Restaurant, Hathroi Fort',
        description: 'Relish live acoustic sitar music and north Indian delicacies amidst hand-painted peacock murals before heading to Jaipur Junction or Jaipur International Airport.',
        estimatedCost: 900,
        completed: false,
        category: 'dining',
        insiderTip: 'Pre-book a table around sunset on the open-air deck.'
      }
    }
  ]
};
