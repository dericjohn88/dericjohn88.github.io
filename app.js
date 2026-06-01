const tools = [
  {
    analytics: {
      averageLatencyMs: 182,
      errorRatePercent: 0.2,
      requests24h: 1240,
      uptimePercent: 99.98,
    },
    apiBaseUrl: "https://api.dericjohn.net",
    description: "This application provides personalized thawing recommendations and scheduling.",
    endpoints: [
      { label: "Health", path: "/api/health" },
      { label: "Tool List", path: "/api/tools" },
      { label: "Tool Detail", path: "/api/tools/meal-reminder" },
    ],
    lastUpdated: "June 2026",
    name: "Personal Meal Reminder",
    owner: "Deric John",
    slug: "meal-reminder",
    status: "healthy",
  },
];

const SESSION_KEY = "dj-owner-layer";
const defaultConfig = {
  googleClientId: "REPLACE_WITH_GOOGLE_CLIENT_ID.apps.googleusercontent.com",
  ownerEmail: "REPLACE_WITH_OWNER_EMAIL",
};
const ownerConfig = Object.assign({}, defaultConfig, window.DJ_SITE_CONFIG || {});

const statsGrid = document.getElementById("statsGrid");
const toolGrid = document.getElementById("toolGrid");
const detailPanel = document.getElementById("detailPanel");
const ownerStatus = document.getElementById("ownerStatus");
const ownerNote = document.getElementById("ownerNote");
const googleButton = document.getElementById("googleButton");
const signOutButton = document.getElementById("signOutButton");

let selectedSlug = tools[0] ? tools[0].slug : "";
let ownerSession = null;

function formatNumber(value) {
  return Number(value || 0).toLocaleString("en-US");
}

function formatPercent(value) {
  return `${Number(value || 0).toFixed(2)}%`;
}

function isPlaceholder(value) {
  return !value || String(value).includes("REPLACE_WITH");
}

function hasOwnerConfig() {
  return !isPlaceholder(ownerConfig.googleClientId) && !isPlaceholder(ownerConfig.ownerEmail);
}

function setOwnerStatus(message, tone) {
  ownerStatus.textContent = message;
  ownerStatus.className = `owner-status owner-status--${tone}`;
}

function saveOwnerSession(profile) {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(profile));
}

function readOwnerSession() {
  try {
    return JSON.parse(sessionStorage.getItem(SESSION_KEY) || "null");
  } catch (error) {
    return null;
  }
}

function clearOwnerSession() {
  sessionStorage.removeItem(SESSION_KEY);
}

function decodeCredential(token) {
  const payload = token.split(".")[1] || "";
  const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
  const json = decodeURIComponent(
    atob(base64)
      .split("")
      .map((character) => `%${(`00${character.charCodeAt(0).toString(16)}`).slice(-2)}`)
      .join("")
  );

  return JSON.parse(json);
}

function isAuthorizedEmail(email) {
  return String(email || "").trim().toLowerCase() === String(ownerConfig.ownerEmail || "").trim().toLowerCase();
}

function isOwnerUnlocked() {
  return Boolean(ownerSession && isAuthorizedEmail(ownerSession.email));
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
      note: "Current hosted entries in the registry.",
      value: formatNumber(summary.total),
    },
    {
      label: "Healthy",
      note: "Entries currently reporting a healthy state.",
      value: formatNumber(summary.healthy),
    },
    {
      label: "24h Requests",
      note: "Latest retained traffic snapshot for this dashboard.",
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
      selectedSlug = button.dataset.slug;
      renderDetail(selectedSlug);
    });
  });
}

function renderLockedDetail(tool) {
  detailPanel.innerHTML = `
    <div class="detail-header">
      <div>
        <p class="eyebrow">Owner Panel</p>
        <h3 class="locked-title">${tool.name}</h3>
        <p class="locked-copy">Public visitors can browse the registry, but the operator view requires the configured Google account.</p>
      </div>
      <span class="status-badge ${tool.status.toLowerCase()}">${tool.status}</span>
    </div>

    <div class="locked-grid">
      <div class="locked-highlight">
        <span class="meta-label">Public Summary</span>
        <span class="metric-value">${tool.description}</span>
      </div>
      <div class="locked-highlight">
        <span class="meta-label">Access</span>
        <span class="metric-value">Sign in above to reveal endpoints, base URL, and operator notes.</span>
      </div>
      <div class="locked-highlight">
        <span class="meta-label">Selected Slug</span>
        <span class="metric-value">${tool.slug}</span>
      </div>
    </div>

    <p class="locked-note">This layer improves day-to-day separation on a public site, but it is still client-side. Sensitive operations should live behind a protected backend.</p>
  `;
}

function renderUnlockedDetail(tool) {
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

function renderDetail(slug) {
  const tool = tools.find((item) => item.slug === slug);

  if (!tool) {
    detailPanel.innerHTML = `
      <div class="detail-empty">
        Select a tool from the registry to inspect its details.
      </div>
    `;
    return;
  }

  if (isOwnerUnlocked()) {
    renderUnlockedDetail(tool);
    return;
  }

  renderLockedDetail(tool);
}

function renderGoogleButton() {
  if (!window.google || !window.google.accounts || !window.google.accounts.id) {
    return;
  }

  googleButton.innerHTML = "";
  window.google.accounts.id.renderButton(googleButton, {
    theme: "filled_black",
    size: "large",
    text: "continue_with",
    shape: "pill",
    width: 280,
  });
}

function applyOwnerState(profile) {
  ownerSession = profile && isAuthorizedEmail(profile.email) ? profile : null;
  signOutButton.hidden = !ownerSession;
  renderDetail(selectedSlug);
}

function handleCredentialResponse(response) {
  try {
    const profile = decodeCredential(response.credential || "");

    if (!isAuthorizedEmail(profile.email)) {
      clearOwnerSession();
      applyOwnerState(null);
      setOwnerStatus("That Google account is not allowed for the owner panel.", "error");
      ownerNote.textContent = `Only ${ownerConfig.ownerEmail} can unlock the operator panel.`;
      return;
    }

    const sessionProfile = {
      email: profile.email,
      name: profile.name || "Owner",
      picture: profile.picture || "",
    };

    saveOwnerSession(sessionProfile);
    applyOwnerState(sessionProfile);
    setOwnerStatus(`Owner layer unlocked for ${sessionProfile.email}.`, "success");
    ownerNote.textContent = "The operator panel is open for this browser session. Use Sign out to lock it again.";
  } catch (error) {
    clearOwnerSession();
    applyOwnerState(null);
    setOwnerStatus("Google login could not be verified in the browser.", "error");
    ownerNote.textContent = "The public dashboard still works, but the operator panel stayed locked.";
  }
}

function initializeGoogleAccess(attempt) {
  if (!hasOwnerConfig()) {
    setOwnerStatus("Owner layer is available after site-config.js is filled in.", "warning");
    ownerNote.textContent = "Set googleClientId and ownerEmail in site-config.js to enable Google sign-in for the operator panel.";
    applyOwnerState(null);
    return;
  }

  const storedSession = readOwnerSession();

  if (storedSession && isAuthorizedEmail(storedSession.email)) {
    applyOwnerState(storedSession);
    setOwnerStatus(`Owner layer unlocked for ${storedSession.email}.`, "success");
    ownerNote.textContent = "The operator panel is open for this browser session.";
  } else {
    applyOwnerState(null);
    setOwnerStatus(`Sign in with ${ownerConfig.ownerEmail} to unlock the operator panel.`, "neutral");
    ownerNote.textContent = "Public content remains visible. The Google check only unlocks the owner-side panel.";
  }

  if (window.google && window.google.accounts && window.google.accounts.id) {
    window.google.accounts.id.initialize({
      client_id: ownerConfig.googleClientId,
      callback: handleCredentialResponse,
      auto_select: false,
      cancel_on_tap_outside: true,
    });
    renderGoogleButton();
    return;
  }

  if (attempt < 25) {
    setTimeout(() => initializeGoogleAccess(attempt + 1), 250);
    return;
  }

  setOwnerStatus("Google identity script did not load.", "error");
  ownerNote.textContent = "The public dashboard is still available, but owner sign-in could not be initialized in this browser session.";
}

signOutButton.addEventListener("click", () => {
  clearOwnerSession();
  applyOwnerState(null);

  if (window.google && window.google.accounts && window.google.accounts.id) {
    window.google.accounts.id.disableAutoSelect();
  }

  if (hasOwnerConfig()) {
    setOwnerStatus(`Sign in with ${ownerConfig.ownerEmail} to unlock the operator panel.`, "neutral");
    ownerNote.textContent = "Public content remains visible. Sign in again whenever you want to reopen the owner panel.";
  } else {
    setOwnerStatus("Owner layer is available after site-config.js is filled in.", "warning");
    ownerNote.textContent = "Set googleClientId and ownerEmail in site-config.js to enable Google sign-in for the operator panel.";
  }
});

createStatCards();
renderTools();
renderDetail(selectedSlug);
initializeGoogleAccess(0);