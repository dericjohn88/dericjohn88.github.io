/**
 * Autotrader status/market data.
 * Update these values to refresh the public metrics page.
 */
window.autotraderStatus = {
  health: "healthy",
  status: "Operational",
  summary: "Autotrader pipeline is healthy. No incidents in the reporting window.",
  uptime: {
    percent: 99.97,
    last30Days: "1m 27s",
    lastIncident: "2026-05-08 12:04 AM"
  },
  traffic: {
    requestsLast24h: 342,
    requestsLast30d: 10241,
    uniqueUsersLast30d: 28
  },
  api: {
    callsLast24h: 1782,
    callsLast30d: 53621,
    errorsLast24h: 0,
    errorRate: "0.00%",
    p95Latency: "112ms"
  },
  daily: [
    { date: "05-24", percent: 100, requests: 338, calls: 1756 },
    { date: "05-25", percent: 100, requests: 341, calls: 1782 },
    { date: "05-26", percent: 100, requests: 335, calls: 1753 },
    { date: "05-27", percent: 100, requests: 345, calls: 1768 },
    { date: "05-28", percent: 100, requests: 339, calls: 1781 },
    { date: "05-29", percent: 100, requests: 337, calls: 1755 },
    { date: "05-30", percent: 99.8, requests: 349, calls: 1794 },
    { date: "05-31", percent: 100, requests: 342, calls: 1769 },
    { date: "06-01", percent: 100, requests: 340, calls: 1780 },
    { date: "06-02", percent: 100, requests: 338, calls: 1761 },
    { date: "06-03", percent: 100, requests: 347, calls: 1790 },
    { date: "06-04", percent: 100, requests: 344, calls: 1772 },
    { date: "06-05", percent: 100, requests: 336, calls: 1759 },
    { date: "06-06", percent: 100, requests: 343, calls: 1784 },
    { date: "06-07", percent: 100, requests: 338, calls: 1761 },
    { date: "06-08", percent: 100, requests: 345, calls: 1778 },
    { date: "06-09", percent: 100, requests: 340, calls: 1762 },
    { date: "06-10", percent: 100, requests: 337, calls: 1755 },
    { date: "06-11", percent: 100, requests: 342, calls: 1768 },
    { date: "06-12", percent: 100, requests: 344, calls: 1771 },
    { date: "06-13", percent: 100, requests: 339, calls: 1764 },
    { date: "06-14", percent: 100, requests: 341, calls: 1779 },
    { date: "06-15", percent: 100, requests: 345, calls: 1782 },
    { date: "06-16", percent: 100, requests: 337, calls: 1761 },
    { date: "06-17", percent: 100, requests: 342, calls: 1773 },
    { date: "06-18", percent: 100, requests: 348, calls: 1789 },
    { date: "06-19", percent: 100, requests: 336, calls: 1754 },
    { date: "06-20", percent: 100, requests: 343, calls: 1776 },
    { date: "06-21", percent: 100, requests: 341, calls: 1761 },
    { date: "06-22", percent: 100, requests: 344, calls: 1775 }
  ],
  incidents: [
    {
      date: "2026-05-08",
      severity: "minor",
      title: "Delayed backtest job",
      detail: "Scheduler queue stalled for 6 minutes. Auto-retry cleared the backlog after queue drain.",
      resolved: true
    }
  ],
  links: [
    { label: "App", url: "./index.html" },
    { label: "Home", url: "../index.html" }
  ]
};
