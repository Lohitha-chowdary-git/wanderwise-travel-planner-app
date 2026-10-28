import { TripFormData, Itinerary, DayPlan, Activity, ExpenseBreakdown } from '../types/travel';

// Knowledge base for iconic activities per destination
interface DestinationActivities {
  weather: string;
  bestTime: string;
  delicacies: string[];
  essentials: string[];
  attractions: Array<{
    theme: string;
    morning: { title: string; desc: string; loc: string; cost: number; tip: string; category: Activity['category'] };
    afternoon: { title: string; desc: string; loc: string; cost: number; tip: string; category: Activity['category'] };
    evening: { title: string; desc: string; loc: string; cost: number; tip: string; category: Activity['category'] };
    stay: string;
    dayTip: string;
  }>;
}

const DESTINATION_DATABASE: Record<string, DestinationActivities> = {
  jaipur: {
    weather: 'Warm sunny days (24°C - 30°C) with pleasant breezy evenings (15°C - 18°C).',
    bestTime: 'October to March for comfortable palace and fort exploration.',
    delicacies: ['Dal Baati Churma with pure desi ghee', 'Pyaaz Kachori from Rawat Mishthan Bhandar', 'Mawa Kachori & Ghewar from LMB', 'Kulhad Lassi at original Lassiwala (MI Road)', 'Laal Maas or Ker Sangri curry'],
    essentials: ['Comfortable slip-on shoes for fort ramps and stairs', 'Sun hat and polarized sunglasses', 'Light jacket or shawl for evenings', 'UPI payment app (accepted across 99% of Jaipur street markets)'],
    attractions: [
      {
        theme: 'Arrival, Iconic Pink Colonnades & Historical Bazaars',
        morning: { title: 'Lassiwala Breakfast & Hawa Mahal Facade', desc: 'Savor rich clay-cup kulhad lassi on MI Road before admiring the 953 honeycomb windows of the 1799 Wind Palace.', loc: 'MI Road & Badi Chaupar', cost: 250, tip: 'Reach Hawa Mahal before 10 AM for optimal morning sun lighting.', category: 'sightseeing' },
        afternoon: { title: 'City Palace Courtyards & Royal Armory Museum', desc: 'Walk through the Pritam Niwas Chowk peacock gates, costume gallery, and royal silver Gangajalis.', loc: 'City Palace Complex', cost: 700, tip: 'Composite ticket includes access to multiple courtyards.', category: 'cultural' },
        evening: { title: 'Bapu & Johari Bazaar Textile Walk + Pyaaz Kachori', desc: 'Shop for Jaipuri block-printed quilts, bandhani dupattas, and camel leather mojris followed by crisp onion kachoris.', loc: 'Johari Bazaar', cost: 600, tip: 'Gentle bargaining is traditional; start counteroffers at 70% of quoted price.', category: 'shopping' },
        stay: 'Heritage Haveli near Bani Park or C-Scheme',
        dayTip: 'Cross the street in front of Hawa Mahal to Tattoo Cafe or Wind View Cafe for elevated photos.'
      },
      {
        theme: 'Hilltop Fortresses & Nahargarh Sunset',
        morning: { title: 'Amber Fort & Sheesh Mahal Mirrors', desc: 'Explore the grand 16th-century Rajput citadel, Diwan-e-Khas, and the dazzling Belgian glass mirror palace.', loc: 'Amer, 11 km north', cost: 550, tip: 'Explore the historic underground tunnel connecting Amber Fort to Jaigarh Fort.', category: 'sightseeing' },
        afternoon: { title: 'Panna Meena Stepwell & Jal Mahal Photostop', desc: 'Admire the geometric symmetrical staircases of Panna Meena Kund and pause at the Man Sagar lake promenade.', loc: 'Amer & Amer Road', cost: 150, tip: 'Stepping down the kund is restricted, but the geometric angles from the rim are stunning.', category: 'photography' },
        evening: { title: 'Nahargarh Fort Sunset & City Lights View', desc: 'Watch golden hour over the Aravalli hills as the Pink City lights up in glowing amber beneath the fortress ramparts.', loc: 'Nahargarh Ridge', cost: 450, tip: 'Pre-book return taxi transportation; cabs from the fort post-sunset can be scarce.', category: 'relaxation' },
        stay: 'Heritage Haveli near Bani Park',
        dayTip: 'Amber Fort requires walking on inclined cobblestones; wear shoes with good traction.'
      },
      {
        theme: 'Astronomical Wonders & Traditional Craft Clusters',
        morning: { title: 'Jantar Mantar UNESCO Astronomical Observatory', desc: 'Stand beside the world’s largest stone sundial built in 1734 by Maharaja Sawai Jai Singh II.', loc: 'Near City Palace', cost: 300, tip: 'Observe the shadow marker around 12 noon for precision sun time calculation.', category: 'cultural' },
        afternoon: { title: 'Anokhi Museum of Hand Printing & Workshop', desc: 'Watch master block carvers and try your hand at vegetable-dye block printing on cotton fabric.', loc: 'Anokhi Haveli, Amer', cost: 400, tip: 'You get to keep your hand-stamped scarf as a souvenir.', category: 'cultural' },
        evening: { title: 'Albert Hall Museum Illuminated Night View & Thali Dinner', desc: 'View the illuminated Indo-Saracenic museum towers followed by a 14-dish authentic Rajasthani Thali.', loc: 'Ram Niwas Garden & C-Scheme', cost: 850, tip: 'Albert Hall lit up by spotlights after dark is one of Jaipur’s finest night sights.', category: 'dining' },
        stay: 'Heritage Haveli near Bani Park',
        dayTip: 'Try the ghewar and mawa kachori at Laxmi Misthan Bhandar (LMB) on Johari Bazaar.'
      },
      {
        theme: 'Spiritual Springs & Hidden Temples',
        morning: { title: 'Galtaji Sacred Monkey Temple & Sun Temple', desc: 'Ascend the mountain gorge containing seven holy water kunds and friendly rhesus macaque monkeys.', loc: 'Galta Gorge', cost: 200, tip: 'Climb to the Sun Temple viewpoint at the top for sweeping panoramic valley views.', category: 'spiritual' },
        afternoon: { title: 'Jaipur Blue Pottery Artisan Cluster in Sanganer', desc: 'Discover traditional Turko-Persian glazed ceramic art crafted without natural clay.', loc: 'Sanganer artisan village', cost: 500, tip: 'Pick up coasters and ceramic wall plates; they are lightweight and easy to pack.', category: 'shopping' },
        evening: { title: 'Rooftop Acoustic Dinner at Peacock Cafe', desc: 'Relish north Indian delicacies and live classical sitar music amidst hand-painted peacock murals.', loc: 'Hathroi Fort', cost: 750, tip: 'Reserve an open-air terrace table 1-2 hours before sunset.', category: 'dining' },
        stay: 'Heritage Haveli near Bani Park',
        dayTip: 'Keep small change for temple donations and local auto rides.'
      }
    ]
  },
  goa: {
    weather: 'Tropical coastal climate, 27°C - 32°C. Gentle sea breeze in the mornings and evenings.',
    bestTime: 'November to March for water sports and pleasant beach weather.',
    delicacies: ['Goan Fish Curry Thali with red rice', 'Prawn Balchão & Butter Garlic Crab', 'Pork Vindaloo or Vegetable Xacuti', 'Poi bread with Goan Chorizo', 'Feni cocktail & Tender Coconut'],
    essentials: ['UV-protection swimwear & polarized sunglasses', 'Reef-safe sunscreen SPF 50', 'Two-wheeler driving license for scooter rentals', 'Waterproof pouch for phones & cash'],
    attractions: [
      {
        theme: 'North Goa Coastal Highlights & Portuguese Fortress',
        morning: { title: 'Aguada Fort & Lighthouse Panorama', desc: 'Explore the 17th-century Portuguese fortress overlooking Sinquerim beach and the Arabian Sea.', loc: 'Candolim, North Goa', cost: 150, tip: 'Reach before 10 AM to avoid midday heat.', category: 'sightseeing' },
        afternoon: { title: 'Anjuna Beach Shack Lunch & Flea Market Stroll', desc: 'Savor butter garlic prawns and cold drinks at Curlies or Shiva Valley while soaking in beach shack vibes.', loc: 'Anjuna Beach', cost: 850, tip: 'Bargain gently on handmade jewelry and macrame crafts.', category: 'dining' },
        evening: { title: 'Vagator Sunset & Chapora Fort Ramparts', desc: 'Climb up to the famous "Dil Chahta Hai" fort walls for a dramatic sunset over Morjim beach and the river mouth.', loc: 'Chapora, Vagator', cost: 100, tip: 'Wear non-slip footwear for the rocky climb.', category: 'relaxation' },
        stay: 'Boutique Beach Resort in Candolim or Vagator',
        dayTip: 'Rent a scooter (₹350-₹500/day) for easy navigation between beaches.'
      },
      {
        theme: 'Fontainhas Latin Heritage & Mandovi River Cruise',
        morning: { title: 'Fontainhas Latin Quarter Walking Tour', desc: 'Stroll along pastel yellow and azure Portuguese villas, terracotta roofs, and wooden balconies in Panaji.', loc: 'Panjim Old Town', cost: 200, tip: 'Visit Confeitaria 31 de Janeiro for freshly baked bebinca.', category: 'cultural' },
        afternoon: { title: 'Basilica of Bom Jesus & Old Goa Churches', desc: 'Marvel at UNESCO heritage baroque architecture and the sacred tomb of St. Francis Xavier.', loc: 'Old Goa', cost: 100, tip: 'Dress respectfully with covered shoulders and knees.', category: 'sightseeing' },
        evening: { title: 'Sunset Cruise on Mandovi River with Folk Dance', desc: 'Enjoy live Dekhni and Fugdi folk performances with river breezes as twilight settles over the capital.', loc: 'Panaji Jetty', cost: 600, tip: 'Board the upper deck 20 minutes prior for the best panoramic view.', category: 'cultural' },
        stay: 'Heritage Haveli or riverside hotel in Panaji',
        dayTip: 'Try authentic Goan fish curry thali at Ritz Classic in Panaji for lunch.'
      },
      {
        theme: 'Tranquil South Goa Shores & Cabo de Rama',
        morning: { title: 'Palolem Beach Kayaking & Silent Beach Vibe', desc: 'Paddle calm turquoise waters in a sea kayak and relax along the crescent white sand bay.', loc: 'Palolem, South Goa', cost: 400, tip: 'Morning waters are glassy calm—ideal for dolphin spotting.', category: 'adventure' },
        afternoon: { title: 'Cabo de Rama Cliff Fort & Untouched Shore', desc: 'Explore the ancient fortress cliff edge that plummets straight into crashing waves with wild ocean views.', loc: 'Canacona', cost: 150, tip: 'Carry water and sun hats as shade is limited on the cliff.', category: 'sightseeing' },
        evening: { title: 'Candlelight Seafood Dinner at Agonda Beach', desc: 'Feast on freshly caught red snapper or crab ghee roast right on the sand with acoustic music.', loc: 'Agonda Beach', cost: 1100, tip: 'Agonda is a protected turtle nesting beach, preserving a quiet, peaceful vibe.', category: 'dining' },
        stay: 'Eco Beach Cabana along Palolem or Agonda beach',
        dayTip: 'South Goa is remarkably tranquil; avoid loud horns and respect local silence.'
      },
      {
        theme: 'Spices, Waterfalls & Coastal Hinterlands',
        morning: { title: 'Sahakari Spice Plantation Guided Tour', desc: 'Walk through cardamoms, vanilla vines, and betel nuts followed by a traditional buffet lunch on banana leaves.', loc: 'Ponda', cost: 650, tip: 'Taste freshly pressed cashew juice if traveling during season.', category: 'nature' },
        afternoon: { title: 'Dudhsagar Waterfall Jeep Safari Viewpoint', desc: 'Ride an open 4x4 jeep through Bhagwan Mahaveer Wildlife Sanctuary to view the milky four-tiered cascade.', loc: 'Kulem, Western Ghats', cost: 1200, tip: 'Life jackets are mandatory for swimming at the base pool.', category: 'adventure' },
        evening: { title: 'Return Drive & Relaxed Beach Club Lounge', desc: 'Unwind with sea breeze, acoustic tunes, and coconut mocktails at a beachside lounge.', loc: 'Benaulim / Colva', cost: 700, tip: 'Perfect time to journal or download photos from the day.', category: 'relaxation' },
        stay: 'Boutique Beach Resort',
        dayTip: 'Book the official forest department safari counter early to skip weekend lines.'
      }
    ]
  },
  manali: {
    weather: 'Cool mountain climate, 10°C - 20°C in summer, drops below freezing with snow in winter.',
    bestTime: 'April to June for pleasant greenery; December to February for fresh snowfall.',
    delicacies: ['Siddu with pure desi ghee and walnut paste', 'Kullu Trout Fish fried in mustard oil', 'Tibetan Thukpa & Steamed Tingmo', 'Chana Madra (Himachali yogurt curry)', 'Hot spiced apple cider'],
    essentials: ['Warm thermal innerwear and windproof fleece jacket', 'High-grip trekking shoes with wool socks', 'Lip balm and heavy moisturizer for dry mountain air', 'Motion sickness tablets for winding mountain ghats'],
    attractions: [
      {
        theme: 'Alpine Woods, Sacred Hadimba & Old Manali Vibe',
        morning: { title: 'Hadimba Wooden Temple in Deodar Cedar Forest', desc: 'Visit the 16th-century four-tiered pagoda temple constructed around a natural rock cave inside towering cedars.', loc: 'Dhungri Forest', cost: 100, tip: 'Keep an eye out for fluffy Angora rabbits and mountain yaks for photostops.', category: 'cultural' },
        afternoon: { title: 'Old Manali Cafe Crawl & Manu Temple Walk', desc: 'Wander past traditional timber-and-stone houses to Drifters Cafe or Dylan’s Toasted and Roasted for wood-fired pizza.', loc: 'Old Manali Village', cost: 650, tip: 'Try the fresh cinnamon roll and mountain espresso.', category: 'dining' },
        evening: { title: 'Mall Road Stroll & Shopping for Kullu Shawls', desc: 'Browse authentic woolens, Tibetan prayer wheels, and apricot oil at Himachal Handloom Emporium.', loc: 'The Mall, Manali', cost: 500, tip: 'Look for the Handloom Mark tag to guarantee genuine wool weaving.', category: 'shopping' },
        stay: 'Riverside wooden cottage in Old Manali or Aleo',
        dayTip: 'Evenings get chilly rapidly; keep a wool sweater in your daypack.'
      },
      {
        theme: 'Snowbound Thrills & Atal Tunnel Crossing',
        morning: { title: 'Solang Valley Adventure & Paragliding', desc: 'Soar like an eagle with tandem paragliding over pine-covered slopes or try the Solang ropeway cable car.', loc: 'Solang Valley', cost: 1500, tip: 'Only fly with certified tandem pilots equipped with reserve chutes.', category: 'adventure' },
        afternoon: { title: 'Drive Through Atal Tunnel into Sissu Valley', desc: 'Cross the 9.02 km engineering marvel through the Pir Panjal range into the rugged landscape of Lahaul.', loc: 'Atal Tunnel, Rohtang', cost: 800, tip: 'The sudden transition from lush green slopes to barren Himalayan desert is breathtaking.', category: 'sightseeing' },
        evening: { title: 'Sissu Waterfall Viewpoint & Mountain Tea', desc: 'Sip steaming cardamom chai overlooking the cascading glacial waterfall before returning to Manali.', loc: 'Sissu, Lahaul', cost: 250, tip: 'Watch for rapid sunset temperature drops on the high-altitude pass.', category: 'nature' },
        stay: 'Cozy mountain view chalet',
        dayTip: 'Check tunnel transit timings and carry an offline GPS map.'
      },
      {
        theme: 'Hot Springs, Waterfall Treks & Tibetan Monasteries',
        morning: { title: 'Jogini Waterfall Pine Forest Trek', desc: 'A scenic 3 km hike through apple orchards and pine groves ending at the roaring tiered Jogini falls.', loc: 'Vashisht Village', cost: 200, tip: 'Carry water and wear sports shoes; the forest path has gentle stone steps.', category: 'adventure' },
        afternoon: { title: 'Vashisht Natural Sulfur Hot Springs Bath', desc: 'Soak tired muscles in the ancient sacred hot mineral baths known for therapeutic healing properties.', loc: 'Vashisht Temple', cost: 100, tip: 'Separate clean bathing chambers are provided for men and women.', category: 'relaxation' },
        evening: { title: 'Himalayan Nyingmapa Buddhist Gompa Walk', desc: 'Spin gold-embossed prayer wheels and listen to rhythmic Tibetan evening chants under butter lamps.', loc: 'Near Mall Road', cost: 50, tip: 'Walk clockwise around Buddhist shrines as a mark of respect.', category: 'spiritual' },
        stay: 'Riverside wooden cottage',
        dayTip: 'Pick up locally bottled Rhododendron honey from Vashisht village.'
      }
    ]
  },
  kerala: {
    weather: 'Lush tropical climate with balmy coastal temperatures (24°C - 30°C) and misty hills in Munnar (15°C - 22°C).',
    bestTime: 'September to March when tea gardens are vibrant and backwaters serene.',
    delicacies: ['Appam with vegetable stew or spicy egg curry', 'Karimeen Pollichathu (Pearl spot fish baked in banana leaves)', 'Kerala Sadya with 24 dishes on fresh plantain leaf', 'Banana chips fried in pure cold-pressed coconut oil', 'Puttu and Kadala curry with spiced black chickpeas'],
    essentials: ['Light cotton clothing for coast + light fleece for Munnar tea hills', 'Umbrella / waterproof poncho (intermittent showers)', 'Mosquito repellent for backwaters', 'Slip-on footwear for boat decks & temples'],
    attractions: [
      {
        theme: 'Alleppey Emerald Backwaters & Houseboat Journey',
        morning: { title: 'Boarding Traditional Kettuvallam Houseboat', desc: 'Step aboard a thatched houseboat with sundecks cruising past village paddy fields, canals, and coconut palms.', loc: 'Punnamada Jetty, Alleppey', cost: 1800, tip: 'Watch local boatmen pole narrow canoes delivering village supplies.', category: 'relaxation' },
        afternoon: { title: 'Fresh Cooked Keralan Lunch on Backwaters', desc: 'Relish freshly caught fish, red matta rice, avial, thoran, and crispy papadams prepared onboard by your private chef.', loc: 'Vembanad Lake', cost: 500, tip: 'Vegetarian and vegan sadya variations are readily made upon request.', category: 'dining' },
        evening: { title: 'Sunset Canoe Ride Through Narrow Canals', desc: 'Transfer to a non-motorized wooden canoe gliding down micro-canals where large houseboats cannot reach.', loc: 'Kainakary Village', cost: 400, tip: 'Golden hour birdwatching here reveals kingfishers, egrets, and cormorants.', category: 'nature' },
        stay: 'Overnight Houseboat Cabin or Backwater Heritage Homestay',
        dayTip: 'Pre-charge devices as houseboats often run generators only during selected hours.'
      },
      {
        theme: 'Munnar Rolling Tea Carpets & Eravikulam Wilderness',
        morning: { title: 'Eravikulam National Park & Nilgiri Tahr Trek', desc: 'Ascend the high-altitude shola grasslands to spot the endangered Nilgiri Tahr mountain goats roaming wild.', loc: 'Rajamalai, Munnar', cost: 250, tip: 'Advance online booking avoids the long queue at the national park shuttle.', category: 'nature' },
        afternoon: { title: 'KDHP Tea Museum & Processing Factory Tour', desc: 'Trace the history of tea cultivation in the High Ranges and see orthodox tea leaf crushing, drying, and grading.', loc: 'Nullatanni Estate', cost: 200, tip: 'Participate in the tea tasting session to identify brisk vs malty notes.', category: 'cultural' },
        evening: { title: 'Mattupetty Dam Lake & Echo Point Walk', desc: 'Take a leisurely walk along the reservoir framed by misty eucalyptus hills; shout into the valley for echo reverberations.', loc: 'Mattupetty, Munnar', cost: 150, tip: 'Buy freshly roasted spiced corn on the cob from local stalls.', category: 'sightseeing' },
        stay: 'Misty hillside tea estate bungalow in Munnar',
        dayTip: 'Mornings in Munnar are misty and crisp; carry a warm shawl.'
      },
      {
        theme: 'Spices, Kathakali Arts & Ayurvedic Wellness',
        morning: { title: 'Ayurvedic Spice Garden Botanical Walk', desc: 'Smell wild cinnamon bark, fresh cloves, green cardamom pods, and nutmeg trees with an experienced herbalist.', loc: 'Thekkady / Kumily', cost: 200, tip: 'Purchase whole spices directly from estate outlets for superior aroma.', category: 'nature' },
        afternoon: { title: 'Traditional Abhyanga Ayurvedic Rejuvenation Massage', desc: 'Unwind with warm herbal medicated oil massage followed by steam therapy to melt away travel fatigue.', loc: 'Certified Ayurvedic Center', cost: 1500, tip: 'Choose centers certified by Kerala Tourism Green Leaf status.', category: 'relaxation' },
        evening: { title: 'Kathakali Drama & Kalaripayattu Martial Arts Show', desc: 'Witness live face makeup demonstration followed by expressive classical storytelling and sword feats.', loc: 'Mudra Cultural Center', cost: 450, tip: 'Arrive 30 minutes early to watch the actors apply organic mineral makeup.', category: 'cultural' },
        stay: 'Eco-lodge or heritage spice plantation cottage',
        dayTip: 'End the day with a hot cup of Cardamom tea infused with fresh ginger.'
      }
    ]
  },
  varanasi: {
    weather: 'Mild winters (12°C - 24°C), warm sunny afternoons, cool evenings along the river.',
    bestTime: 'October to March for optimal spiritual boat rides and pleasant temperatures.',
    delicacies: ['Banarasi Kachori Sabzi & Jalebi breakfast', 'Makkhan Malai (Nimish winter dessert)', 'Tamatar Chaat at Kashi Chaat Bhandar', 'Banarasi Paan at Godowlia Chowk', 'Kulhad Thandai topped with rabri and pistachios'],
    essentials: ['Slip-on footwear for ghats and temple entries', 'Modest clothing covering shoulders and legs', 'Small currency coins and notes for boat rides and temple offerings', 'Hand sanitizer and wet wipes for street food tasting'],
    attractions: [
      {
        theme: 'Ganga Sunrise Boat Ride & Sacred Alleys',
        morning: { title: 'Subah-e-Banaras Sunrise Boat Ride on Ganges', desc: 'Glide past ancient stone palaces and bathing ghats as early morning bells ring and morning prayers commence.', loc: 'Assi Ghat to Dashashwamedh', cost: 350, tip: 'Board a rowing boat right at 05:45 AM to catch the pink sunrise glow across the water.', category: 'spiritual' },
        afternoon: { title: 'Kashi Vishwanath Corridor & Old City Gali Crawl', desc: 'Visit the newly restored golden temple corridor and navigate labyrinthine medieval lanes filled with silk weavers.', loc: 'Godowlia & Vishwanath Gali', cost: 200, tip: 'Deposit mobile phones and leather articles in official temple lockers.', category: 'cultural' },
        evening: { title: 'Dashashwamedh Ghat Maha Ganga Aarti', desc: 'Witness the iconic evening ritual as priests chant Sanskrit hymns while swinging multi-tiered brass oil lamps in unison.', loc: 'Dashashwamedh Ghat', cost: 200, tip: 'Reserve a seat on a moored boat 45 minutes ahead for an unobstructed water-facing perspective.', category: 'spiritual' },
        stay: 'Riverside Haveli near Assi or Dashashwamedh Ghat',
        dayTip: 'Assi Ghat hosts morning yoga sessions and classical music concerts at sunrise.'
      },
      {
        theme: 'Buddhist Heritage & Silk Weaving Traditions',
        morning: { title: 'Sarnath Buddhist Stupa & Deer Park', desc: 'Visit the sacred site where Lord Buddha delivered his first sermon; admire the Dhamek Stupa and Ashoka Lion Capital.', loc: 'Sarnath, 10 km northeast', cost: 300, tip: 'The Archaeological Museum at Sarnath closes on Fridays; plan accordingly.', category: 'cultural' },
        afternoon: { title: 'Banarasi Brocade Silk Handloom Weaving Cluster', desc: 'Observe master artisans hand-weaving gold and silver zari silk sarees on traditional wooden pit looms.', loc: 'Madanpura / Peelikothi', cost: 400, tip: 'Look for the Silk Mark certification when purchasing genuine handwoven sarees.', category: 'shopping' },
        evening: { title: 'Evening Street Food Tour at Kashi Chaat Bhandar', desc: 'Feast on hot Tamatar Chaat, Dahi Chuda, Palak Patta Chaat, and conclude with authentic sweet Banarasi Paan.', loc: 'Godowlia Crossing', cost: 350, tip: 'Tamatar chaat is served piping hot in earthen pots (kulhads).', category: 'dining' },
        stay: 'Riverside Haveli near Assi Ghat',
        dayTip: 'Wander slowly through the galis; motor vehicles are not allowed, making walking peaceful.'
      }
    ]
  },
  ladakh: {
    weather: 'High-altitude cold desert, sunny daytime (15°C - 22°C), crisp freezing nights (2°C - 8°C).',
    bestTime: 'May to September when mountain passes are snow-cleared and roads open.',
    delicacies: ['Tibetan Thukpa with fresh handmade noodles', 'Steamed Chicken or Cheese Momos with chili sauce', 'Ladakhi Butter Tea (Gur Gur Chai)', 'Skyu (traditional wheat pasta and vegetable stew)', 'Apricot Jam & roasted barley Tsampa'],
    essentials: ['Diamox / acclimatization tablets and portable pulse oximeter', 'UV-blocking sunglasses and SPF 50 sunscreen', 'Layered clothing: thermal inners, down jacket, windbreaker', 'Cash (ATMs outside Leh town are frequently offline)'],
    attractions: [
      {
        theme: 'Acclimatization, Leh Palace & Shanti Stupa',
        morning: { title: 'Gentle Morning Acclimatization & Leh Bazaar', desc: 'Rest and hydrate to adjust to the 11,500 ft elevation before an easy stroll around Leh Main Bazaar.', loc: 'Leh Town', cost: 150, tip: 'Strictly avoid strenuous climbing on your first 24 hours in Ladakh.', category: 'relaxation' },
        afternoon: { title: 'Historic Leh Palace & Tsemo Fort Viewpoint', desc: 'Explore the 9-storey 17th-century royal palace modeled after Lhasa’s Potala Palace.', loc: 'Namgyal Hill', cost: 250, tip: 'The wooden rooftop balconies offer breathtaking views of the Stok Kangri range.', category: 'sightseeing' },
        evening: { title: 'Sunset at Shanti Stupa White Dome', desc: 'Climb to the Japanese Peace Pagoda to watch the last golden rays illuminate the Indus Valley.', loc: 'Changspa, Leh', cost: 100, tip: 'Bring a warm jacket; mountain breezes turn cold rapidly after sunset.', category: 'spiritual' },
        stay: 'Eco Hotel or Guesthouse in Upper Changspa, Leh',
        dayTip: 'Drink at least 3-4 liters of water daily to prevent Acute Mountain Sickness (AMS).'
      },
      {
        theme: 'Pangong Tso High-Altitude Azure Lake',
        morning: { title: 'Drive Across Chang La Pass (17,590 ft)', desc: 'Traverse the world’s third-highest motorable mountain pass surrounded by dramatic snow ridges and prayer flags.', loc: 'Chang La Ridge', cost: 900, tip: 'Spend no more than 15 minutes at the pass summit to avoid dizziness.', category: 'adventure' },
        afternoon: { title: 'First View of Pangong Tso Shifting Hues', desc: 'Witness the world’s highest saltwater lake changing shades from deep cobalt to emerald and turquoise.', loc: 'Spangmik, Pangong Tso', cost: 400, tip: 'The lake spans 134 km, extending across the border into Tibet.', category: 'nature' },
        evening: { title: 'Stargazing at Pangong Campsite & Bonfire', desc: 'Experience zero-pollution night skies revealing the brilliant Milky Way galaxy above the silent waters.', loc: 'Lukung / Spangmik', cost: 600, tip: 'Night temperatures plunge near freezing; thermal layers are essential.', category: 'photography' },
        stay: 'Deluxe Swiss Tent at Pangong Tso Lake',
        dayTip: 'Inner Line Permits (ILP) are mandatory for Pangong Tso; obtain them online in advance.'
      }
    ]
  },
  udaipur: {
    weather: 'Pleasant winter temperatures (20°C - 28°C), dry air, clear blue lake reflections.',
    bestTime: 'October to March for regal palace tours and boat cruises.',
    delicacies: ['Ker Sangri & Dal Baati Churma', 'Junglee Maas / Mewari Laal Maas', 'Mirchi Vada with mint chutney', 'Ghewar from Jagdish Mishthan Bhandar', 'Fresh pomegranate and spiced buttermilk'],
    essentials: ['Polarized sunglasses for bright lake reflections', 'Walking footwear for palace courtyards', 'Smart casual attire for rooftop dinners', 'UPI and cash for handicrafts'],
    attractions: [
      {
        theme: 'City Palace Grandeur & Lake Pichola Cruise',
        morning: { title: 'Udaipur City Palace & Crystal Gallery', desc: 'Tour the largest palace complex in Rajasthan featuring mirror mosaics, marble courtyards, and Lake Pichola views.', loc: 'City Palace Complex', cost: 600, tip: 'Enter via the Badi Pol gate early at 09:00 AM to beat tour groups.', category: 'cultural' },
        afternoon: { title: 'Jagdish Temple & Old City Silver Haveli Walk', desc: 'Admire 1651 carved stone pillars at Jagdish temple and browse miniature Rajput paintings.', loc: 'Jagdish Chowk', cost: 200, tip: 'Visit local miniature artists demonstrating single-hair brush techniques.', category: 'cultural' },
        evening: { title: 'Sunset Boat Ride on Lake Pichola past Jag Mandir', desc: 'Glide past the ivory Taj Lake Palace and watch the golden sunset reflect against the Aravalli hills.', loc: 'Rameshwar Ghat Jetty', cost: 650, tip: 'The 05:00 PM boat departure catches both golden hour and the palace evening illuminations.', category: 'relaxation' },
        stay: 'Heritage Haveli overlooking Lake Pichola (Lal Ghat or Chandpole)',
        dayTip: 'Dine at Ambrai or Upre rooftop overlooking the lit-up City Palace ramparts.'
      },
      {
        theme: 'Royal Gardens, Vintage Cars & Monsoon Palace',
        morning: { title: 'Saheliyon-ki-Bari (Garden of the Maidens)', desc: 'Stroll through marble elephant fountains, lotus pools, and rose beds built for royal queens and their attendants.', loc: 'Fateh Sagar Road', cost: 150, tip: 'The fountains operate purely via natural water pressure from Fateh Sagar lake without pumps.', category: 'sightseeing' },
        afternoon: { title: 'Fateh Sagar Lake Promenade & Camel Ride', desc: 'Enjoy scenic lakeside breezes, coconut water, and take a motorboat to Nehru Park island in the center.', loc: 'Fateh Sagar Promenade', cost: 300, tip: 'Try the cold coffee at lakeside open-air cafes.', category: 'relaxation' },
        evening: { title: 'Sajjangarh Monsoon Palace Sunset Panorama', desc: 'Perched on Bansdara mountain 3,100 ft above sea level, view 360-degree vistas across all lakes of Udaipur.', loc: 'Sajjangarh Wildlife Sanctuary', cost: 350, tip: 'Shared electric safari vans take you from the valley gate to the hilltop.', category: 'photography' },
        stay: 'Heritage Haveli near Lake Pichola',
        dayTip: 'Catch the 07:00 PM Dharohar Folk Dance show at Bagore Ki Haveli on Gangaur Ghat.'
      }
    ]
  },
  andaman: {
    weather: 'Tropical island climate, 25°C - 30°C. Warm turquoise waters and gentle ocean breezes.',
    bestTime: 'October to May for clear underwater visibility and calm ferry crossings.',
    delicacies: ['Grilled Andaman Red Snapper & King Prawns', 'Coconut Prawn Curry', 'Fresh Mango & Pineapple smoothies', 'Amritsari Fish Fry at Port Blair', 'Tender King Coconut water on the beach'],
    essentials: ['Underwater phone case & dry bag', 'High-SPF reef-safe sunscreen', 'Quick-dry microfiber towels', 'Cash (ATMs on Havelock and Neil islands can run out of cash)'],
    attractions: [
      {
        theme: 'Port Blair Freedom History & Cellular Jail',
        morning: { title: 'Cellular Jail (Kala Pani) National Memorial', desc: 'Walk through the historic colonial prison where Indian freedom fighters were interned; visit Veer Savarkar’s cell.', loc: 'Atlanta Point, Port Blair', cost: 150, tip: 'Hire an official national memorial guide to understand the architecture and history.', category: 'cultural' },
        afternoon: { title: 'Corbyn’s Cove Beach & Sea Breeze Lunch', desc: 'Relax beneath towering coconut palms along the crescent bay and savor fresh seafood at a beachside restaurant.', loc: 'Corbyn’s Cove', cost: 500, tip: 'Jet ski and speed boat rides are readily available here.', category: 'dining' },
        evening: { title: 'Cellular Jail Sound & Light Show', desc: 'Experience the moving audio-visual narration of India’s freedom struggle under the towering Peepal tree.', loc: 'Cellular Jail Compound', cost: 250, tip: 'The Hindi show starts at 06:00 PM; English show follows at 07:15 PM.', category: 'cultural' },
        stay: 'Sea-facing hotel in Port Blair',
        dayTip: 'Pre-book Makruzz or Nautika catamaran ferry tickets to Havelock Island online.'
      },
      {
        theme: 'Radhanagar Sunset & Elephant Beach Snorkel',
        morning: { title: 'Elephant Beach Snorkeling & Coral Reef Exploration', desc: 'Take a 20-minute speed boat to Elephant Beach to snorkel over vibrant coral gardens and spot clownfish.', loc: 'Havelock (Swaraj Dweep)', cost: 1200, tip: 'Certified sea walk and scuba diving sessions are available for beginners with instructors.', category: 'adventure' },
        afternoon: { title: 'Beachside Cafe Lunch & Hammock Chill', desc: 'Feast on wood-fired pizza and fresh seafood at Something Different or Full Moon Cafe.', loc: 'Beach No. 5, Havelock', cost: 650, tip: 'Try the fresh tender coconut smoothie.', category: 'dining' },
        evening: { title: 'Radhanagar Beach Sunset (Asia’s Top Beach)', desc: 'Walk barefoot on powdery sugar-white sand while watching the sun dip into the Andaman Sea.', loc: 'Beach No. 7, Radhanagar', cost: 100, tip: 'Ranked among the world’s best beaches by Time Magazine; pristine water and sunset.', category: 'relaxation' },
        stay: 'Eco-resort cottage on Havelock Island',
        dayTip: 'Avoid carrying single-use plastic bottles to Havelock; carry reusable steel bottles.'
      }
    ]
  }
};

export function generateRuleBasedItinerary(formData: TripFormData): Itinerary {
  const {
    destination,
    startingCity,
    departureDate,
    days,
    budget,
    travelers,
    interests,
    travelPace,
    travelStyle
  } = formData;

  // Clean destination string for lookup
  const destLower = destination.toLowerCase();
  let matchedKey = 'general';
  if (destLower.includes('jaipur') || destLower.includes('rajasthan')) {
    matchedKey = 'jaipur';
  } else if (destLower.includes('manali') || destLower.includes('himachal') || destLower.includes('shimla') || destLower.includes('kullu')) {
    matchedKey = 'manali';
  } else if (destLower.includes('kerala') || destLower.includes('alleppey') || destLower.includes('munnar') || destLower.includes('kochi')) {
    matchedKey = 'kerala';
  } else if (destLower.includes('goa')) {
    matchedKey = 'goa';
  } else if (destLower.includes('varanasi') || destLower.includes('kashi') || destLower.includes('banaras')) {
    matchedKey = 'varanasi';
  } else if (destLower.includes('ladakh') || destLower.includes('leh')) {
    matchedKey = 'ladakh';
  } else if (destLower.includes('udaipur')) {
    matchedKey = 'udaipur';
  } else if (destLower.includes('andaman') || destLower.includes('havelock') || destLower.includes('port blair')) {
    matchedKey = 'andaman';
  }

  // Cost splits based on budget and travel style
  const transportPct = travelStyle === 'luxury' ? 0.30 : travelStyle === 'budget' ? 0.22 : 0.25;
  const accomPct = travelStyle === 'luxury' ? 0.42 : travelStyle === 'budget' ? 0.35 : 0.40;
  const foodPct = travelStyle === 'luxury' ? 0.16 : travelStyle === 'budget' ? 0.23 : 0.20;
  const actPct = travelStyle === 'luxury' ? 0.08 : travelStyle === 'budget' ? 0.14 : 0.10;

  // Strict math: ensure transport + accom + food + act + misc = budget
  const transportCost = Math.max(500, Math.round((budget * transportPct) / 100) * 100);
  const accomCost = Math.max(800, Math.round((budget * accomPct) / 100) * 100);
  const foodCost = Math.max(500, Math.round((budget * foodPct) / 100) * 100);
  const actCost = Math.max(400, Math.round((budget * actPct) / 100) * 100);
  const subtotal = transportCost + accomCost + foodCost + actCost;
  const miscCost = Math.max(0, budget - subtotal);
  const totalCalculated = subtotal + miscCost;

  let budgetStatus: 'under' | 'exact' | 'over' = 'exact';
  if (totalCalculated < budget) budgetStatus = 'under';
  else if (totalCalculated > budget) budgetStatus = 'over';

  const costBreakdown: ExpenseBreakdown = {
    transport: transportCost,
    accommodation: accomCost,
    food: foodCost,
    activities: actCost,
    miscellaneous: miscCost,
    totalEstimated: totalCalculated,
    budgetVariance: budget - totalCalculated,
    status: budgetStatus,
    tips: [
      `Transport covers round-trip connectivity from ${startingCity || 'origin'} plus local sightseeing cabs/autos.`,
      `Accommodation budget accommodates ${travelers} traveler${travelers > 1 ? 's' : ''} across ${days - 1 > 0 ? days - 1 : 1} night(s) in a ${travelStyle} stay.`,
      `Food estimate covers 3 meals daily, bottled water, snacks, and street food tastings.`,
      `Book monument entry tickets online (ASI portal) where available to skip queues and get nominal discounts.`
    ]
  };

  // Build daily plans
  const dailyPlans: DayPlan[] = [];
  const baseDate = new Date(departureDate || Date.now());

  // Use matched database or fall back to a rich general template
  const isKnownDestination = matchedKey in DESTINATION_DATABASE;
  const destData = isKnownDestination 
    ? DESTINATION_DATABASE[matchedKey] 
    : {
        weather: `Pleasant daytime conditions (22°C - 28°C) expected in ${destination}.`,
        bestTime: `October through March offers optimal sightseeing conditions.`,
        delicacies: [
          `Authentic regional specialty thali of ${destination}`,
          `Locally famous street snacks and spiced masala chai`,
          `Traditional sweets from renowned heritage sweetshops`,
          `Regional breakfast delicacies and seasonal fresh fruits`
        ],
        essentials: [
          `Government-issued photo ID (Aadhaar / Passport) for hotel check-ins`,
          `Comfortable walking shoes with cushioned soles for sightseeing`,
          `Universal power bank and charging cables`,
          `Small currency notes and UPI payment app for street markets`,
          `Light layer or jacket for breezy evenings`
        ],
        attractions: []
      };

  const numAttractions = destData.attractions.length;

  for (let i = 1; i <= days; i++) {
    const curDate = new Date(baseDate);
    curDate.setDate(baseDate.getDate() + (i - 1));
    const formattedDate = curDate.toLocaleDateString('en-IN', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });

    const actDailyBudget = Math.round(actCost / days / 3);

    let dayTheme: string;
    let morningAct: Activity;
    let afternoonAct: Activity;
    let eveningAct: Activity;
    let staySuggestion: string;
    let dayTip: string;

    // Group-aware stay suggestion
    const groupStay = travelers === 1
      ? `Social backpacker boutique hostel or single room in ${destination}`
      : travelers === 2
        ? `Romantic heritage haveli or boutique hotel in ${destination}`
        : `Family/group suite with interconnected rooms in ${destination}`;

    if (isKnownDestination && numAttractions > 0) {
      const templateIndex = (i - 1) % numAttractions;
      const template = destData.attractions[templateIndex];

      dayTheme = template.theme;
      staySuggestion = template.stay || groupStay;
      dayTip = template.dayTip;

      // Personalize descriptions if specific interests were selected
      let morningDesc = template.morning.desc;
      let afternoonDesc = template.afternoon.desc;
      let eveningDesc = template.evening.desc;

      if (interests.includes('Photography')) {
        morningDesc += ' Excellent soft morning light for wide-angle landscape and architectural shots.';
      }
      if (interests.includes('Foodie & Culinary')) {
        afternoonDesc += ' Sample renowned regional street delicacies and fresh spiced chai nearby.';
      }
      if (interests.includes('Adventure & Trekking')) {
        eveningDesc += ' Great opportunity for an invigorating viewpoint hike before dusk.';
      }

      morningAct = {
        id: `act-${i}-morning`,
        title: template.morning.title,
        time: '08:30 AM – 11:30 AM',
        duration: 'Approx. 3 hours',
        description: morningDesc,
        location: template.morning.loc,
        estimatedCost: Math.max(100, Math.round(actDailyBudget * 0.9)),
        completed: false,
        category: template.morning.category,
        insiderTip: template.morning.tip
      };

      afternoonAct = {
        id: `act-${i}-afternoon`,
        title: template.afternoon.title,
        time: '12:30 PM – 03:30 PM',
        duration: 'Approx. 2.5 hours',
        description: afternoonDesc,
        location: template.afternoon.loc,
        estimatedCost: Math.max(150, Math.round(actDailyBudget * 1.1)),
        completed: false,
        category: template.afternoon.category,
        insiderTip: template.afternoon.tip
      };

      eveningAct = {
        id: `act-${i}-evening`,
        title: template.evening.title,
        time: '05:00 PM – 08:30 PM',
        duration: 'Approx. 3.5 hours',
        description: eveningDesc,
        location: template.evening.loc,
        estimatedCost: Math.max(100, Math.round(actDailyBudget * 1.0)),
        completed: false,
        category: template.evening.category,
        insiderTip: template.evening.tip
      };
    } else {
      // Dynamic tailored itinerary for any custom destination
      const primaryInterest = interests[0] || 'Culture & Heritage';
      const secondaryInterest = interests[1] || 'Foodie & Culinary';

      const themes = [
        `Arrival, Historic Heart & Cultural Landmarks of ${destination}`,
        `Architectural Heritage & Vibrant Artisan Bazaars`,
        `Scenic Viewpoints, Nature Walks & Panoramic Sunsets`,
        `Culinary Trails, Local Museums & Performing Arts`,
        `Hidden Gems, Spiritual Sanctuaries & Riverside Leisure`,
        `Artisan Crafts Workshop & Farewell Sunset Feast`
      ];
      dayTheme = themes[(i - 1) % themes.length];
      staySuggestion = groupStay;
      dayTip = `Start sightseeing before 10 AM to avoid midday heat and capture softer daylight in ${destination}.`;

      morningAct = {
        id: `act-${i}-morning`,
        title: `Morning ${primaryInterest} Discovery in ${destination}`,
        time: '08:30 AM – 11:30 AM',
        duration: 'Approx. 3 hours',
        description: `Explore prominent historic monuments and cultural heritage sites in ${destination} focusing on ${primaryInterest.toLowerCase()}.`,
        location: `${destination} Historic District`,
        estimatedCost: Math.max(150, Math.round(actDailyBudget * 0.9)),
        completed: false,
        category: 'sightseeing',
        insiderTip: `Wear comfortable slip-on footwear and carry bottled water.`
      };

      afternoonAct = {
        id: `act-${i}-afternoon`,
        title: `Authentic Regional Lunch & ${secondaryInterest} Exploration`,
        time: '12:30 PM – 03:30 PM',
        duration: 'Approx. 2.5 hours',
        description: `Enjoy authentic regional dishes at a popular family-run restaurant followed by exploring local markets tailored to ${secondaryInterest.toLowerCase()}.`,
        location: `${destination} Central Bazaar`,
        estimatedCost: Math.max(200, Math.round(actDailyBudget * 1.1)),
        completed: false,
        category: 'dining',
        insiderTip: `Look for handmade artisan cooperatives and family-run food outlets.`
      };

      eveningAct = {
        id: `act-${i}-evening`,
        title: `Scenic Sunset Viewpoint & Evening Cultural Walk`,
        time: '05:00 PM – 08:30 PM',
        duration: 'Approx. 3.5 hours',
        description: `Witness sunset vistas from a popular panoramic viewpoint, followed by a relaxed dinner with acoustic music.`,
        location: `${destination} Viewpoint Promenade`,
        estimatedCost: Math.max(150, Math.round(actDailyBudget * 1.0)),
        completed: false,
        category: 'relaxation',
        insiderTip: `Pre-book return transportation before nightfall.`
      };
    }

    dailyPlans.push({
      dayNumber: i,
      date: formattedDate,
      theme: dayTheme,
      staySuggestion: staySuggestion,
      dayTip: dayTip,
      morning: morningAct,
      afternoon: afternoonAct,
      evening: eveningAct
    });
  }

  return {
    id: `trip-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    title: `${days}-Day Curated ${interests.slice(0, 2).join(' & ') || 'Exploration'} in ${destination}`,
    summary: `A personalized ${travelPace.toLowerCase()} ${travelStyle} travel plan from ${startingCity || 'your city'} to ${destination} tailored for ${travelers} traveler${travelers > 1 ? 's' : ''} with a budget of ₹${budget.toLocaleString('en-IN')}.`,
    destination,
    startingCity: startingCity || 'Your City',
    departureDate: departureDate || new Date().toISOString().split('T')[0],
    days,
    budget,
    travelers,
    interests: interests.length > 0 ? interests : ['Culture & Heritage', 'Foodie & Culinary'],
    travelPace,
    travelStyle,
    dailyPlans,
    costBreakdown,
    weatherForecast: destData.weather,
    bestTimeToVisit: destData.bestTime,
    travelEssentials: destData.essentials,
    localDelicacies: destData.delicacies,
    generatedBy: 'heuristic-engine',
    createdAt: new Date().toISOString()
  };
}
