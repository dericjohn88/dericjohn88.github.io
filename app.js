const config = window.siteConfig;

if (!config || !Array.isArray(config.tools) || config.tools.length === 0) {
  throw new Error("siteConfig.tools is required to render the landing page.");
}

const toolGrid = document.getElementById("toolGrid");
const detailPanel = document.getElementById("detailPanel");
const statsGrid = document.getElementById("statsGrid");
const welcomeEyebrow = document.getElementById("welcomeEyebrow");

let selectedToolSlug = config.tools[0].slug;
let currentDetailOpen = false;

function getStats(tools) {
  const healthyCount = tools.filter((tool) => tool.health === "healthy").length;
  const monitoringCount = tools.filter((tool) => tool.health !== "healthy").length;

  return [
    {
      label: "Applications",
      value: tools.length,
      footnote: "Projects with a dedicated dashboard page on this site"
    },
    {
      label: "Operational now",
      value: healthyCount,
      footnote: `${healthyCount}/${tools.length} apps currently operational`
    },
    {
      label: "Under watch",
      value: monitoringCount,
      footnote: monitoringCount
        ? "At least one app has open monitoring alerts"
        : "All apps passing health checks"
    },
    {
      label: "In development",
      value: tools.filter((tool) => tool.uptime === "In development").length,
      footnote: "Not yet deployed to production"
    }
  ];
}

function renderStats() {
  statsGrid.innerHTML = "";

  getStats(config.tools).forEach((stat) => {
    const article = document.createElement("article");
    article.className = "stat-card";
    article.innerHTML = `
      <p class="stat-label">${stat.label}</p>
      <div class="stat-value">${stat.value}</div>
      <p class="stat-footnote">${stat.footnote}</p>
    `;
    statsGrid.append(article);
  });
}

function renderTools() {
  toolGrid.innerHTML = "";

  config.tools.forEach((tool) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "tool-card";
    button.dataset.slug = tool.slug;
    button.setAttribute("aria-pressed", String(tool.slug === selectedToolSlug));

    if (tool.slug === selectedToolSlug) {
      button.classList.add("is-selected");
    }

    button.innerHTML = `
      <div class="tool-card-header">
        <span class="tool-tag">${tool.slug}</span>
        <div>
          <h3>${tool.name}</h3>
          <p class="tool-description">${tool.publicSummary}</p>
        </div>
      </div>
      <div class="tool-card-meta">
        <div>
          <span class="status-pill" data-health="${tool.health}">${tool.status}</span>
        </div>
        <p class="tool-meta">${tool.activity}</p>
      </div>
    `;

    button.addEventListener("click", () => {
      selectedToolSlug = tool.slug;
      currentDetailOpen = true;
      renderTools();
      renderDetail();
    });

    toolGrid.append(button);
  });
}

function renderDetail() {
  const tool =
    config.tools.find((entry) => entry.slug === selectedToolSlug) ??
    config.tools[0];

  detailPanel.innerHTML = `
    <div class="detail-header">
      <div class="detail-title">
        <div>
          <span class="detail-badge">${tool.status}</span>
          <h2>${tool.name}</h2>
        </div>
        <span class="status-pill" data-health="${tool.health}">${tool.status}</span>
      </div>
      <p class="detail-copy">${tool.publicSummary}</p>
    </div>
    <div class="detail-section">
      <h3>Public route</h3>
      <p class="detail-copy">${tool.publicRoute}</p>
      <p class="detail-copy">${tool.activity} · ${tool.uptime}</p>
    </div>
    <div class="detail-links">
      <a class="detail-link" href="${tool.publicPath}">
        <strong>Open public page</strong>
        <span>View the public-facing documentation and status split for ${tool.name}.</span>
      </a>
    </div>
  `;
}

function renderEmptyState() {
  detailPanel.innerHTML = `
    <div class="detail-header">
      <div class="detail-title">
        <h2>Select an application</h2>
      </div>
      <p class="detail-copy">Choose a tool from the list to see its public route, status, and activity.</p>
    </div>
  `;
}

renderStats();
renderTools();
renderEmptyState();
