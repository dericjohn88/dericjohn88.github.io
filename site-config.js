window.siteConfig = {
  firebase: {
    apiKey: "AIzaSyDnTU6aFtglOzEWbRDANA2BxDRPdizmW_E",
    authDomain: "dericjohn88-9f1fd.firebaseapp.com",
    projectId: "dericjohn88-9f1fd",
    appId: "1:842234641604:web:c25d1e34c6e0d6f7d31d91",
  },
  owner: {
    allowedEmails: ["deric.john88@gmail.com"],
    accessMessage:
      "Public access is enabled. Restricted details unlock for your approved Google account.",
    privateIntro:
      "Sensitive notes and internal-only implementation details are visible only to the approved owner email.",
  },
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
      publicPath: "./meals/index.html",
      privateSummary:
        "Owner-only setup: meal reminder backend uses a private PostgREST API and push notification channel credentials that should remain hidden from public visitors.",
      privateBullets: [
        "Secure reminder delivery credentials and scheduler config remain in the private environment.",
        "Production deployment notes and incident runbooks are not published publicly.",
      ],
    },
    {
      slug: "autotrader",
      name: "Autotrader",
      health: "healthy",
      status: "Operational",
      publicRoute: "/autotrader",
      publicSummary:
        "Automated trade execution pipeline with broker integration and order audit trails.",
      activity: "Broker health checks + execution logging",
      uptime: "In development",
      publicPath: "./autotrader/index.html",
      privateSummary:
        "Owner-only access includes broker auth handling, execution policy notes, and risk controls that are intentionally hidden from public users.",
      privateBullets: [
        "Broker credentials and policy thresholds stay in the private environment.",
        "Trade execution alerts are reviewed only by the approved owner account.",
      ],
    },
    {
      slug: "bible-app",
      name: "Bible App",
      health: "healthy",
      status: "Operational",
      publicRoute: "/Bible%20App",
      publicSummary:
        "Progressive web app for Bible reading with responsive UI and offline support.",
      activity: "PWA runtime + offline cache",
      uptime: "In development",
      publicPath: "./Bible App/index.html",
      privateSummary:
        "Owner-only notes include release plans and configuration details that are not intended for public visitors.",
      privateBullets: [
        "Private notes and deployment checklists remain restricted to owner access.",
        "Internal roadmap items are intentionally hidden from public traffic.",
      ],
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
      publicPath: "./travel/index.html",
      privateSummary:
        "Owner-only notes: third-party supplier credentials, retry policies, and runbook procedures are restricted to the owner account.",
      privateBullets: [
        "Supplier recovery steps and outage notes are stored behind the owner-only gate.",
        "Performance diagnostics for production vendors remain hidden from public traffic.",
      ],
    },
    {
      slug: "bible-plan",
      name: "Private Bible Reading Plan",
      health: "healthy",
      status: "Operational",
      publicRoute: "/bible-plan",
      publicSummary:
        "Offline-first personal Bible reading tracker with custom plans and system voice playback.",
      activity: "Reading plan management + TTS playback",
      uptime: "In development",
      publicPath: "./bible-plan/index.html",
      privateSummary:
        "This local-only Bible workflow is intentionally private: it stores user reading plans locally on the device and keeps Crossway ESV content as an optional external reference, not a required platform integration.",
      privateBullets: [
        "Reading plans are stored locally in browser storage for personal use on 1–2 devices.",
        "System audio playback is configured without locking the app into a closed Bible ecosystem."
      ]
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
      publicPath: "./f3-workout-randomizer/index.html",
      privateSummary:
        "Owner-only implementation notes include internal exercise library metadata and setup notes that are intentionally not exposed publicly.",
      privateBullets: [
        "Exercise sourcing and curation details remain private.",
        "Historical progress notes are reserved for owner access.",
      ],
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
      publicPath: "./financial-test-app/index.html",
      privateSummary:
        "Owner-only access covers internal model assumptions, validation rules, and financial-report outputs that should not be shared widely.",
      privateBullets: [
        "Sensitive report logic and assumptions are hidden behind the private gate.",
        "Validation and QA notes stay available only to the approved owner account.",
      ],
    },
    {
      slug: "movie-deduplication",
      name: "Movie Deduplication",
      health: "monitoring",
      status: "Monitoring",
      publicRoute: "/movie-deduplication",
      publicSummary:
        "Duplicate-detection workflow for movie catalogs and media-library cleanup.",
      activity: "Dedupe pipeline planning",
      uptime: "In development",
      publicPath: "./movie-deduplication/index.html",
      privateSummary:
        "Owner-only details include data-source quality notes and cleanup decision criteria.",
      privateBullets: [
        "Dataset diagnostics and internal cleanup policies are private.",
        "Operational notes remain available only to approved owner accounts.",
      ],
    },
    {
      slug: "persistent-memory",
      name: "Persistent Memory",
      health: "monitoring",
      status: "Monitoring",
      publicRoute: "/persistent-memory",
      publicSummary:
        "Workspace memory and reusable-skill references supporting multi-project continuity.",
      activity: "Documentation curation",
      uptime: "In development",
      publicPath: "./persistent-memory/index.html",
      privateSummary:
        "Owner-only notes include personal workflow guidance and internal usage conventions.",
      privateBullets: [
        "Internal preference notes remain restricted to owner access.",
        "Private workflow conventions are intentionally hidden from public visitors.",
      ],
    },
  ],
};
