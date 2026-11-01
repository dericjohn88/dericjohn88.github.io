const STORAGE_KEY = "private-bible-plan-v1";
const DAY_MIN = "2026-01-01";
const DAY_MAX = "2026-12-31";
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
  startDate: "2026-01-01",
  readingDate: "2026-01-01",
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

const sectionRows = document.getElementById("sectionRows");
const addSectionRowBtn = document.getElementById("addSectionRowBtn");
const presetFourBtn = document.getElementById("presetFourBtn");
const presetTenBtn = document.getElementById("presetTenBtn");
const clearSectionRowsBtn = document.getElementById("clearSectionRowsBtn");
const planNameInput = document.getElementById("planNameInput");
const planDateInput = document.getElementById("planDateInput");
const readingDateInput = document.getElementById("readingDateInput");
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
const speakQueueBtn = document.getElementById("speakQueueBtn");
const pauseBtn = document.getElementById("pauseBtn");
const stopBtn = document.getElementById("stopBtn");
const planStatus = document.getElementById("planStatus");
const clearPlanBtn = document.getElementById("clearPlanBtn");
const newPlanBtn = document.getElementById("newPlanBtn");
const dropZone = document.getElementById("dropZone");
const textFileInput = document.getElementById("textFileInput");
const parserModeSelect = document.getElementById("parserModeSelect");
const parseTextBtn = document.getElementById("parseTextBtn");
const downloadJsonBtn = document.getElementById("downloadJsonBtn");
const importJsonBtn = document.getElementById("importJsonBtn");
const converterPreview = document.getElementById("converterPreview");
const converterSummary = document.getElementById("converterSummary");

let uploadedText = "";
let parsedConverterEntries = [];
let lastParseStats = { total: 0, parsed: 0, skipped: 0, mode: "line" };

const BOOK_OPTIONS_HTML = BOOKS.map((book) => `<option value="${book}">${book}</option>`).join("");
const FOUR_SECTION_PRESET = ["Genesis", "Matthew", "Psalms", "Proverbs"];
const TEN_SECTION_PRESET = [
  "Genesis",
  "Exodus",
  "Joshua",
  "Psalms",
  "Proverbs",
  "Isaiah",
  "Matthew",
  "Acts",
  "Romans",
  "Revelation"
];

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

  if (entry.readbackText?.trim()) {
    return `${entry.book} ${entry.chapter}:${entry.fromVerse}-${entry.toVerse}\n\n${entry.readbackText.trim()}`;
  }

  return `"${entry.book} ${entry.chapter}:${entry.fromVerse}-${entry.toVerse}"\n\nRead the passage prayerfully. Note: ${entry.note || "Keep a simple observation."}`;
}

function getReadbackText(entry) {
  if (!entry) {
    return "";
  }

  const custom = entry.readbackText?.trim();
  if (custom) {
    return `${entry.book} ${entry.chapter}:${entry.fromVerse}-${entry.toVerse}. ${custom}`;
  }

  return `${entry.book} ${entry.chapter}:${entry.fromVerse}-${entry.toVerse}. ${entry.note || "Keep reading."}`;
}

function getTodaysReadList(plan) {
  if (!plan) {
    return [];
  }

  const entries = Array.isArray(plan.entries) ? plan.entries : [];
  const selectionDate = readingDateInput.value || plan.readingDate || plan.startDate || DAY_MIN;

  if (entries.length) {
    const hasDayNumber = entries.some((entry) => Number.isInteger(entry.dayNumber));
    if (hasDayNumber) {
      const startDate = plan.startDate || DAY_MIN;
      const currentDate = selectionDate || startDate;
      const dayNumber = Math.max(1, getDayOffset(currentDate) - getDayOffset(startDate) + 1);
      const dayEntries = entries.filter((entry) => Number(entry.dayNumber) === dayNumber);
      if (dayEntries.length) {
        return dayEntries;
      }
      return [];
    }

    return entries;
  }

  return getQueuedEntriesFromDate(plan, selectionDate);
}

function parsePlanLine(line) {
  const parts = line.split("|").map((part) => part.trim());
  const reference = parts[0] || "";
  const note = parts[1] || "Daily reflection for this passage.";
  const readbackText = parts[2] || "";

  const referenceMatch = reference.match(/^(.+?)\s+(\d+):(\d+)(?:-(\d+))?$/);
  if (!referenceMatch) {
    return null;
  }

  const book = referenceMatch[1].trim();
  const chapter = Number(referenceMatch[2]);
  const fromVerse = Number(referenceMatch[3]);
  const toVerse = Number(referenceMatch[4] || referenceMatch[3]);
  if (!BOOKS.includes(book) || !chapter || !fromVerse || !toVerse || toVerse < fromVerse) {
    return null;
  }

  return {
    id: createEntryId(),
    book,
    chapter,
    fromVerse,
    toVerse,
    note,
    readbackText,
    complete: false
  };
}

function parseTextToEntries(text) {
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"));

  return lines.map(parsePlanLine).filter(Boolean);
}

function parseDayBlocksToEntries(text) {
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"));

  const entries = [];
  let currentDay = null;

  lines.forEach((line) => {
    const dayMatch = line.match(/^day\s+(\d+)$/i);
    if (dayMatch) {
      currentDay = Number(dayMatch[1]);
      return;
    }

    const parsed = parsePlanLine(line);
    if (parsed) {
      if (currentDay !== null) {
        parsed.dayNumber = currentDay;
      }
      entries.push(parsed);
    }
  });

  return entries;
}

function parseTextByMode(text, mode) {
  const cleanedLines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"));

  const entries = mode === "day" ? parseDayBlocksToEntries(text) : parseTextToEntries(text);
  return {
    entries,
    total: cleanedLines.length,
    parsed: entries.length,
    skipped: Math.max(0, cleanedLines.length - entries.length)
  };
}

function updateConverterPreview() {
  if (!parsedConverterEntries.length) {
    converterSummary.textContent = "No parsed entries";
    converterPreview.textContent = "No parsed data yet.";
    return;
  }

  converterSummary.textContent = `${lastParseStats.parsed} parsed · ${lastParseStats.skipped} skipped · mode: ${lastParseStats.mode}`;
  const previewData = parsedConverterEntries.slice(0, 10).map((entry) => ({
    reference: `${entry.book} ${entry.chapter}:${entry.fromVerse}-${entry.toVerse}`,
    note: entry.note,
    readbackText: entry.readbackText,
    dayNumber: entry.dayNumber ?? null
  }));

  converterPreview.textContent = JSON.stringify(previewData, null, 2);
}

function handleFileSelection(file) {
  if (!file) {
    return;
  }

  if (!file.name.toLowerCase().endsWith(".txt")) {
    converterSummary.textContent = "Please upload a .txt file";
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    uploadedText = String(reader.result || "");
    parsedConverterEntries = [];
    lastParseStats = { total: 0, parsed: 0, skipped: 0, mode: parserModeSelect?.value || "line" };
    converterSummary.textContent = `${file.name} loaded`;
    converterPreview.textContent = uploadedText.slice(0, 1500) || "File is empty.";
  };
  reader.readAsText(file);
}

function parseUploadedText() {
  const mode = parserModeSelect?.value || "line";
  const result = parseTextByMode(uploadedText, mode);
  parsedConverterEntries = result.entries;
  lastParseStats = {
    total: result.total,
    parsed: result.parsed,
    skipped: result.skipped,
    mode
  };
  updateConverterPreview();
}

function downloadParsedJson() {
  if (!parsedConverterEntries.length) {
    converterSummary.textContent = "Parse text before downloading JSON";
    return;
  }

  const payload = {
    generatedAt: new Date().toISOString(),
    parserMode: lastParseStats.mode,
    count: parsedConverterEntries.length,
    entries: parsedConverterEntries
  };

  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "bible-reading-entries.json";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function importParsedEntriesToPlan() {
  const plan = getCurrentPlan();
  if (!plan || !parsedConverterEntries.length) {
    converterSummary.textContent = "Nothing to import";
    return;
  }

  plan.entries.push(...parsedConverterEntries.map((entry) => ({ ...entry, id: createEntryId() })));
  state.selectedPassageId = plan.entries[plan.entries.length - 1]?.id || null;
  savePlans();
  renderAll();
  converterSummary.textContent = `${parsedConverterEntries.length} entries imported`;
}

function createSectionRow(initial = {}) {
  const wrapper = document.createElement("div");
  wrapper.className = "section-row";
  wrapper.innerHTML = `
    <div class="section-row-head">
      <strong>Section</strong>
      <button type="button" class="button secondary remove-section-btn">Remove</button>
    </div>
    <div class="field-grid compact">
      <label>
        Book
        <select class="section-book">${BOOK_OPTIONS_HTML}</select>
      </label>
      <label>
        Chapter
        <input class="section-chapter" type="number" min="1" value="${Number(initial.chapter) || 1}" />
      </label>
      <label>
        From verse
        <input class="section-from" type="number" min="1" value="${Number(initial.fromVerse) || 1}" />
      </label>
      <label>
        To verse
        <input class="section-to" type="number" min="1" value="${Number(initial.toVerse) || 10}" />
      </label>
    </div>
    <div class="field-grid single">
      <label>
        Reading note
        <input class="section-note" type="text" placeholder="Example: Pray before reading and meditate on the theme." value="${initial.note || ""}" />
      </label>
    </div>
    <div class="field-grid single">
      <label>
        Personal readback text (optional)
        <textarea class="section-readback" rows="3" placeholder="Paste or write what you want read back.">${initial.readbackText || ""}</textarea>
      </label>
    </div>
  `;

  const select = wrapper.querySelector(".section-book");
  select.value = BOOKS.includes(initial.book) ? initial.book : "John";

  wrapper.querySelector(".remove-section-btn").addEventListener("click", () => {
    wrapper.remove();
    refreshSectionLabels();
    ensureAtLeastOneSection();
  });

  sectionRows.appendChild(wrapper);
  refreshSectionLabels();
}

function refreshSectionLabels() {
  sectionRows.querySelectorAll(".section-row").forEach((row, index) => {
    const label = row.querySelector(".section-row-head strong");
    if (label) {
      label.textContent = `Section ${index + 1}`;
    }
  });
}

function clearSectionRows() {
  sectionRows.innerHTML = "";
}

function ensureAtLeastOneSection() {
  if (!sectionRows.querySelector(".section-row")) {
    createSectionRow();
  }
}

function resetSectionsFromBooks(books) {
  clearSectionRows();
  books.forEach((book) => createSectionRow({ book, chapter: 1, fromVerse: 1, toVerse: 10 }));
  ensureAtLeastOneSection();
}

function getSectionEntriesFromForm() {
  const rows = Array.from(sectionRows.querySelectorAll(".section-row"));
  return rows
    .map((row) => {
      const book = row.querySelector(".section-book")?.value || "";
      const chapter = Number(row.querySelector(".section-chapter")?.value) || 1;
      const fromVerse = Number(row.querySelector(".section-from")?.value) || 1;
      const toVerseRaw = Number(row.querySelector(".section-to")?.value);
      const toVerse = toVerseRaw || fromVerse;
      const note = row.querySelector(".section-note")?.value?.trim() || "Daily reflection for this passage.";
      const readbackText = row.querySelector(".section-readback")?.value?.trim() || "";

      if (!BOOKS.includes(book) || chapter < 1 || fromVerse < 1 || toVerse < fromVerse) {
        return null;
      }

      return {
        id: createEntryId(),
        book,
        chapter,
        fromVerse,
        toVerse,
        note,
        readbackText,
        complete: false
      };
    })
    .filter(Boolean);
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

function getDayOffset(dateString) {
  const start = new Date(`${DAY_MIN}T00:00:00`);
  const current = new Date(`${dateString}T00:00:00`);
  const diff = current.getTime() - start.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

function getQueuedEntriesFromDate(plan, dateString) {
  if (!plan || !dateString) {
    return [];
  }

  const dayIndex = Math.max(0, getDayOffset(dateString));
  const template = PLAN_TEMPLATES[plan.template || "plan1"] || PLAN_TEMPLATES.plan1;

  if (dayIndex >= 365) {
    return [];
  }

  const dailyBlocks = [
    { book: "Genesis", chapter: 1, fromVerse: 1, toVerse: 25, note: "Creation and the beginning of the covenant story." },
    { book: "Matthew", chapter: 1, fromVerse: 1, toVerse: 18, note: "The incarnation and the promise fulfilled." },
    { book: "Psalms", chapter: 1, fromVerse: 1, toVerse: 6, note: "Reflect on the righteous life." },
    { book: "Proverbs", chapter: 1, fromVerse: 1, toVerse: 9, note: "Wisdom for everyday decisions." }
  ];

  if (plan.template === "plan2") {
    const rotation = [
      { book: "Romans", chapter: 1, fromVerse: 1, toVerse: 17, note: "Epistles section." },
      { book: "Genesis", chapter: 1, fromVerse: 1, toVerse: 20, note: "Law section." },
      { book: "Joshua", chapter: 1, fromVerse: 1, toVerse: 18, note: "History section." },
      { book: "Psalms", chapter: 23, fromVerse: 1, toVerse: 6, note: "Psalms section." },
      { book: "Job", chapter: 1, fromVerse: 1, toVerse: 12, note: "Poetry section." },
      { book: "Isaiah", chapter: 1, fromVerse: 1, toVerse: 20, note: "Prophecy section." },
      { book: "Matthew", chapter: 1, fromVerse: 1, toVerse: 18, note: "Gospels section." }
    ];
    return [rotation[dayIndex % rotation.length]];
  }

  if (plan.template === "plan3") {
    const wideRead = [
      { book: "Genesis", chapter: 1, fromVerse: 1, toVerse: 25, note: "Continue the cover-to-cover reading plan." },
      { book: "Genesis", chapter: 2, fromVerse: 1, toVerse: 25, note: "Continue the beginning of creation." },
      { book: "Genesis", chapter: 3, fromVerse: 1, toVerse: 24, note: "Reflect on the fall and promise." },
      { book: "Matthew", chapter: 1, fromVerse: 1, toVerse: 25, note: "The promised King arrives." }
    ];
    return [wideRead[dayIndex % wideRead.length]];
  }

  return [dailyBlocks[dayIndex % dailyBlocks.length]];
}

function renderSelectedPassage() {
  const plan = getCurrentPlan();
  const readList = getTodaysReadList(plan);
  const selected =
    readList.find((entry) => entry.id === state.selectedPassageId) ||
    readList[0] ||
    plan?.entries.find((entry) => entry.id === state.selectedPassageId) ||
    plan?.entries[0];

  if (!selected) {
    selectedPassageTitle.textContent = "No passage selected";
    selectedPassageText.textContent = "No reading blocks found for the selected day. Change the reading date or import/add entries for that day.";
    return;
  }

  const passage = selected.book
    ? selected
    : { book: selected.book, chapter: selected.chapter, fromVerse: selected.fromVerse, toVerse: selected.toVerse, note: selected.note };

  selectedPassageTitle.textContent = `${passage.book} ${passage.chapter}:${passage.fromVerse}-${passage.toVerse}`;
  selectedPassageText.textContent = getPassageTemplate(passage);
}

function renderPlanMeta() {
  const plan = getCurrentPlan();
  activePlanTitle.textContent = plan ? plan.name : "No active plan";
  planStatus.textContent = plan ? "Local only" : "Offline";

  if (!plan) {
    return;
  }

  planNameInput.value = plan.name;
  planDateInput.value = plan.startDate || DAY_MIN;
  readingDateInput.value = plan.readingDate || DAY_MIN;
  readingDateInput.min = DAY_MIN;
  readingDateInput.max = DAY_MAX;
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
  planDateInput.value = plan.startDate || DAY_MIN;
  readingDateInput.value = plan.readingDate || DAY_MIN;
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
  const readList = getTodaysReadList(plan);
  const selected =
    readList.find((entry) => entry.id === state.selectedPassageId) ||
    readList[0] ||
    plan?.entries.find((entry) => entry.id === state.selectedPassageId) ||
    plan?.entries[0];
  if (!selected) return;

  if (state.speech) {
    window.speechSynthesis.cancel();
  }

  const text = getReadbackText(selected);
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

function speakTodaysQueue() {
  if (!("speechSynthesis" in window)) {
    selectedPassageText.textContent = "Text-to-speech is not supported in this browser.";
    return;
  }

  const plan = getCurrentPlan();
  const readList = getTodaysReadList(plan);
  if (!readList.length) {
    selectedPassageText.textContent = "No reading blocks available for readback.";
    return;
  }

  if (state.speech) {
    window.speechSynthesis.cancel();
  }

  const text = readList.map((entry) => getReadbackText(entry)).join(" Next reading block. ");
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

readingDateInput.addEventListener("change", () => {
  const plan = getCurrentPlan();
  if (!plan) return;
  plan.readingDate = readingDateInput.value || DAY_MIN;
  savePlans();
  renderAll();
});

function resetPlan() {
  const plan = getCurrentPlan();
  if (!plan) return;
  plan.entries = [];
  plan.startDate = DAY_MIN;
  plan.readingDate = DAY_MIN;
  savePlans();
  renderAll();
}

function addNewPlan() {
  const templateKey = planTemplateSelect.value || "plan1";
  const template = PLAN_TEMPLATES[templateKey] || PLAN_TEMPLATES.plan1;
  const plan = {
    id: createPlanId(),
    name: `${template.label.replace(" – ", " ")}`,
    startDate: DAY_MIN,
    readingDate: DAY_MIN,
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

  const entries = getSectionEntriesFromForm();
  if (!entries.length) {
    selectedPassageText.textContent = "No valid sections found. Update section fields and try again.";
    return;
  }

  plan.name = planNameInput.value.trim() || plan.name;
  plan.startDate = planDateInput.value || plan.startDate || DAY_MIN;
  plan.readingDate = readingDateInput.value || plan.readingDate || DAY_MIN;
  plan.template = planTemplateSelect.value || plan.template || "plan1";
  plan.entries.push(...entries);
  state.selectedPassageId = entries[0]?.id || plan.entries[0]?.id || null;
  savePlans();
  renderAll();
  resetSectionsFromBooks(entries.map((entry) => entry.book));
});

clearPlanBtn.addEventListener("click", resetPlan);
newPlanBtn.addEventListener("click", addNewPlan);

speakBtn.addEventListener("click", speakCurrentPassage);
speakQueueBtn.addEventListener("click", speakTodaysQueue);
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

dropZone?.addEventListener("click", () => textFileInput?.click());
dropZone?.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    textFileInput?.click();
  }
});

dropZone?.addEventListener("dragover", (event) => {
  event.preventDefault();
  dropZone.classList.add("active");
});

dropZone?.addEventListener("dragleave", () => {
  dropZone.classList.remove("active");
});

dropZone?.addEventListener("drop", (event) => {
  event.preventDefault();
  dropZone.classList.remove("active");
  const file = event.dataTransfer?.files?.[0];
  handleFileSelection(file);
});

textFileInput?.addEventListener("change", () => {
  handleFileSelection(textFileInput.files?.[0]);
});

parseTextBtn?.addEventListener("click", parseUploadedText);
downloadJsonBtn?.addEventListener("click", downloadParsedJson);
importJsonBtn?.addEventListener("click", importParsedEntriesToPlan);

addSectionRowBtn?.addEventListener("click", () => createSectionRow());
presetFourBtn?.addEventListener("click", () => resetSectionsFromBooks(FOUR_SECTION_PRESET));
presetTenBtn?.addEventListener("click", () => resetSectionsFromBooks(TEN_SECTION_PRESET));
clearSectionRowsBtn?.addEventListener("click", () => {
  clearSectionRows();
  ensureAtLeastOneSection();
});

window.speechSynthesis?.addEventListener?.("voiceschanged", populateVoices);

function initialize() {
  state.plans = getSavedPlans();
  state.currentPlanId = state.plans[0]?.id || null;
  state.selectedPassageId = state.plans[0]?.entries[0]?.id || null;
  resetSectionsFromBooks(["John"]);
  hydrateNewPlanForm();
  renderAll();
  populateVoices();

  if (!readingDateInput.value) {
    readingDateInput.value = DAY_MIN;
  }

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js").catch(() => {
      // Keep the app functional even if service worker registration fails.
    });
  }
}

initialize();
