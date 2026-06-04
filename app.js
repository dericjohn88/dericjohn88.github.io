const config = window.siteConfig;

if (!config || !Array.isArray(config.tools) || config.tools.length === 0) {
  throw new Error("siteConfig.tools is required to render the landing page.");
}

const ownerStateKey = "api-site-owner-preview";
const toolGrid = document.getElementById("toolGrid");
const detailPanel = document.getElementById("detailPanel");
const statsGrid = document.getElementById("statsGrid");
const ownerStatus = document.getElementById("ownerStatus");
const ownerNote = document.getElementById("ownerNote");
const signInButton = document.getElementById("signInButton");
const signOutButton = document.getElementById("signOutButton");

let selectedToolSlug = config.tools[0].slug;
let ownerPreviewEnabled = window.localStorage.getItem(ownerStateKey) === "true";

function getStats(tools) {
  const healthyCount = tools.filter((tool) => tool.health === "healthy").length;
  const monitoringCount = tools.filter((tool) => tool.health !== "healthy").length;

  return [
    {
      label: "Applications",
      value: tools.length,
      footnote: "Public tool pages linked from this landing page"
    },
    {
      label: "Healthy now",
      value: healthyCount,
      footnote: `${healthyCount}/${tools.length} services currently operational`
    },
    {
      label: "Owner-only views",
      value: tools.length,
      footnote: "Each tool separates public information from private diagnostics"
    },
    {
      label: "Under watch",
      value: monitoringCount,
      footnote: monitoringCount ? "At least one service is being monitored" : "No active monitoring exceptions"
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
      renderTools();
      renderDetail();
    });

    toolGrid.append(button);
  });
}

function renderDetail() {
  const tool = config.tools.find((entry) => entry.slug === selectedToolSlug) ?? config.tools[0];
  const privateList = ownerPreviewEnabled
    ? tool.privateSurface
        .map((item) => `<li>${item}</li>`)
        .join("")
    : "<li>Sign in to the private environment to inspect live diagnostics.</li>";

  detailPanel.innerHTML = `
    <div class="detail-header">
      <div class="detail-title">
        <div>
          <span class="detail-badge">${ownerPreviewEnabled ? "Owner preview" : "Public view"}</span>
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
    <div class="detail-section">
      <h3>Private diagnostics</h3>
      <ul class="detail-list">${privateList}</ul>
    </div>
    <div class="detail-links">
      <a class="detail-link" href="${tool.publicPath}">
        <strong>Open public page</strong>
        <span>View the public-facing documentation and status split for ${tool.name}.</span>
      </a>
      <div class="detail-link">
        <strong>Private owner surface</strong>
        <span>${ownerPreviewEnabled ? config.owner.previewSummary : "Not exposed in this public repository."}</span>
      </div>
    </div>
  `;
}

function renderOwnerPanel() {
  ownerStatus.textContent = ownerPreviewEnabled
    ? `${config.owner.previewLabel} enabled. Internal categories are visible, but live private data stays out of the public repo.`
    : config.owner.publicSummary;
  ownerStatus.classList.toggle("owner-status--active", ownerPreviewEnabled);
  ownerNote.textContent = ownerPreviewEnabled ? config.owner.previewSummary : config.owner.publicSummary;
  signInButton.hidden = ownerPreviewEnabled;
  signOutButton.hidden = !ownerPreviewEnabled;
}

function setOwnerPreview(nextValue) {
  ownerPreviewEnabled = nextValue;
  window.localStorage.setItem(ownerStateKey, String(ownerPreviewEnabled));
  renderOwnerPanel();
  renderDetail();
}

signInButton.addEventListener("click", () => setOwnerPreview(true));
signOutButton.addEventListener("click", () => setOwnerPreview(false));

renderStats();
renderTools();
renderOwnerPanel();
renderDetail();