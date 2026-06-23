/**
 * F3 Workout Randomizer status/market data.
 * Update these values to refresh the public metrics page.
 */
window.f3WorkoutRandomizerStatus = {
  health: "healthy",
  status: "Operational",
  summary: "F3 Workout Randomizer is active. Workout generation and history queries are stable.",
  uptime: {
    percent: 99.98,
    last30Days: "0m 42s",
    lastIncident: "2026-05-01 04:51 PM"
  },
  traffic: {
    requestsLast24h: 724,
    requestsLast30d: 21658,
    uniqueUsersLast30d: 49
  },
  api: {
    callsLast24h: 3915,
    callsLast30d: 117663,
    errorsLast24h: 1,
    errorRate: "0.03%",
    p95Latency: "148ms"
  },
  daily: [
    { date: "05-24", percent: 100, requests: 710, calls: 3898 },
    { date: "05-25", percent: 100, requests: 718, calls: 3912 },
    { date: "05-26", percent: 100, requests: 705, calls: 3889 },
    { date: "05-27", percent: 100, requests: 722, calls: 3920 },
    { date: "05-28", percent: 100, requests: 716, calls: 3904 },
    { date: "05-29", percent: 100, requests: 714, calls: 3901 },
    { date: "05-30", percent: 100, requests: 730, calls: 3928 },
    { date: "05-31", percent: 100, requests: 719, calls: 3911 },
    { date: "06-01", percent: 100, requests: 721, calls: 3919 },
    { date: "06-02", percent: 100, requests: 712, calls: 3902 },
    { date: "06-03", percent: 100, requests: 725, calls: 3931 },
    { date: "06-04", percent: 100, requests: 716, calls: 3910 },
    { date: "06-05", percent: 100, requests: 710, calls: 3898 },
    { date: "06-06", percent: 100, requests: 723, calls: 3923 },
    { date: "06-07", percent: 100, requests: 717, calls: 3905 },
    { date: "06-08", percent: 100, requests: 722, calls: 3919 },
    { date: "06-09", percent: 100, requests: 714, calls: 3901 },
    { date: "06-10", percent: 100, requests: 708, calls: 3893 },
    { date: "06-11", percent: 100, requests: 719, calls: 3912 },
    { date: "06-12", percent: 100, requests: 721, calls: 3915 },
    { date: "06-13", percent: 100, requests: 715, calls: 3905 },
    { date: "06-14", percent: 100, requests: 720, calls: 3918 },
    { date: "06-15", percent: 100, requests: 718, calls: 3908 },
    { date: "06-16", percent: 100, requests: 711, calls: 3899 },
    { date: "06-17", percent: 100, requests: 724, calls: 3925 },
    { date: "06-18", percent: 100, requests: 730, calls: 3934 },
    { date: "06-19", percent: 100, requests: 709, calls: 3887 },
    { date: "06-20", percent: 100, requests: 716, calls: 3902 },
    { date: "06-21", percent: 100, requests: 721, calls: 3916 },
    { date: "06-22", percent: 100, requests: 714, calls: 3898 }
  ],
  incidents: [
    {
      date: "2026-05-01",
      severity: "minor",
      title: "Exercise seed miss",
      detail: "Randomizer returned duplicate workout on initial load. Cache key updated to include timestamp salt.",
      resolved: true
    }
  ],
  links: [
    { label: "App", url: "./index.html" },
    { label: "Home", url: "../index.html" }
  ]
};
