window.siteConfig = {
  firebase: {
    apiKey: "YOUR_FIREBASE_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    appId: "YOUR_APP_ID"
  },
  owner: {
    allowedEmails: ["your-google-account@gmail.com"],
    accessMessage:
      "Public access is enabled. Restricted details unlock for your approved Google account.",
    privateIntro:
      "Sensitive notes and internal-only implementation details are visible only to the approved owner email."
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
        "Production deployment notes and incident runbooks are not published publicly."
      ]
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
      publicPath: "./autotrader/index.html",
      privateSummary:
        "Owner-only access includes broker auth handling, execution policy notes, and risk controls that are intentionally hidden from public users.",
      privateBullets: [
        "Broker credentials and policy thresholds stay in the private environment.",
        "Trade execution alerts are reviewed only by the approved owner account."
      ]
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
        "Performance diagnostics for production vendors remain hidden from public traffic."
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
        "Historical progress notes are reserved for owner access."
      ]
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
        "Validation and QA notes stay available only to the approved owner account."
      ]
    }
  ]
};
