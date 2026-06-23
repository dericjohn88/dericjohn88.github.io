/**
 * Meal Reminder status/market data.
 * Update these values to refresh the public metrics page.
 */
window.mealStatus = {
  health: "healthy",
  status: "Operational",
  summary: "Meal planning, shopping lists, and Novu push reminders are running.",
  uptime: {
    percent: 99.94,
    last30Days: "4m 12s",
    lastIncident: "2026-05-17 09:42 PM"
  },
  traffic: {
    requestsLast24h: 1284,
    requestsLast30d: 38417,
    uniqueUsersLast30d: 121
  },
  api: {
    callsLast24h: 6420,
    callsLast30d: 192108,
    errorsLast24h: 3,
    errorRate: "0.05%",
    p95Latency: "182ms"
  },
  daily: [
    { date: "05-24", percent: 100, requests: 1269, calls: 6397 },
    { date: "05-25", percent: 100, requests: 1270, calls: 6428 },
    { date: "05-26", percent: 100, requests: 1288, calls: 6419 },
    { date: "05-27", percent: 100, requests: 1287, calls: 6433 },
    { date: "05-28", percent: 100, requests: 1273, calls: 6443 },
    { date: "05-29", percent: 100, requests: 1270, calls: 6403 },
    { date: "05-30", percent: 99.7, requests: 1291, calls: 6408 },
    { date: "05-31", percent: 100, requests: 1286, calls: 6436 },
    { date: "06-01", percent: 100, requests: 1298, calls: 6400 },
    { date: "06-02", percent: 100, requests: 1278, calls: 6408 },
    { date: "06-03", percent: 100, requests: 1289, calls: 6436 },
    { date: "06-04", percent: 100, requests: 1277, calls: 6421 },
    { date: "06-05", percent: 100, requests: 1294, calls: 6413 },
    { date: "06-06", percent: 100, requests: 1275, calls: 6430 },
    { date: "06-07", percent: 100, requests: 1275, calls: 6435 },
    { date: "06-08", percent: 100, requests: 1293, calls: 6409 },
    { date: "06-09", percent: 100, requests: 1270, calls: 6441 },
    { date: "06-10", percent: 100, requests: 1271, calls: 6400 },
    { date: "06-11", percent: 100, requests: 1269, calls: 6422 },
    { date: "06-12", percent: 100, requests: 1275, calls: 6415 },
    { date: "06-13", percent: 99.8, requests: 1277, calls: 6418 },
    { date: "06-14", percent: 100, requests: 1278, calls: 6416 },
    { date: "06-15", percent: 100, requests: 1288, calls: 6412 },
    { date: "06-16", percent: 100, requests: 1280, calls: 6425 },
    { date: "06-17", percent: 100, requests: 1292, calls: 6439 },
    { date: "06-18", percent: 100, requests: 1292, calls: 6403 },
    { date: "06-19", percent: 100, requests: 1271, calls: 6397 },
    { date: "06-20", percent: 100, requests: 1273, calls: 6424 },
    { date: "06-21", percent: 100, requests: 1294, calls: 6406 },
    { date: "06-22", percent: 100, requests: 1298, calls: 6423 }
  ],
  incidents: [
    {
      date: "2026-05-17",
      severity: "minor",
      title: "Delayed reminder delivery",
      detail: "Novu provider queue backed up for 14 minutes. Resolved after provider retries caught up.",
      resolved: true
    },
    {
      date: "2026-04-02",
      severity: "major",
      title: "Shopping list sync failed",
      detail: "PostgREST rule change blocked write for anonymous sessions. Rolled back and patched auth mapping.",
      resolved: true
    }
  ],
  links: [
    { label: "App", url: "./index.html" },
    { label: "Home", url: "../index.html" }
  ]
};
