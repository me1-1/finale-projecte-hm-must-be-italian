const DEFAULT_MAX_SLOTS = 12;
const DEFAULT_SIM_MAX_ITEMS = 8;

const familySizes = [
  { count: 1, label: "1 person", penalty: 0 },
  { count: 2, label: "2 people", penalty: 3 },
  { count: 3, label: "3 people", penalty: 6 },
  { count: 4, label: "4 people", penalty: 9 },
  { count: 5, label: "5 people", penalty: 12 },
];

const weatherConditions = [
  {
    id: "clear",
    name: "Clear weather",
    description: "The weather stayed calm after the first danger.",
    bonusItems: [],
    penaltyMissing: 0,
  },
  {
    id: "heavyRain",
    name: "Heavy rain",
    description: "Heavy rain made dry supplies and rain gear more important.",
    bonusItems: ["rainPoncho", "waterproofBag", "radio"],
    penaltyMissing: 4,
  },
  {
    id: "coldNight",
    name: "Cold night",
    description: "Temperatures dropped overnight, so warmth mattered more.",
    bonusItems: ["blanket", "warmClothes", "handWarmers"],
    penaltyMissing: 5,
  },
  {
    id: "extremeHeat",
    name: "Extreme heat",
    description: "Extreme heat made water and hygiene supplies more important.",
    bonusItems: ["water", "hygieneWipes"],
    penaltyMissing: 5,
  },
  {
    id: "smokyAir",
    name: "Smoky air",
    description: "Smoke in the air made breathing protection more important.",
    bonusItems: ["dustMask", "radio"],
    penaltyMissing: 5,
  },
];

const complications = [
  {
    id: "powerOut3",
    name: "Power is out for 3 days",
    description: "Power is out for 3 days, so light, batteries, radio, and backup phone power matter more.",
    bonusItems: ["flashlight", "batteries", "radio", "phoneCharger"],
    penaltyMissing: 6,
  },
  {
    id: "roadsClosed",
    name: "Roads are closed",
    description: "Roads are closed, so food, water, and alerts matter more while you wait.",
    bonusItems: ["water", "cannedFood", "radio"],
    penaltyMissing: 5,
  },
  {
    id: "cellServiceDown",
    name: "Cell service is down",
    description: "Cell service is down, making a radio and whistle more useful.",
    bonusItems: ["radio", "whistle"],
    penaltyMissing: 5,
  },
  {
    id: "minorInjury",
    name: "Someone gets hurt",
    description: "Someone gets hurt during the event, so first aid matters more.",
    bonusItems: ["firstAid"],
    penaltyMissing: 7,
  },
  {
    id: "waterUnsafe",
    name: "Tap water is unsafe",
    description: "Tap water is unsafe, so packed clean water becomes more important.",
    bonusItems: ["water"],
    penaltyMissing: 7,
  },
];

const aftermathEvents = [
  {
    id: "afterPowerOut",
    name: "Aftermath: power is out",
    description: "After the disaster, the power is still out and the house is dark.",
    bonusItems: ["flashlight", "batteries", "radio", "phoneCharger"],
    penaltyMissing: 7,
  },
  {
    id: "trappedInside",
    name: "Aftermath: trapped inside",
    description: "After the disaster, debris blocks the exit and you need to signal for help.",
    bonusItems: ["whistle", "radio", "flashlight", "workGloves"],
    penaltyMissing: 8,
  },
  {
    id: "brokenArm",
    name: "Aftermath: broken arm",
    description: "After the disaster, someone has a broken arm and needs care while waiting for help.",
    bonusItems: ["firstAid", "blanket", "radio", "phoneCharger"],
    penaltyMissing: 8,
  },
  {
    id: "gasSmell",
    name: "Aftermath: gas smell",
    description: "After the disaster, you smell gas and need to act carefully.",
    bonusItems: ["wrench", "radio", "flashlight"],
    penaltyMissing: 7,
  },
  {
    id: "reunionDelay",
    name: "Aftermath: family separated",
    description: "After the disaster, family members are separated and communication matters more.",
    bonusItems: ["radio", "phoneCharger", "documents", "cash"],
    penaltyMissing: 6,
  },
  {
    id: "shelterOvernight",
    name: "Aftermath: overnight shelter",
    description: "After the disaster, you need to stay somewhere safe overnight.",
    bonusItems: ["blanket", "water", "cannedFood", "hygieneWipes"],
    penaltyMissing: 6,
  },
];

const scenarios = [
  {
    id: "earthquake",
    name: "Earthquake",
    badge: "Shaking ground",
    lesson:
      "Earthquakes can damage utilities, break glass, and knock out power. A strong kit covers water, first aid, light, updates, and signaling.",
    learnList: ["Protect yourself from injuries and debris.", "Plan for power and water outages.", "Pack ways to hear alerts and signal for help."],
    needs: {
      water: 12,
      firstAid: 12,
      flashlight: 10,
      batteries: 8,
      radio: 8,
      whistle: 7,
      dustMask: 6,
      workGloves: 5,
      wrench: 5,
      cannedFood: 4,
      blanket: 4,
      phoneCharger: 3,
    },
    feedback: {
      water: "You stayed hydrated while water lines were being checked.",
      firstAid: "You treated cuts from broken glass with your first aid kit.",
      flashlight: "Your flashlight helped during the power outage.",
      batteries: "Extra batteries kept your lights and radio working.",
      radio: "The radio gave you evacuation and safety updates.",
      whistle: "Your whistle helped rescuers locate you.",
      dustMask: "Your dust mask made it safer to move near debris.",
      workGloves: "Work gloves protected your hands while clearing small hazards.",
      wrench: "Your wrench helped turn off a damaged utility line.",
      cannedFood: "Canned food kept you fed while stores were closed.",
      blanket: "Your blanket kept you warm overnight.",
      phoneCharger: "Your power bank kept your phone usable longer.",
    },
    misses: {
      firstAid: "You could not treat an injury because you forgot a first aid kit.",
      flashlight: "The power went out, and you had no flashlight.",
      radio: "Emergency updates were harder to get without a radio.",
      whistle: "You had no whistle when you needed to signal for help.",
    },
  },
  {
    id: "hurricane",
    name: "Hurricane",
    badge: "High winds",
    lesson:
      "Hurricanes can bring long outages, unsafe water, and blocked roads. A strong kit focuses on water, shelf-stable food, alerts, and light.",
    learnList: ["Bring supplies that work without electricity.", "Choose food that does not need cooking.", "Keep a radio and batteries for weather updates."],
    needs: {
      water: 12,
      cannedFood: 10,
      radio: 10,
      batteries: 9,
      flashlight: 8,
      firstAid: 8,
      rainPoncho: 7,
      hygieneWipes: 5,
      canOpener: 5,
      documents: 5,
      cash: 4,
      blanket: 3,
    },
    feedback: {
      water: "You had safe drinking water after the storm disrupted service.",
      cannedFood: "Shelf-stable food helped while roads were blocked.",
      radio: "The radio kept you updated when cell service became unreliable.",
      batteries: "Extra batteries kept your emergency gear running.",
      flashlight: "Your flashlight helped after the power failed.",
      firstAid: "Your first aid kit handled minor storm injuries.",
      rainPoncho: "Your poncho kept you dry during heavy rain.",
      hygieneWipes: "Wipes helped you stay clean during the outage.",
      canOpener: "Your can opener made your canned food useful.",
      documents: "Copies of important documents helped with recovery steps.",
      cash: "Cash helped when card readers were down.",
      blanket: "A blanket made the shelter stay more comfortable.",
    },
    misses: {
      water: "You ran short on safe water after the storm.",
      radio: "You missed key weather alerts without a radio.",
      batteries: "Your gear died early because you forgot batteries.",
      canOpener: "Some food was hard to use without a manual can opener.",
    },
  },
  {
    id: "tornado",
    name: "Tornado",
    badge: "Rotating winds",
    lesson:
      "Tornadoes can arrive fast, damage buildings, and scatter debris. A strong kit helps with alerts, head protection, injuries, light, and signaling.",
    learnList: ["Warnings matter because tornadoes can form quickly.", "Head protection and sturdy shoes help after debris falls.", "A whistle, light, and radio help if power and cell service fail."],
    needs: {
      radio: 11,
      firstAid: 10,
      helmet: 9,
      flashlight: 9,
      batteries: 8,
      sturdyShoes: 8,
      whistle: 7,
      water: 6,
      phoneCharger: 5,
      blanket: 5,
      cannedFood: 4,
      documents: 3,
    },
    feedback: {
      radio: "The radio helped you hear tornado warnings and all-clear updates.",
      firstAid: "Your first aid kit helped treat cuts from flying debris.",
      helmet: "Head protection lowered the risk from falling and flying debris.",
      flashlight: "Your flashlight helped after power lines went down.",
      batteries: "Extra batteries kept your radio and light working.",
      sturdyShoes: "Sturdy shoes protected your feet from broken glass and debris.",
      whistle: "Your whistle helped you signal from a damaged area.",
      water: "Water helped after you sheltered in place.",
      phoneCharger: "Your power bank kept your phone ready for alerts.",
      blanket: "A blanket helped protect and comfort you after the storm.",
      cannedFood: "Canned food helped while stores and roads were closed.",
      documents: "Important documents helped during recovery.",
    },
    misses: {
      radio: "You missed tornado updates because you did not pack a radio.",
      firstAid: "Cuts from debris were harder to treat without first aid.",
      helmet: "Falling debris was more dangerous without head protection.",
      sturdyShoes: "Broken glass made walking unsafe without sturdy shoes.",
      whistle: "It was harder to signal for help without a whistle.",
    },
  },
  {
    id: "flood",
    name: "Flood",
    badge: "Rising water",
    lesson:
      "Floods can make water unsafe, soak supplies, and damage important papers. A strong kit keeps essentials dry and easy to carry.",
    learnList: ["Keep clean water separate from floodwater.", "Protect documents and supplies from getting wet.", "Listen for road closures and evacuation updates."],
    needs: {
      water: 10,
      firstAid: 9,
      waterproofBag: 9,
      documents: 8,
      flashlight: 7,
      batteries: 6,
      radio: 6,
      rainPoncho: 6,
      hygieneWipes: 5,
      cannedFood: 5,
      cash: 4,
      rope: 4,
    },
    feedback: {
      water: "Clean water helped because floodwater was unsafe to drink.",
      firstAid: "Your first aid kit handled scrapes from moving debris.",
      waterproofBag: "Your waterproof bag kept supplies dry.",
      documents: "Important documents survived because you packed copies.",
      flashlight: "Your flashlight helped in dark, flooded areas.",
      batteries: "Batteries kept your light and radio alive.",
      radio: "Radio updates helped you avoid dangerous roads.",
      rainPoncho: "Your poncho helped in steady rain.",
      hygieneWipes: "Wipes helped you clean up safely.",
      cannedFood: "Canned food gave you a simple meal when kitchens were unusable.",
      cash: "Cash helped when local systems were down.",
      rope: "Rope helped secure loose gear.",
    },
    misses: {
      waterproofBag: "Several supplies got soaked because you forgot a waterproof bag.",
      documents: "Replacing important papers became harder without document copies.",
      water: "Floodwater was unsafe, and you did not pack enough clean water.",
      radio: "Road closures were harder to track without a radio.",
    },
  },
  {
    id: "winter",
    name: "Winter Storm",
    badge: "Freezing cold",
    lesson:
      "Winter storms can freeze pipes, close roads, and cause blackouts. A strong kit keeps you warm, lit, fed, and connected.",
    learnList: ["Warmth becomes a survival need, not a comfort item.", "Plan for frozen pipes and icy roads.", "Keep backup power for calls and alerts."],
    needs: {
      blanket: 12,
      water: 10,
      cannedFood: 8,
      flashlight: 8,
      batteries: 7,
      firstAid: 7,
      radio: 6,
      handWarmers: 6,
      warmClothes: 6,
      phoneCharger: 5,
      matches: 4,
      cash: 3,
    },
    feedback: {
      blanket: "Your blanket helped you stay warm during the outage.",
      water: "You had drinking water when pipes froze.",
      cannedFood: "Canned food helped while roads were icy.",
      flashlight: "Your flashlight helped during the blackout.",
      batteries: "Extra batteries kept your devices useful.",
      firstAid: "The first aid kit helped with a small cold-weather injury.",
      radio: "The radio gave you road and weather updates.",
      handWarmers: "Hand warmers protected you from bitter cold.",
      warmClothes: "Warm clothes helped prevent dangerous chill.",
      phoneCharger: "Your power bank kept emergency calls possible.",
      matches: "Matches helped start a safe emergency heat source.",
      cash: "Cash helped at a small store during the outage.",
    },
    misses: {
      blanket: "You struggled with the cold because you forgot a blanket.",
      water: "Frozen pipes made water harder to get.",
      handWarmers: "Your hands got dangerously cold without warmers.",
      flashlight: "The blackout was harder without a flashlight.",
    },
  },
  {
    id: "wildfire",
    name: "Wildfire",
    badge: "Smoke nearby",
    lesson:
      "Wildfires can force quick evacuation and create dangerous smoke. A strong kit supports breathing, fast movement, alerts, and recovery.",
    learnList: ["Pack important documents before evacuation.", "Protect your breathing from smoke and ash.", "Keep phone power and alert sources ready."],
    needs: {
      water: 10,
      dustMask: 10,
      documents: 10,
      firstAid: 8,
      radio: 8,
      phoneCharger: 7,
      flashlight: 6,
      batteries: 5,
      cash: 5,
      hygieneWipes: 4,
      blanket: 4,
      map: 3,
    },
    feedback: {
      water: "Water helped you stay hydrated during a fast evacuation.",
      dustMask: "Your mask helped filter smoky air.",
      documents: "Packed documents made evacuation paperwork easier.",
      firstAid: "Your first aid kit helped with smoke-irritated eyes and small scrapes.",
      radio: "The radio gave you evacuation updates.",
      phoneCharger: "Your power bank kept your phone ready for alerts.",
      flashlight: "Your flashlight helped when visibility dropped.",
      batteries: "Batteries kept your emergency gear working.",
      cash: "Cash helped when systems were overloaded.",
      hygieneWipes: "Wipes helped clean ash from your hands and face.",
      blanket: "A blanket helped during the shelter stay.",
      map: "A paper map helped when routes changed.",
    },
    misses: {
      dustMask: "Smoke made breathing harder because you forgot a mask.",
      documents: "You left without copies of important documents.",
      phoneCharger: "Your phone battery became a problem during evacuation.",
      radio: "You missed evacuation updates without a radio.",
    },
  },
];

const items = [
  { id: "water", name: "Water", category: "Essentials", icon: "💧" },
  { id: "cannedFood", name: "Canned Food", category: "Essentials", icon: "🥫" },
  { id: "firstAid", name: "First Aid Kit", category: "Medical", icon: "➕" },
  { id: "flashlight", name: "Flashlight", category: "Tools", icon: "🔦" },
  { id: "batteries", name: "Batteries", category: "Tools", icon: "🔋" },
  { id: "radio", name: "Radio", category: "Communication", icon: "📻" },
  { id: "blanket", name: "Blanket", category: "Shelter", icon: "▦" },
  { id: "whistle", name: "Whistle", category: "Tools", icon: "!" },
  { id: "dustMask", name: "Dust Mask", category: "Medical", icon: "◧" },
  { id: "workGloves", name: "Work Gloves", category: "Tools", icon: "▣" },
  { id: "wrench", name: "Wrench", category: "Tools", icon: "🔧" },
  { id: "phoneCharger", name: "Power Bank", category: "Communication", icon: "▰" },
  { id: "rainPoncho", name: "Rain Poncho", category: "Shelter", icon: "☂" },
  { id: "hygieneWipes", name: "Hygiene Wipes", category: "Medical", icon: "□" },
  { id: "canOpener", name: "Manual Can Opener", category: "Tools", icon: "◒" },
  { id: "documents", name: "Important Documents", category: "Communication", icon: "▤" },
  { id: "cash", name: "Cash", category: "Essentials", icon: "$" },
  { id: "waterproofBag", name: "Waterproof Bag", category: "Shelter", icon: "▢" },
  { id: "rope", name: "Rope", category: "Tools", icon: "⌁" },
  { id: "helmet", name: "Helmet", category: "Shelter", icon: "◓" },
  { id: "sturdyShoes", name: "Sturdy Shoes", category: "Shelter", icon: "▴" },
  { id: "handWarmers", name: "Hand Warmers", category: "Shelter", icon: "☀" },
  { id: "warmClothes", name: "Warm Clothes", category: "Shelter", icon: "◫" },
  { id: "matches", name: "Waterproof Matches", category: "Tools", icon: "∕" },
  { id: "map", name: "Paper Map", category: "Communication", icon: "◇" },
  { id: "tvRemote", name: "TV Remote", category: "Clutter", icon: "▯" },
  { id: "gameController", name: "Video Game Controller", category: "Clutter", icon: "✣" },
  { id: "hairDryer", name: "Hair Dryer", category: "Clutter", icon: "◖" },
  { id: "bowlingBall", name: "Bowling Ball", category: "Clutter", icon: "●" },
  { id: "perfume", name: "Perfume", category: "Clutter", icon: "♢" },
  { id: "laptopStand", name: "Laptop Stand", category: "Clutter", icon: "▱" },
  { id: "poster", name: "Movie Poster", category: "Clutter", icon: "▥" },
  { id: "toyCar", name: "Toy Car", category: "Clutter", icon: "▭" },
  { id: "iceCream", name: "Ice Cream", category: "Clutter", icon: "◌" },
  { id: "glassVase", name: "Glass Vase", category: "Clutter", icon: "♧" },
  { id: "deskLamp", name: "Desk Lamp", category: "Clutter", icon: "◐" },
  { id: "pillow", name: "Decorative Pillow", category: "Clutter", icon: "▧" },
  { id: "trophy", name: "Sports Trophy", category: "Clutter", icon: "♜" },
  { id: "skateboard", name: "Skateboard", category: "Clutter", icon: "▬" },
  { id: "soda", name: "Soda", category: "Clutter", icon: "◍" },
  { id: "sunglasses", name: "Sunglasses", category: "Clutter", icon: "∞" },
  { id: "cookbook", name: "Cookbook", category: "Clutter", icon: "▨" },
];

const categories = ["All", "Essentials", "Medical", "Tools", "Communication", "Shelter", "Clutter"];

const shelterSpots = [
  {
    id: "basement",
    name: "Basement",
    scores: { tornado: 14, hurricane: 4, earthquake: 2, winter: 5, wildfire: -3, flood: -10 },
    good: "A basement gave strong protection from wind and flying debris.",
    bad: "A basement can be dangerous when water or smoke is the main threat.",
  },
  {
    id: "bathtub",
    name: "Bathtub",
    scores: { tornado: 11, hurricane: 5, earthquake: 1, winter: 1, wildfire: -2, flood: -4 },
    good: "A bathtub in an interior bathroom gave you extra protection from debris.",
    bad: "A bathtub did not solve the biggest danger in this scenario.",
  },
  {
    id: "interiorRoom",
    name: "Interior Room",
    scores: { tornado: 10, hurricane: 7, earthquake: 4, winter: 3, wildfire: 1, flood: -1 },
    good: "An interior room kept you away from windows and outside walls.",
    bad: "An interior room helped a little, but this disaster needed a different safety move.",
  },
  {
    id: "sturdyTable",
    name: "Sturdy Table",
    scores: { earthquake: 12, tornado: 4, hurricane: 1, winter: 1, wildfire: -2, flood: -3 },
    good: "Getting under a sturdy table helped protect you from falling objects.",
    bad: "A sturdy table was not the best shelter choice for this disaster.",
  },
  {
    id: "higherGround",
    name: "Higher Ground",
    scores: { flood: 13, wildfire: 4, hurricane: 2, earthquake: 0, tornado: -4, winter: -2 },
    good: "Moving to higher ground helped you stay away from rising water.",
    bad: "Higher ground was not enough protection from this disaster by itself.",
  },
  {
    id: "car",
    name: "Car",
    scores: { wildfire: 5, hurricane: -4, flood: -8, tornado: -9, earthquake: -2, winter: -3 },
    good: "A car helped only because this scenario involved leaving quickly.",
    bad: "A car was a risky shelter choice for this disaster.",
  },
  {
    id: "underBridge",
    name: "Under Bridge",
    scores: { tornado: -10, flood: -10, hurricane: -7, earthquake: -5, winter: -4, wildfire: -3 },
    good: "This spot rarely helps in this game.",
    bad: "Under a bridge was dangerous and did not protect you well.",
  },
  {
    id: "window",
    name: "By Window",
    scores: { tornado: -10, hurricane: -8, earthquake: -7, wildfire: -3, winter: -2, flood: -2 },
    good: "This spot rarely helps in this game.",
    bad: "Being by a window exposed you to glass, debris, or weather.",
  },
];

const roomItems = [
  { itemId: "water", x: "17%", y: "72%", spot: "Kitchen" },
  { itemId: "cannedFood", x: "25%", y: "78%", spot: "Pantry" },
  { itemId: "firstAid", x: "73%", y: "39%", spot: "Cabinet" },
  { itemId: "flashlight", x: "58%", y: "53%", spot: "Table" },
  { itemId: "batteries", x: "66%", y: "55%", spot: "Drawer" },
  { itemId: "radio", x: "43%", y: "46%", spot: "Shelf" },
  { itemId: "blanket", x: "82%", y: "72%", spot: "Couch" },
  { itemId: "helmet", x: "35%", y: "63%", spot: "Closet" },
  { itemId: "sturdyShoes", x: "47%", y: "82%", spot: "Door" },
  { itemId: "dustMask", x: "78%", y: "30%", spot: "Hook" },
  { itemId: "documents", x: "55%", y: "32%", spot: "Desk" },
  { itemId: "phoneCharger", x: "68%", y: "73%", spot: "Outlet" },
  { itemId: "waterproofBag", x: "18%", y: "38%", spot: "Hall" },
  { itemId: "whistle", x: "31%", y: "45%", spot: "Key Bowl" },
  { itemId: "tvRemote", x: "86%", y: "51%", spot: "Couch" },
  { itemId: "hairDryer", x: "12%", y: "51%", spot: "Bathroom" },
  { itemId: "gameController", x: "74%", y: "84%", spot: "Floor" },
  { itemId: "glassVase", x: "51%", y: "19%", spot: "Window" },
];

const groundFloorRooms = [
  { id: "entry", name: "Entry", color: "#d9c8a8", furniture: "entry", items: ["sturdyShoes", "rainPoncho", "whistle", "cash"] },
  { id: "kitchen", name: "Kitchen", color: "#d8e6cf", furniture: "kitchen", items: ["water", "cannedFood", "canOpener", "flashlight"] },
  { id: "livingRoom", name: "Living Room", color: "#e6d4bf", furniture: "living", items: ["radio", "blanket", "phoneCharger", "tvRemote"] },
  { id: "bathroom", name: "Bathroom", color: "#cfe4e3", furniture: "bathroom", items: ["firstAid", "hygieneWipes", "dustMask", "hairDryer"] },
  { id: "bedroom", name: "Bedroom", color: "#ded3e6", furniture: "bedroom", items: ["blanket", "warmClothes", "documents", "pillow"] },
  { id: "garage", name: "Garage", color: "#cbd0cc", furniture: "garage", items: ["workGloves", "wrench", "sturdyShoes", "rope"] },
];

const upperFloorRooms = [
  { id: "bedroom", name: "Bedroom", color: "#ded3e6", furniture: "bedroom", items: ["blanket", "warmClothes", "phoneCharger"] },
  { id: "kidsRoom", name: "Kids Room", color: "#f0d6d7", furniture: "bedroom", items: ["helmet", "toyCar", "gameController", "pillow"] },
  { id: "office", name: "Office", color: "#d6dfc6", furniture: "office", items: ["documents", "map", "phoneCharger", "cash"] },
  { id: "upstairsBathroom", name: "Bathroom", color: "#cfe4e3", furniture: "bathroom", items: ["firstAid", "hygieneWipes", "dustMask"] },
  { id: "familyRoom", name: "Family Room", color: "#e6d4bf", furniture: "living", items: ["radio", "flashlight", "batteries", "blanket"] },
  { id: "linenCloset", name: "Linen Room", color: "#eadfca", furniture: "storage", items: ["blanket", "rainPoncho", "waterproofBag"] },
];

const basementFloorRooms = [
  { id: "basement", name: "Basement", color: "#c8c1b5", furniture: "basement", items: ["radio", "helmet", "blanket", "flashlight"] },
  { id: "utilityRoom", name: "Utility Room", color: "#bcc8c7", furniture: "utility", items: ["wrench", "batteries", "dustMask", "workGloves"] },
  { id: "storageRoom", name: "Storage", color: "#d4c5ad", furniture: "storage", items: ["water", "cannedFood", "rope", "matches"] },
  { id: "laundryRoom", name: "Laundry", color: "#cadbd9", furniture: "laundry", items: ["hygieneWipes", "waterproofBag", "warmClothes"] },
  { id: "workshop", name: "Workshop", color: "#c8c1b5", furniture: "garage", items: ["firstAid", "workGloves", "wrench", "sturdyShoes"] },
  { id: "stormShelter", name: "Storm Shelter", color: "#b8c6b8", furniture: "shelter", items: ["whistle", "radio", "water", "cannedFood"] },
];

const realisticItemSlots = [
  { x: 1, y: 1 },
  { x: 2, y: 1 },
  { x: 1, y: 2 },
  { x: 2, y: 2 },
  { x: 1, y: 0 },
  { x: 2, y: 0 },
  { x: 1, y: 3 },
  { x: 2, y: 3 },
  { x: 0, y: 1 },
  { x: 3, y: 1 },
  { x: 0, y: 2 },
  { x: 3, y: 2 },
];

const realisticSpawnSlots = [
  { x: 1, y: 1 },
  { x: 2, y: 1 },
  { x: 1, y: 2 },
  { x: 2, y: 2 },
];

const realisticTimerRanges = {
  earthquake: [45, 75],
  hurricane: [90, 140],
  tornado: [35, 60],
  flood: [60, 105],
  winter: [90, 140],
  wildfire: [45, 80],
};

let activeScenarioId = scenarios[0].id;
let activeCategory = "All";
let searchTerm = "";
let activeShelterSpotId = "interiorRoom";
let activeMode = "regular";
let activeSimShelterSpotId = "interiorRoom";
let activeRealisticScenarioId = "wildfire";
let regularSetup = createSetup(DEFAULT_MAX_SLOTS);
let simulatorSetup = createSetup(DEFAULT_SIM_MAX_ITEMS);
const packed = new Set();
const simPicked = new Set();
const realisticPicked = new Set();
let houseFloors = [];
let currentFloorId = "ground";
let playerPosition = { x: 1, y: 1 };
let realisticArea = "inside";
let realisticCarryLimit = 6;
let realisticRunOver = false;
let realisticInteraction = null;
let talkedToResponder = false;
let responderText = "Explore first. Help is available outside.";
let realisticHouseDescription = "House";
let realisticTimeLimit = 60;
let realisticTimeRemaining = 60;
let realisticTimerId = null;

const regularMode = document.querySelector("#regularMode");
const simulatorMode = document.querySelector("#simulatorMode");
const realisticMode = document.querySelector("#realisticMode");
const regularModeButton = document.querySelector("#regularModeButton");
const simulatorModeButton = document.querySelector("#simulatorModeButton");
const realisticModeButton = document.querySelector("#realisticModeButton");
const scenarioGrid = document.querySelector("#scenarioGrid");
const realisticScenarioGrid = document.querySelector("#realisticScenarioGrid");
const shelterGrid = document.querySelector("#shelterGrid");
const simShelterGrid = document.querySelector("#simShelterGrid");
const categoryTabs = document.querySelector("#categoryTabs");
const itemGrid = document.querySelector("#itemGrid");
const roomScene = document.querySelector("#roomScene");
const houseGrid = document.querySelector("#houseGrid");
const houseCtx = houseGrid.getContext("2d");
houseCtx.imageSmoothingEnabled = false;
houseCtx.lineCap = "square";
houseCtx.lineJoin = "miter";
const packedItems = document.querySelector("#packedItems");
const simPickedItems = document.querySelector("#simPickedItems");
const realisticPickedItems = document.querySelector("#realisticPickedItems");
const slotCount = document.querySelector("#slotCount");
const slotMeter = document.querySelector("#slotMeter");
const simSlotCount = document.querySelector("#simSlotCount");
const simSlotMeter = document.querySelector("#simSlotMeter");
const familySizeLabel = document.querySelector("#familySizeLabel");
const backpackLimitLabel = document.querySelector("#backpackLimitLabel");
const simFamilySizeLabel = document.querySelector("#simFamilySizeLabel");
const simBagLimitLabel = document.querySelector("#simBagLimitLabel");
const scenarioLabel = document.querySelector("#scenarioLabel");
const simEventLabel = document.querySelector("#simEventLabel");
const searchInput = document.querySelector("#searchInput");
const simulateButton = document.querySelector("#simulateButton");
const simulateRoomButton = document.querySelector("#simulateRoomButton");
const resetButton = document.querySelector("#resetButton");
const resetRoomButton = document.querySelector("#resetRoomButton");
const realisticActionButton = document.querySelector("#realisticActionButton");
const simulateRealisticButton = document.querySelector("#simulateRealisticButton");
const newHouseButton = document.querySelector("#newHouseButton");
const moveUpButton = document.querySelector("#moveUpButton");
const moveLeftButton = document.querySelector("#moveLeftButton");
const moveDownButton = document.querySelector("#moveDownButton");
const moveRightButton = document.querySelector("#moveRightButton");
const randomizeSetupButton = document.querySelector("#randomizeSetupButton");
const randomizeRoomSetupButton = document.querySelector("#randomizeRoomSetupButton");
const realisticObjectiveLabel = document.querySelector("#realisticObjectiveLabel");
const realisticCarryLabel = document.querySelector("#realisticCarryLabel");
const realisticRoomLabel = document.querySelector("#realisticRoomLabel");
const realisticFloorLabel = document.querySelector("#realisticFloorLabel");
const realisticTimerLabel = document.querySelector("#realisticTimerLabel");
const realisticTimerTrack = document.querySelector("#realisticTimerTrack");
const realisticTimerMeter = document.querySelector("#realisticTimerMeter");
const responderMessage = document.querySelector("#responderMessage");
const realisticPrompt = document.querySelector("#realisticPrompt");
const realisticHouseSummary = document.querySelector("#realisticHouseSummary");
const resultsModal = document.querySelector("#resultsModal");
const closeResults = document.querySelector("#closeResults");
const tryAgainButton = document.querySelector("#tryAgainButton");
const nextScenarioButton = document.querySelector("#nextScenarioButton");
const resultTitle = document.querySelector("#resultTitle");
const scoreNumber = document.querySelector("#scoreNumber");
const gradeBadge = document.querySelector("#gradeBadge");
const resultEvent = document.querySelector("#resultEvent");
const conditionList = document.querySelector("#conditionList");
const resultLesson = document.querySelector("#resultLesson");
const resultLessonList = document.querySelector("#resultLessonList");
const feedbackList = document.querySelector("#feedbackList");

function getScenario() {
  return scenarios.find((scenario) => scenario.id === activeScenarioId);
}

function getRealisticScenario() {
  return scenarios.find((scenario) => scenario.id === activeRealisticScenarioId);
}

function getRandomRealisticTime() {
  const [minimum, maximum] = realisticTimerRanges[activeRealisticScenarioId] || [60, 90];
  return minimum + Math.floor(Math.random() * (maximum - minimum + 1));
}

function formatRealisticTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
}

function updateRealisticTimerDisplay() {
  const percentage = realisticTimeLimit > 0 ? (realisticTimeRemaining / realisticTimeLimit) * 100 : 0;
  const urgent = realisticTimeRemaining <= 15 && realisticTimeRemaining > 0;
  realisticTimerLabel.textContent = formatRealisticTime(realisticTimeRemaining);
  realisticTimerMeter.style.width = `${Math.max(0, percentage)}%`;
  realisticTimerTrack.classList.toggle("urgent", urgent);
  realisticTimerLabel.classList.toggle("urgent", urgent);
}

function stopRealisticTimer() {
  if (realisticTimerId !== null) {
    window.clearInterval(realisticTimerId);
    realisticTimerId = null;
  }
}

function prepareRealisticTimer() {
  stopRealisticTimer();
  realisticTimeLimit = getRandomRealisticTime();
  realisticTimeRemaining = realisticTimeLimit;
  updateRealisticTimerDisplay();
}

function startRealisticTimer() {
  if (activeMode !== "realistic" || realisticRunOver || realisticTimeRemaining <= 0 || realisticTimerId !== null) return;
  realisticObjectiveLabel.textContent = "Time running";
  realisticTimerId = window.setInterval(() => {
    realisticTimeRemaining = Math.max(0, realisticTimeRemaining - 1);
    updateRealisticTimerDisplay();

    if (realisticTimeRemaining === 0) {
      stopRealisticTimer();
      simulateRealisticDisaster(true);
    }
  }, 1000);
}

function getPackedItems() {
  return items.filter((item) => packed.has(item.id));
}

function getShelterSpot() {
  return shelterSpots.find((spot) => spot.id === activeShelterSpotId);
}

function getSimShelterSpot() {
  return shelterSpots.find((spot) => spot.id === activeSimShelterSpotId);
}

function getItem(id) {
  return items.find((item) => item.id === id);
}

function randomFrom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function createSetup(maxCapacity) {
  const family = randomFrom(familySizes);
  const capacity = Math.max(5, maxCapacity - Math.floor(Math.random() * 5));
  return { family, capacity };
}

function createSimulationContext() {
  return {
    weather: randomFrom(weatherConditions),
    complication: randomFrom(complications),
    aftermath: randomFrom(aftermathEvents),
  };
}

function countMatches(collection, ids) {
  return ids.filter((id) => collection.has(id)).length;
}

function calculateConditionAdjustment(collection, context, setup) {
  const weatherMatches = countMatches(collection, context.weather.bonusItems);
  const complicationMatches = countMatches(collection, context.complication.bonusItems);
  const aftermathMatches = countMatches(collection, context.aftermath.bonusItems);
  const weatherMissing = context.weather.bonusItems.length > 0 && weatherMatches === 0;
  const complicationMissing = context.complication.bonusItems.length > 0 && complicationMatches === 0;
  const aftermathMissing = context.aftermath.bonusItems.length > 0 && aftermathMatches === 0;
  const familyCoverage = countMatches(collection, ["water", "cannedFood", "blanket", "firstAid", "hygieneWipes"]);
  const familyPenalty = Math.max(0, setup.family.penalty - familyCoverage * 2);

  return {
    score:
      weatherMatches * 3 +
      complicationMatches * 4 -
      (weatherMissing ? context.weather.penaltyMissing : 0) -
      (complicationMissing ? context.complication.penaltyMissing : 0) -
      familyPenalty +
      aftermathMatches * 4 -
      (aftermathMissing ? context.aftermath.penaltyMissing : 0),
    familyPenalty,
    weatherMatches,
    complicationMatches,
    aftermathMatches,
  };
}

function renderScenarios() {
  scenarioGrid.innerHTML = "";

  scenarios.forEach((scenario) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `scenario-button${scenario.id === activeScenarioId ? " active" : ""}`;
    button.textContent = scenario.name;
    button.title = scenario.badge;
    button.addEventListener("click", () => {
      activeScenarioId = scenario.id;
      render();
    });
    scenarioGrid.append(button);
  });
}

function renderRealisticScenarios() {
  realisticScenarioGrid.innerHTML = "";

  scenarios.forEach((scenario) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `scenario-button${scenario.id === activeRealisticScenarioId ? " active" : ""}`;
    button.textContent = scenario.name;
    button.addEventListener("click", () => {
      activeRealisticScenarioId = scenario.id;
      generateHouse();
    });
    realisticScenarioGrid.append(button);
  });
}

function trimSetToCapacity(collection, capacity) {
  while (collection.size > capacity) {
    collection.delete([...collection][collection.size - 1]);
  }
}

function renderSetups() {
  familySizeLabel.textContent = regularSetup.family.label;
  backpackLimitLabel.textContent = `${regularSetup.capacity} slots`;
  simFamilySizeLabel.textContent = simulatorSetup.family.label;
  simBagLimitLabel.textContent = `${simulatorSetup.capacity} items`;
}

function renderShelterSpots() {
  shelterGrid.innerHTML = "";

  shelterSpots.forEach((spot) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `shelter-button${spot.id === activeShelterSpotId ? " active" : ""}`;
    button.textContent = spot.name;
    button.addEventListener("click", () => {
      activeShelterSpotId = spot.id;
      renderShelterSpots();
    });
    shelterGrid.append(button);
  });
}

function renderSimShelterSpots() {
  simShelterGrid.innerHTML = "";

  shelterSpots.forEach((spot) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `shelter-button${spot.id === activeSimShelterSpotId ? " active" : ""}`;
    button.textContent = spot.name;
    button.addEventListener("click", () => {
      activeSimShelterSpotId = spot.id;
      renderSimShelterSpots();
    });
    simShelterGrid.append(button);
  });
}

function renderCategories() {
  categoryTabs.innerHTML = "";

  categories.forEach((category) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `tab-button${category === activeCategory ? " active" : ""}`;
    button.textContent = category;
    button.addEventListener("click", () => {
      activeCategory = category;
      renderItems();
    });
    categoryTabs.append(button);
  });
}

function renderItems() {
  const filtered = items.filter((item) => {
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm);
    return matchesCategory && matchesSearch;
  });

  itemGrid.innerHTML = "";

  filtered.forEach((item) => {
    const selected = packed.has(item.id);
    const full = packed.size >= regularSetup.capacity && !selected;
    const button = document.createElement("button");
    button.type = "button";
    button.className = `item-card${selected ? " selected" : ""}${full ? " disabled" : ""}`;
    button.disabled = full;
    button.setAttribute("aria-pressed", String(selected));
    button.innerHTML = `
      <span class="item-icon" aria-hidden="true">${item.icon}</span>
      <span>
        <span class="item-name">${item.name}</span>
        <span class="item-category">${item.category}</span>
      </span>
    `;
    button.addEventListener("click", () => toggleItem(item.id));
    itemGrid.append(button);
  });
}

function renderPack() {
  const count = packed.size;
  slotCount.textContent = `${count} / ${regularSetup.capacity} slots`;
  slotMeter.style.width = `${(count / regularSetup.capacity) * 100}%`;
  scenarioLabel.textContent = getScenario().name;
  packedItems.innerHTML = "";

  if (count === 0) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = "Your backpack is empty.";
    packedItems.append(empty);
    return;
  }

  getPackedItems().forEach((item) => {
    const chip = document.createElement("div");
    chip.className = "packed-chip";
    chip.innerHTML = `
      <span>${item.icon} ${item.name}</span>
      <button class="remove-chip" type="button" aria-label="Remove ${item.name}">×</button>
    `;
    chip.querySelector("button").addEventListener("click", () => toggleItem(item.id));
    packedItems.append(chip);
  });
}

function renderRoom() {
  roomScene.innerHTML = "";

  roomItems.forEach((roomItem) => {
    const item = getItem(roomItem.itemId);
    const selected = simPicked.has(roomItem.itemId);
    const full = simPicked.size >= simulatorSetup.capacity && !selected;
    const button = document.createElement("button");
    button.type = "button";
    button.className = `room-hotspot${selected ? " selected" : ""}${full ? " disabled" : ""}`;
    button.disabled = full;
    button.style.setProperty("--x", roomItem.x);
    button.style.setProperty("--y", roomItem.y);
    button.setAttribute("aria-pressed", String(selected));
    button.innerHTML = `
      <span class="item-name">${item.icon} ${item.name}</span>
      <span class="item-category">${roomItem.spot}</span>
    `;
    button.addEventListener("click", () => toggleRoomItem(roomItem.itemId));
    roomScene.append(button);
  });
}

function renderSimPack() {
  const count = simPicked.size;
  simSlotCount.textContent = `${count} / ${simulatorSetup.capacity} items`;
  simSlotMeter.style.width = `${(count / simulatorSetup.capacity) * 100}%`;
  simPickedItems.innerHTML = "";

  if (count === 0) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = "You have not picked up anything yet.";
    simPickedItems.append(empty);
    return;
  }

  [...simPicked].forEach((id) => {
    const item = getItem(id);
    const chip = document.createElement("div");
    chip.className = "packed-chip";
    chip.innerHTML = `
      <span>${item.icon} ${item.name}</span>
      <button class="remove-chip" type="button" aria-label="Drop ${item.name}">×</button>
    `;
    chip.querySelector("button").addEventListener("click", () => toggleRoomItem(id));
    simPickedItems.append(chip);
  });
}

function generateHouse() {
  stopRealisticTimer();
  const hasUpperFloor = Math.random() < 0.62;
  const hasBasement = Math.random() < 0.58;
  const usedItems = new Set();

  houseFloors = [createHouseFloor("ground", "Ground Floor", 0, groundFloorRooms)];
  if (hasUpperFloor) houseFloors.push(createHouseFloor("upper", "Second Floor", 1, upperFloorRooms));
  if (hasBasement) houseFloors.push(createHouseFloor("basement", "Basement", -1, basementFloorRooms));

  const groundFloor = getHouseFloor("ground");
  const entryRoom = groundFloor.rooms.find((room) => room.id === "entry");
  addHouseFeature(groundFloor, entryRoom, "frontDoor", "Front Door", "DOOR", 2, 2);

  if (hasUpperFloor) {
    const upperFloor = getHouseFloor("upper");
    const lowerRoom = groundFloor.rooms.find((room) => room.id === "livingRoom");
    const upperRoom = upperFloor.rooms.find((room) => room.id === "familyRoom");
    addHouseFeature(groundFloor, lowerRoom, "stairsUp", "Stairs Up", "UP", 1, 1, "upper", "stairsDown");
    addHouseFeature(upperFloor, upperRoom, "stairsDown", "Stairs Down", "DOWN", 1, 1, "ground", "stairsUp");
  }

  if (hasBasement) {
    const basementFloor = getHouseFloor("basement");
    const lowerRoom = basementFloor.rooms.find((room) => room.id === "basement");
    const groundRoom = groundFloor.rooms.find((room) => room.id === "garage");
    addHouseFeature(groundFloor, groundRoom, "basementDown", "Basement Stairs", "DOWN", 1, 1, "basement", "basementUp");
    addHouseFeature(basementFloor, lowerRoom, "basementUp", "Stairs Up", "UP", 1, 1, "ground", "basementDown");
  }

  houseFloors.forEach((floor) => populateFloorItems(floor, usedItems));
  ensureAllItemsPlaced(usedItems);
  realisticCarryLimit = 6 + Math.floor(Math.random() * 3);
  realisticArea = "inside";
  realisticRunOver = false;
  realisticPicked.clear();
  realisticInteraction = null;
  talkedToResponder = false;
  responderText = "Explore first. Help is available outside.";
  prepareRealisticTimer();

  const stories = hasUpperFloor ? "Two-story house" : "One-story house";
  realisticHouseDescription = `${stories}${hasBasement ? " with a basement" : " without a basement"}`;
  const startFloor = randomFrom(houseFloors);
  const startRoom = randomFrom(startFloor.rooms);
  currentFloorId = startFloor.id;
  playerPosition = getOpenTileInRoom(startRoom, startFloor);
  renderRealisticMode();
  startRealisticTimer();
}

function ensureAllItemsPlaced(usedItems) {
  const remainingItems = shuffle(items.map((item) => item.id).filter((id) => !usedItems.has(id)));
  const roomPool = shuffle(
    houseFloors.flatMap((floor) =>
      floor.rooms.map((room) => ({
        floor,
        room,
      })),
    ),
  );

  remainingItems.forEach((itemId) => {
    for (const entry of roomPool) {
      if (placeHouseItemInRoom(entry.floor, entry.room, itemId)) {
        usedItems.add(itemId);
        return;
      }
    }
  });
}

function createHouseFloor(id, label, level, templates) {
  const floor = { id, label, level, rooms: [], items: [], features: [] };
  shuffle([...templates]).forEach((template, index) => {
    floor.rooms.push({
      ...template,
      instanceId: `${id}-${index}`,
      blockCol: index % 3,
      blockRow: Math.floor(index / 3),
    });
  });
  return floor;
}

function getHouseFloor(id = currentFloorId) {
  return houseFloors.find((floor) => floor.id === id);
}

function addHouseFeature(floor, room, id, name, marker, localX, localY, targetFloor = null, targetFeature = null) {
  floor.features.push({
    id,
    name,
    marker,
    x: room.blockCol * 4 + localX,
    y: room.blockRow * 4 + localY,
    targetFloor,
    targetFeature,
  });
}

function populateFloorItems(floor, usedItems) {
  floor.rooms.forEach((room) => {
    const occupied = new Set(floor.features.map((feature) => `${feature.x},${feature.y}`));
    const positions = shuffle([...realisticItemSlots]);
    const candidates = shuffle([...room.items]).filter((id) => !usedItems.has(id));
    const itemCount = Math.random() < 0.45 ? 3 : Math.random() < 0.8 ? 2 : 1;

    candidates.slice(0, itemCount).forEach((itemId) => {
      placeHouseItemInRoom(floor, room, itemId, positions, occupied);
      usedItems.add(itemId);
    });
  });
}

function getOpenTileInRoom(room, floor) {
  const occupied = [...floor.features, ...floor.items];
  const choices = shuffle([...realisticSpawnSlots]);
  const choice = choices.find((spot) => {
    const x = room.blockCol * 4 + spot.x;
    const y = room.blockRow * 4 + spot.y;
    return !occupied.some((entry) => entry.x === x && entry.y === y);
  }) || choices[0];
  return { x: room.blockCol * 4 + choice.x, y: room.blockRow * 4 + choice.y };
}

function placeHouseItemInRoom(floor, room, itemId, positions = realisticItemSlots, occupied = null) {
  const localOccupied = occupied || new Set(floor.features.map((feature) => `${feature.x},${feature.y}`));
  const chosenSpot = shuffle([...positions]).find((spot) => {
    const x = room.blockCol * 4 + spot.x;
    const y = room.blockRow * 4 + spot.y;
    return !localOccupied.has(`${x},${y}`) && !floor.items.some((entry) => entry.x === x && entry.y === y);
  });

  if (!chosenSpot) return false;

  const x = room.blockCol * 4 + chosenSpot.x;
  const y = room.blockRow * 4 + chosenSpot.y;
  floor.items.push({ itemId, x, y, roomId: room.instanceId });
  localOccupied.add(`${x},${y}`);
  return true;
}

function shuffle(list) {
  for (let index = list.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [list[index], list[swapIndex]] = [list[swapIndex], list[index]];
  }
  return list;
}

function getCurrentHouseRoom() {
  if (realisticArea === "outside") return null;
  return getRoomAtPoint(playerPosition.x, playerPosition.y, getHouseFloor());
}

function getRoomAtPoint(x, y, floor) {
  const blockCol = Math.min(2, Math.max(0, Math.floor(x / 4)));
  const blockRow = Math.min(1, Math.max(0, Math.floor(y / 4)));
  return floor?.rooms.find((room) => room.blockCol === blockCol && room.blockRow === blockRow) || null;
}

function roomRect(room) {
  return {
    x: room.blockCol * 4 * 80,
    y: room.blockRow * 4 * 80,
    width: 320,
    height: 320,
  };
}

function pointToCanvas(point) {
  return {
    x: point.x * 80 + 40,
    y: point.y * 80 + 40,
  };
}

function tileDistance(first, second) {
  return Math.abs(first.x - second.x) + Math.abs(first.y - second.y);
}

function canMoveInside(nextX, nextY) {
  if (nextX < 0 || nextX > 11 || nextY < 0 || nextY > 7) return false;
  const floor = getHouseFloor();
  const fromRoom = getRoomAtPoint(playerPosition.x, playerPosition.y, floor);
  const toRoom = getRoomAtPoint(nextX, nextY, floor);
  if (!fromRoom || !toRoom) return false;
  if (fromRoom.instanceId === toRoom.instanceId) return true;

  if (fromRoom.blockRow === toRoom.blockRow) {
    return nextY % 4 === 1 || nextY % 4 === 2;
  }

  if (fromRoom.blockCol === toRoom.blockCol) {
    return nextX % 4 === 1 || nextX % 4 === 2;
  }

  return false;
}

function renderRealisticMode() {
  const currentRoom = getCurrentHouseRoom();
  const floor = getHouseFloor();
  realisticObjectiveLabel.textContent = realisticRunOver
    ? "Simulation complete"
    : realisticTimerId !== null
      ? "Time running"
      : realisticArea === "outside"
        ? "Exploring outside"
        : "Ready";
  realisticCarryLabel.textContent = `${realisticPicked.size} / ${realisticCarryLimit} items`;
  realisticRoomLabel.textContent = realisticArea === "outside" ? "Outside" : currentRoom?.name || "Unknown";
  realisticFloorLabel.textContent = realisticArea === "outside" ? "Front yard" : floor?.label || "Ground Floor";
  responderMessage.textContent = responderText;
  realisticHouseSummary.textContent = `${realisticHouseDescription}. Explore, collect supplies, and start the event wherever you choose.`;
  updateRealisticTimerDisplay();
  renderRealisticScenarios();
  renderHouseGrid();
  renderRealisticPack();
  updateRealisticAction();
}

function renderHouseGrid() {
  houseCtx.clearRect(0, 0, houseGrid.width, houseGrid.height);

  if (realisticArea === "outside") {
    drawOutsideScene();
    drawPlayer();
    return;
  }

  houseCtx.fillStyle = "#141b18";
  houseCtx.fillRect(0, 0, houseGrid.width, houseGrid.height);
  const floor = getHouseFloor();
  floor.rooms.forEach((room) => drawHouseRoom(room));
  drawHouseDoors();
  floor.items.forEach((entry) => drawHouseItem(entry));
  floor.features.forEach((feature) => drawHouseFeature(feature));
  drawPlayer();
}

function drawHouseRoom(room) {
  const rect = roomRect(room);
  const currentRoom = getCurrentHouseRoom();
  const isCurrent = currentRoom?.instanceId === room.instanceId;

  drawHouseFloorPattern(room, rect, isCurrent);
  drawRoomFurniture(room, rect);

  if (isCurrent) {
    houseCtx.fillStyle = "rgba(245, 219, 121, 0.12)";
    houseCtx.fillRect(rect.x + 8, rect.y + 8, rect.width - 16, rect.height - 16);
    houseCtx.strokeStyle = "#f5db79";
    houseCtx.lineWidth = 4;
    houseCtx.strokeRect(rect.x + 8, rect.y + 8, rect.width - 16, rect.height - 16);
  }
}

function drawHouseFloorPattern(room, rect, isCurrent) {
  houseCtx.fillStyle = room.color;
  houseCtx.fillRect(rect.x + 4, rect.y + 4, rect.width - 8, rect.height - 8);

  const lightTint = isCurrent ? "rgba(255, 255, 255, 0.10)" : "rgba(255, 255, 255, 0.06)";
  const darkTint = isCurrent ? "rgba(0, 0, 0, 0.08)" : "rgba(0, 0, 0, 0.12)";

  for (let y = rect.y + 10; y < rect.y + rect.height - 10; y += 20) {
    for (let x = rect.x + 10; x < rect.x + rect.width - 10; x += 20) {
      const useLight = ((x / 20 + y / 20 + room.blockCol + room.blockRow) % 2) === 0;
      houseCtx.fillStyle = useLight ? lightTint : darkTint;
      houseCtx.fillRect(x, y, 10, 10);
      houseCtx.fillStyle = useLight ? "rgba(255, 255, 255, 0.03)" : "rgba(0, 0, 0, 0.03)";
      houseCtx.fillRect(x + 10, y + 10, 10, 10);
    }
  }

  houseCtx.fillStyle = "rgba(255, 255, 255, 0.03)";
  houseCtx.fillRect(rect.x + 6, rect.y + 6, rect.width - 12, 8);
  houseCtx.fillStyle = "rgba(0, 0, 0, 0.08)";
  houseCtx.fillRect(rect.x + 6, rect.y + rect.height - 14, rect.width - 12, 8);

  houseCtx.strokeStyle = "#0f1512";
  houseCtx.lineWidth = 6;
  houseCtx.strokeRect(rect.x + 5, rect.y + 5, rect.width - 10, rect.height - 10);
}

function drawRoomFurniture(room, rect) {
  houseCtx.lineWidth = 3;
  houseCtx.strokeStyle = "rgba(30, 38, 34, 0.78)";

  if (room.furniture === "bedroom") {
    houseCtx.fillStyle = "#f2eee5";
    roundRect(houseCtx, rect.x + 178, rect.y + 175, 116, 106, 8, true, true);
    houseCtx.fillStyle = "#9cb9af";
    houseCtx.fillRect(rect.x + 188, rect.y + 185, 96, 28);
    houseCtx.fillStyle = "#6e877b";
    houseCtx.fillRect(rect.x + 188, rect.y + 213, 96, 12);
    houseCtx.fillStyle = "#b38363";
    houseCtx.fillRect(rect.x + 72, rect.y + 176, 28, 84);
  } else if (room.furniture === "kitchen") {
    houseCtx.fillStyle = "#eef0e7";
    houseCtx.fillRect(rect.x + 215, rect.y + 55, 72, 205);
    houseCtx.fillStyle = "#657f70";
    houseCtx.fillRect(rect.x + 227, rect.y + 75, 48, 56);
    houseCtx.fillStyle = "#c7d7cc";
    houseCtx.fillRect(rect.x + 227, rect.y + 135, 48, 18);
    houseCtx.fillStyle = "#aa815d";
    roundRect(houseCtx, rect.x + 72, rect.y + 205, 98, 55, 5, true, true);
    houseCtx.fillStyle = "#6a5343";
    houseCtx.fillRect(rect.x + 80, rect.y + 212, 82, 10);
  } else if (room.furniture === "bathroom") {
    houseCtx.fillStyle = "#f4fbfa";
    roundRect(houseCtx, rect.x + 166, rect.y + 188, 130, 82, 20, true, true);
    houseCtx.fillStyle = "#7eaab0";
    houseCtx.font = "700 12px ui-monospace, monospace";
    houseCtx.fillText("BATHTUB", rect.x + 198, rect.y + 236);
    houseCtx.fillStyle = "#f5f3ec";
    roundRect(houseCtx, rect.x + 70, rect.y + 210, 54, 66, 18, true, true);
  } else if (room.furniture === "living") {
    houseCtx.fillStyle = "#7f6758";
    roundRect(houseCtx, rect.x + 160, rect.y + 205, 136, 70, 9, true, true);
    houseCtx.fillStyle = "#b4855f";
    roundRect(houseCtx, rect.x + 62, rect.y + 211, 68, 48, 5, true, true);
    houseCtx.fillStyle = "#dcd3c6";
    houseCtx.fillRect(rect.x + 122, rect.y + 184, 28, 20);
  } else if (room.furniture === "office") {
    houseCtx.fillStyle = "#8a6b4f";
    houseCtx.fillRect(rect.x + 160, rect.y + 206, 138, 54);
    houseCtx.fillStyle = "#4b5f62";
    houseCtx.fillRect(rect.x + 208, rect.y + 168, 50, 38);
    houseCtx.fillStyle = "#d8e2de";
    houseCtx.fillRect(rect.x + 215, rect.y + 175, 36, 18);
  } else if (room.furniture === "garage") {
    houseCtx.fillStyle = "#7d8984";
    houseCtx.fillRect(rect.x + 197, rect.y + 69, 87, 184);
    houseCtx.fillStyle = "#c85e4f";
    houseCtx.fillRect(rect.x + 214, rect.y + 89, 53, 38);
    houseCtx.fillStyle = "#e8e2d5";
    houseCtx.fillRect(rect.x + 205, rect.y + 160, 70, 18);
  } else if (room.furniture === "utility" || room.furniture === "laundry") {
    houseCtx.fillStyle = "#edf0ed";
    roundRect(houseCtx, rect.x + 196, rect.y + 179, 92, 102, 6, true, true);
    houseCtx.fillStyle = "#7a999f";
    houseCtx.beginPath();
    houseCtx.arc(rect.x + 242, rect.y + 230, 25, 0, Math.PI * 2);
    houseCtx.fill();
    houseCtx.fillStyle = "#d4dfdd";
    houseCtx.fillRect(rect.x + 205, rect.y + 190, 24, 22);
    houseCtx.fillRect(rect.x + 252, rect.y + 190, 24, 22);
  } else if (room.furniture === "storage" || room.furniture === "basement" || room.furniture === "shelter") {
    houseCtx.fillStyle = "#9b744c";
    houseCtx.fillRect(rect.x + 196, rect.y + 196, 82, 69);
    houseCtx.fillRect(rect.x + 97, rect.y + 224, 70, 45);
    houseCtx.strokeStyle = "#654b34";
    houseCtx.strokeRect(rect.x + 196, rect.y + 196, 82, 69);
    houseCtx.strokeRect(rect.x + 97, rect.y + 224, 70, 45);
    houseCtx.fillStyle = "#d8d0b7";
    houseCtx.fillRect(rect.x + 112, rect.y + 230, 38, 12);
    houseCtx.fillStyle = "#7e8f8c";
    houseCtx.fillRect(rect.x + 205, rect.y + 205, 40, 12);
  } else {
    houseCtx.fillStyle = "#8a6b4f";
    roundRect(houseCtx, rect.x + 195, rect.y + 210, 88, 48, 5, true, true);
  }
}

function drawHouseItem(entry) {
  const item = getItem(entry.itemId);
  if (!item) return;
  const point = pointToCanvas(entry);
  houseCtx.fillStyle = "rgba(0, 0, 0, 0.28)";
  houseCtx.beginPath();
  houseCtx.ellipse(point.x + 3, point.y + 18, 20, 7, 0, 0, Math.PI * 2);
  houseCtx.fill();
  houseCtx.fillStyle = "#fff7d8";
  houseCtx.strokeStyle = "#0f1512";
  houseCtx.lineWidth = 3;
  roundRect(houseCtx, point.x - 19, point.y - 21, 38, 38, 4, true, true);
  houseCtx.fillStyle = "#21483a";
  houseCtx.fillRect(point.x - 14, point.y - 16, 28, 28);
  houseCtx.fillStyle = "#fff";
  houseCtx.font = "22px ui-monospace, monospace";
  houseCtx.fillText(item.icon, point.x - 11, point.y + 6);
  houseCtx.fillStyle = "rgba(15, 21, 18, 0.92)";
  roundRect(houseCtx, point.x - 36, point.y + 22, 72, 18, 3, true, false);
  houseCtx.fillStyle = "#f9f2db";
  houseCtx.font = "700 9px ui-monospace, monospace";
  houseCtx.textAlign = "center";
  houseCtx.fillText(item.name.slice(0, 12), point.x, point.y + 35);
  houseCtx.textAlign = "left";
}

function drawHouseFeature(feature) {
  const point = pointToCanvas(feature);
  const isDoor = feature.id === "frontDoor";
  houseCtx.fillStyle = "rgba(0, 0, 0, 0.3)";
  houseCtx.beginPath();
  houseCtx.ellipse(point.x + 2, point.y + 20, 22, 7, 0, 0, Math.PI * 2);
  houseCtx.fill();
  houseCtx.fillStyle = isDoor ? "#8e5532" : "#46677d";
  houseCtx.strokeStyle = "#f6ebcf";
  houseCtx.lineWidth = 4;
  roundRect(houseCtx, point.x - 24, point.y - 27, 48, 54, 4, true, true);
  houseCtx.fillStyle = isDoor ? "#c7874b" : "#b7d2d8";
  houseCtx.fillRect(point.x - 17, point.y - 18, 34, 34);
  if (isDoor) {
    houseCtx.fillStyle = "#4d2d1d";
    houseCtx.fillRect(point.x - 8, point.y - 18, 16, 34);
    houseCtx.fillStyle = "#f7e5ad";
    houseCtx.fillRect(point.x + 5, point.y - 1, 4, 4);
  }
  houseCtx.fillStyle = "#fff";
  houseCtx.font = "800 10px ui-monospace, monospace";
  houseCtx.textAlign = "center";
  houseCtx.fillText(feature.marker, point.x, point.y + 5);
  houseCtx.textAlign = "left";
}

function drawOutsideScene() {
  houseCtx.fillStyle = "#82b974";
  houseCtx.fillRect(0, 0, houseGrid.width, houseGrid.height);

  houseCtx.fillStyle = "rgba(255, 255, 255, 0.07)";
  for (let y = 0; y < houseGrid.height; y += 18) {
    houseCtx.fillRect(0, y, houseGrid.width, 2);
  }

  houseCtx.fillStyle = "#626b67";
  houseCtx.fillRect(0, 490, houseGrid.width, 150);
  houseCtx.strokeStyle = "#f4e9a8";
  houseCtx.lineWidth = 6;
  houseCtx.setLineDash([34, 24]);
  houseCtx.beginPath();
  houseCtx.moveTo(0, 566);
  houseCtx.lineTo(houseGrid.width, 566);
  houseCtx.stroke();
  houseCtx.setLineDash([]);

  houseCtx.fillStyle = "#efe2c8";
  houseCtx.strokeStyle = "#3f5148";
  houseCtx.lineWidth = 6;
  roundRect(houseCtx, 34, 76, 275, 335, 7, true, true);
  houseCtx.fillStyle = "#9d503e";
  houseCtx.beginPath();
  houseCtx.moveTo(18, 94);
  houseCtx.lineTo(172, 20);
  houseCtx.lineTo(325, 94);
  houseCtx.closePath();
  houseCtx.fill();
  houseCtx.stroke();
  houseCtx.fillStyle = "#8a552f";
  houseCtx.fillRect(154, 350, 66, 65);
  houseCtx.fillStyle = "#cce7e8";
  houseCtx.fillRect(70, 150, 67, 62);
  houseCtx.fillRect(220, 150, 55, 62);
  houseCtx.fillStyle = "#f7f1df";
  houseCtx.font = "800 15px ui-monospace, monospace";
  houseCtx.fillText("ENTER HOUSE", 130, 447);

  houseCtx.fillStyle = "#d9e2e1";
  houseCtx.strokeStyle = "#3d4e50";
  houseCtx.lineWidth = 5;
  roundRect(houseCtx, 662, 96, 245, 126, 14, true, true);
  houseCtx.fillStyle = "#bb4138";
  houseCtx.fillRect(680, 115, 205, 52);
  houseCtx.fillStyle = "#eaf6f7";
  houseCtx.fillRect(703, 124, 72, 34);
  houseCtx.fillRect(790, 124, 72, 34);
  houseCtx.fillStyle = "#313d3b";
  houseCtx.beginPath();
  houseCtx.arc(718, 220, 24, 0, Math.PI * 2);
  houseCtx.arc(850, 220, 24, 0, Math.PI * 2);
  houseCtx.fill();

  const responderPoint = pointToCanvas({ x: 9, y: 2 });
  houseCtx.fillStyle = "#1d5b81";
  houseCtx.fillRect(responderPoint.x - 18, responderPoint.y - 2, 36, 47);
  houseCtx.fillStyle = "#e2b792";
  houseCtx.beginPath();
  houseCtx.arc(responderPoint.x, responderPoint.y - 16, 17, 0, Math.PI * 2);
  houseCtx.fill();
  houseCtx.fillStyle = "#fff";
  houseCtx.font = "800 12px ui-monospace, monospace";
  houseCtx.textAlign = "center";
  houseCtx.fillText("FIRST RESPONDER", responderPoint.x, responderPoint.y + 66);
  houseCtx.textAlign = "left";

  houseCtx.fillStyle = "rgba(24, 32, 28, 0.82)";
  roundRect(houseCtx, 16, 14, 125, 34, 4, true, false);
  houseCtx.fillStyle = "#fff";
  houseCtx.font = "800 15px ui-monospace, monospace";
  houseCtx.fillText("FRONT YARD", 29, 36);
}

function drawHouseDoors() {
  houseCtx.fillStyle = "#0f1512";
  houseCtx.fillRect(0, 0, houseGrid.width, 6);
  houseCtx.fillRect(0, houseGrid.height - 6, houseGrid.width, 6);
  houseCtx.fillRect(0, 0, 6, houseGrid.height);
  houseCtx.fillRect(houseGrid.width - 6, 0, 6, houseGrid.height);

  houseCtx.fillStyle = "#27342f";

  [320, 640].forEach((x) => {
    [0, 320].forEach((roomTop) => {
      houseCtx.fillRect(x - 7, roomTop, 14, 76);
      houseCtx.fillRect(x - 7, roomTop + 244, 14, 76);
      houseCtx.fillStyle = "#5f4635";
      roundRect(houseCtx, x - 12, roomTop + 108, 24, 104, 4, true, true);
      houseCtx.fillStyle = "#27342f";
      houseCtx.fillRect(x - 6, roomTop + 116, 12, 88);
      houseCtx.fillStyle = "#a98a65";
      houseCtx.fillRect(x - 9, roomTop + 110, 18, 4);
      houseCtx.fillRect(x - 9, roomTop + 218, 18, 4);
      houseCtx.fillStyle = "#27342f";
    });
  });

  [0, 320, 640].forEach((roomLeft) => {
    houseCtx.fillRect(roomLeft, 320 - 7, 76, 14);
    houseCtx.fillRect(roomLeft + 244, 320 - 7, 76, 14);
    houseCtx.fillStyle = "#5f4635";
    roundRect(houseCtx, roomLeft + 108, 320 - 12, 104, 24, 4, true, true);
    houseCtx.fillStyle = "#27342f";
    houseCtx.fillRect(roomLeft + 116, 320 - 6, 88, 12);
    houseCtx.fillStyle = "#a98a65";
    houseCtx.fillRect(roomLeft + 110, 320 - 9, 4, 18);
    houseCtx.fillRect(roomLeft + 218, 320 - 9, 4, 18);
    houseCtx.fillStyle = "#27342f";
  });

  const floor = getHouseFloor();
  if (floor) {
    houseCtx.fillStyle = "rgba(15, 21, 18, 0.9)";
    roundRect(houseCtx, 742, 14, 202, 38, 4, true, false);
    houseCtx.fillStyle = "#fff";
    houseCtx.font = "800 15px ui-monospace, monospace";
    houseCtx.textAlign = "center";
    houseCtx.fillText(`${floor.label.toUpperCase()}  -  RETRO RUN`, 843, 39);
    houseCtx.textAlign = "left";
  }
}

function drawPlayer() {
  const point = pointToCanvas(playerPosition);
  houseCtx.fillStyle = "rgba(0, 0, 0, 0.32)";
  houseCtx.beginPath();
  houseCtx.ellipse(point.x, point.y + 22, 17, 7, 0, 0, Math.PI * 2);
  houseCtx.fill();
  houseCtx.fillStyle = "#2f8f5b";
  houseCtx.fillRect(point.x - 13, point.y - 14, 26, 28);
  houseCtx.fillStyle = "#1d5136";
  houseCtx.fillRect(point.x - 13, point.y - 14, 26, 6);
  houseCtx.fillStyle = "#e4b98f";
  houseCtx.fillRect(point.x - 8, point.y - 25, 16, 12);
  houseCtx.fillStyle = "#5c3927";
  houseCtx.fillRect(point.x - 10, point.y - 31, 20, 6);
  houseCtx.strokeStyle = "#f7efd7";
  houseCtx.lineWidth = 2;
  houseCtx.strokeRect(point.x - 13, point.y - 14, 26, 28);
  houseCtx.fillStyle = "#ffffff";
  houseCtx.font = "800 10px ui-monospace, monospace";
  houseCtx.textAlign = "center";
  houseCtx.fillText("YOU", point.x, point.y + 24);
  houseCtx.textAlign = "left";
}

function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  if (fill) ctx.fill();
  if (stroke) ctx.stroke();
}

function renderRealisticPack() {
  realisticPickedItems.innerHTML = "";

  if (realisticPicked.size === 0) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = "You are not carrying anything yet.";
    realisticPickedItems.append(empty);
    return;
  }

  [...realisticPicked].forEach((id) => {
    const item = getItem(id);
    const chip = document.createElement("div");
    chip.className = "packed-chip";
    chip.textContent = `${item.icon} ${item.name}`;
    realisticPickedItems.append(chip);
  });
}

function updateRealisticAction() {
  realisticInteraction = getRealisticInteraction();
  const noAction = !realisticInteraction || realisticRunOver;
  realisticActionButton.disabled = noAction || realisticInteraction?.disabled;
  realisticActionButton.textContent = realisticInteraction?.label || "Nothing Nearby";
  realisticPrompt.textContent = realisticInteraction?.prompt || "Explore the area and choose when to begin the event.";
  simulateRealisticButton.disabled = realisticRunOver;
  simulateRealisticButton.textContent = realisticRunOver ? "Simulation Complete" : "Simulate Disaster Here";
}

function getRealisticInteraction() {
  if (realisticArea === "outside") {
    const outsideDoor = { x: 2, y: 5 };
    const firstResponder = { x: 9, y: 2 };

    if (tileDistance(playerPosition, outsideDoor) <= 1) {
      return { type: "enter", label: "Enter House", prompt: "The front door leads back inside." };
    }

    if (tileDistance(playerPosition, firstResponder) <= 1) {
      return {
        type: "responder",
        label: talkedToResponder ? "Talk Again" : "Talk to First Responder",
        prompt: "A first responder is ready to speak with you.",
      };
    }

    return null;
  }

  const floor = getHouseFloor();
  const exactFeature = floor.features.find((feature) => tileDistance(playerPosition, feature) === 0);
  const exactItem = floor.items.find((entry) => tileDistance(playerPosition, entry) === 0);
  const nearbyItem = exactItem || floor.items.find((entry) => tileDistance(playerPosition, entry) === 1);
  const nearbyFeature = exactFeature || floor.features.find((feature) => tileDistance(playerPosition, feature) === 1);

  if (exactFeature) return houseFeatureInteraction(exactFeature);
  if (nearbyItem) {
    const item = getItem(nearbyItem.itemId);
    const bagFull = realisticPicked.size >= realisticCarryLimit;
    return {
      type: "item",
      entry: nearbyItem,
      disabled: bagFull,
      label: bagFull ? "Carry Bag Full" : `Pick Up ${item.name}`,
      prompt: bagFull ? "Your carry bag is full." : `${item.name} is within reach.`,
    };
  }
  if (nearbyFeature) return houseFeatureInteraction(nearbyFeature);
  return null;
}

function houseFeatureInteraction(feature) {
  if (feature.id === "frontDoor") {
    return { type: "exit", feature, label: "Leave Through Front Door", prompt: "You can go outside and return later." };
  }
  return { type: "stairs", feature, label: feature.name, prompt: `${feature.name} leads to another floor.` };
}

function toggleItem(id) {
  if (packed.has(id)) {
    packed.delete(id);
  } else if (packed.size < regularSetup.capacity) {
    packed.add(id);
  }

  renderItems();
  renderPack();
}

function toggleRoomItem(id) {
  if (simPicked.has(id)) {
    simPicked.delete(id);
  } else if (simPicked.size < simulatorSetup.capacity) {
    simPicked.add(id);
  }

  renderRoom();
  renderSimPack();
}

function switchMode(mode) {
  if (activeMode === "realistic" && mode !== "realistic") stopRealisticTimer();
  activeMode = mode;
  regularMode.classList.toggle("hidden", mode !== "regular");
  simulatorMode.classList.toggle("hidden", mode !== "simulator");
  realisticMode.classList.toggle("hidden", mode !== "realistic");
  regularModeButton.classList.toggle("active", mode === "regular");
  simulatorModeButton.classList.toggle("active", mode === "simulator");
  realisticModeButton.classList.toggle("active", mode === "realistic");
  if (mode === "realistic") {
    startRealisticTimer();
    renderRealisticMode();
  }
}

function getRandomScenario() {
  return scenarios[Math.floor(Math.random() * scenarios.length)];
}

function movePlayer(deltaRow, deltaCol) {
  if (activeMode !== "realistic" || realisticRunOver) return;

  const nextX = playerPosition.x + deltaCol;
  const nextY = playerPosition.y + deltaRow;

  if (realisticArea === "inside" && !canMoveInside(nextX, nextY)) return;
  if (realisticArea === "outside" && (nextX < 0 || nextX > 11 || nextY < 0 || nextY > 7)) return;

  playerPosition = { x: nextX, y: nextY };
  renderRealisticMode();
}

function performRealisticAction() {
  if (realisticRunOver || !realisticInteraction || realisticInteraction.disabled) return;

  if (realisticInteraction.type === "item") {
    const floor = getHouseFloor();
    realisticPicked.add(realisticInteraction.entry.itemId);
    floor.items = floor.items.filter((entry) => entry !== realisticInteraction.entry);
    responderText = `You picked up ${getItem(realisticInteraction.entry.itemId).name}.`;
  } else if (realisticInteraction.type === "exit") {
    realisticArea = "outside";
    playerPosition = { x: 2, y: 5 };
    responderText = "You are outside. The front door remains open, so you can go back in.";
  } else if (realisticInteraction.type === "enter") {
    const groundFloor = getHouseFloor("ground");
    const frontDoor = groundFloor.features.find((feature) => feature.id === "frontDoor");
    realisticArea = "inside";
    currentFloorId = "ground";
    playerPosition = { x: frontDoor.x, y: frontDoor.y };
    responderText = "You returned inside and can keep searching the house.";
  } else if (realisticInteraction.type === "stairs") {
    const destinationFloor = getHouseFloor(realisticInteraction.feature.targetFloor);
    const destination = destinationFloor.features.find(
      (feature) => feature.id === realisticInteraction.feature.targetFeature,
    );
    currentFloorId = destinationFloor.id;
    playerPosition = { x: destination.x, y: destination.y };
    responderText = `You moved to the ${destinationFloor.label.toLowerCase()}.`;
  } else if (realisticInteraction.type === "responder") {
    talkedToResponder = true;
    responderText = getResponderMessage(getRealisticScenario());
  }

  renderRealisticMode();
}

function getResponderMessage(scenario) {
  const messages = {
    tornado: "First responder: Conditions can change quickly. Keep alerts on and protect yourself from debris.",
    flood: "First responder: Water can rise or move faster than it looks. Keep listening for evacuation updates.",
    hurricane: "First responder: Wind, rain, and power loss can create different hazards. Keep reliable updates nearby.",
    wildfire: "First responder: Be ready to leave early if officials issue an evacuation order.",
    earthquake: "First responder: Watch for damaged utilities, falling objects, and aftershocks.",
    winter: "First responder: Stay warm, keep supplies dry, and conserve power if electricity fails.",
  };
  return messages[scenario.id] || "First responder: Stay alert and follow local emergency instructions.";
}

function evaluateRealisticLocation(scenario) {
  if (realisticArea === "outside") {
    const nearResponder = tileDistance(playerPosition, { x: 9, y: 2 }) <= 2;
    const outsideScores = { wildfire: 22, earthquake: 18, flood: 8, hurricane: -14, tornado: -22, winter: -18 };
    const score = (outsideScores[scenario.id] || 0) + (nearResponder && talkedToResponder ? 5 : 0);
    return {
      score,
      safe: score >= 10,
      name: nearResponder ? "Outside near first responders" : "Outside the house",
      feedback: nearResponder && talkedToResponder
        ? "You checked in with a first responder before starting the event."
        : "You were outside when the event began.",
    };
  }

  const room = getCurrentHouseRoom();
  const floor = getHouseFloor();
  let score = 0;

  if (scenario.id === "tornado") {
    score = floor.id === "basement" ? 22 : room?.furniture === "bathroom" ? 16 : floor.id === "upper" ? -12 : 2;
    if (room?.id === "stormShelter") score = 28;
  } else if (scenario.id === "flood") {
    score = floor.id === "upper" ? 22 : floor.id === "basement" ? -25 : 2;
  } else if (scenario.id === "hurricane") {
    score = floor.id === "basement" ? 18 : room?.furniture === "bathroom" ? 14 : room?.id === "garage" ? -8 : 6;
  } else if (scenario.id === "wildfire") {
    score = room?.id === "entry" ? 0 : -18;
  } else if (scenario.id === "earthquake") {
    score = floor.id === "upper" ? -6 : room?.id === "entry" ? 12 : room?.furniture === "bathroom" ? 8 : 5;
  } else if (scenario.id === "winter") {
    score = room?.id === "garage" ? 2 : floor.id === "basement" ? 12 : 18;
  }

  const bathtubText = room?.furniture === "bathroom" && scenario.id === "tornado" ? " The bathtub provided extra cover from debris." : "";
  return {
    score,
    safe: score >= 10,
    name: `${room?.name || "Room"}, ${floor.label}`,
    feedback: `You chose the ${room?.name.toLowerCase() || "room"} on the ${floor.label.toLowerCase()}.${bathtubText}`,
  };
}

function simulateRealisticDisaster(timedOut = false) {
  if (realisticRunOver) return;
  stopRealisticTimer();
  finishRealisticRun(evaluateRealisticLocation(getRealisticScenario()), timedOut);
}

function finishRealisticRun(locationResult, timedOut = false) {
  if (realisticRunOver) return;
  stopRealisticTimer();
  realisticRunOver = true;
  const scenario = getRealisticScenario();
  const event = generateDisasterEvent(scenario);
  const context = createSimulationContext();
  const result = calculateRealisticResult(scenario, event, context, locationResult);
  const grade = getGrade(result.score);

  resultTitle.textContent = `${grade.title}: ${event.name}`;
  scoreNumber.textContent = result.score;
  gradeBadge.textContent = grade.label;
  gradeBadge.style.background = grade.color;
  resultEvent.textContent = `${timedOut ? "Time ran out. " : ""}${event.description} You started the simulation in: ${locationResult.name}.`;
  resultLesson.textContent = getRealisticResultLesson(result, event, scenario, locationResult.safe);
  renderResultLessons(event);
  renderConditions({ family: { label: "Household run" }, capacity: realisticCarryLimit }, context, "items");
  feedbackList.innerHTML = "";

  result.feedback.forEach((entry) => {
    const item = document.createElement("div");
    item.className = `feedback-item ${entry.type}`;
    item.innerHTML = `
      <span class="feedback-mark">${entry.type === "good" ? "✓" : entry.type === "event" ? "i" : "!"}</span>
      <span>${entry.text}</span>
    `;
    feedbackList.append(item);
  });

  resultsModal.showModal();
  renderRealisticMode();
}

function generateDisasterEvent(scenario) {
  if (scenario.id === "tornado") {
    const rating = Math.floor(Math.random() * 6);
    const descriptions = [
      "An EF0 tornado caused light damage, but alerts and sheltering still mattered.",
      "An EF1 tornado damaged roofs, trees, and power lines.",
      "An EF2 tornado caused strong damage and scattered dangerous debris.",
      "An EF3 tornado caused severe damage, blocked roads, and knocked out power.",
      "An EF4 tornado caused devastating damage across the area.",
      "An EF5 tornado caused extreme damage, making rescue signals and first aid especially important.",
    ];

    return {
      name: `EF${rating} Tornado`,
      description: descriptions[rating],
      lesson:
        rating >= 3
          ? "For stronger tornadoes, the game teaches that alerts, head protection, first aid, light, sturdy shoes, and signaling can matter after severe damage."
          : "For weaker tornadoes, the game teaches that alerts, sheltering, first aid, light, and avoiding debris still matter.",
      learnList:
        rating >= 3
          ? ["Take warnings seriously even before you see danger.", "Protect your head and feet from debris.", "Pack ways to signal and hear updates after power loss."]
          : ["Even lower-rated tornadoes can knock out power.", "A small first aid kit can handle common injuries.", "A radio helps when phones are unreliable."],
    };
  }

  if (scenario.id === "flood") {
    const flashFlood = Math.random() < 0.5;

    if (flashFlood) {
      return {
        name: "Flash Flood",
        description: "The water rose quickly, so grab-and-go supplies and alerts mattered most.",
        lesson:
          "A flash flood gives very little time. The game teaches that clean water, a waterproof bag, documents, alerts, and simple portable supplies are high-value choices.",
        learnList: ["Move quickly when told to evacuate.", "Keep supplies dry and easy to carry.", "Never rely on floodwater for drinking water."],
      };
    }

    return {
      name: "Warned Flood",
      description: "Warnings came before the water rose, so preparation and keeping supplies dry made a big difference.",
      lesson:
        "A warned flood gives more time to prepare. The game teaches that protecting documents, packing clean water, and following updates can reduce problems later.",
      learnList: ["Use warning time to protect documents and supplies.", "Pack clean water before local water becomes unsafe.", "Listen for road closures and evacuation updates."],
    };
  }

  return {
    name: scenario.name,
    description: scenario.badge,
    lesson: scenario.lesson,
    learnList: scenario.learnList,
  };
}

function calculateResult(event, context) {
  const scenario = getScenario();
  const shelterSpot = getShelterSpot();
  const shelterScore = shelterSpot.scores[scenario.id] || 0;
  const maxScore = Object.values(scenario.needs).reduce((total, value) => total + value, 0);
  const earned = [...packed].reduce((total, id) => total + (scenario.needs[id] || 0), 0);
  const clutterPenalty = getPackedItems().filter((item) => item.category === "Clutter").length * 4;
  const adjustment = calculateConditionAdjustment(packed, context, regularSetup);
  const score = Math.max(0, Math.min(100, Math.round((earned / maxScore) * 76) + shelterScore + adjustment.score - clutterPenalty));
  const sortedNeeds = Object.entries(scenario.needs).sort((a, b) => b[1] - a[1]);
  const feedback = [
    {
      type: "event",
      text: event.description,
    },
    {
      type: adjustment.weatherMatches > 0 ? "good" : "bad",
      text:
        adjustment.weatherMatches > 0
          ? `${context.weather.name}: your kit included supplies that helped with this weather.`
          : `${context.weather.name}: you did not pack much for this weather condition.`,
    },
    {
      type: adjustment.complicationMatches > 0 ? "good" : "bad",
      text:
        adjustment.complicationMatches > 0
          ? `${context.complication.name}: your choices helped with this extra problem.`
          : `${context.complication.name}: this complication exposed a gap in your kit.`,
    },
    {
      type: adjustment.aftermathMatches > 0 ? "good" : "bad",
      text:
        adjustment.aftermathMatches > 0
          ? `${context.aftermath.name}: your kit included something useful after the disaster.`
          : `${context.aftermath.name}: this after-disaster event caught your kit unprepared.`,
    },
    {
      type: adjustment.familyPenalty <= 2 ? "good" : "bad",
      text:
        adjustment.familyPenalty <= 2
          ? `${regularSetup.family.label}: your kit covered several shared family needs.`
          : `${regularSetup.family.label}: a larger family needed more water, food, warmth, hygiene, or first aid.`,
    },
    {
      type: shelterScore > 0 ? "good" : "bad",
      text:
        shelterScore > 0
          ? `${shelterSpot.name}: ${shelterSpot.good}`
          : `${shelterSpot.name}: ${shelterSpot.bad}`,
    },
  ];

  sortedNeeds.forEach(([id]) => {
    const item = items.find((entry) => entry.id === id);
    if (!item) return;

    if (packed.has(id)) {
      feedback.push({
        type: "good",
        text: scenario.feedback[id] || `${item.name} helped during the ${scenario.name.toLowerCase()}.`,
      });
    } else if (scenario.misses[id] || scenario.needs[id] >= 7) {
      feedback.push({
        type: "bad",
        text: scenario.misses[id] || `You missed ${item.name.toLowerCase()}, which would have helped a lot.`,
      });
    }
  });

  getPackedItems()
    .filter((item) => item.category === "Clutter")
    .forEach((item) => {
      feedback.push({
        type: "bad",
        text: `${item.name} used a backpack slot but did not help in this emergency.`,
      });
    });

  return {
    score,
    feedback: feedback.slice(0, 16),
    missedPriorityItems: sortedNeeds
      .filter(([id, value]) => value >= 8 && !packed.has(id))
      .slice(0, 3)
      .map(([id]) => items.find((item) => item.id === id)?.name)
      .filter(Boolean),
    shelterSpot,
    shelterScore,
    context,
    setup: regularSetup,
  };
}

function calculateSimulatorResult(scenario, event, context) {
  const shelterSpot = getSimShelterSpot();
  const shelterScore = shelterSpot.scores[scenario.id] || 0;
  const maxScore = Object.values(scenario.needs).reduce((total, value) => total + value, 0);
  const earned = [...simPicked].reduce((total, id) => total + (scenario.needs[id] || 0), 0);
  const clutterPenalty = [...simPicked].filter((id) => getItem(id).category === "Clutter").length * 5;
  const adjustment = calculateConditionAdjustment(simPicked, context, simulatorSetup);
  const score = Math.max(0, Math.min(100, Math.round((earned / maxScore) * 78) + shelterScore + adjustment.score - clutterPenalty));
  const sortedNeeds = Object.entries(scenario.needs).sort((a, b) => b[1] - a[1]);
  const feedback = [
    {
      type: "event",
      text: event.description,
    },
    {
      type: adjustment.weatherMatches > 0 ? "good" : "bad",
      text:
        adjustment.weatherMatches > 0
          ? `${context.weather.name}: the items you grabbed helped with this weather.`
          : `${context.weather.name}: you missed room items that would help with this weather.`,
    },
    {
      type: adjustment.complicationMatches > 0 ? "good" : "bad",
      text:
        adjustment.complicationMatches > 0
          ? `${context.complication.name}: you grabbed something useful for this complication.`
          : `${context.complication.name}: your survival bag was missing the best support items.`,
    },
    {
      type: adjustment.aftermathMatches > 0 ? "good" : "bad",
      text:
        adjustment.aftermathMatches > 0
          ? `${context.aftermath.name}: your room scan helped after the disaster.`
          : `${context.aftermath.name}: the aftermath exposed a gap in what you grabbed.`,
    },
    {
      type: adjustment.familyPenalty <= 2 ? "good" : "bad",
      text:
        adjustment.familyPenalty <= 2
          ? `${simulatorSetup.family.label}: your room scan covered several shared family needs.`
          : `${simulatorSetup.family.label}: the family size made supplies run short faster.`,
    },
    {
      type: shelterScore > 0 ? "good" : "bad",
      text:
        shelterScore > 0
          ? `${shelterSpot.name}: ${shelterSpot.good}`
          : `${shelterSpot.name}: ${shelterSpot.bad}`,
    },
  ];

  sortedNeeds.forEach(([id]) => {
    const item = getItem(id);
    if (!item) return;

    if (simPicked.has(id)) {
      feedback.push({
        type: "good",
        text: scenario.feedback[id] || `${item.name} helped during the ${scenario.name.toLowerCase()}.`,
      });
    } else if (scenario.needs[id] >= 8 || scenario.misses[id]) {
      feedback.push({
        type: "bad",
        text: scenario.misses[id] || `You passed by ${item.name.toLowerCase()}, which would have helped in this emergency.`,
      });
    }
  });

  [...simPicked]
    .filter((id) => getItem(id).category === "Clutter")
    .forEach((id) => {
      feedback.push({
        type: "bad",
        text: `${getItem(id).name} took space in your survival bag but did not help.`,
      });
    });

  return {
    score,
    feedback: feedback.slice(0, 16),
    missedPriorityItems: sortedNeeds
      .filter(([id, value]) => value >= 8 && !simPicked.has(id))
      .slice(0, 3)
      .map(([id]) => getItem(id)?.name)
      .filter(Boolean),
    shelterSpot,
    shelterScore,
    context,
    setup: simulatorSetup,
  };
}

function calculateRealisticResult(scenario, event, context, locationResult) {
  const collection = realisticPicked;
  const maxScore = Object.values(scenario.needs).reduce((total, value) => total + value, 0);
  const earned = [...collection].reduce((total, id) => total + (scenario.needs[id] || 0), 0);
  const adjustment = calculateConditionAdjustment(collection, context, { family: { label: "Household run", penalty: 4 } });
  const score = Math.max(0, Math.min(100, Math.round((earned / maxScore) * 72) + adjustment.score + locationResult.score));
  const sortedNeeds = Object.entries(scenario.needs).sort((a, b) => b[1] - a[1]);
  const feedback = [
    {
      type: "event",
      text: event.description,
    },
    {
      type: locationResult.safe ? "good" : "bad",
      text: locationResult.feedback,
    },
    {
      type: adjustment.weatherMatches > 0 ? "good" : "bad",
      text:
        adjustment.weatherMatches > 0
          ? `${context.weather.name}: something you collected helped with the weather.`
          : `${context.weather.name}: you did not collect much for the weather conditions.`,
    },
    {
      type: adjustment.complicationMatches > 0 ? "good" : "bad",
      text:
        adjustment.complicationMatches > 0
          ? `${context.complication.name}: your collected items helped with this complication.`
          : `${context.complication.name}: you needed different supplies for this problem.`,
    },
    {
      type: adjustment.aftermathMatches > 0 ? "good" : "bad",
      text:
        adjustment.aftermathMatches > 0
          ? `${context.aftermath.name}: your collected items helped after the emergency.`
          : `${context.aftermath.name}: the aftermath exposed a gap in what you grabbed.`,
    },
  ];

  sortedNeeds.forEach(([id]) => {
    const item = getItem(id);
    if (!item) return;

    if (collection.has(id)) {
      feedback.push({
        type: "good",
        text: `${item.name} helped during the ${scenario.name.toLowerCase()}.`,
      });
    } else if (scenario.needs[id] >= 8) {
      feedback.push({
        type: "bad",
        text: `You passed through the house without collecting ${item.name.toLowerCase()}.`,
      });
    }
  });

  return {
    score,
    feedback: feedback.slice(0, 16),
    missedPriorityItems: sortedNeeds
      .filter(([id, value]) => value >= 8 && !collection.has(id))
      .slice(0, 3)
      .map(([id]) => getItem(id)?.name)
      .filter(Boolean),
    context,
  };
}

function getGrade(score) {
  if (score >= 85) return { title: "Excellent Kit", label: "Ready", color: "#2f8f5b" };
  if (score >= 65) return { title: "Solid Survival", label: "Prepared", color: "#2c7d89" };
  if (score >= 40) return { title: "Risky Pack", label: "Needs Work", color: "#d9902f" };
  return { title: "Tough Outcome", label: "Repack", color: "#c94d3f" };
}

function showResults() {
  const event = generateDisasterEvent(getScenario());
  const context = createSimulationContext();
  const result = calculateResult(event, context);
  const grade = getGrade(result.score);

  resultTitle.textContent = `${grade.title}: ${event.name}`;
  scoreNumber.textContent = result.score;
  gradeBadge.textContent = grade.label;
  gradeBadge.style.background = grade.color;
  resultEvent.textContent = event.description;
  resultLesson.textContent = getResultLesson(result, event);
  renderResultLessons(event);
  renderConditions(regularSetup, context, "slots");
  feedbackList.innerHTML = "";

  result.feedback.forEach((entry) => {
    const item = document.createElement("div");
    item.className = `feedback-item ${entry.type}`;
    item.innerHTML = `
      <span class="feedback-mark">${entry.type === "good" ? "✓" : entry.type === "event" ? "i" : "!"}</span>
      <span>${entry.text}</span>
    `;
    feedbackList.append(item);
  });

  if (result.feedback.length === 0) {
    const item = document.createElement("div");
    item.className = "feedback-item bad";
    item.innerHTML = `
      <span class="feedback-mark">!</span>
      <span>Your backpack was empty, so the emergency was much harder than it needed to be.</span>
    `;
    feedbackList.append(item);
  }

  resultsModal.showModal();
}

function showSimulatorResults() {
  const scenario = getRandomScenario();
  const event = generateDisasterEvent(scenario);
  const context = createSimulationContext();
  const result = calculateSimulatorResult(scenario, event, context);
  const grade = getGrade(result.score);

  simEventLabel.textContent = event.name;
  resultTitle.textContent = `${grade.title}: ${event.name}`;
  scoreNumber.textContent = result.score;
  gradeBadge.textContent = grade.label;
  gradeBadge.style.background = grade.color;
  resultEvent.textContent = `Random event revealed: ${event.description}`;
  resultLesson.textContent = getSimulatorResultLesson(result, event, scenario);
  renderResultLessons(event);
  renderConditions(simulatorSetup, context, "items");
  feedbackList.innerHTML = "";

  result.feedback.forEach((entry) => {
    const item = document.createElement("div");
    item.className = `feedback-item ${entry.type}`;
    item.innerHTML = `
      <span class="feedback-mark">${entry.type === "good" ? "✓" : entry.type === "event" ? "i" : "!"}</span>
      <span>${entry.text}</span>
    `;
    feedbackList.append(item);
  });

  if (simPicked.size === 0) {
    const item = document.createElement("div");
    item.className = "feedback-item bad";
    item.innerHTML = `
      <span class="feedback-mark">!</span>
      <span>You scanned the room but did not pick up supplies before the random event.</span>
    `;
    feedbackList.append(item);
  }

  resultsModal.showModal();
}

function renderConditions(setup, context, unit) {
  conditionList.innerHTML = "";

  [`Family: ${setup.family.label}`, `Space: ${setup.capacity} ${unit}`, `Weather: ${context.weather.name}`, context.complication.name, context.aftermath.name].forEach((text) => {
    const chip = document.createElement("span");
    chip.className = "condition-chip";
    chip.textContent = text;
    conditionList.append(chip);
  });
}

function renderResultLessons(event) {
  resultLessonList.innerHTML = "";

  event.learnList.forEach((lesson) => {
    const item = document.createElement("li");
    item.textContent = lesson;
    resultLessonList.append(item);
  });
}

function getSimulatorResultLesson(result, event, scenario) {
  const aftermathMisses = result.context.aftermath.bonusItems
    .filter((id) => !simPicked.has(id))
    .map((id) => getItem(id)?.name)
    .filter(Boolean)
    .slice(0, 2);

  if (aftermathMisses.length > 0) {
    return `${event.lesson} The aftermath taught you to look for ${aftermathMisses.join(", ")} before the room becomes harder to search.`;
  }

  if (result.missedPriorityItems.length > 0) {
    return `${event.lesson} In Simulator Mode, the room scan taught you to grab ${result.missedPriorityItems.join(", ")} when you see them.`;
  }

  if (result.shelterScore < 0) {
    return `${event.lesson} Your room choice mattered too: ${result.shelterSpot.name.toLowerCase()} was risky for a ${scenario.name.toLowerCase()}.`;
  }

  if (result.shelterScore > 0) {
    return `${event.lesson} Your shelter choice helped because ${result.shelterSpot.name.toLowerCase()} matched the danger.`;
  }

  return `${event.lesson} You chose useful room supplies, but real safety plans should come from trusted local guidance.`;
}

function getRealisticResultLesson(result, event, scenario, reachedObjective) {
  if (!reachedObjective) {
    return `${event.lesson} Realistic Mode teaches that movement matters: during a ${scenario.name.toLowerCase()}, supplies help, but getting away from danger matters too.`;
  }

  if (result.missedPriorityItems.length > 0) {
    return `${event.lesson} You reached safety, but the house run showed that ${result.missedPriorityItems.join(", ")} would have improved your survival chances.`;
  }

  return `${event.lesson} You collected useful supplies and found safety. In real life, practice evacuation and shelter routes before an emergency.`;
}

function getResultLesson(result, event) {
  const scenario = getScenario();
  const scenarioName = scenario.name.toLowerCase();
  const aftermathMisses = result.context.aftermath.bonusItems
    .filter((id) => !packed.has(id))
    .map((id) => getItem(id)?.name)
    .filter(Boolean)
    .slice(0, 2);

  if (aftermathMisses.length > 0) {
    return `${event.lesson} The aftermath taught you that ${aftermathMisses.join(", ")} can matter after the first danger is over.`;
  }

  if (result.missedPriorityItems.length > 0) {
    return `${event.lesson} You also learned to make room for ${result.missedPriorityItems.join(", ")} before packing comfort or clutter items.`;
  }

  if (result.shelterScore < 0) {
    return `${event.lesson} Your shelter choice also mattered: ${result.shelterSpot.name.toLowerCase()} was risky for this scenario.`;
  }

  if (result.shelterScore > 0) {
    return `${event.lesson} Your shelter choice helped too: ${result.shelterSpot.name.toLowerCase()} matched the danger better than exposed spots.`;
  }

  if (getPackedItems().some((item) => item.category === "Clutter")) {
    return "You packed the major emergency needs, but clutter still costs space. Real kits work best when every item has a clear safety purpose.";
  }

  return `Nice planning. For a real ${scenarioName} kit, compare your choices with guidance from a trusted local emergency source.`;
}

function resetPack() {
  packed.clear();
  renderItems();
  renderPack();
}

function randomizeRegularSetup() {
  regularSetup = createSetup(DEFAULT_MAX_SLOTS);
  trimSetToCapacity(packed, regularSetup.capacity);
  renderSetups();
  renderItems();
  renderPack();
}

function resetRoom() {
  simPicked.clear();
  activeSimShelterSpotId = "interiorRoom";
  simEventLabel.textContent = "Unknown until simulation";
  renderRoom();
  renderSimPack();
  renderSimShelterSpots();
}

function randomizeSimulatorSetup() {
  simulatorSetup = createSetup(DEFAULT_SIM_MAX_ITEMS);
  trimSetToCapacity(simPicked, simulatorSetup.capacity);
  renderSetups();
  renderRoom();
  renderSimPack();
}

function nextScenario() {
  if (activeMode === "realistic") {
    generateHouse();
    resultsModal.close();
    return;
  }

  if (activeMode === "simulator") {
    resetRoom();
    resultsModal.close();
    return;
  }

  const currentIndex = scenarios.findIndex((scenario) => scenario.id === activeScenarioId);
  activeScenarioId = scenarios[(currentIndex + 1) % scenarios.length].id;
  resetPack();
  resultsModal.close();
  render();
}

function render() {
  renderScenarios();
  renderRealisticScenarios();
  renderShelterSpots();
  renderSimShelterSpots();
  renderSetups();
  renderCategories();
  renderItems();
  renderPack();
  renderRoom();
  renderSimPack();
  if (houseFloors.length === 0) generateHouse();
  renderRealisticMode();
}

searchInput.addEventListener("input", (event) => {
  searchTerm = event.target.value.trim().toLowerCase();
  renderItems();
});

regularModeButton.addEventListener("click", () => switchMode("regular"));
simulatorModeButton.addEventListener("click", () => switchMode("simulator"));
realisticModeButton.addEventListener("click", () => switchMode("realistic"));
simulateButton.addEventListener("click", showResults);
simulateRoomButton.addEventListener("click", showSimulatorResults);
resetButton.addEventListener("click", resetPack);
resetRoomButton.addEventListener("click", resetRoom);
newHouseButton.addEventListener("click", generateHouse);
simulateRealisticButton.addEventListener("click", () => simulateRealisticDisaster(false));
realisticActionButton.addEventListener("click", performRealisticAction);
moveUpButton.addEventListener("click", () => movePlayer(-1, 0));
moveLeftButton.addEventListener("click", () => movePlayer(0, -1));
moveDownButton.addEventListener("click", () => movePlayer(1, 0));
moveRightButton.addEventListener("click", () => movePlayer(0, 1));
randomizeSetupButton.addEventListener("click", randomizeRegularSetup);
randomizeRoomSetupButton.addEventListener("click", randomizeSimulatorSetup);
closeResults.addEventListener("click", () => resultsModal.close());
tryAgainButton.addEventListener("click", () => {
  resultsModal.close();
  if (activeMode === "realistic") {
    generateHouse();
  } else if (activeMode === "simulator") {
    resetRoom();
  } else {
    resetPack();
  }
});
nextScenarioButton.addEventListener("click", nextScenario);

document.addEventListener("keydown", (event) => {
  if (activeMode !== "realistic" || resultsModal.open) return;

  if (event.key === "ArrowUp" || event.key.toLowerCase() === "w") {
    event.preventDefault();
    movePlayer(-1, 0);
  } else if (event.key === "ArrowDown" || event.key.toLowerCase() === "s") {
    event.preventDefault();
    movePlayer(1, 0);
  } else if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a") {
    event.preventDefault();
    movePlayer(0, -1);
  } else if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") {
    event.preventDefault();
    movePlayer(0, 1);
  } else if (event.key === " " || event.key === "Enter" || event.key.toLowerCase() === "e") {
    event.preventDefault();
    performRealisticAction();
  }
});

render();
