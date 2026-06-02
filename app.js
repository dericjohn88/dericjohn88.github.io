import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  GoogleAuthProvider,
  browserLocalPersistence,
  getAuth,
  getRedirectResult,
  onAuthStateChanged,
  setPersistence,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { doc, getDoc, getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const defaultPublicBaseUrl = window.location.origin || "https://dericjohn88.github.io";

const tools = [
  {
    analytics: {
      averageLatencyMs: 182,
      errorRatePercent: 0.2,
      requests24h: 1240,
      uptimePercent: 99.98,
    },
    description: "This application provides personalized thawing recommendations and scheduling.",
    publicBaseUrl: defaultPublicBaseUrl,
    publicNotes: "Public-facing overview only. Private operator details can load from Firestore after sign-in.",
    name: "Personal Meal Reminder",
    slug: "meal-reminder",
    status: "healthy",
  },
];

const defaultConfig = {
  firebase: {
    apiKey: "REPLACE_WITH_FIREBASE_API_KEY",
    authDomain: "REPLACE_WITH_PROJECT_ID.firebaseapp.com",
    projectId: "REPLACE_WITH_PROJECT_ID",
    storageBucket: "REPLACE_WITH_PROJECT_ID.firebasestorage.app",
    messagingSenderId: "REPLACE_WITH_MESSAGING_SENDER_ID",
    appId: "REPLACE_WITH_APP_ID",
  },
  firestore: {
    privateToolsCollection: "privateTools",
  },
};

const siteConfig = {
  firebase: Object.assign({}, defaultConfig.firebase, window.DJ_SITE_CONFIG && window.DJ_SITE_CONFIG.firebase),
  firestore: Object.assign({}, defaultConfig.firestore, window.DJ_SITE_CONFIG && window.DJ_SITE_CONFIG.firestore),
};

const statsGrid = document.getElementById("statsGrid");
const toolGrid = document.getElementById("toolGrid");
const detailPanel = document.getElementById("detailPanel");
const ownerStatus = document.getElementById("ownerStatus");
const ownerNote = document.getElementById("ownerNote");
const ownerMeta = document.getElementById("ownerMeta");
const signInButton = document.getElementById("signInButton");
const signOutButton = document.getElementById("signOutButton");

let selectedSlug = tools[0] ? tools[0].slug : "";
let authInstance = null;
let firestoreInstance = null;
let currentUser = null;
const privateToolCache = new Map();

function formatNumber(value) {
  return Number(value || 0).toLocaleString("en-US");
}

function formatPercent(value) {
  return `${Number(value || 0).toFixed(2)}%`;
}

function isPlaceholder(value) {
  return !value || String(value).includes("REPLACE_WITH");
}

function isFirebaseConfigured() {
  const config = siteConfig.firebase;

  return [
    config.apiKey,
    config.authDomain,
    config.projectId,
    config.appId,
    config.messagingSenderId,
  ].every((value) => !isPlaceholder(value));
}

function setOwnerStatus(message, tone) {
  ownerStatus.textContent = message;
  ownerStatus.className = `owner-status owner-status--${tone}`;
}

function setOwnerMeta(message) {
  if (!ownerMeta) {
    return;
  }

  ownerMeta.textContent = message;
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
      note: "Current public entries in the registry.",
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
      void renderDetail(selectedSlug);
    });
  });
}

function renderLockedDetail(tool) {
  detailPanel.innerHTML = `
    <div class="detail-header">
      <div>
        <p class="eyebrow">Public View</p>
        <h3 class="locked-title">${tool.name}</h3>
        <p class="locked-copy">Sign in with Firebase Google auth to request the operator document for this tool.</p>
      </div>
      <span class="status-badge ${tool.status.toLowerCase()}">${tool.status}</span>
    </div>

    <div class="locked-grid">
      <div class="locked-highlight">
        <span class="meta-label">Public Summary</span>
        <span class="metric-value">${tool.description}</span>
      </div>
      <div class="locked-highlight">
        <span class="meta-label">Public Base URL</span>
        <span class="metric-value">${tool.publicBaseUrl}</span>
      </div>
      <div class="locked-highlight">
        <span class="meta-label">Owner Data</span>
        <span class="metric-value">Stored separately in Firestore and loaded only after authentication.</span>
      </div>
    </div>

    <p class="locked-note">${tool.publicNotes}</p>
  `;
}

function renderLoadingDetail(tool) {
  detailPanel.innerHTML = `
    <div class="detail-header">
      <div>
        <p class="eyebrow">Owner Panel</p>
        <h3>${tool.name}</h3>
      </div>
      <span class="status-badge ${tool.status.toLowerCase()}">${tool.status}</span>
    </div>
    <div class="detail-loading">Loading the protected tool document from Firestore...</div>
  `;
}

function renderUnavailableDetail(tool, message) {
  detailPanel.innerHTML = `
    <div class="detail-header">
      <div>
        <p class="eyebrow">Owner Panel</p>
        <h3>${tool.name}</h3>
        <p class="detail-copy">Firebase auth is active, but the private tool document is not available yet.</p>
      </div>
      <span class="status-badge ${tool.status.toLowerCase()}">${tool.status}</span>
    </div>

    <div class="locked-grid">
      <div class="locked-highlight">
        <span class="meta-label">Expected collection</span>
        <span class="metric-value">${siteConfig.firestore.privateToolsCollection}</span>
      </div>
      <div class="locked-highlight">
        <span class="meta-label">Expected document id</span>
        <span class="metric-value">${tool.slug}</span>
      </div>
      <div class="locked-highlight">
        <span class="meta-label">Result</span>
        <span class="metric-value">${message}</span>
      </div>
    </div>
  `;
}

function renderUnlockedDetail(tool, privateData) {
  const endpoints = Array.isArray(privateData.endpoints) ? privateData.endpoints : [];

  detailPanel.innerHTML = `
    <div class="detail-header">
      <div>
        <p class="eyebrow">Owner Panel</p>
        <h3>${tool.name}</h3>
        <p class="detail-copy">${privateData.summary || tool.description}</p>
      </div>
      <span class="status-badge ${tool.status.toLowerCase()}">${tool.status}</span>
    </div>

    <div class="detail-meta">
      <span class="meta-label">Slug</span>
      <span class="meta-value">${tool.slug}</span>
    </div>
    <div class="detail-meta">
      <span class="meta-label">Owner</span>
      <span class="meta-value">${privateData.owner || "Configured in Firestore"}</span>
    </div>
    <div class="detail-meta">
      <span class="meta-label">API Base URL</span>
      <span class="meta-value">${privateData.apiBaseUrl || tool.publicBaseUrl}</span>
    </div>
    <div class="detail-meta">
      <span class="meta-label">Last Updated</span>
      <span class="meta-value">${privateData.lastUpdated || "Not provided"}</span>
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
        ${endpoints.length
          ? endpoints
              .map(
                (endpoint) => `
                  <div class="endpoint-row">
                    <span class="endpoint-label">${endpoint.label || "Endpoint"}</span>
                    <span class="endpoint-path">${endpoint.path || ""}</span>
                  </div>
                `
              )
              .join("")
          : '<div class="endpoint-row"><span class="endpoint-label">No endpoints yet</span><span class="endpoint-path">Add an endpoints array to the Firestore document.</span></div>'}
      </div>
    </div>
  `;
}

async function loadPrivateTool(slug) {
  if (!firestoreInstance) {
    return { error: "Firestore is not initialized yet." };
  }

  if (privateToolCache.has(slug)) {
    return privateToolCache.get(slug);
  }

  try {
    const snapshot = await getDoc(doc(firestoreInstance, siteConfig.firestore.privateToolsCollection, slug));

    if (!snapshot.exists()) {
      const missing = { error: "The Firestore document does not exist yet." };
      privateToolCache.set(slug, missing);
      return missing;
    }

    const data = snapshot.data();
    privateToolCache.set(slug, data);
    return data;
  } catch (error) {
    return {
      error: "The Firestore read was blocked or failed. Check your Firebase Authentication setup and Firestore rules.",
    };
  }
}

async function renderDetail(slug) {
  const tool = tools.find((item) => item.slug === slug);

  if (!tool) {
    detailPanel.innerHTML = `
      <div class="detail-empty">
        Select a tool from the registry to inspect its details.
      </div>
    `;
    return;
  }

  if (!currentUser) {
    renderLockedDetail(tool);
    return;
  }

  renderLoadingDetail(tool);
  const privateData = await loadPrivateTool(slug);

  if (privateData && privateData.error) {
    renderUnavailableDetail(tool, privateData.error);
    return;
  }

  renderUnlockedDetail(tool, privateData || {});
}

function updateAuthUi() {
  signOutButton.hidden = !currentUser;
  signInButton.hidden = Boolean(currentUser);
  signInButton.disabled = !isFirebaseConfigured();

  if (currentUser) {
    setOwnerStatus(`Signed in as ${currentUser.email || currentUser.displayName || "owner"}.`, "success");
    ownerNote.textContent = "Firebase Authentication is active. Private tool documents now come from Firestore subject to your project rules.";
    setOwnerMeta(`Project: ${siteConfig.firebase.projectId} | Collection: ${siteConfig.firestore.privateToolsCollection} | Email: ${currentUser.email || "not available"} | UID: ${currentUser.uid || "not available"}`);
    signInButton.textContent = "Sign in with Google";
    return;
  }

  if (!isFirebaseConfigured()) {
    setOwnerStatus("Firebase owner layer is waiting for configuration.", "warning");
    ownerNote.textContent = "Fill in the Firebase project values in site-config.js, then the Google sign-in button will activate.";
    signInButton.textContent = "Firebase config required";
    return;
  }

  setOwnerStatus("Sign in with Google to load the owner panel from Firebase.", "neutral");
  ownerNote.textContent = "Public content remains visible. Private operator details come from Firestore only after authentication succeeds.";
  signInButton.textContent = "Sign in with Google";
}

async function handleSignIn() {
  if (!authInstance) {
    return;
  }

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });

  try {
    await signInWithPopup(authInstance, provider);
  } catch (error) {
    const errorCode = error && error.code ? String(error.code) : "unknown-error";

    if (errorCode === "unknown-error" || errorCode === "auth/popup-blocked" || errorCode === "auth/cancelled-popup-request") {
      setOwnerStatus("Popup sign-in was interrupted. Redirecting to Google sign-in...", "warning");
      ownerNote.textContent = "The browser refused the popup flow, so the site is falling back to redirect-based Firebase sign-in.";
      setOwnerMeta(`Project: ${siteConfig.firebase.projectId} | Collection: ${siteConfig.firestore.privateToolsCollection} | Fallback: redirect`);
      await signInWithRedirect(authInstance, provider);
      return;
    }

    setOwnerStatus(`Google sign-in did not complete (${errorCode}).`, "error");
    ownerNote.textContent = "Common fixes are enabling Google sign-in in Firebase Auth and adding your GitHub Pages domain as an authorized domain.";
    setOwnerMeta(`Project: ${siteConfig.firebase.projectId} | Collection: ${siteConfig.firestore.privateToolsCollection} | Last auth error: ${errorCode}`);
  }
}

async function handleSignOut() {
  if (!authInstance) {
    return;
  }

  await signOut(authInstance);
}

async function initializeFirebase() {
  if (!isFirebaseConfigured()) {
    setOwnerMeta("Add your Firebase project values in site-config.js to enable sign-in and Firestore reads.");
    updateAuthUi();
    await renderDetail(selectedSlug);
    return;
  }

  const firebaseApp = initializeApp(siteConfig.firebase);
  authInstance = getAuth(firebaseApp);
  firestoreInstance = getFirestore(firebaseApp);

  setOwnerMeta(`Project: ${siteConfig.firebase.projectId} | Collection: ${siteConfig.firestore.privateToolsCollection}`);

  try {
    await setPersistence(authInstance, browserLocalPersistence);
  } catch (error) {
    setOwnerStatus("Firebase loaded, but auth persistence could not be set in this browser.", "warning");
  }

  try {
    await getRedirectResult(authInstance);
  } catch (error) {
    const errorCode = error && error.code ? String(error.code) : "unknown-error";
    setOwnerStatus(`Firebase redirect sign-in did not complete (${errorCode}).`, "error");
    ownerNote.textContent = "Check the Firebase Authentication provider, authorized domains, and whether the Google popup/redirect returned to this site successfully.";
    setOwnerMeta(`Project: ${siteConfig.firebase.projectId} | Collection: ${siteConfig.firestore.privateToolsCollection} | Last auth error: ${errorCode}`);
  }

  onAuthStateChanged(authInstance, async (user) => {
    currentUser = user || null;
    if (!currentUser) {
      privateToolCache.clear();
    }
    updateAuthUi();
    await renderDetail(selectedSlug);
  });
}

signInButton.addEventListener("click", () => {
  void handleSignIn();
});

signOutButton.addEventListener("click", () => {
  void handleSignOut();
});

createStatCards();
renderTools();
await renderDetail(selectedSlug);
await initializeFirebase();