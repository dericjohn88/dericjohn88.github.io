const STORAGE_KEY = "private-bible-plan-v1";
const AUDIO_CACHE_KEY = "bible-app-audio-cache";
const DAY_MIN = "2026-01-01";
const DAY_MAX = "2026-12-31";
const BOOKS = [
  "Genesis",
  "Exodus",
  "Leviticus",
  "Numbers",
  "Deuteronomy",
  "Joshua",
  "Judges",
  "Ruth",
  "1 Samuel",
  "2 Samuel",
  "1 Kings",
  "2 Kings",
  "1 Chronicles",
  "2 Chronicles",
  "Ezra",
  "Nehemiah",
  "Esther",
  "Job",
  "Psalms",
  "Proverbs",
  "Ecclesiastes",
  "Song of Solomon",
  "Isaiah",
  "Jeremiah",
  "Lamentations",
  "Ezekiel",
  "Daniel",
  "Hosea",
  "Joel",
  "Amos",
  "Obadiah",
  "Jonah",
  "Micah",
  "Nahum",
  "Habakkuk",
  "Zephaniah",
  "Haggai",
  "Zechariah",
  "Malachi",
  "Matthew",
  "Mark",
  "Luke",
  "John",
  "Acts",
  "Romans",
  "1 Corinthians",
  "2 Corinthians",
  "Galatians",
  "Ephesians",
  "Philippians",
  "Colossians",
  "1 Thessalonians",
  "2 Thessalonians",
  "1 Timothy",
  "2 Timothy",
  "Titus",
  "Philemon",
  "Hebrews",
  "James",
  "1 Peter",
  "2 Peter",
  "1 John",
  "2 John",
  "3 John",
  "Jude",
  "Revelation",
];

// ESV Every Day Bible: 365 daily readings (Crossway)
// Each day has 4 readings: Old Testament, New Testament, Psalms, Proverbs
const ESV_EVERY_DAY_BIBLE = [
  ["Genesis 1:1-2:25","Matthew 1:1-2:12","Psalm 1:1-6","Proverbs 1:1-6"],
  ["Genesis 3:1-4:26","Matthew 2:13-3:6","Psalm 2:1-12","Proverbs 1:7-9"],
  ["Genesis 5:1-7:24","Matthew 3:7-4:11","Psalm 3:1-8","Proverbs 1:10-19"],
  ["Genesis 8:1-10:32","Matthew 4:12-25","Psalm 4:1-8","Proverbs 1:20-23"],
  ["Genesis 11:1-13:4","Matthew 5:1-26","Psalm 5:1-12","Proverbs 1:24-28"],
  ["Genesis 13:5-15:21","Matthew 5:27-48","Psalm 6:1-10","Proverbs 1:29-33"],
  ["Genesis 16:1-18:19","Matthew 6:1-24","Psalm 7:1-17","Proverbs 2:1-5"],
  ["Genesis 18:20-19:38","Matthew 6:25-7:14","Psalm 8:1-9","Proverbs 2:6-15"],
  ["Genesis 20:1-22:24","Matthew 7:15-29","Psalm 9:1-12","Proverbs 2:16-22"],
  ["Genesis 23:1-24:51","Matthew 8:1-17","Psalm 9:13-20","Proverbs 3:1-6"],
  ["Genesis 24:52-26:16","Matthew 8:18-34","Psalm 10:1-15","Proverbs 3:7-8"],
  ["Genesis 26:17-27:46","Matthew 9:1-17","Psalm 10:16-18","Proverbs 3:9-10"],
  ["Genesis 28:1-29:35","Matthew 9:18-38","Psalm 11:1-7","Proverbs 3:11-12"],
  ["Genesis 30:1-31:16","Matthew 10:1-25","Psalm 12:1-8","Proverbs 3:13-15"],
  ["Genesis 31:17-32:12","Matthew 10:26-11:6","Psalm 13:1-6","Proverbs 3:16-18"],
  ["Genesis 32:13-34:31","Matthew 11:7-30","Psalm 14:1-7","Proverbs 3:19-20"],
  ["Genesis 35:1-36:43","Matthew 12:1-21","Psalm 15:1-5","Proverbs 3:21-26"],
  ["Genesis 37:1-38:30","Matthew 12:22-45","Psalm 16:1-11","Proverbs 3:27-32"],
  ["Genesis 39:1-41:16","Matthew 12:46-13:23","Psalm 17:1-15","Proverbs 3:33-35"],
  ["Genesis 41:17-42:17","Matthew 13:24-46","Psalm 18:1-15","Proverbs 4:1-6"],
  ["Genesis 42:18-43:34","Matthew 13:47-14:12","Psalm 18:16-36","Proverbs 4:7-10"],
  ["Genesis 44:1-45:28","Matthew 14:13-36","Psalm 18:37-50","Proverbs 4:11-13"],
  ["Genesis 46:1-47:31","Matthew 15:1-28","Psalm 19:1-14","Proverbs 4:14-19"],
  ["Genesis 48:1-49:33","Matthew 15:29-16:12","Psalm 20:1-9","Proverbs 4:20-27"],
  ["Genesis 50:1-26","Exodus 1:1-2:10","Matthew 16:13-17:9","Psalm 21:1-13","Proverbs 5:1-6"],
  ["Exodus 2:11-3:22","Matthew 17:10-27","Psalm 22:1-18","Proverbs 5:7-14"],
  ["Exodus 4:1-5:21","Matthew 18:1-22","Psalm 22:19-31","Proverbs 5:15-21"],
  ["Exodus 5:22-7:24","Matthew 18:23-19:12","Psalm 23:1-6","Proverbs 5:22-23"],
  ["Exodus 7:25-9:35","Matthew 19:13-30","Psalm 24:1-10","Proverbs 6:1-5"],
  ["Exodus 10:1-12:13","Matthew 20:1-28","Psalm 25:1-15","Proverbs 6:6-11"],
  ["Exodus 12:14-13:16","Matthew 20:29-21:22","Psalm 25:16-22","Proverbs 6:12-15"],
  ["Exodus 13:17-15:18","Matthew 21:23-46","Psalm 26:1-12","Proverbs 6:16-19"],
  ["Exodus 15:19-17:7","Matthew 22:1-33","Psalm 27:1-6","Proverbs 6:20-26"],
  ["Exodus 17:8-19:15","Matthew 22:34-23:12","Psalm 27:7-14","Proverbs 6:27-35"],
  ["Exodus 19:16-21:21","Matthew 23:13-39","Psalm 28:1-9","Proverbs 7:1-5"],
  ["Exodus 21:22-23:13","Matthew 24:1-28","Psalm 29:1-11","Proverbs 7:6-23"],
  ["Exodus 23:14-25:40","Matthew 24:29-51","Psalm 30:1-12","Proverbs 7:24-27"],
  ["Exodus 26:1-27:21","Matthew 25:1-30","Psalm 31:1-8","Proverbs 8:1-11"],
  ["Exodus 28:1-43","Matthew 25:31-26:13","Psalm 31:9-18","Proverbs 8:12-13"],
  ["Exodus 29:1-30:10","Matthew 26:14-46","Psalm 31:19-24","Proverbs 8:14-26"],
  ["Exodus 30:11-31:18","Matthew 26:47-68","Psalm 32:1-11","Proverbs 8:27-32"],
  ["Exodus 32:1-33:23","Matthew 26:69-27:14","Psalm 33:1-11","Proverbs 8:33-36"],
  ["Exodus 34:1-35:9","Matthew 27:15-31","Psalm 33:12-22","Proverbs 9:1-6"],
  ["Exodus 35:10-36:38","Matthew 27:32-66","Psalm 34:1-10","Proverbs 9:7-8"],
  ["Exodus 37:1-38:31","Matthew 28:1-20","Psalm 34:11-22","Proverbs 9:9-10"],
  ["Exodus 39:1-40:38","Mark 1:1-28","Psalm 35:1-16","Proverbs 9:11-12"],
  ["Leviticus 1:1-3:17","Mark 1:29-2:12","Psalm 35:17-28","Proverbs 9:13-18"],
  ["Leviticus 4:1-5:19","Mark 2:13-3:6","Psalm 36:1-12","Proverbs 10:1-2"],
  ["Leviticus 6:1-7:27","Mark 3:7-30","Psalm 37:1-11","Proverbs 10:3-4"],
  ["Leviticus 7:28-9:6","Mark 3:31-4:25","Psalm 37:12-29","Proverbs 10:5"],
  ["Leviticus 9:7-10:20","Mark 4:26-5:20","Psalm 37:30-40","Proverbs 10:6-7"],
  ["Leviticus 11:1-12:8","Mark 5:21-43","Psalm 38:1-22","Proverbs 10:8-9"],
  ["Leviticus 13:1-59","Mark 6:1-29","Psalm 39:1-13","Proverbs 10:10"],
  ["Leviticus 14:1-57","Mark 6:30-56","Psalm 40:1-10","Proverbs 10:11-12"],
  ["Leviticus 15:1-16:28","Mark 7:1-23","Psalm 40:11-17","Proverbs 10:13-14"],
  ["Leviticus 16:29-18:30","Mark 7:24-8:10","Psalm 41:1-13","Proverbs 10:15-16"],
  ["Leviticus 19:1-20:21","Mark 8:11-38","Psalm 42:1-11","Proverbs 10:17"],
  ["Leviticus 20:22-22:16","Mark 9:1-29","Psalm 43:1-5","Proverbs 10:18"],
  ["Leviticus 22:17-23:44","Mark 9:30-10:12","Psalm 44:1-8","Proverbs 10:19"],
  ["Leviticus 24:1-25:46","Mark 10:13-31","Psalm 44:9-26","Proverbs 10:20-21"],
  ["Leviticus 25:47-27:13","Mark 10:32-52","Psalm 45:1-17","Proverbs 10:22"],
  ["Leviticus 27:14-34","Numbers 1:1-54","Mark 11:1-25","Psalm 46:1-11","Proverbs 10:23"]
];

const PLAN_TEMPLATES = {
  plan1: {
    label: "Plan 1 – ESV Every Day Bible (Crossway)",
    summary:
      "Read the ESV Every Day Bible: 4 sections per day (OT, NT, Psalms, Proverbs). Complete the Bible in one year.",
    useEsvEveryDay: true,
  },
  plan2: {
    label: "Plan 2 – Seven-Section Rotation",
    summary:
      "Rotate through the Law, History, Psalms, Poetry, Prophecy, Gospels, and Epistles by day.",
    defaults: [
      {
        book: "Romans",
        chapter: 1,
        fromVerse: 1,
        toVerse: 17,
        note: "Begin the epistles section with the gospel's revelation.",
      },
      {
        book: "Genesis",
        chapter: 1,
        fromVerse: 1,
        toVerse: 20,
        note: "Move through the Law and reflect on creation and covenant.",
      },
      {
        book: "Joshua",
        chapter: 1,
        fromVerse: 1,
        toVerse: 18,
        note: "Read the history section and meditate on courage in obedience.",
      },
      {
        book: "Psalms",
        chapter: 23,
        fromVerse: 1,
        toVerse: 6,
        note: "Let the psalms guide your heart into trust and peace.",
      },
    ],
  },
  plan3: {
    label: "Plan 3 – Cover-to-Cover Order",
    summary: "Read straight through the Bible from Genesis to Revelation.",
    defaults: [
      {
        book: "Genesis",
        chapter: 1,
        fromVerse: 1,
        toVerse: 25,
        note: "Begin at the beginning and mark the creation narrative.",
      },
      {
        book: "Genesis",
        chapter: 2,
        fromVerse: 1,
        toVerse: 25,
        note: "Consider the harmony of God's design and relationship.",
      },
      {
        book: "Genesis",
        chapter: 3,
        fromVerse: 1,
        toVerse: 24,
        note: "Reflect on sin, consequence, and the promise of redemption.",
      },
      {
        book: "Matthew",
        chapter: 1,
        fromVerse: 1,
        toVerse: 25,
        note: "Track the fulfillment of the covenant promise in the gospel.",
      },
    ],
  },
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
    complete: false,
  })),
};

const state = {
  plans: [],
  currentPlanId: null,
  selectedPassageId: null,
  speech: null,
  voices: [],
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

const BOOK_OPTIONS_HTML = BOOKS.map(
  (book) => `<option value="${book}">${book}</option>`,
).join("");
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
  "Revelation",
];

function getSavedPlans() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [structuredClone(SAMPLE_PLAN)];
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length
      ? parsed
      : [structuredClone(SAMPLE_PLAN)];
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
  return (
    state.plans.find((plan) => plan.id === state.currentPlanId) ||
    state.plans[0]
  );
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

  // Handle ESV Every Day Bible format (reference-based)
  if (entry.reference) {
    const custom = entry.readbackText?.trim();
    if (custom) {
      return `${entry.reference}. ${custom}`;
    }
    return `${entry.reference}. ${entry.note || "Keep reading."}`;
  }

  // Handle traditional format (book, chapter, verse)
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
  const selectionDate =
    readingDateInput.value || plan.readingDate || plan.startDate || DAY_MIN;

  if (entries.length) {
    // Check if this is an ESV Every Day Bible plan (reference-based with 4 sections per day)
    const isEsvPlan = entries.some((entry) => entry.reference && entry.id?.startsWith("esv-day-"));
    
    if (isEsvPlan) {
      const startDate = plan.startDate || DAY_MIN;
      const currentDate = selectionDate || startDate;
      const dayNumber = Math.max(
        1,
        getDayOffset(currentDate) - getDayOffset(startDate) + 1,
      );
      
      // For ESV plan, entries are grouped by day (4 per day)
      const startIndex = (dayNumber - 1) * 4;
      const endIndex = startIndex + 4;
      const dayEntries = entries.slice(startIndex, endIndex);
      
      return dayEntries.length ? dayEntries : [];
    }
    
    const hasDayNumber = entries.some((entry) =>
      Number.isInteger(entry.dayNumber),
    );
    if (hasDayNumber) {
      const startDate = plan.startDate || DAY_MIN;
      const currentDate = selectionDate || startDate;
      const dayNumber = Math.max(
        1,
        getDayOffset(currentDate) - getDayOffset(startDate) + 1,
      );
      const dayEntries = entries.filter(
        (entry) => Number(entry.dayNumber) === dayNumber,
      );
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
  if (
    !BOOKS.includes(book) ||
    !chapter ||
    !fromVerse ||
    !toVerse ||
    toVerse < fromVerse
  ) {
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
    complete: false,
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

  const entries =
    mode === "day" ? parseDayBlocksToEntries(text) : parseTextToEntries(text);
  return {
    entries,
    total: cleanedLines.length,
    parsed: entries.length,
    skipped: Math.max(0, cleanedLines.length - entries.length),
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
    dayNumber: entry.dayNumber ?? null,
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
    lastParseStats = {
      total: 0,
      parsed: 0,
      skipped: 0,
      mode: parserModeSelect?.value || "line",
    };
    converterSummary.textContent = `${file.name} loaded`;
    converterPreview.textContent =
      uploadedText.slice(0, 1500) || "File is empty.";
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
    mode,
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
    entries: parsedConverterEntries,
  };

  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: "application/json",
  });
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

  plan.entries.push(
    ...parsedConverterEntries.map((entry) => ({
      ...entry,
      id: createEntryId(),
    })),
  );
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
  books.forEach((book) =>
    createSectionRow({ book, chapter: 1, fromVerse: 1, toVerse: 10 }),
  );
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
      const note =
        row.querySelector(".section-note")?.value?.trim() ||
        "Daily reflection for this passage.";
      const readbackText =
        row.querySelector(".section-readback")?.value?.trim() || "";

      if (
        !BOOKS.includes(book) ||
        chapter < 1 ||
        fromVerse < 1 ||
        toVerse < fromVerse
      ) {
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
        complete: false,
      };
    })
    .filter(Boolean);
}

function renderPlans() {
  if (!state.plans.length) {
    planList.innerHTML =
      '<p class="empty-state">No plans yet. Create one to begin.</p>';
    return;
  }

  planList.innerHTML = state.plans
    .map(
      (plan) => `
      <button type="button" class="plan-item ${plan.id === state.currentPlanId ? "active" : ""}" data-plan-id="${plan.id}">
        <strong>${plan.name}</strong>
        <span>${plan.template ? PLAN_TEMPLATES[plan.template]?.label || "Custom" : "Custom"} · ${plan.entries.length} reading blocks</span>
      </button>
    `,
    )
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
    .map(
      (entry) => `
      <div class="progress-item ${entry.complete ? "done" : ""}" data-entry-id="${entry.id}">
        <div>
          <strong>${entry.book} ${entry.chapter}:${entry.fromVerse}-${entry.toVerse}</strong>
          <span>${entry.note || "Daily reflection"}</span>
        </div>
        <button type="button" aria-label="Toggle reading completion for ${entry.book} ${entry.chapter}">${entry.complete ? "Completed" : "Mark done"}</button>
      </div>
    `,
    )
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
  const template =
    PLAN_TEMPLATES[plan.template || "plan1"] || PLAN_TEMPLATES.plan1;

  if (dayIndex >= 365) {
    return [];
  }

  const dailyBlocks = [
    {
      book: "Genesis",
      chapter: 1,
      fromVerse: 1,
      toVerse: 25,
      note: "Creation and the beginning of the covenant story.",
    },
    {
      book: "Matthew",
      chapter: 1,
      fromVerse: 1,
      toVerse: 18,
      note: "The incarnation and the promise fulfilled.",
    },
    {
      book: "Psalms",
      chapter: 1,
      fromVerse: 1,
      toVerse: 6,
      note: "Reflect on the righteous life.",
    },
    {
      book: "Proverbs",
      chapter: 1,
      fromVerse: 1,
      toVerse: 9,
      note: "Wisdom for everyday decisions.",
    },
  ];

  if (plan.template === "plan2") {
    const rotation = [
      {
        book: "Romans",
        chapter: 1,
        fromVerse: 1,
        toVerse: 17,
        note: "Epistles section.",
      },
      {
        book: "Genesis",
        chapter: 1,
        fromVerse: 1,
        toVerse: 20,
        note: "Law section.",
      },
      {
        book: "Joshua",
        chapter: 1,
        fromVerse: 1,
        toVerse: 18,
        note: "History section.",
      },
      {
        book: "Psalms",
        chapter: 23,
        fromVerse: 1,
        toVerse: 6,
        note: "Psalms section.",
      },
      {
        book: "Job",
        chapter: 1,
        fromVerse: 1,
        toVerse: 12,
        note: "Poetry section.",
      },
      {
        book: "Isaiah",
        chapter: 1,
        fromVerse: 1,
        toVerse: 20,
        note: "Prophecy section.",
      },
      {
        book: "Matthew",
        chapter: 1,
        fromVerse: 1,
        toVerse: 18,
        note: "Gospels section.",
      },
    ];
    return [rotation[dayIndex % rotation.length]];
  }

  if (plan.template === "plan3") {
    const wideRead = [
      {
        book: "Genesis",
        chapter: 1,
        fromVerse: 1,
        toVerse: 25,
        note: "Continue the cover-to-cover reading plan.",
      },
      {
        book: "Genesis",
        chapter: 2,
        fromVerse: 1,
        toVerse: 25,
        note: "Continue the beginning of creation.",
      },
      {
        book: "Genesis",
        chapter: 3,
        fromVerse: 1,
        toVerse: 24,
        note: "Reflect on the fall and promise.",
      },
      {
        book: "Matthew",
        chapter: 1,
        fromVerse: 1,
        toVerse: 25,
        note: "The promised King arrives.",
      },
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
    selectedPassageText.textContent =
      "No reading blocks found for the selected day. Change the reading date or import/add entries for that day.";
    return;
  }

  const passage = selected.book
    ? selected
    : {
        book: selected.book,
        chapter: selected.chapter,
        fromVerse: selected.fromVerse,
        toVerse: selected.toVerse,
        note: selected.note,
      };

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
  const voices = window.speechSynthesis
    ? window.speechSynthesis.getVoices()
    : [];
  state.voices = voices;

  voiceSelect.innerHTML = voices.length
    ? voices
        .map(
          (voice, index) =>
            `<option value="${index}">${voice.name} (${voice.lang})</option>`,
        )
        .join("")
    : '<option value="">No system voices available</option>';
}

async function cacheAudioBlob(textKey, audioBlob) {
  if (!("indexedDB" in window)) return false;

  try {
    return new Promise((resolve) => {
      const db = indexedDB.open("BibleAppAudio", 1);

      db.onupgradeneeded = (e) => {
        e.target.result.createObjectStore("audio");
      };

      db.onsuccess = (e) => {
        const tx = e.target.result
          .transaction("audio", "readwrite")
          .objectStore("audio");
        tx.put(audioBlob, textKey);
        resolve(true);
      };

      db.onerror = () => resolve(false);
    });
  } catch {
    return false;
  }
}

async function getCachedAudio(textKey) {
  if (!("indexedDB" in window)) return null;

  try {
    return new Promise((resolve) => {
      const db = indexedDB.open("BibleAppAudio", 1);

      db.onsuccess = (e) => {
        const tx = e.target.result
          .transaction("audio", "readonly")
          .objectStore("audio");
        const req = tx.get(textKey);
        req.onsuccess = () => resolve(req.result || null);
        req.onerror = () => resolve(null);
      };

      db.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}

function speakCurrentPassage() {
  if (!("speechSynthesis" in window)) {
    selectedPassageText.textContent =
      "Text-to-speech is not supported in this browser. You can still use uploaded audio later.";
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
    selectedPassageText.textContent =
      "Text-to-speech is not supported in this browser.";
    return;
  }

  const plan = getCurrentPlan();
  const readList = getTodaysReadList(plan);
  if (!readList.length) {
    selectedPassageText.textContent =
      "No reading blocks available for readback.";
    return;
  }

  if (state.speech) {
    window.speechSynthesis.cancel();
  }

  const text = readList
    .map((entry) => getReadbackText(entry))
    .join(" Next reading block. ");
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
  
  let entries = [];
  
  // If using ESV Every Day Bible, generate entries from the full 365-day plan
  if (template.useEsvEveryDay) {
    entries = ESV_EVERY_DAY_BIBLE.map((day, dayIndex) => {
      const dayNum = dayIndex + 1;
      return day.map((passage, sectionIndex) => {
        const sectionLabels = ["Old Testament", "New Testament", "Psalms", "Proverbs"];
        return {
          id: `esv-day-${dayNum}-section-${sectionIndex + 1}`,
          reference: passage,
          note: sectionLabels[sectionIndex],
          complete: false,
        };
      });
    }).flat();
  } else {
    // For other templates, use the defaults
    entries = template.defaults.map((entry, index) => ({
      id: `template-${templateKey}-${index + 1}`,
      ...entry,
      complete: false,
    }));
  }
  
  const plan = {
    id: createPlanId(),
    name: `${template.label.replace(" – ", " ")}`,
    startDate: DAY_MIN,
    readingDate: DAY_MIN,
    template: templateKey,
    entries: entries,
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
    selectedPassageText.textContent =
      "No valid sections found. Update section fields and try again.";
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

document.getElementById("predownloadBtn")?.addEventListener("click", async () => {
  const plan = getCurrentPlan();
  const readList = getTodaysReadList(plan);

  if (!readList.length) {
    alert("No reading blocks scheduled for today.");
    return;
  }

  const btn = document.getElementById("predownloadBtn");
  btn.disabled = true;
  btn.textContent = "Downloading audio...";

  try {
    for (const entry of readList) {
      const text = getReadbackText(entry);
      const textKey = `${entry.id}_${Date.now()}`;

      const utterance = new SpeechSynthesisUtterance(text);
      const voices = window.speechSynthesis.getVoices();
      const chosenVoiceIndex = Number(voiceSelect.value);
      if (voices[chosenVoiceIndex]) {
        utterance.voice = voices[chosenVoiceIndex];
      }
      utterance.rate = Number(rateInput.value) || 1;

      await new Promise((resolve) => {
        utterance.onend = resolve;
        window.speechSynthesis.speak(utterance);
      });

      await cacheAudioBlob(textKey, new Blob([text], { type: "text/plain" }));
    }
    alert(
      `Downloaded audio for ${readList.length} passage(s). Ready for offline listening!`,
    );
  } catch {
    alert("Failed to pre-download audio. Check browser support.");
  } finally {
    btn.disabled = false;
    btn.textContent = "Pre-download today's audio";
  }
});

document.getElementById("clearAudioCacheBtn")?.addEventListener("click", () => {
  if (
    confirm(
      "Clear all cached audio? This will free storage but disable offline playback.",
    )
  ) {
    indexedDB.deleteDatabase("BibleAppAudio");
    alert("Audio cache cleared.");
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
presetFourBtn?.addEventListener("click", () =>
  resetSectionsFromBooks(FOUR_SECTION_PRESET),
);
presetTenBtn?.addEventListener("click", () =>
  resetSectionsFromBooks(TEN_SECTION_PRESET),
);
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
