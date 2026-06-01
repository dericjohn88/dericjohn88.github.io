const tools = [
  {
    analytics: {
      averageLatencyMs: 182,
      errorRatePercent: 0.2,
      requests24h: 1240,
      uptimePercent: 99.98,
    },
    apiBaseUrl: "Pending external hosting target",
    description: "This application will provide personalized thawing recommendations and scheduling.",
    endpoints: [
      { label: "Health", path: "/_functions/health" },
      { label: "Tool List", path: "/_functions/tools" },
      { label: "Tool Detail", path: "/_functions/tool?slug=meal-reminder" },
    ],
    lastUpdated: "June 2026 migration snapshot",
    name: "Personal Meal Reminder",
    owner: "Deric John",
    slug: "meal-reminder",
    status: "healthy",
  },
];

const statsGrid = document.getElementById("statsGrid");
const toolGrid = document.getElementById("toolGrid");
const detailPanel = document.getElementById("detailPanel");

function formatNumber(value) {
  return Number(value || 0).toLocaleString("en-US");
}

function formatPercent(value) {
  return `${Number(value || 0).toFixed(2)}%`;
}

function getSummary() {
  return tools.reduce(
    (summary, tool) => {
      summary.total += 1;
      summary.requests24h += Number(tool.analytics && tool.analytics.requests24h ? tool.analytics.requests24h : 0);

      if (String(tool.status || "").toLowerCase() === "healthy") {
        summary.healthy += 1;
      }

      return summary;
    },
    { healthy: 0, requests24h: 0, total: 0 }
  );
}

function createStatCards() {
  const summary = getSummary();
  const cards = [
    {
      label: "Applications",
      note: "Current hosted entries translated from the Wix registry.",
      value: formatNumber(summary.total),
    },
    {
      label: "Healthy",
      note: "Entries currently marked as healthy.",
      value: formatNumber(summary.healthy),
    },
    {
      label: "24h Requests",
      note: "Static snapshot retained from the previous dashboard data.",
      value: formatNumber(summary.requests24h),
    },
  ];

  statsGrid.innerHTML = cards
    .map(
      (card) => `
        <article class="stat-card">
          <span class="stat-label">${card.label}</span>
          <div class="stat-value">${card.value}</div>
          <p class="stat-note">${card.note}</p>
        </article>
      `
    )
    .join("");
}

function createToolCard(tool) {
  return `
    <article class="tool-card">
      <div class="tool-header">
        <div>
          <h3>${tool.name}</h3>
          <p class="tool-description">${tool.description}</p>
        </div>
        <span class="status-badge ${tool.status.toLowerCase()}">${tool.status}</span>
      </div>
      <div class="metric-grid">
        <div class="metric-row">
          <span class="meta-label">Requests 24h</span>
          <span class="metric-value">${formatNumber(tool.analytics.requests24h)}</span>
        </div>
        <div class="metric-row">
          <span class="meta-label">Latency</span>
          <span class="metric-value">${formatNumber(tool.analytics.averageLatencyMs)} ms</span>
        </div>
        <div class="metric-row">
          <span class="meta-label">Error Rate</span>
          <span class="metric-value">${formatPercent(tool.analytics.errorRatePercent)}</span>
        </div>
        <div class="metric-row">
          <span class="meta-label">Uptime</span>
          <span class="metric-value">${formatPercent(tool.analytics.uptimePercent)}</span>
        </div>
      </div>
      <div class="tool-footer">
        <span class="slug-note">Slug: ${tool.slug}</span>
        <button class="button primary" type="button" data-slug="${tool.slug}">Inspect Tool</button>
      </div>
    </article>
  `;
}

function renderTools() {
  toolGrid.innerHTML = tools.map(createToolCard).join("");

  toolGrid.querySelectorAll("[data-slug]").forEach((button) => {
    button.addEventListener("click", () => {
      renderDetail(button.dataset.slug);
    });
  });
}

function renderDetail(slug) {
  const tool = tools.find((item) => item.slug === slug);

  if (!tool) {
    detailPanel.innerHTML = `
      <div class="detail-empty">
        Select a tool from the registry to inspect its migration details and endpoint inventory.
      </div>
    `;
    return;
  }

  detailPanel.innerHTML = `
    <div class="detail-header">
      <div>
        <p class="eyebrow">Selected Tool</p>
        <h3>${tool.name}</h3>
        <p class="detail-copy">${tool.description}</p>
      </div>
      <span class="status-badge ${tool.status.toLowerCase()}">${tool.status}</span>
    </div>

    <div class="detail-meta">
      <span class="meta-label">Slug</span>
      <span class="meta-value">${tool.slug}</span>
    </div>
    <div class="detail-meta">
      <span class="meta-label">Owner</span>
      <span class="meta-value">${tool.owner}</span>
    </div>
    <div class="detail-meta">
      <span class="meta-label">API Base URL</span>
      <span class="meta-value">${tool.apiBaseUrl}</span>
    </div>
    <div class="detail-meta">
      <span class="meta-label">Last Updated</span>
      <span class="meta-value">${tool.lastUpdated}</span>
    </div>

    <div class="detail-metrics">
      <article class="detail-metric-card">
        <span class="meta-label">Requests 24h</span>
        <div class="metric-value">${formatNumber(tool.analytics.requests24h)}</div>
      </article>
      <article class="detail-metric-card">
        <span class="meta-label">Latency</span>
        <div class="metric-value">${formatNumber(tool.analytics.averageLatencyMs)} ms</div>
      </article>
      <article class="detail-metric-card">
        <span class="meta-label">Error Rate</span>
        <div class="metric-value">${formatPercent(tool.analytics.errorRatePercent)}</div>
      </article>
      <article class="detail-metric-card">
        <span class="meta-label">Uptime</span>
        <div class="metric-value">${formatPercent(tool.analytics.uptimePercent)}</div>
      </article>
    </div>

    <div>
      <p class="eyebrow">Endpoints</p>
      <div class="endpoint-list">
        ${tool.endpoints
          .map(
            (endpoint) => `
              <div class="endpoint-row">
                <span class="endpoint-label">${endpoint.label}</span>
                <span class="endpoint-path">${endpoint.path}</span>
              </div>
            `
          )
          .join("")}
      </div>
    </div>
  `;
}

createStatCards();
renderTools();
renderDetail(tools[0] && tools[0].slug);