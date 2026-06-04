window.siteConfig = {
  owner: {
    previewLabel: "Owner preview mode",
    previewSummary: "This preview only reveals which details are private. It does not expose live credentials, secrets, or backend diagnostics.",
    publicSummary: "Private diagnostics are hidden by default. Use the preview to verify the split without exposing internal data."
  },
  tools: [
    {
      slug: "meals",
      name: "Meals API",
      health: "healthy",
      status: "Operational",
      publicRoute: "/api/meals",
      publicSummary: "Consumer-safe meal search and routing details for food-focused tools.",
      activity: "182 requests today",
      uptime: "99.98% over 30d",
      publicPath: "./meals/index.html",
      privateSurface: [
        "Provider quota monitoring",
        "Latency thresholds and alerts",
        "Trace correlation for failed lookups"
      ]
    },
    {
      slug: "trades",
      name: "Trades API",
      health: "healthy",
      status: "Operational",
      publicRoute: "/api/trades",
      publicSummary: "Trade request expectations, validation boundaries, and public response behavior.",
      activity: "96 requests today",
      uptime: "99.95% over 30d",
      publicPath: "./trades/index.html",
      privateSurface: [
        "Broker dependency health",
        "Order execution audit trails",
        "Rate-limit anomaly reporting"
      ]
    },
    {
      slug: "travel",
      name: "Travel API",
      health: "degraded",
      status: "Monitoring",
      publicRoute: "/api/travel",
      publicSummary: "Travel lookup routing with a clean public surface and separate operational oversight.",
      activity: "41 requests today",
      uptime: "99.32% over 30d",
      publicPath: "./travel/index.html",
      privateSurface: [
        "Supplier timeout diagnostics",
        "Caching effectiveness metrics",
        "Dependency recovery runbooks"
      ]
    }
  ]
};