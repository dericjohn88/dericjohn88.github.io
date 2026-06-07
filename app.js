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

const config = window.siteConfig;

if (!config || !Array.isArray(config.tools) || config.tools.length === 0) {
  throw new Error("siteConfig.tools is required to render the landing page.");
}

const ownerConfig = Object.assign(
  {
    previewLabel: "Owner view",
    previewSummary: "Private diagnostics are only visible after Google authentication succeeds.",
    publicSummary: "Owner-only details stay hidden until you sign in with Google.",
  },
  config.owner
);

const firebaseConfig = Object.assign(
  {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
  },
  window.DJ_SITE_CONFIG && window.DJ_SITE_CONFIG.firebase,
  config.firebase
);

const toolGrid = document.getElementById("toolGrid");
const detailPanel = document.getElementById("detailPanel");
const statsGrid = document.getElementById("statsGrid");
const welcomeEyebrow = document.getElementById("welcomeEyebrow");
const ownerNote = document.getElementById("ownerNote");
const signInButton = document.getElementById("signInButton");
const signOutButton = document.getElementById("signOutButton");

let selectedToolSlug = config.tools[0].slug;
let authInstance = null;
let currentUser = null;

function isFirebaseConfigured() {
  return [
    firebaseConfig.apiKey,
    firebaseConfig.authDomain,
    firebaseConfig.projectId,
    firebaseConfig.messagingSenderId,
    firebaseConfig.appId,
  ].every((value) => Boolean(String(value || "").trim()));
}

function setWelcomeMessage(message) {
  welcomeEyebrow.textContent = message;
}

function setOwnerNote(message) {
  if (ownerNote) {
    ownerNote.textContent = message;
  }
}

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
  const privateList = currentUser
    ? tool.privateSurface
        .map((item) => `<li>${item}</li>`)
        .join("")
    : "<li>Sign in with Google to inspect owner-only diagnostics.</li>";

  detailPanel.innerHTML = `
    <div class="detail-header">
      <div class="detail-title">
        <div>
          <span class="detail-badge">${currentUser ? ownerConfig.previewLabel : "Public view"}</span>
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
        <span>${currentUser ? ownerConfig.previewSummary : "Not exposed in this public repository."}</span>
      </div>
    </div>
  `;
}

function renderOwnerPanel() {
  if (currentUser) {
    setWelcomeMessage(`Welcome ${currentUser.email || currentUser.displayName || "owner"}`);
    setOwnerNote(ownerConfig.previewSummary);
    signInButton.hidden = true;
    signOutButton.hidden = false;
    signInButton.disabled = false;
    signOutButton.disabled = false;
    return;
  }

  setWelcomeMessage("Welcome guest");
  signInButton.hidden = false;
  signOutButton.hidden = true;
  signOutButton.disabled = false;

  if (!isFirebaseConfigured()) {
    setOwnerNote("Public app summaries stay visible to everyone. Owner-only details appear after sign-in.");
    signInButton.disabled = true;
    signInButton.textContent = "Sign in with Google";
    return;
  }

  setOwnerNote(ownerConfig.publicSummary);
  signInButton.disabled = false;
  signInButton.textContent = "Sign in with Google";
}

async function handleSignIn() {
  if (!authInstance || !isFirebaseConfigured()) {
    return;
  }

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });

  try {
    await signInWithPopup(authInstance, provider);
  } catch (error) {
    const errorCode = error && error.code ? String(error.code) : "unknown-error";

    if (
      errorCode === "auth/popup-blocked" ||
      errorCode === "auth/cancelled-popup-request" ||
      errorCode === "unknown-error"
    ) {
      setOwnerNote("Finishing sign-in...");
      await signInWithRedirect(authInstance, provider);
      return;
    }

    setOwnerNote("Sign-in did not complete. Please try again.");
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
    renderOwnerPanel();
    renderDetail();
    return;
  }

  const firebaseApp = initializeApp(firebaseConfig);
  authInstance = getAuth(firebaseApp);

  try {
    await setPersistence(authInstance, browserLocalPersistence);
  } catch (error) {
    setOwnerNote("Sign-in is available, but this browser may not remember the session.");
  }

  try {
    await getRedirectResult(authInstance);
  } catch (error) {
    setOwnerNote("Sign-in did not complete. Please try again.");
  }

  onAuthStateChanged(authInstance, (user) => {
    currentUser = user || null;
    renderOwnerPanel();
    renderDetail();
  });
}

signInButton.addEventListener("click", () => {
  void handleSignIn();
});

signOutButton.addEventListener("click", () => {
  void handleSignOut();
});

renderStats();
renderTools();
renderOwnerPanel();
renderDetail();
void initializeFirebase();