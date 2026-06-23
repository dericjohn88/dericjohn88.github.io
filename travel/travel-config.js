/**
 * Travel API status/market data.
 * Update these values to refresh the public metrics page.
 */
window.travelStatus = {
  health: "healthy",
  status: "Operational",
  summary: "Travel API endpoints are running. Supplier sync is healthy.",
  uptime: {
    percent: 99.96,
    last30Days: "2m 03s",
    lastIncident: "2026-04-29 08:17 PM"
  },
  traffic: {
    requestsLast24h: 1014,
    requestsLast30d: 30428,
    uniqueUsersLast30d: 67
  },
  api: {
    callsLast24h: 5211,
    callsLast30d: 156489,
    errorsLast24h: 2,
    errorRate: "0.04%",
    p95Latency: "164ms"
  },
  daily: [
    { date: "05-24", percent: 100, requests: 988, calls: 5150 },
    { date: "05-25", percent: 100, requests: 1012, calls: 5201 },
    { date: "05-26", percent: 100, requests: 1005, calls: 5188 },
    { date: "05-27", percent: 100, requests: 1011, calls: 5214 },
    { date: "05-28", percent: 100, requests: 1002, calls: 5197 },
    { date: "05-29", percent: 100, requests: 997, calls: 5180 },
    { date: "05-30", percent: 99.9, requests: 1024, calls: 5234 },
    { date: "05-31", percent: 100, requests: 1009, calls: 5201 },
    { date: "06-01", percent: 100, requests: 1013, calls: 5216 },
    { date: "06-02", percent: 100, requests: 1005, calls: 5198 },
    { date: "06-03", percent: 100, requests: 1018, calls: 5226 },
    { date: "06-04", percent: 100, requests: 1007, calls: 5201 },
    { date: "06-05", percent: 100, requests: 1001, calls: 5192 },
    { date: "06-06", percent: 100, requests: 1014, calls: 5215 },
    { date: "06-07", percent: 100, requests: 1006, calls: 5199 },
    { date: "06-08", percent: 100, requests: 1012, calls: 5208 },
    { date: "06-09", percent: 100, requests: 1004, calls: 5191 },
    { date: "06-10", percent: 100, requests: 999, calls: 5184 },
    { date: "06-11", percent: 100, requests: 1010, calls: 5202 },
    { date: "06-12", percent: 100, requests: 1008, calls: 5199 },
    { date: "06-13", percent: 100, requests: 1003, calls: 5191 },
    { date: "06-14", percent: 100, requests: 1011, calls: 5207 },
    { date: "06-15", percent: 100, requests: 1009, calls: 5201 },
    { date: "06-16", percent: 100, requests: 1001, calls: 5193 },
    { date: "06-17", percent: 100, requests: 1014, calls: 5215 },
    { date: "06-18", percent: 100, requests: 1021, calls: 5229 },
    { date: "06-19", percent: 100, requests: 998, calls: 5182 },
    { date: "06-20", percent: 100, requests: 1006, calls: 5198 },
    { date: "06-21", percent: 100, requests: 1012, calls: 5205 },
    { date: "06-22", percent: 100, requests: 1007, calls: 5194 }
  ],
  incidents: [
    {
      date: "2026-04-29",
      severity: "major",
      title: "Supplier timeout spike",
      detail: "Upstream supplier latency exceeded 5s for 11 minutes. Cache returned stale pages while recovering.",
      resolved: true
    }
  ],
  links: [
    { label: "App", url: "./index.html" },
    { label: "Home", url: "../index.html" }
  ]
};
