const config = window.siteConfig || { tools: [] };

if (!config || !Array.isArray(config.tools) || config.tools.length === 0) {
  throw new Error("siteConfig.tools is required to render the landing page.");
}

const toolGrid = document.getElementById("toolGrid");
const detailPanel = document.getElementById("detailPanel");
const statsGrid = document.getElementById("statsGrid");
const welcomeEyebrow = document.getElementById("welcomeEyebrow");
const authStatusEl = document.getElementById("authStatus");
const googleSignInBtn = document.getElementById("googleSignInBtn");
const googleSignOutBtn = document.getElementById("googleSignOutBtn");
const ownerOnlySection = document.getElementById("ownerOnlySection");
const ownerOnlyContent = document.getElementById("ownerOnlyContent");

let selectedToolSlug = config.tools[0].slug;
let currentUser = null;

const allowedEmails = (config.owner && Array.isArray(config.owner.allowedEmails)
  ? config.owner.allowedEmails
  : []).map((email) => email.trim().toLowerCase());

function isOwnerEmail(email) {
  return typeof email === "string" && allowedEmails.includes(email.trim().toLowerCase());
}

function isOwnerLoggedIn() {
  return Boolean(currentUser) && isOwnerEmail(currentUser.email);
}

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
      renderTools();
      renderDetail();
    });

    toolGrid.append(button);
  });
}

function renderPrivateBullets(tool) {
  if (!Array.isArray(tool.privateBullets) || tool.privateBullets.length === 0) {
    return "";
  }

  const items = tool.privateBullets
    .map((item) => `<li>${item}</li>`)
    .join("");

  return `<ul class="detail-list">${items}</ul>`;
}

function renderDetail() {
  const tool = config.tools.find((entry) => entry.slug === selectedToolSlug) ?? config.tools[0];
  const privateBlock = isOwnerLoggedIn() && tool.privateSummary
    ? `
      <div class="detail-section">
        <h3>Owner-only notes</h3>
        <p class="detail-copy">${tool.privateSummary}</p>
        ${renderPrivateBullets(tool)}
      </div>
    `
    : "";

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
    ${privateBlock}
    <div class="detail-links">
      <a class="detail-link" href="${tool.publicPath}">
        <strong>Open public page</strong>
        <span>View the public-facing documentation and status split for ${tool.name}.</span>
      </a>
    </div>
  `;
}

function renderPrivateContent() {
  if (!ownerOnlySection || !ownerOnlyContent) {
    return;
  }

  if (!isOwnerLoggedIn()) {
    ownerOnlySection.hidden = true;
    ownerOnlyContent.innerHTML = "";
    return;
  }

  ownerOnlySection.hidden = false;

  const privateCards = config.tools
    .filter((tool) => tool.privateSummary)
    .map(
      (tool) => `
        <article class="owner-card">
          <div class="detail-header">
            <div>
              <span class="detail-badge">${tool.slug}</span>
              <h3>${tool.name}</h3>
            </div>
          </div>
          <p class="detail-copy">${tool.privateSummary}</p>
          ${renderPrivateBullets(tool)}
        </article>
      `
    )
    .join("");

  ownerOnlyContent.innerHTML = `
    <p class="owner-note">${config.owner && config.owner.privateIntro ? config.owner.privateIntro : "This content is restricted to the approved owner account."}</p>
    <div class="owner-grid">
      ${privateCards || '<p class="detail-copy">No private summaries configured yet.</p>'}
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

function updateAuthUi() {
  if (welcomeEyebrow) {
    welcomeEyebrow.textContent = isOwnerLoggedIn() ? "Owner dashboard" : "Open dashboard";
  }

  if (!authStatusEl || !googleSignInBtn || !googleSignOutBtn) {
    return;
  }

  if (!window.firebase || !window.firebase.auth) {
    authStatusEl.textContent = "Firebase Auth is not configured yet. Add your values in site-config.js to enable Google sign-in.";
    googleSignInBtn.disabled = true;
    googleSignOutBtn.hidden = true;
    return;
  }

  if (currentUser && isOwnerLoggedIn()) {
    authStatusEl.textContent = `Signed in as ${currentUser.email}. Owner-only content is unlocked.`;
    googleSignInBtn.hidden = true;
    googleSignOutBtn.hidden = false;
  } else if (currentUser) {
    authStatusEl.textContent = `Signed in as ${currentUser.email}, but this account is not approved for private access.`;
    googleSignInBtn.hidden = true;
    googleSignOutBtn.hidden = false;
  } else {
    authStatusEl.textContent = config.owner && config.owner.accessMessage
      ? config.owner.accessMessage
      : "Public access is enabled. Restricted details unlock for your approved Google account.";
    googleSignInBtn.hidden = false;
    googleSignOutBtn.hidden = true;
  }
}

function initializeAuth() {
  if (!window.firebase || !window.firebase.auth) {
    return;
  }

  const auth = window.firebase.auth();
  const provider = new window.firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });

  auth.onAuthStateChanged((user) => {
    currentUser = user;
    updateAuthUi();
    renderPrivateContent();
    renderDetail();
  });

  googleSignInBtn.addEventListener("click", async () => {
    try {
      await auth.signInWithPopup(provider);
    } catch (error) {
      if (error && error.code === "auth/popup-blocked") {
        authStatusEl.textContent = "Popup was blocked. Please allow pop-ups and try sign-in again.";
        return;
      }

      authStatusEl.textContent = "Google sign-in failed. Please try again or confirm Firebase Auth is configured.";
    }
  });

  googleSignOutBtn.addEventListener("click", async () => {
    try {
      await auth.signOut();
    } catch (error) {
      authStatusEl.textContent = "Unable to sign out. Please try again.";
    }
  });
}

if (welcomeEyebrow) {
  welcomeEyebrow.textContent = isOwnerLoggedIn() ? "Owner dashboard" : "Open dashboard";
}

renderStats();
renderTools();
renderEmptyState();
renderPrivateContent();
updateAuthUi();
initializeAuth();
