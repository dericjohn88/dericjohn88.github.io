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
