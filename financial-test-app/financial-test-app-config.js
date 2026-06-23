/**
 * Financial Test App status/market data.
 * Update these values to refresh the public metrics page.
 */
window.financialTestAppStatus = {
  health: "healthy",
  status: "Operational",
  summary: "Financial Test App ingestion is running. Validation and report exports are stable.",
  uptime: {
    percent: 99.95,
    last30Days: "3m 11s",
    lastIncident: "2026-05-12 11:32 AM"
  },
  traffic: {
    requestsLast24h: 583,
    requestsLast30d: 17452,
    uniqueUsersLast30d: 31
  },
  api: {
    callsLast24h: 3084,
    callsLast30d: 92411,
    errorsLast24h: 4,
    errorRate: "0.13%",
    p95Latency: "201ms"
  },
  daily: [
    { date: "05-24", percent: 100, requests: 572, calls: 3051 },
    { date: "05-25", percent: 100, requests: 579, calls: 3068 },
    { date: "05-26", percent: 100, requests: 568, calls: 3039 },
    { date: "05-27", percent: 100, requests: 586, calls: 3076 },
    { date: "05-28", percent: 100, requests: 575, calls: 3055 },
    { date: "05-29", percent: 100, requests: 570, calls: 3043 },
    { date: "05-30", percent: 99.6, requests: 592, calls: 3088 },
    { date: "05-31", percent: 100, requests: 581, calls: 3067 },
    { date: "06-01", percent: 100, requests: 584, calls: 3073 },
    { date: "06-02", percent: 100, requests: 572, calls: 3048 },
    { date: "06-03", percent: 100, requests: 587, calls: 3081 },
    { date: "06-04", percent: 100, requests: 577, calls: 3058 },
    { date: "06-05", percent: 100, requests: 571, calls: 3044 },
    { date: "06-06", percent: 100, requests: 584, calls: 3069 },
    { date: "06-07", percent: 100, requests: 576, calls: 3051 },
    { date: "06-08", percent: 100, requests: 582, calls: 3065 },
    { date: "06-09", percent: 100, requests: 573, calls: 3047 },
    { date: "06-10", percent: 100, requests: 569, calls: 3041 },
    { date: "06-11", percent: 100, requests: 580, calls: 3060 },
    { date: "06-12", percent: 100, requests: 583, calls: 3063 },
    { date: "06-13", percent: 99.7, requests: 577, calls: 3052 },
    { date: "06-14", percent: 100, requests: 581, calls: 3064 },
    { date: "06-15", percent: 100, requests: 579, calls: 3059 },
    { date: "06-16", percent: 100, requests: 571, calls: 3045 },
    { date: "06-17", percent: 100, requests: 585, calls: 3071 },
    { date: "06-18", percent: 100, requests: 591, calls: 3083 },
    { date: "06-19", percent: 100, requests: 568, calls: 3038 },
    { date: "06-20", percent: 100, requests: 576, calls: 3050 },
    { date: "06-21", percent: 100, requests: 582, calls: 3062 },
    { date: "06-22", percent: 100, requests: 577, calls: 3049 }
  ],
  incidents: [
    {
      date: "2026-05-12",
      severity: "minor",
      title: "Report export timeout",
      detail: "Large PDF exports hit a 30s timeout. Queue retry with chunked payload fixed it.",
      resolved: true
    }
  ],
  links: [
    { label: "App", url: "./index.html" },
    { label: "Home", url: "../index.html" }
  ]
};
