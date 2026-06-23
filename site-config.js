window.siteConfig = {
  tools: [
    {
      slug: "meals",
      name: "Personal Meal Reminder",
      health: "healthy",
      status: "Operational",
      publicRoute: "/meals",
      publicSummary:
        "Meal planning and shopping list management with push reminders via Novu.",
      activity: "PostgREST-backed CRUD",
      uptime: "In development",
      publicPath: "./meals/index.html"
    },
    {
      slug: "trades",
      name: "Autotrader",
      health: "healthy",
      status: "Operational",
      publicRoute: "/trades",
      publicSummary:
        "Automated trade execution pipeline with broker integration and order audit trails.",
      activity: "Broker health checks + execution logging",
      uptime: "In development",
      publicPath: "./autotrader/index.html"
    },
    {
      slug: "travel",
      name: "Travel Mobile App",
      health: "monitoring",
      status: "Monitoring",
      publicRoute: "/travel",
      publicSummary:
        "Travel lookup and supplier routing with caching, timeout diagnostics, and recovery runbooks.",
      activity: "Supplier timeout monitoring",
      uptime: "In development",
      publicPath: "./travel/index.html"
    },
    {
      slug: "f3-workout-randomizer",
      name: "F3 Workout Randomizer",
      health: "healthy",
      status: "Operational",
      publicRoute: "/f3-workout-randomizer",
      publicSummary:
        "Randomized F3 workout generator with exercise filters, history, and progress tracking.",
      activity: "Workout generation + history",
      uptime: "In development",
      publicPath: "./f3-workout-randomizer/index.html"
    },
    {
      slug: "financial-test-app",
      name: "Financial Test App",
      health: "healthy",
      status: "Operational",
      publicRoute: "/financial-test-app",
      publicSummary:
        "Financial model testing framework with data ingestion, validation, and report export.",
      activity: "Model validation + reporting",
      uptime: "In development",
      publicPath: "./financial-test-app/index.html"
    }
  ]
};
