export const projectsData = [
  {
    slug: "garagefit",
    name: "GarageFit",
    subtitle: "Car Comparison Platform",
    summary: "A free car-comparison PWA that measures 196 vehicles against your current car, garage, and budget — with 3D garage fit, true 5-year cost, safety, efficiency and EV range.",
    category: "Automotive",
    techStack: ["React", "TypeScript", "Vite", "CSS", "PWA"],
    role: "Frontend Developer",
    duration: "2 Months",
    problem: "Car buyers can't tell if a new car will fit their garage, lifestyle, and budget — dimensions, running costs, safety, and EV range are scattered across spec sheets.",
    solution: "Built GarageFit to compare 196 vehicles side-by-side against your current car and garage, with 3D fit visualization, true 5-year ownership costs, and safety/efficiency breakdowns — free with no account.",
    challenges: "Normalizing specs across 196 vehicles, rendering garage fit in 3D in the browser, and delivering an offline-first PWA that stays fast with no login friction.",
    features: [
      "3D Garage Fit Visualization",
      "True 5-Year Cost Analysis",
      "Safety, Efficiency & EV Range Compare",
      "Offline-First PWA, No Sign-up"
    ],
    liveUrl: "https://garagefit.vercel.app",
    githubUrl: "https://github.com/elpresidentey/Garagefit",
    imageUrl: "/images/projects/garagefit.png",
    stats: [
      { label: "Vehicles Compared", value: "196" },
      { label: "Cost Analysis", value: "5-Year" },
      { label: "Access", value: "Free" }
    ]
  },
  {
    slug: "dyaspora",
    name: "Dyaspora",
    subtitle: "Homecoming Travel Platform",
    summary: "A pan-African homecoming platform that unifies flights, stays, events, and experiences into one journey — built for the diaspora planning their way back home.",
    category: "Travel & Logistics",
    techStack: ["React", "Next.js", "TypeScript", "TailwindCSS", "Prisma"],
    role: "Frontend Developer",
    duration: "2 Months",
    problem: "Africans abroad face a fragmented, stressful process when planning a trip home — flights, accommodation, events, and transport scattered across dozens of sites and word-of-mouth.",
    solution: "Built a homecoming platform that brings flights, short-lets, cultural events, and curated destination guides into a single experience, covering 50+ cities across the continent.",
    challenges: "Designing an emotionally resonant experience that feels like home rather than a generic travel site, while organizing multi-city inventory across destinations from Lagos to Cape Town.",
    features: [
      "Flight Search & Booking",
      "Stays: Hotels & Short-lets",
      "Events & Cultural Experiences",
      "Pan-African Destination Guides"
    ],
    liveUrl: "https://dyaspora-one.vercel.app",
    githubUrl: "https://github.com/elpresidentey/dyaspora.git",
    imageUrl: "/images/projects/dyaspora.png",
    stats: [
      { label: "Cities Covered", value: "50+" },
      { label: "Booking Categories", value: "6" },
      { label: "Support", value: "24/7" }
    ]
  },
  {
    slug: "kilomart",
    name: "Kilomart",
    subtitle: "Agricultural Marketplace",
    summary: "A digital marketplace connecting farmers directly with buyers, eliminating middlemen and ensuring fair prices for agricultural products.",
    category: "E-Commerce",
    techStack: ["React", "Next.js", "TypeScript", "TailwindCSS", "Stripe"],
    role: "Frontend Developer",
    duration: "3 Months",
    problem: "Farmers often lose profits to middlemen, while buyers pay inflated prices for agricultural products.",
    solution: "Created a direct-to-consumer marketplace that enables farmers to sell directly to buyers at fair market prices.",
    challenges: "Building trust between farmers and buyers, implementing secure payment systems, and handling logistics coordination.",
    features: [
      "Direct Farmer-to-Buyer Sales",
      "Real-time Price Indexing",
      "Secure Payment Processing",
      "Logistics Coordination"
    ],
    liveUrl: "https://kilomart.vercel.app",
    githubUrl: "https://github.com/elpresidentey/Kilomart.git",
    imageUrl: "/images/projects/kilomart.png",
    stats: [
      { label: "Farmer Income", value: "+40%" },
      { label: "Buyer Savings", value: "-25%" },
      { label: "Transactions", value: "10,000+" }
    ]
  },
  {
    slug: "arms",
    name: "ARMS",
    subtitle: "Waste Logistics SaaS",
    summary: "A SaaS platform for optimizing waste collection routes and logistics, helping municipalities reduce costs and improve efficiency.",
    category: "SaaS",
    techStack: ["React", "Next.js", "TypeScript", "TailwindCSS", "Mapbox"],
    role: "Frontend Developer",
    duration: "4 Months",
    problem: "Municipalities waste resources on inefficient waste collection routes, leading to high operational costs.",
    solution: "Developed an AI-powered route optimization system that dynamically adjusts collection schedules based on fill-level sensors.",
    challenges: "Real-time data processing, complex route algorithms, and integration with existing municipal systems.",
    features: [
      "AI Route Optimization",
      "Real-time Fleet Tracking",
      "Fill-level Sensor Integration",
      "Cost Analytics Dashboard"
    ],
    liveUrl: "https://arms-roan.vercel.app",
    githubUrl: "https://github.com/elpresidentey/arms.git",
    imageUrl: "/images/projects/arms.png",
    stats: [
      { label: "Fuel Savings", value: "-35%" },
      { label: "Route Efficiency", value: "+50%" },
      { label: "Cost Reduction", value: "-28%" }
    ]
  },
  {
    slug: "amapels",
    name: "Amapels",
    subtitle: "Luxury Fashion E-commerce",
    summary: "A premium e-commerce platform for a luxury fashion brand, featuring immersive product showcases and seamless checkout experience.",
    category: "E-Commerce",
    techStack: ["React", "Next.js", "TypeScript", "TailwindCSS", "GSAP"],
    role: "Frontend Developer",
    duration: "2 Months",
    problem: "Luxury brands need to convey exclusivity and quality online while providing a seamless shopping experience.",
    solution: "Built an immersive e-commerce experience with smooth animations, high-quality imagery, and intuitive navigation.",
    challenges: "Balancing visual appeal with performance, implementing complex animations without affecting load times.",
    features: [
      "Immersive Product Galleries",
      "Smooth Page Transitions",
      "Virtual Try-on Integration",
      "Premium Checkout Experience"
    ],
    liveUrl: "https://amapelsng.com",
    githubUrl: "https://github.com/elpresidentey/amapels.git",
    imageUrl: "/images/projects/amapels.png",
    stats: [
      { label: "Conversion Rate", value: "4.2%" },
      { label: "Avg Session", value: "4:30" },
      { label: "Return Rate", value: "12%" }
    ]
  },
  {
    slug: "insight",
    name: "Insight for SMEs",
    subtitle: "Business Intelligence Platform",
    summary: "A business intelligence platform designed for small and medium enterprises to make data-driven decisions without requiring technical expertise.",
    category: "SaaS",
    techStack: ["React", "Next.js", "TypeScript", "TailwindCSS", "Recharts"],
    role: "Frontend Developer",
    duration: "3 Months",
    problem: "SMEs lack access to affordable, user-friendly business intelligence tools to analyze their data.",
    solution: "Created an intuitive BI platform with pre-built templates and natural language queries for data analysis.",
    challenges: "Simplifying complex data concepts, building intuitive visualizations, and ensuring data security.",
    features: [
      "Natural Language Queries",
      "Pre-built Analytics Templates",
      "Real-time Data Sync",
      "Collaborative Dashboards"
    ],
    liveUrl: "https://insight-market.vercel.app",
    githubUrl: "https://github.com/elpresidentey/insightforsmes.git",
    imageUrl: "/images/projects/insight.png",
    stats: [
      { label: "SME Clients", value: "500+" },
      { label: "Data Processed", value: "1M+ rows" },
      { label: "User Retention", value: "85%" }
    ]
  },
  {
    slug: "impetus",
    name: "Impetus Sneakers",
    subtitle: "Streetwear E-commerce",
    summary: "A modern e-commerce platform for streetwear sneakers, featuring limited edition drops and community-driven shopping experiences.",
    category: "E-Commerce",
    techStack: ["React", "Next.js", "TypeScript", "TailwindCSS", "Framer Motion"],
    role: "Frontend Developer",
    duration: "2 Months",
    problem: "Streetwear enthusiasts need a platform that captures the hype culture while providing reliable shopping experiences.",
    solution: "Built a hype-focused e-commerce platform with countdown drops, community features, and seamless checkout.",
    challenges: "Handling high traffic during drops, implementing fair raffle systems, and creating engaging community features.",
    features: [
      "Limited Drop Countdowns",
      "Raffle System",
      "Community Forums",
      "Size Recommendation AI"
    ],
    liveUrl: "https://impetus-omega.vercel.app",
    githubUrl: "https://github.com/elpresidentey/impetussneakers.git",
    imageUrl: "/images/projects/impetus.png",
    stats: [
      { label: "Sell-out Rate", value: "98%" },
      { label: "Community Members", value: "15,000+" },
      { label: "Drop Success", value: "100%" }
    ]
  },
  {
    slug: "mexcon-autos",
    name: "Mexcon Autos",
    subtitle: "Auto Parts Catalogue PWA",
    summary: "A progressive web app for a Lagos-based auto parts dealer — customers find genuine Japanese and Korean spare parts by vehicle and request quotes instantly.",
    category: "Automotive",
    techStack: ["React", "TypeScript", "Vite", "TailwindCSS", "Supabase"],
    role: "Frontend Developer",
    duration: "Ongoing",
    problem: "Sourcing the right spare part for a specific vehicle means flipping through paper catalogues or calling shops one by one — slow, error-prone, and frustrating for both customers and dealers.",
    solution: "Built a PWA with cascading vehicle-based search (Manufacturer → Model → Year → Engine → Category), product pages with compatibility info, and a quote-request flow wired to WhatsApp — backed by a Supabase admin dashboard with role-based access control.",
    challenges: "Modelling deep vehicle compatibility data, keeping a client-rendered SPA discoverable through structured data and SEO metadata, and delivering PWA-grade performance on low-bandwidth mobile networks.",
    features: [
      "Cascading Vehicle-Based Search",
      "Quote Requests with WhatsApp Integration",
      "Installable PWA Experience",
      "Role-Based Admin Dashboard"
    ],
    liveUrl: "https://mextechautospareparts.com",
    githubUrl: "https://github.com/elpresidentey/mexcon-autos.git",
    imageUrl: "/images/projects/mexcon.png",
    stats: [
      { label: "Lighthouse Score", value: "90+" },
      { label: "Car Brands", value: "10+" },
      { label: "Admin Roles", value: "3" }
    ]
  },
  {
    slug: "donuts-cakes",
    name: "Donuts & Cakes",
    subtitle: "Dessert Studio E-commerce",
    summary: "A Nigerian dessert studio where customers design their own cakes, donut boxes and smoothies in live builders — then bakers make exactly what they pictured, delivered nationwide.",
    category: "Food & Beverage",
    techStack: ["React", "Next.js", "TypeScript", "TailwindCSS"],
    role: "Frontend Developer",
    duration: "2 Months",
    problem: "Dessert buyers pick from rigid menus, photos never quite match the final product, and a truly custom cake still means phone calls and guesswork.",
    solution: "Built a dessert e-commerce with three live builders — cakes, donut boxes and smoothies — where every choice redraws the final product, plus a cart and checkout flow for nationwide delivery.",
    challenges: "Mapping every combination of shapes, sponges, glazes and toppings to a lag-free live preview, structuring a growing multi-category catalog, and keeping checkout to a couple of minutes.",
    features: [
      "Live Cake Builder with Custom Wording",
      "Donut Box & Smoothie Builders",
      "Cart & Checkout Flow",
      "Nationwide Delivery Tue–Sun"
    ],
    liveUrl: "https://donutsandcakes.vercel.app",
    githubUrl: "https://github.com/elpresidentey/donutsandcakes.git",
    imageUrl: "/images/projects/donutsandcakes.jpg",
    stats: [
      { label: "Custom Builders", value: "3" },
      { label: "Delivery", value: "Nationwide" },
      { label: "Fresh Baked", value: "Daily" }
    ]
  },
  {
    slug: "pjc-interiors",
    name: "PJC Interiors",
    subtitle: "Interior Design Business Platform",
    summary: "A premium digital showroom for a Lagos interior studio — POP ceilings, feature walls and full interiors — with quote requests, consultation booking and a Supabase-backed lead dashboard.",
    category: "Interior Design",
    techStack: ["Next.js", "TypeScript", "TailwindCSS", "Supabase", "React Hook Form"],
    role: "Full-Stack Developer",
    duration: "2 Months",
    problem: "A premium interior business runs on word-of-mouth: customers can't browse past work, can't get honest itemised quotes, and every enquiry lives in scattered WhatsApp chats.",
    solution: "Delivered a digital showroom — filterable project gallery, service pages and testimonials — plus multi-step quote requests, consultation booking and WhatsApp integration, all managed from a Supabase admin dashboard.",
    challenges: "Keeping a multi-step quote flow frictionless on Nigerian mobile networks, locking down admin routes with Supabase auth and row-level security, and keeping an image-heavy site fast on 3G/4G.",
    features: [
      "Multi-Step Quote Requests",
      "Consultation Booking",
      "Filterable Project Gallery",
      "Supabase Admin & Lead Dashboard"
    ],
    liveUrl: "https://pjcinteriors.vercel.app/en",
    githubUrl: "https://github.com/elpresidentey/PrinceJahkcrowninteriors.git",
    imageUrl: "/images/projects/pjc-interiors.jpg",
    stats: [
      { label: "Spaces Transformed", value: "120+" },
      { label: "Client Rating", value: "4.8/5" },
      { label: "Quote Turnaround", value: "7 days" }
    ]
  },
  {
    slug: "orbital-freight",
    name: "Orbital Freight",
    subtitle: "Earth Operations Monitor",
    summary: "An installable PWA that renders global ocean freight on a real-time 3D Earth — nine trade lanes, live AIS vessels, ISS telemetry and weather/fire monitoring, with every value sourced from real data.",
    category: "Travel & Logistics",
    techStack: ["JavaScript", "Three.js", "PWA", "Vercel Functions", "NASA/JPL"],
    role: "Full-Stack Developer",
    duration: "2 Months",
    problem: "Global shipping is invisible in real time — vessel positions, port weather and orbital data live in scattered feeds, so operators have no single operational view of the ocean.",
    solution: "Built an interactive Earth operations monitor: a three.js globe with nine great-circle trade lanes, a live vessel feed through a server-side AIS proxy, ISS telemetry propagated client-side with SGP4, and weather, sea-state and fire layers from Open-Meteo and NASA FIRMS.",
    challenges: "Keeping the AIS provider key server-side behind a Vercel function, propagating the ISS orbit client-side with honest fallbacks, and refusing to display invented values — anything unsourced renders as unavailable.",
    features: [
      "Interactive 3D Earth & Trade Lanes",
      "Live AIS Vessels via Server Proxy",
      "ISS Telemetry with SGP4 Propagation",
      "Weather, Sea-State & Fire Layers"
    ],
    liveUrl: "https://geolocateshippingdashboard.vercel.app",
    githubUrl: "https://github.com/elpresidentey/Geolocate.git",
    imageUrl: "/images/projects/orbital-freight.jpg",
    stats: [
      { label: "Live Vessels", value: "140" },
      { label: "Trade Lanes", value: "9" },
      { label: "Render", value: "60 FPS" }
    ]
  },
  ];
