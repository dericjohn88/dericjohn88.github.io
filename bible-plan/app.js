const STORAGE_KEY = "private-bible-plan-v1";
const BOOKS = [
  "Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther","Job","Psalms","Proverbs","Ecclesiastes","Song of Solomon","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi",
  "Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation"
];

const PLAN_TEMPLATES = {
  plan1: {
    label: "Plan 1 – Blended Daily Reading",
    summary: "Read a bit from the Old Testament, New Testament, Psalms, and Proverbs each day.",
    defaults: [
      { book: "Genesis", chapter: 1, fromVerse: 1, toVerse: 25, note: "Read the opening creation account and reflect on God's order." },
      { book: "Matthew", chapter: 1, fromVerse: 1, toVerse: 18, note: "Trace Christ's genealogy and the arrival of the promised King." },
      { book: "Psalms", chapter: 1, fromVerse: 1, toVerse: 6, note: "Pray through the Psalm and meditate on wise living." },
      { book: "Proverbs", chapter: 1, fromVerse: 1, toVerse: 9, note: "Capture the principles of wisdom for the day." }
    ]
  },
  plan2: {
    label: "Plan 2 – Seven-Section Rotation",
    summary: "Rotate through the Law, History, Psalms, Poetry, Prophecy, Gospels, and Epistles by day.",
    defaults: [
      { book: "Romans", chapter: 1, fromVerse: 1, toVerse: 17, note: "Begin the epistles section with the gospel's revelation." },
      { book: "Genesis", chapter: 1, fromVerse: 1, toVerse: 20, note: "Move through the Law and reflect on creation and covenant." },
      { book: "Joshua", chapter: 1, fromVerse: 1, toVerse: 18, note: "Read the history section and meditate on courage in obedience." },
      { book: "Psalms", chapter: 23, fromVerse: 1, toVerse: 6, note: "Let the psalms guide your heart into trust and peace." }
    ]
  },
  plan3: {
    label: "Plan 3 – Cover-to-Cover Order",
    summary: "Read straight through the Bible from Genesis to Revelation.",
    defaults: [
      { book: "Genesis", chapter: 1, fromVerse: 1, toVerse: 25, note: "Begin at the beginning and mark the creation narrative." },
      { book: "Genesis", chapter: 2, fromVerse: 1, toVerse: 25, note: "Consider the harmony of God's design and relationship." },
      { book: "Genesis", chapter: 3, fromVerse: 1, toVerse: 24, note: "Reflect on sin, consequence, and the promise of redemption." },
      { book: "Matthew", chapter: 1, fromVerse: 1, toVerse: 25, note: "Track the fulfillment of the covenant promise in the gospel." }
    ]
  }
};

const SAMPLE_PLAN = {
  id: "sample-plan",
  name: "One-Year Bible Reading Plan",
  startDate: new Date().toISOString().slice(0, 10),
  template: "plan1",
  entries: PLAN_TEMPLATES.plan1.defaults.map((entry, index) => ({
    id: `sample-entry-${index + 1}`,
    ...entry,
    complete: false
  }))
};

const state = {
  plans: [],
  currentPlanId: null,
  selectedPassageId: null,
  speech: null,
  voices: []
};

const bookSelect = document.getElementById("bookSelect");
const chapterInput = document.getElementById("chapterInput");
const fromVerseInput = document.getElementById("fromVerseInput");
const toVerseInput = document.getElementById("toVerseInput");
const noteInput = document.getElementById("noteInput");
const planNameInput = document.getElementById("planNameInput");
const planDateInput = document.getElementById("planDateInput");
const planTemplateSelect = document.getElementById("planTemplateSelect");
const planForm = document.getElementById("planForm");
const planList = document.getElementById("planList");
const activePlanTitle = document.getElementById("activePlanTitle");
const progressList = document.getElementById("progressList");
const progressSummary = document.getElementById("progressSummary");
const selectedPassageTitle = document.getElementById("selectedPassageTitle");
const selectedPassageText = document.getElementById("selectedPassageText");
const voiceSelect = document.getElementById("voiceSelect");
const rateInput = document.getElementById("rateInput");
const speakBtn = document.getElementById("speakBtn");
const pauseBtn = document.getElementById("pauseBtn");
const stopBtn = document.getElementById("stopBtn");
const planStatus = document.getElementById("planStatus");
const clearPlanBtn = document.getElementById("clearPlanBtn");
const newPlanBtn = document.getElementById("newPlanBtn");

function getSavedPlans() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [structuredClone(SAMPLE_PLAN)];
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length ? parsed : [structuredClone(SAMPLE_PLAN)];
  } catch (error) {
    return [structuredClone(SAMPLE_PLAN)];
  }
}

function savePlans() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.plans));
}

function createPlanId() {
  return `plan-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function createEntryId() {
  return `entry-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function getCurrentPlan() {
  return state.plans.find((plan) => plan.id === state.currentPlanId) || state.plans[0];
}

function setSelectedPassage(entryId) {
  state.selectedPassageId = entryId;
  renderSelectedPassage();
}

function getPassageTemplate(entry) {
  if (!entry) {
    return "";
  }

  return `"${entry.book} ${entry.chapter}:${entry.fromVerse}-${entry.toVerse}"\n\nRead the passage prayerfully. Note: ${entry.note || "Keep a simple observation."}`;
}

function renderBookOptions() {
  bookSelect.innerHTML = BOOKS.map((book) => `<option value="${book}">${book}</option>`).join("");
  bookSelect.value = "John";
}

function renderPlans() {
  if (!state.plans.length) {
    planList.innerHTML = '<p class="empty-state">No plans yet. Create one to begin.</p>';
    return;
  }

  planList.innerHTML = state.plans
    .map((plan) => `
      <button type="button" class="plan-item ${plan.id === state.currentPlanId ? "active" : ""}" data-plan-id="${plan.id}">
        <strong>${plan.name}</strong>
        <span>${plan.template ? PLAN_TEMPLATES[plan.template]?.label || "Custom" : "Custom"} · ${plan.entries.length} reading blocks</span>
      </button>
    `)
    .join("");

  planList.querySelectorAll(".plan-item").forEach((button) => {
    button.addEventListener("click", () => {
      state.currentPlanId = button.dataset.planId;
      state.selectedPassageId = getCurrentPlan()?.entries[0]?.id || null;
      renderAll();
    });
  });
}

function renderProgress() {
  const plan = getCurrentPlan();
  if (!plan) {
    progressList.innerHTML = '<p class="empty-state">No progress yet.</p>';
    progressSummary.textContent = "0 of 0 complete";
    return;
  }

  const total = plan.entries.length;
  const completed = plan.entries.filter((entry) => entry.complete).length;
  progressSummary.textContent = `${completed} of ${total} complete`;

  progressList.innerHTML = plan.entries
    .map((entry) => `
      <div class="progress-item ${entry.complete ? "done" : ""}" data-entry-id="${entry.id}">
        <div>
          <strong>${entry.book} ${entry.chapter}:${entry.fromVerse}-${entry.toVerse}</strong>
          <span>${entry.note || "Daily reflection"}</span>
        </div>
        <button type="button" aria-label="Toggle reading completion for ${entry.book} ${entry.chapter}">${entry.complete ? "Completed" : "Mark done"}</button>
      </div>
    `)
    .join("");

  progressList.querySelectorAll(".progress-item").forEach((item) => {
    const entryId = item.dataset.entryId;
    item.addEventListener("click", (event) => {
      if (event.target.tagName === "BUTTON") {
        const entry = plan.entries.find((block) => block.id === entryId);
        if (!entry) return;
        entry.complete = !entry.complete;
        savePlans();
        renderProgress();
      } else {
        setSelectedPassage(entryId);
      }
    });
  });
}

function renderSelectedPassage() {
  const plan = getCurrentPlan();
  const selection = plan?.entries.find((entry) => entry.id === state.selectedPassageId) || plan?.entries[0];

  if (!selection) {
    selectedPassageTitle.textContent = "No passage selected";
    selectedPassageText.textContent = "Choose a reading block to begin.";
    return;
  }

  selectedPassageTitle.textContent = `${selection.book} ${selection.chapter}:${selection.fromVerse}-${selection.toVerse}`;
  selectedPassageText.textContent = getPassageTemplate(selection);
}

function renderPlanMeta() {
  const plan = getCurrentPlan();
  activePlanTitle.textContent = plan ? plan.name : "No active plan";
  planStatus.textContent = plan ? "Local only" : "Offline";

  if (!plan) {
    return;
  }

  planNameInput.value = plan.name;
  planDateInput.value = plan.startDate || new Date().toISOString().slice(0, 10);
  planTemplateSelect.value = plan.template || "plan1";
}

function renderAll() {
  renderPlans();
  renderPlanMeta();
  renderSelectedPassage();
  renderProgress();
}

function hydrateNewPlanForm() {
  const plan = getCurrentPlan();
  if (!plan) return;
  planNameInput.value = plan.name;
  planDateInput.value = plan.startDate || new Date().toISOString().slice(0, 10);
  planTemplateSelect.value = plan.template || "plan1";
}

function populateVoices() {
  const voices = window.speechSynthesis ? window.speechSynthesis.getVoices() : [];
  state.voices = voices;

  voiceSelect.innerHTML = voices.length
    ? voices
        .map(
          (voice, index) => `<option value="${index}">${voice.name} (${voice.lang})</option>`
        )
        .join("")
    : '<option value="">No system voices available</option>';
}

function speakCurrentPassage() {
  if (!("speechSynthesis" in window)) {
    selectedPassageText.textContent = "Text-to-speech is not supported in this browser. You can still use uploaded audio later.";
    return;
  }

  const plan = getCurrentPlan();
  const selected = plan?.entries.find((entry) => entry.id === state.selectedPassageId) || plan?.entries[0];
  if (!selected) return;

  if (state.speech) {
    window.speechSynthesis.cancel();
  }

  const text = `${selected.book} ${selected.chapter}:${selected.fromVerse}-${selected.toVerse}. ${selected.note || "Keep reading."}`;
  const utterance = new SpeechSynthesisUtterance(text);
  const voices = window.speechSynthesis.getVoices();
  const chosenVoiceIndex = Number(voiceSelect.value);
  if (voices[chosenVoiceIndex]) {
    utterance.voice = voices[chosenVoiceIndex];
  }
  utterance.rate = Number(rateInput.value) || 1;
  utterance.pitch = 1;

  state.speech = utterance;
  window.speechSynthesis.speak(utterance);
}

function resetPlan() {
  const plan = getCurrentPlan();
  if (!plan) return;
  plan.entries = [];
  plan.startDate = new Date().toISOString().slice(0, 10);
  savePlans();
  renderAll();
}

function addNewPlan() {
  const templateKey = planTemplateSelect.value || "plan1";
  const template = PLAN_TEMPLATES[templateKey] || PLAN_TEMPLATES.plan1;
  const plan = {
    id: createPlanId(),
    name: `${template.label.replace(" – ", " ")}`,
    startDate: new Date().toISOString().slice(0, 10),
    template: templateKey,
    entries: template.defaults.map((entry, index) => ({
      id: `template-${templateKey}-${index + 1}`,
      ...entry,
      complete: false
    }))
  };
  state.plans.push(plan);
  state.currentPlanId = plan.id;
  state.selectedPassageId = plan.entries[0]?.id || null;
  savePlans();
  renderAll();
  hydrateNewPlanForm();
}

planForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const plan = getCurrentPlan();
  if (!plan) return;

  const book = bookSelect.value;
  const chapter = Number(chapterInput.value) || 1;
  const fromVerse = Number(fromVerseInput.value) || 1;
  const toVerse = Number(toVerseInput.value) || fromVerse;
  const entry = {
    id: createEntryId(),
    book,
    chapter,
    fromVerse,
    toVerse,
    note: noteInput.value.trim() || "Daily reflection for this passage.",
    complete: false
  };

  plan.name = planNameInput.value.trim() || plan.name;
  plan.startDate = planDateInput.value || plan.startDate;
  plan.template = planTemplateSelect.value || plan.template || "plan1";
  plan.entries.push(entry);
  state.selectedPassageId = entry.id;
  savePlans();
  renderAll();
  planForm.reset();
  bookSelect.value = "John";
  chapterInput.value = 1;
  fromVerseInput.value = 1;
  toVerseInput.value = 10;
  noteInput.value = "";
  planTemplateSelect.value = plan.template || "plan1";
});

clearPlanBtn.addEventListener("click", resetPlan);
newPlanBtn.addEventListener("click", addNewPlan);

speakBtn.addEventListener("click", speakCurrentPassage);
pauseBtn.addEventListener("click", () => {
  if (window.speechSynthesis) {
    window.speechSynthesis.pause();
  }
});
stopBtn.addEventListener("click", () => {
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
});

window.speechSynthesis?.addEventListener?.("voiceschanged", populateVoices);

function initialize() {
  state.plans = getSavedPlans();
  state.currentPlanId = state.plans[0]?.id || null;
  state.selectedPassageId = state.plans[0]?.entries[0]?.id || null;
  renderBookOptions();
  hydrateNewPlanForm();
  renderAll();
  populateVoices();
}

initialize();
