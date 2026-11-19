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

// Actual 365-day reading schedule extracted from the uploaded PDF plan.
// This is embedded so the app still works when opened directly in a browser from disk.
const YEARLY_READING_SCHEDULE = [["Genesis 1:1-2:25", "Psalm 1:1-6", "Proverbs 1:1-4", "Matthew 1:1-25"], ["Genesis 3:1-4:26", "Psalm 2:1-6", "Proverbs 1:5-6", "Matthew 2:1-23"], ["Genesis 5:1-6:22", "Psalm 2:7-12", "Proverbs 1:7", "Matthew 3:1-17"], ["Genesis 5:1-6:22", "Psalm 2:7-12", "Proverbs 1:7", "Matthew 3:1-17"], ["Genesis 9:8-10:32", "Psalm 4:1-8", "Proverbs 1:10-14", "Matthew 4:21-5:12"], ["Genesis 11:1-12:20", "Psalm 5:1-6", "Proverbs 1:15-16", "Matthew 5:13-32"], ["Genesis 13:1-15:6", "Psalm 5:7-12", "Proverbs 1:17-19", "Matthew 5:33-6:4"], ["Genesis 15:7-17:27", "Psalm 6:1-5", "Proverbs 1:20-23", "Matthew 6:5-24"], ["Genesis 18:1-19:22", "Psalm 6:6-10", "Proverbs 1:24-27", "Matthew 6:25-7:12"], ["Genesis 19:23-21:21", "Psalm 7:1-8", "Proverbs 1:28-31", "Matthew 7:13-8:4"], ["Genesis 21:22-23:20", "Psalm 7:9-17", "Proverbs 1:32-33", "Matthew 8:5-27"], ["Genesis 24:1-54", "Psalm 8:1-9", "Proverbs 2:1-5", "Matthew 8:28-9:17"], ["Genesis 24:55-26:11", "Psalm 9:1-6", "Proverbs 2:6-8", "Matthew 9:18-38"], ["Genesis 26:12-27:29", "Psalm 9:7-12", "Proverbs 2:9-10", "Matthew 10:1-20"], ["Genesis 27:30-29:12", "Psalm 9:13-20", "Proverbs 2:11-15", "Matthew 10:21-42"], ["Genesis 29:13-30:43", "Psalm 10:1-6", "Proverbs 2:16-19", "Matthew 11:1-19"], ["Genesis 31:1-55", "Psalm 10:7-12", "Proverbs 2:20-22", "Matthew 11:20-12:8"], ["Genesis 32:1-33:20", "Psalm 10:13-18", "Proverbs 3:1-2", "Matthew 12:9-37"], ["Genesis 34:1-35:29", "Psalm 11:1-3", "Proverbs 3:3-4", "Matthew 12:38-13:9"], ["Genesis 36:1-43", "Psalm 11:4-7", "Proverbs 3:5-6", "Matthew 13:10-35"], ["Genesis 37:1-38:30", "Psalm 12:1-5", "Proverbs 3:7-8", "Matthew 13:36-58"], ["Genesis 39:1-41:7", "Psalm 12:6-8", "Proverbs 3:9-10", "Matthew 14:1-21"], ["Genesis 41:8-42:4", "Psalm 13:1-6", "Proverbs 3:11-12", "Matthew 14:22-15:9"], ["Genesis 42:5-43:14", "Psalm 14:1-7", "Proverbs 3:13-14", "Matthew 15:10-39"], ["Genesis 43:15-44:34", "Psalm 15:1-5", "Proverbs 3:15-16", "Matthew 16:1-20"], ["Genesis 45:1-46:27", "Psalm 16:1-6", "Proverbs 3:17-18", "Matthew 16:21-17:13"], ["Genesis 46:28-48:22", "Psalm 16:7-11", "Proverbs 3:19-20", "Matthew 17:14-18:9"], ["Genesis 49:1-50:26", "Psalm 17:1-5", "Proverbs 3:21-24", "Matthew 18:10-35"], ["Exodus 1:1-2:25", "Psalm 17:6-12", "Proverbs 3:25-26", "Matthew 19:1-22"], ["Exodus 3:1-4:31", "Psalm 17:13-15", "Proverbs 3:27-28", "Matthew 19:23-20:19"], ["Exodus 5:1-6:30", "Psalm 18:1-6", "Proverbs 3:29-32", "Matthew 20:20-21:11"], ["Exodus 7:1-8:32", "Psalm 18:7-12", "Proverbs 3:33-35", "Matthew 21:12-27"], ["Exodus 9:1-10:20", "Psalm 18:13-19", "Proverbs 4:1-2", "Matthew 21:28-46"], ["Exodus 10:21-12:36", "Psalm 18:20-24", "Proverbs 4:3-4", "Matthew 22:1-22"], ["Exodus 12:37-14:20", "Psalm 18:25-29", "Proverbs 4:5-6", "Matthew 22:23-46"], ["Exodus 14:21-16:20", "Psalm 18:30-36", "Proverbs 4:7-9", "Matthew 23:1-22"], ["Exodus 16:21-18:27", "Psalm 18:37-42", "Proverbs 4:10-13", "Matthew 23:23-39"], ["Exodus 19:1-20:26", "Psalm 18:43-50", "Proverbs 4:14-17", "Matthew 24:1-14"], ["Exodus 21:1-22:20", "Psalm 19:1-6", "Proverbs 4:18-19", "Matthew 24:15-35"], ["Exodus 22:21-24:18", "Psalm 19:7-14", "Proverbs 4:20-22", "Matthew 24:36-51"], ["Exodus 25:1-26:14", "Psalm 20:1-9", "Proverbs 4:23-24", "Matthew 25:1-13"], ["Exodus 26:15-28:14", "Psalm 21:1-7", "Proverbs 4:25-27", "Matthew 25:14-30"], ["Exodus 28:15-29:25", "Psalm 21:8-13", "Proverbs 5:1-2", "Matthew 25:31-26:5"], ["Exodus 29:26-30:38", "Psalm 22:1-5", "Proverbs 5:3-6", "Matthew 26:6-25"], ["Exodus 31:1-32:35", "Psalm 22:6-10", "Proverbs 5:7-8", "Matthew 26:26-51"], ["Exodus 33:1-34:35", "Psalm 22:11-15", "Proverbs 5:9-10", "Matthew 26:52-75"], ["Exodus 35:1-36:19", "Psalm 22:16-21", "Proverbs 5:11-14", "Matthew 27:1-23"], ["Exodus 36:20-37:29", "Psalm 22:22-26", "Proverbs 5:15-17", "Matthew 27:24-44"], ["Exodus 38:1-39:31", "Psalm 22:27-31", "Proverbs 5:18-20", "Matthew 27:45-66"], ["Exodus 39:32-40:38", "Psalm 23:1-6", "Proverbs 5:21-23", "Matthew 28:1-20"], ["Leviticus 1:1-3:17", "Psalm 24:1-10", "Proverbs 6:1-3", "Mark 1:1-20"], ["Leviticus 4:1-5:19", "Psalm 25:1-7", "Proverbs 6:4-5", "Mark 1:21-45"], ["Leviticus 6:1-7:21", "Psalm 25:8-15", "Proverbs 6:6-8", "Mark 2:1-22"], ["Leviticus 7:22-8:36", "Psalm 25:16-22", "Proverbs 6:9-11", "Mark 2:23-3:12"], ["Leviticus 9:1-11:12", "Psalm 26:1-7", "Proverbs 6:12-15", "Mark 3:13-35"], ["Leviticus 11:13-13:17", "Psalm 26:8-12", "Proverbs 6:16-19", "Mark 4:1-20"], ["Leviticus 13:18-14:14", "Psalm 27:1-6", "Proverbs 6:20-22", "Mark 4:21-41"], ["Leviticus 14:15-15:12", "Psalm 27:7-14", "Proverbs 6:23-26", "Mark 5:1-20"], ["Leviticus 15:13-16:34", "Psalm 28:1-5", "Proverbs 6:27-29", "Mark 5:21-43"], ["Leviticus 17:1-19:10", "Psalm 28:6-9", "Proverbs 6:30-31", "Mark 6:1-20"], ["Leviticus 19:11-20:27", "Psalm 29:1-6", "Proverbs 6:32-33", "Mark 6:21-46"], ["Leviticus 21:1-22:33", "Psalm 29:7-11", "Proverbs 6:34-35", "Mark 6:47-7:15"], ["Leviticus 23:1-24:23", "Psalm 30:1-6", "Proverbs 7:1-3", "Mark 7:17-37"], ["Leviticus 25:1-55", "Psalm 30:7-12", "Proverbs 7:4-5", "Mark 8:1-21"], ["Leviticus 26:1-46", "Psalm 31:1-8", "Proverbs 7:6-8", "Mark 8:22-9:1"], ["Leviticus 27:1-34", "Psalm 31:9-18", "Proverbs 7:9-12", "Mark 9:2-29"], ["Numbers 1:1-54", "Psalm 31:19-24", "Proverbs 7:13-17", "Mark 9:30-50"], ["Numbers 2:1-3:16", "Psalm 32:1-7", "Proverbs 7:18-21", "Mark 10:1-22"], ["Numbers 3:17-4:20", "Psalm 32:8-11", "Proverbs 7:22-23", "Mark 10:23-45"], ["Numbers 4:21-5:31", "Psalm 33:1-9", "Proverbs 7:24-27", "Mark 10:46-11:11"], ["Numbers 6:1-7:29", "Psalm 33:10-17", "Proverbs 8:1-3", "Mark 11:12-33"], ["Numbers 7:30-89", "Psalm 33:18-22", "Proverbs 8:4-5", "Mark 12:1-27"], ["Numbers 8:1-10:10", "Psalm 34:1-7", "Proverbs 8:6-7", "Mark 12:28-44"], ["Numbers 10:11-11:35", "Psalm 34:8-14", "Proverbs 8:8-9", "Mark 13:1-20"], ["Numbers 12:1-14:4", "Psalm 34:15-22", "Proverbs 8:10-13", "Mark 13:21-37"], ["Numbers 14:5-45", "Psalm 35:1-10", "Proverbs 8:14-17", "Mark 14:1-21"], ["Numbers 15:1-41", "Psalm 35:11-16", "Proverbs 8:18-19", "Mark 14:22-42"], ["Numbers 16:1-50", "Psalm 35:17-21", "Proverbs 8:20-21", "Mark 14:43-72"], ["Numbers 17:1-19:8", "Psalm 35:22-28", "Proverbs 8:22-24", "Mark 15:1-21"], ["Numbers 19:9-21:9", "Psalm 36:1-6", "Proverbs 8:25-26", "Mark 15:22-47"], ["Numbers 21:10-22:41", "Psalm 36:7-12", "Proverbs 8:27-29", "Mark 16:1-20"], ["Numbers 23:1-24:25", "Psalm 37:1-6", "Proverbs 8:30-31", "Luke 1:1-23"], ["Numbers 25:1-26:22", "Psalm 37:7-13", "Proverbs 8:32-33", "Luke 1:24-56"], ["Numbers 26:23-65", "Psalm 37:14-20", "Proverbs 8:34-36", "Luke 1:57-80"], ["Numbers 27:1-28:31", "Psalm 37:21-26", "Proverbs 9:1-2", "Luke 2:1-20"], ["Numbers 29:1-30:16", "Psalm 37:27-33", "Proverbs 9:3-6", "Luke 2:21-38"], ["Numbers 31:1-54", "Psalm 37:34-40", "Proverbs 9:7-9", "Luke 2:39-52"], ["Numbers 32:1-42", "Psalm 38:1-8", "Proverbs 9:10-12", "Luke 3:1-20"], ["Numbers 33:1-56", "Psalm 38:9-14", "Proverbs 9:13-15", "Luke 3:21-38"], ["Numbers 34:1-35:34", "Psalm 38:15-22", "Proverbs 9:16-18", "Luke 4:1-21"], ["Psalm 39:1-6", "Proverbs 10:1-2", "Luke 4:22-44"], ["Deuteronomy 2:1-3:29", "Psalm 39:7-13", "Proverbs 10:3-5", "Luke 5:1-20"], ["Deuteronomy 4:1-49", "Psalm 40:1-5", "Proverbs 10:6-8", "Luke 5:21-6:11"], ["Deuteronomy 5:1-6:25", "Psalm 40:6-10", "Proverbs 10:9-11", "Luke 6:12-36"], ["Deuteronomy 7:1-8:20", "Psalm 40:11-17", "Proverbs 10:12-14", "Luke 6:37-7:10"], ["Deuteronomy 9:1-10:22", "Psalm 41:1-6", "Proverbs 10:15-17", "Luke 7:11-35"], ["Deuteronomy 11:1-12:19", "Psalm 41:7-13", "Proverbs 10:18-21", "Luke 7:36-8:3"], ["Deuteronomy 12:20-14:21", "Psalm 42:1-11", "Proverbs 10:22-25", "Luke 8:4-25"], ["Deuteronomy 14:22-16:22", "Psalm 43:1-5", "Proverbs 10:26-27", "Luke 8:26-56"], ["Deuteronomy 17:1-19:13", "Psalm 44:1-8", "Proverbs 10:28-30", "Luke 9:1-22"], ["Deuteronomy 19:14-21:23", "Psalm 44:9-16", "Proverbs 10:31-32", "Luke 9:23-45"], ["Deuteronomy 22:1-23:25", "Psalm 44:17-26", "Proverbs 11:1-4", "Luke 9:46-62"], ["Deuteronomy 24:1-26:19", "Psalm 45:1-5", "Proverbs 11:5-6", "Luke 10:1-24"], ["Deuteronomy 27:1-28:14", "Psalm 45:6-12", "Proverbs 11:7-8", "Luke 10:25-11:4"], ["Deuteronomy 28:15-68", "Psalm 45:13-17", "Proverbs 11:9-11", "Luke 11:5-28"], ["Deuteronomy 29:1-30:20", "Psalm 46:1-11", "Proverbs 11:12-13", "Luke 11:29-54"], ["Deuteronomy 31:1-29", "Psalm 47:1-9", "Proverbs 11:14-15", "Luke 12:1-21"], ["Deuteronomy 31:30-32:52", "Psalm 48:1-7", "Proverbs 11:16-18", "Luke 12:22-40"], ["Deuteronomy 33:1-34:12", "Psalm 48:8-14", "Proverbs 11:19-21", "Luke 12:41-59"], ["Joshua 1:1-3:17", "Psalm 49:1-9", "Proverbs 11:22-23", "Luke 13:1-21"], ["Joshua 4:1-6:27", "Psalm 49:10-15", "Proverbs 11:24-26", "Luke 13:22-14:6"], ["Joshua 7:1-8:35", "Psalm 49:16-20", "Proverbs 11:27-29", "Luke 14:7-24"], ["Joshua 9:1-10:28", "Psalm 50:1-6", "Proverbs 11:30-31", "Luke 14:25-15:10"], ["Joshua 10:29-12:24", "Psalm 50:7-15", "Proverbs 12:1-3", "Luke 15:11-32"], ["Joshua 13:1-14:15", "Psalm 50:16-23", "Proverbs 12:4-5", "Luke 16:1-18"], ["Joshua 15:1-63", "Psalm 51:1-5", "Proverbs 12:6-7", "Luke 16:19-17:10"], ["Joshua 16:1-18:28", "Psalm 51:6-9", "Proverbs 12:8-10", "Luke 17:11-37"], ["Joshua 19:1-51", "Psalm 51:10-13", "Proverbs 12:11-12", "Luke 18:1-23"], ["Joshua 20:1-21:45", "Psalm 51:14-19", "Proverbs 12:13-14", "Luke 18:24-43"], ["Joshua 22:1-23:16", "Psalm 52:1-9", "Proverbs 12:15-16", "Luke 19:1-27"], ["Joshua 24:1-33", "Psalm 53:1-6", "Proverbs 12:17-18", "Luke 19:28-48"], ["Judges 1:1-2:23", "Psalm 54:1-7", "Proverbs 12:19-22", "Luke 20:1-19"], ["Judges 3:1-4:24", "Psalm 55:1-8", "Proverbs 12:23-24", "Luke 20:20-40"], ["Judges 5:1-6:10", "Psalm 55:9-14", "Proverbs 12:25-26", "Luke 20:41-21:19"], ["Judges 6:11-7:25", "Psalm 55:15-23", "Proverbs 12:27-28", "Luke 21:20-38"], ["Judges 8:1-9:21", "Psalm 56:1-7", "Proverbs 13:1-2", "Luke 22:1-23"], ["Judges 9:22-10:18", "Psalm 56:8-13", "Proverbs 13:3-4", "Luke 22:24-46"], ["Judges 11:1-12:15", "Psalm 57:1-6", "Proverbs 13:5-6", "Luke 22:47-71"], ["Judges 13:1-15:8", "Psalm 57:7-11", "Proverbs 13:7-8", "Luke 23:1-19"], ["Judges 15:9-17:13", "Psalm 58:1-5", "Proverbs 13:9-10", "Luke 23:20-38"], ["Judges 18:1-31", "Psalm 58:6-11", "Proverbs 13:11-12", "Luke 23:39-56"], ["Judges 19:1-20:25", "Psalm 59:1-10", "Proverbs 13:13", "Luke 24:1-24"], ["Judges 20:26-21:25", "Psalm 59:11-17", "Proverbs 13:14-15", "Luke 24:25-53"], ["Ruth 1:1-2:23", "Psalm 60:1-5", "Proverbs 13:16-17", "John 1:1-23"], ["Ruth 3:1-4:22", "Psalm 60:6-12", "Proverbs 13:18-20", "John 1:24-51"], ["1 Samuel 1:1-2:36", "Psalm 61:1-8", "Proverbs 13:21-22", "John 2:1-25"], ["1 Samuel 3:1-5:12", "Psalm 62:1-8", "Proverbs 13:23-25", "John 3:1-21"], ["1 Samuel 6:1-8:22", "Psalm 62:9-12", "Proverbs 14:1-2", "John 3:22-4:6"], ["1 Samuel 9:1-10:27", "Psalm 63:1-5", "Proverbs 14:3", "John 4:7-26"], ["1 Samuel 11:1-13:22", "Psalm 63:6-11", "Proverbs 14:4", "John 4:27-54"], ["1 Samuel 13:23-14:52", "Psalm 64:1-6", "Proverbs 14:5-7", "John 5:1-23"], ["1 Samuel 15:1-16:23", "Psalm 64:7-10", "Proverbs 14:8-9", "John 5:24-47"], ["1 Samuel 17:1-58", "Psalm 65:1-8", "Proverbs 14:10-12", "John 6:1-21"], ["1 Samuel 18:1-19:24", "Psalm 65:9-13", "Proverbs 14:13-14", "John 6:22-40"], ["1 Samuel 20:1-21:15", "Psalm 66:1-7", "Proverbs 14:15-16", "John 6:41-59"], ["1 Samuel 22:1-23:29", "Psalm 66:8-15", "Proverbs 14:17-19", "John 6:60-7:9"], ["1 Samuel 24:1-25:44", "Psalm 66:16-20", "Proverbs 14:20-22", "John 7:10-29"], ["1 Samuel 26:1-28:25", "Psalm 67:1-7", "Proverbs 14:23-25", "John 7:30-52"], ["1 Samuel 29:1-31:13", "Psalm 68:1-6", "Proverbs 14:26-28", "John 7:53-8:20"], ["2 Samuel 1:1-2:32", "Psalm 68:7-14", "Proverbs 14:29-30", "John 8:21-41"], ["2 Samuel 3:1-4:12", "Psalm 68:15-19", "Proverbs 14:31-32", "John 8:42-9:7"], ["2 Samuel 5:1-6:23", "Psalm 68:20-27", "Proverbs 14:33-35", "John 9:8-27"], ["2 Samuel 7:1-9:13", "Psalm 68:28-31", "Proverbs 15:1-3", "John 9:28-10:6"], ["2 Samuel 10:1-11:27", "Psalm 68:32-35", "Proverbs 15:4-5", "John 10:7-30"], ["2 Samuel 12:1-13:39", "Psalm 69:1-4", "Proverbs 15:6-7", "John 10:31-11:6"], ["2 Samuel 14:1-15:37", "Psalm 69:5-12", "Proverbs 15:8-9", "John 11:7-20"], ["2 Samuel 16:1-17:29", "Psalm 69:13-18", "Proverbs 15:10-11", "John 11:21-44"], ["2 Samuel 18:1-19:23", "Psalm 69:19-28", "Proverbs 15:12-13", "John 11:45-12:11"], ["2 Samuel 19:24-21:22", "Psalm 69:29-36", "Proverbs 15:14-15", "John 12:12-33"], ["2 Samuel 22:1-23:7", "Psalm 70:1-5", "Proverbs 15:16-17", "John 12:34-13:11"], ["2 Samuel 23:8-24:25", "Psalm 71:1-8", "Proverbs 15:18-19", "John 13:12-38"], ["1 Kings 1:1-53", "Psalm 71:9-16", "Proverbs 15:20-21", "John 14:1-21"], ["1 Kings 2:1-46", "Psalm 71:17-24", "Proverbs 15:22-23", "John 14:22-15:10"], ["1 Kings 3:1-4:34", "Psalm 72:1-7", "Proverbs 15:24-25", "John 15:11-16:4"], ["1 Kings 5:1-6:38", "Psalm 72:8-14", "Proverbs 15:26-27", "John 16:5-33"], ["1 Kings 7:1-51", "Psalm 72:15-20", "Proverbs 15:28-29", "John 17:1-26"], ["1 Kings 8:1-66", "Psalm 73:1-6", "Proverbs 15:30-31", "John 18:1-24"], ["1 Kings 9:1-10:29", "Psalm 73:7-12", "Proverbs 15:32-33", "John 18:25-19:4"], ["1 Kings 11:1-12:11", "Psalm 73:13-20", "Proverbs 16:1-2", "John 19:5-24"], ["1 Kings 12:12-13:34", "Psalm 73:21-28", "Proverbs 16:3-4", "John 19:25-42"], ["1 Kings 14:1-15:34", "Psalm 74:1-6", "Proverbs 16:5-7", "John 20:1-20"], ["1 Kings 16:1-17:24", "Psalm 74:7-11", "Proverbs 16:8-10", "John 20:21-21:9"], ["1 Kings 18:1-46", "Psalm 74:12-17", "Proverbs 16:11-12", "John 21:10-25"], ["1 Kings 19:1-20:43", "Psalm 74:18-23", "Proverbs 16:13-15", "Acts 1:1-26"], ["1 Kings 21:1-22:23", "Psalm 75:1-10", "Proverbs 16:16-17", "Acts 2:1-21"], ["Psalm 76:1-6", "Proverbs 16:18-19", "Acts 2:22-47"], ["2 Kings 2:1-3:27", "Psalm 76:7-12", "Proverbs 16:20", "Acts 3:1-26"], ["2 Kings 4:1-5:14", "Psalm 77:1-6", "Proverbs 16:21-22", "Acts 4:1-22"], ["2 Kings 5:15-7:9", "Psalm 77:7-12", "Proverbs 16:23-24", "Acts 4:23-5:11"], ["2 Kings 7:10-9:13", "Psalm 77:13-20", "Proverbs 16:25-26", "Acts 5:12-32"], ["2 Kings 9:14-10:36", "Psalm 78:1-8", "Proverbs 16:27-28", "Acts 5:33-6:15"], ["2 Kings 11:1-13:9", "Psalm 78:9-16", "Proverbs 16:29-30", "Acts 7:1-22"], ["2 Kings 13:10-15:15", "Psalm 78:17-22", "Proverbs 16:31-33", "Acts 7:23-43"], ["2 Kings 15:16-16:20", "Psalm 78:23-31", "Proverbs 17:1-2", "Acts 7:44-8:3"], ["2 Kings 17:1-41", "Psalm 78:32-39", "Proverbs 17:3-4", "Acts 8:4-40"], ["2 Kings 18:1-19:19", "Psalm 78:40-47", "Proverbs 17:5-6", "Acts 9:1-22"], ["2 Kings 19:20-21:26", "Psalm 78:48-55", "Proverbs 17:7-8", "Acts 9:23-43"], ["2 Kings 22:1-23:37", "Psalm 78:56-64", "Proverbs 17:9-10", "Acts 10:1-23"], ["2 Kings 24:1-25:30", "Psalm 78:65-72", "Proverbs 17:11-12", "Acts 10:24-48"], ["1 Chronicles 1:1-2:2", "Psalm 79:1-8", "Proverbs 17:13-14", "Acts 11:1-30"], ["1 Chronicles 2:3-55", "Psalm 79:9-13", "Proverbs 17:15-16", "Acts 12:1-25"], ["1 Chronicles 3:1-4:43", "Psalm 80:1-7", "Proverbs 17:17", "Acts 13:1-22"], ["1 Chronicles 5:1-6:32", "Psalm 80:8-13", "Proverbs 17:18-19", "Acts 13:23-41"], ["1 Chronicles 6:33-81", "Psalm 80:14-19", "Proverbs 17:20-21", "Acts 13:42-14:7"], ["1 Chronicles 7:1-8:28", "Psalm 81:1-7", "Proverbs 17:22-23", "Acts 14:8-28"], ["1 Chronicles 8:29-9:44", "Psalm 81:8-16", "Proverbs 17:24-25", "Acts 15:1-21"], ["1 Chronicles 10:1-11:47", "Psalm 82:1-8", "Proverbs 17:26", "Acts 15:22-41"], ["1 Chronicles 12:1-13:14", "Psalm 83:1-8", "Proverbs 17:27-28", "Acts 16:1-24"], ["1 Chronicles 14:1-16:6", "Psalm 83:9-18", "Proverbs 18:1-3", "Acts 16:25-17:9"], ["1 Chronicles 16:7-17:15", "Psalm 84:1-12", "Proverbs 18:4-5", "Acts 17:10-34"], ["1 Chronicles 17:16-20:8", "Psalm 85:1-7", "Proverbs 18:6-8", "Acts 18:1-23"], ["1 Chronicles 21:1-23:13", "Psalm 85:8-13", "Proverbs 18:9-11", "Acts 18:24-19:20"], ["1 Chronicles 23:14-24:31", "Psalm 86:1-10", "Proverbs 18:12-13", "Acts 19:21-41"], ["1 Chronicles 25:1-26:32", "Psalm 86:11-17", "Proverbs 18:14-15", "Acts 20:1-21"], ["1 Chronicles 27:1-28:21", "Psalm 87:1-7", "Proverbs 18:16-17", "Acts 20:22-21:6"], ["Psalm 88:1-9", "Proverbs 18:18-19", "Acts 21:7-29"], ["2 Chronicles 2:1-4:22", "Psalm 88:10-18", "Proverbs 18:20-21", "Acts 21:30-22:10"], ["2 Chronicles 5:1-6:42", "Psalm 89:1-10", "Proverbs 18:22", "Acts 22:11-30"], ["2 Chronicles 7:1-8:18", "Psalm 89:11-18", "Proverbs 18:23-24", "Acts 23:1-22"], ["2 Chronicles 9:1-10:19", "Psalm 89:19-29", "Proverbs 19:1-3", "Acts 23:23-24:9"], ["2 Chronicles 11:1-13:22", "Psalm 89:30-37", "Proverbs 19:4-5", "Acts 24:10-27"], ["2 Chronicles 14:1-16:14", "Psalm 89:38-45", "Proverbs 19:6-7", "Acts 25:1-22"], ["2 Chronicles 17:1-18:34", "Psalm 89:46-52", "Proverbs 19:8-9", "Acts 25:23-26:18"], ["2 Chronicles 19:1-21:11", "Psalm 90:1-12", "Proverbs 19:10-12", "Acts 26:19-27:8"], ["2 Chronicles 21:12-24:16", "Psalm 90:13-17", "Proverbs 19:13-14", "Acts 27:9-29"], ["2 Chronicles 24:17-26:23", "Psalm 91:1-8", "Proverbs 19:15-16", "Acts 27:30-28:10"], ["2 Chronicles 27:1-29:17", "Psalm 91:9-16", "Proverbs 19:17", "Acts 28:11-31"], ["2 Chronicles 29:18-31:10", "Psalm 92:1-7", "Proverbs 19:18-19", "Romans 1:1-23"], ["2 Chronicles 31:11-33:13", "Psalm 92:8-15", "Proverbs 19:20-21", "Romans 1:24-2:16"], ["2 Chronicles 33:14-35:15", "Psalm 93:1-5", "Proverbs 19:22-23", "Romans 2:17-3:8"], ["Psalm 94:1-11", "Proverbs 19:24-25", "Romans 3:9-31"], ["Ezra 2:1-70", "Psalm 94:12-23", "Proverbs 19:26-27", "Romans 4:1-25"], ["Ezra 3:1-5:17", "Psalm 95:1-11", "Proverbs 19:28-29", "Romans 5:1-21"], ["Ezra 6:1-7:28", "Psalm 96:1-9", "Proverbs 20:1", "Romans 6:1-23"], ["Ezra 8:1-9:15", "Psalm 96:10-13", "Proverbs 20:2-3", "Romans 7:1-25"], ["Psalm 97:1-6", "Proverbs 20:4-6", "Romans 8:1-25"], ["Nehemiah 2:1-3:32", "Psalm 97:7-12", "Proverbs 20:7-9", "Romans 8:26-9:5"], ["Nehemiah 4:1-6:19", "Psalm 98:1-9", "Proverbs 20:10-12", "Romans 9:6-26"], ["Nehemiah 7:1-60", "Psalm 99:1-9", "Proverbs 20:13-15", "Romans 9:27-10:15"], ["Nehemiah 7:61-9:38", "Psalm 100:1-5", "Proverbs 20:16-18", "Romans 10:16-11:10"], ["Nehemiah 10:1-11:19", "Psalm 101:1-8", "Proverbs 20:19-21", "Romans 11:11-36"], ["Nehemiah 11:20-12:47", "Psalm 102:1-11", "Proverbs 20:22-23", "Romans 12:1-21"], ["Psalm 102:12-17", "Proverbs 20:24-25", "Romans 13:1-14:12"], ["Esther 2:1-4:17", "Psalm 102:18-22", "Proverbs 20:26-27", "Romans 14:13-15:13"], ["Esther 5:1-7:10", "Psalm 102:23-28", "Proverbs 20:28-30", "Romans 15:14-33"], ["Esther 8:1-10:3", "Psalm 103:1-5", "Proverbs 21:1-3", "Romans 16:1-27"], ["Job 1:1-3:26", "Psalm 103:6-14", "Proverbs 21:4-5", "1 Corinthians 1:1-19"], ["Job 4:1-6:10", "Psalm 103:15-22", "Proverbs 21:6-7", "1 Corinthians 1:20-2:9"], ["Job 6:11-8:22", "Psalm 104:1-9", "Proverbs 21:8-9", "1 Corinthians 2:10-3:15"], ["Job 9:1-10:22", "Psalm 104:10-15", "Proverbs 21:10-11", "1 Corinthians 3:16-4:13"], ["Job 11:1-13:12", "Psalm 104:16-23", "Proverbs 21:12-14", "1 Corinthians 4:14-5:13"], ["Job 13:13-15:13", "Psalm 104:24-30", "Proverbs 21:15-16", "1 Corinthians 6:1-20"], ["Job 15:14-17:16", "Psalm 104:31-35", "Proverbs 21:17-19", "1 Corinthians 7:1-24"], ["Job 18:1-20:11", "Psalm 105:1-6", "Proverbs 21:20-21", "1 Corinthians 7:25-40"], ["Job 20:12-21:34", "Psalm 105:7-15", "Proverbs 21:22-24", "1 Corinthians 8:1-9:12"], ["Job 22:1-24:12", "Psalm 105:16-27", "Proverbs 21:25-26", "1 Corinthians 9:13-10:5"], ["Job 24:13-27:23", "Psalm 105:28-36", "Proverbs 21:27-28", "1 Corinthians 10:6-24"], ["Job 28:1-30:8", "Psalm 105:37-45", "Proverbs 21:29-31", "1 Corinthians 10:25-11:16"], ["Job 30:9-31:40", "Psalm 106:1-12", "Proverbs 22:1-2", "1 Corinthians 11:17-34"], ["Job 32:1-33:33", "Psalm 106:13-23", "Proverbs 22:3-4", "1 Corinthians 12:1-20"], ["Job 34:1-35:16", "Psalm 106:24-31", "Proverbs 22:5-6", "1 Corinthians 12:21-13:13"], ["Job 36:1-37:24", "Psalm 106:32-39", "Proverbs 22:7-8", "1 Corinthians 14:1-25"], ["Job 38:1-39:12", "Psalm 106:40-48", "Proverbs 22:9-10", "1 Corinthians 14:26-15:11"], ["Job 39:13-40:24", "Psalm 107:1-9", "Proverbs 22:11-12", "1 Corinthians 15:12-34"], ["Job 41:1-42:17", "Psalm 107:10-16", "Proverbs 22:13-14", "1 Corinthians 15:35-58"], ["Ecclesiastes 1:1-3:8", "Psalm 107:17-22", "Proverbs 22:15-16", "1 Corinthians 16:1-24"], ["Ecclesiastes 3:9-6:12", "Psalm 107:23-32", "Proverbs 22:17-19", "2 Corinthians 1:1-22"], ["Ecclesiastes 7:1-9:10", "Psalm 107:33-38", "Proverbs 22:20-21", "2 Corinthians 1:23-3:3"], ["Ecclesiastes 9:11-12:14", "Psalm 107:39-43", "Proverbs 22:22-23", "2 Corinthians 3:4-4:6"], ["Song of Songs 1:1-4:16", "Psalm 108:1-6", "Proverbs 22:24-25", "2 Corinthians 4:7-5:10"], ["Song of Songs 5:1-8:14", "Psalm 108:7-13", "Proverbs 22:26-27", "2 Corinthians 5:11-6:13"], ["Isaiah 1:1-2:22", "Psalm 109:1-7", "Proverbs 22:28-29", "2 Corinthians 6:14-7:16"], ["Isaiah 3:1-5:23", "Psalm 109:8-15", "Proverbs 23:1-3", "2 Corinthians 8:1-24"], ["Isaiah 5:24-7:25", "Psalm 109:16-25", "Proverbs 23:4-5", "2 Corinthians 9:1-10:11"], ["Isaiah 8:1-10:11", "Psalm 109:26-31", "Proverbs 23:6-8", "2 Corinthians 10:12-11:15"], ["Isaiah 10:12-12:6", "Psalm 110:1-7", "Proverbs 23:9-11", "2 Corinthians 11:16-12:10"], ["Isaiah 13:1-14:32", "Psalm 111:1-5", "Proverbs 23:12-14", "2 Corinthians 12:11-13:13"], ["Isaiah 15:1-18:7", "Psalm 111:6-10", "Proverbs 23:15-16", "Galatians 1:1-24"], ["Isaiah 19:1-22:8", "Psalm 112:1-5", "Proverbs 23:17-18", "Galatians 2:1-21"], ["Isaiah 22:9-24:23", "Psalm 112:6-10", "Proverbs 23:19-21", "Galatians 3:1-18"], ["Isaiah 25:1-27:13", "Psalm 113:1-9", "Proverbs 23:22-23", "Galatians 3:19-4:11"], ["Isaiah 28:1-29:24", "Psalm 114:1-8", "Proverbs 23:24-25", "Galatians 4:12-31"], ["Isaiah 30:1-32:10", "Psalm 115:1-8", "Proverbs 23:26-28", "Galatians 5:1-18"], ["Isaiah 32:11-34:17", "Psalm 115:9-13", "Proverbs 23:29-30", "Galatians 5:19-6:18"], ["Isaiah 35:1-37:20", "Psalm 115:14-18", "Proverbs 23:31-32", "Ephesians 1:1-23"], ["Isaiah 37:21-39:8", "Psalm 116:1-7", "Proverbs 23:33-35", "Ephesians 2:1-22"], ["Isaiah 40:1-41:20", "Psalm 116:8-14", "Proverbs 24:1-2", "Ephesians 3:1-21"], ["Isaiah 41:21-43:13", "Psalm 116:15-19", "Proverbs 24:3-4", "Ephesians 4:1-24"], ["Isaiah 43:14-45:10", "Psalms 117:1-118:4", "Proverbs 24:5-6", "Ephesians 4:25-5:14"], ["Isaiah 45:11-48:11", "Psalm 118:5-9", "Proverbs 24:7-9", "Ephesians 5:15-33"], ["Isaiah 48:12-50:11", "Psalm 118:10-14", "Proverbs 24:10-12", "Ephesians 6:1-24"], ["Isaiah 51:1-54:3", "Psalm 118:15-21", "Proverbs 24:13-14", "Philippians 1:1-20"], ["Isaiah 54:4-57:13", "Psalm 118:22-29", "Proverbs 24:15-16", "Philippians 1:21-2:11"], ["Isaiah 57:14-60:16", "Psalm 119:1-4", "Proverbs 24:17-18", "Philippians 2:12-30"], ["Isaiah 60:17-63:19", "Psalm 119:5-8", "Proverbs 24:19-20", "Philippians 3:1-21"], ["Isaiah 64:1-66:24", "Psalm 119:9-11", "Proverbs 24:21-22", "Philippians 4:1-23"], ["Jeremiah 1:1-2:37", "Psalm 119:12-16", "Proverbs 24:23-25", "Colossians 1:1-20"], ["Jeremiah 3:1-4:31", "Psalm 119:17-20", "Proverbs 24:26-27", "Colossians 1:21-2:15"], ["Jeremiah 5:1-6:21", "Psalm 119:21-24", "Proverbs 24:28-29", "Colossians 2:16-3:17"], ["Jeremiah 6:22-8:13", "Psalm 119:25-27", "Proverbs 24:30-34", "Colossians 3:18-4:18"], ["Jeremiah 8:14-10:17", "Psalm 119:28-32", "Proverbs 25:1-3", "1 Thessalonians 1:1-2:12"], ["Jeremiah 10:18-12:17", "Psalm 119:33-36", "Proverbs 25:4-7", "1 Thessalonians 2:13-3:13"], ["Jeremiah 13:1-15:4", "Psalm 119:37-40", "Proverbs 25:8-10", "1 Thessalonians 4:1-5:7"], ["Jeremiah 15:5-17:18", "Psalm 119:41-44", "Proverbs 25:11-12", "1 Thessalonians 5:8-28"], ["Jeremiah 17:19-20:6", "Psalm 119:45-48", "Proverbs 25:13", "2 Thessalonians 1:1-2:12"], ["Jeremiah 20:7-22:30", "Psalm 119:49-52", "Proverbs 25:14-15", "2 Thessalonians 2:13-3:18"], ["Jeremiah 23:1-24:10", "Psalm 119:53-56", "Proverbs 25:16-17", "1 Timothy 1:1-20"], ["Jeremiah 25:1-26:24", "Psalm 119:57-60", "Proverbs 25:18-20", "1 Timothy 2:1-3:7"], ["Jeremiah 27:1-29:14", "Psalm 119:61-64", "Proverbs 25:21-22", "1 Timothy 3:8-4:16"], ["Jeremiah 29:15-31:14", "Psalm 119:65-68", "Proverbs 25:23-24", "1 Timothy 5:1-25"], ["Jeremiah 31:15-32:25", "Psalm 119:69-72", "Proverbs 25:25-26", "1 Timothy 6:1-21"], ["Jeremiah 32:26-34:11", "Psalm 119:73-77", "Proverbs 25:27-28", "2 Timothy 1:1-18"], ["Jeremiah 34:12-36:26", "Psalm 119:78-81", "Proverbs 26:1-3", "2 Timothy 2:1-21"], ["Jeremiah 36:27-38:28", "Psalm 119:82-88", "Proverbs 26:4-6", "2 Timothy 2:22-3:17"], ["Jeremiah 39:1-41:18", "Psalm 119:89-95", "Proverbs 26:7-9", "2 Timothy 4:1-22"], ["Jeremiah 42:1-44:14", "Psalm 119:96-100", "Proverbs 26:10-12", "Titus 1:1-2:8"], ["Jeremiah 44:15-47:7", "Psalm 119:101-104", "Proverbs 26:13-16", "Titus 2:9-3:15"], ["Jeremiah 48:1-49:6", "Psalm 119:105-108", "Proverbs 26:17-191"], ["Jeremiah 49:7-50:23", "Psalm 119:109-112", "Proverbs 26:20-23", "Hebrews 1:1-2:9"], ["Jeremiah 50:24-51:32", "Psalm 119:113-120", "Proverbs 26:24-26", "Hebrews 2:10-3:11"], ["Jeremiah 51:33-52:16", "Psalm 119:121-128", "Proverbs 26:27-28", "Hebrews 3:12-4:13"], ["Jeremiah 52:17-34", "Psalm 119:129-136", "Proverbs 27:1-2", "Hebrews 4:14-6:8"], ["Lamentations 1:1-3:12", "Psalm 119:137-140", "Proverbs 27:3-4", "Hebrews 6:9-7:10"], ["Lamentations 3:13-66", "Psalm 119:141-144", "Proverbs 27:5-6", "Hebrews 7:11-8:6"], ["Lamentations 4:1-5:22", "Psalm 119:145-152", "Proverbs 27:7-8", "Hebrews 8:7-9:14"], ["Ezekiel 1:1-3:15", "Psalm 119:153-160", "Proverbs 27:9-10", "Hebrews 9:15-10:10"], ["Ezekiel 3:16-6:14", "Psalm 119:161-168", "Proverbs 27:11-13", "Hebrews 10:11-31"], ["Ezekiel 7:1-9:11", "Psalm 119:169-176", "Proverbs 27:14-16", "Hebrews 10:32-11:12"], ["Ezekiel 10:1-12:7", "Psalm 120:1-7", "Proverbs 27:17-18", "Hebrews 11:13-31"], ["Ezekiel 12:8-14:11", "Psalm 121:1-8", "Proverbs 27:19-20", "Hebrews 11:32-12:11"], ["Ezekiel 14:12-16:34", "Psalms 122:1-123:4", "Proverbs 27:21-22", "Hebrews 12:12-29"], ["Ezekiel 16:35-17:24", "Psalm 124:1-8", "Proverbs 27:23-24", "Hebrews 13:1-25"], ["Ezekiel 18:1-19:14", "Psalm 125:1-5", "Proverbs 27:25-27", "James 1:1-21"], ["Ezekiel 20:1-21:7", "Psalm 126:1-6", "Proverbs 28:1-3", "James 1:22-2:17"], ["Ezekiel 21:8-22:31", "Psalm 127:1-5", "Proverbs 28:4-5", "James 2:18-3:12"], ["Ezekiel 23:1-24:5", "Psalm 128:1-6", "Proverbs 28:6-8", "James 3:13-4:17"], ["Ezekiel 24:6-26:6", "Psalm 129:1-8", "Proverbs 28:9-1", "James 5:1-20"], ["Ezekiel 26:7-27:36", "Psalm 130:1-8", "Proverbs 28:12-14", "1 Peter 1:1-21"], ["Ezekiel 28:1-30:8", "Psalms 131:1-132:5", "Proverbs 28:15-18", "1 Peter 1:22-2:17"], ["Ezekiel 30:9-32:16", "Psalm 132:6-12", "Proverbs 28:19-22", "1 Peter 2:18-3:12"], ["Ezekiel 32:17-33:33", "Psalm 132:13-18", "Proverbs 28:23-25", "1 Peter 3:13-4:11"], ["Ezekiel 34:1-36:12", "Psalms 133:1-134:3", "Proverbs 28:26-28", "1 Peter 4:12-5:14"], ["Ezekiel 36:13-37:28", "Psalm 135:1-7", "Proverbs 29:1-3", "2 Peter 1:1-21"], ["Ezekiel 38:1-39:29", "Psalm 135:8-12", "Proverbs 29:4-6", "2 Peter 2:1-22"], ["Ezekiel 40:1-41:7", "Psalm 135:13-21", "Proverbs 29:7-9", "2 Peter 3:1-18"], ["Ezekiel 41:8-43:12", "Psalm 136:1-9", "Proverbs 29:10-12", "1 John 1:1-2:11"], ["Ezekiel 43:13-44:31", "Psalm 136:10-16", "Proverbs 29:13-14", "1 John 2:12-29"], ["Ezekiel 45:1-47:5", "Psalm 136:17-26", "Proverbs 29:15-17", "1 John 3:1-24"], ["Ezekiel 47:6-48:35", "Psalm 137:1-6", "Proverbs 29:18-21", "1 John 4:1-21"], ["Daniel 1:1-2:35", "Psalms 137:7-138:3", "Proverbs 29:22-23", "1 John 5:1-21"], ["Daniel 2:36-3:30", "Psalm 138:4-8", "Proverbs 29:24-25"], ["Daniel 4:1-5:31", "Psalm 139:1-6", "Proverbs 29:26-27"], ["Daniel 6:1-7:28", "Psalm 139:7-12", "Proverbs 30:1-2"], ["Daniel 8:1-9:27", "Psalm 139:13-18", "Proverbs 30:3-4"], ["Daniel 10:1-11:45", "Psalm 139:19-24", "Proverbs 30:5-6", "Revelation 1:1-20"], ["Psalm 140:1-5", "Proverbs 30:7-9", "Revelation 2:1-17"], ["Hosea 4:1-7:16", "Psalm 140:6-13", "Proverbs 30:10-12", "Revelation 2:18-3:6"], ["Hosea 8:1-10:15", "Psalm 141:1-6", "Proverbs 30:13-14", "Revelation 3:7-22"], ["Hosea 11:1-14:9", "Psalm 141:7-10", "Proverbs 30:15-17", "Revelation 4:1-5:14"], ["Joel 1:1-2:32", "Psalm 142:1-7", "Proverbs 30:18-20", "Revelation 6:1-17"], ["Psalm 143:1-6", "Proverbs 30:21-23", "Revelation 7:1-17"], ["Amos 3:1-5:27", "Psalm 143:7-12", "Proverbs 30:24-28", "Revelation 8:1-9:12"], ["Amos 6:1-8:14", "Psalm 144:1-8", "Proverbs 30:29-33", "Revelation 9:13-10:11"], ["Psalm 144:9-15", "Proverbs 31:1-3", "Revelation 11:1-19"], ["Jonah 1:1-4:11", "Psalm 145:1-7", "Proverbs 31:4-7", "Revelation 12:1-18"], ["Micah 1:1-4:13", "Psalm 145:8-13", "Proverbs 31:8-9", "Revelation 13:1-18"], ["Micah 5:1-7:20", "Psalm 145:14-21", "Proverbs 31:10-12", "Revelation 14:1-20"], ["Nahum 1:1-3:19", "Psalm 146:1-10", "Proverbs 31:13-14", "Revelation 15:1-16:11"], ["Habakkuk 1:1-3:19", "Psalm 147:1-6", "Proverbs 31:15-17", "Revelation 16:12-17:8"], ["Zephaniah 1:1-3:20", "Psalm 147:7-14", "Proverbs 31:18-19", "Revelation 17:9-18:8"], ["Psalm 147:15-20", "Proverbs 31:20-22", "Revelation 18:9-24"], ["Zechariah 2:1-6:15", "Psalm 148:1-6", "Proverbs 31:23-25", "Revelation 19:1-21"], ["Zechariah 7:1-10:12", "Psalm 148:7-14", "Proverbs 31:26-27", "Revelation 20:1-21:4"], ["Zechariah 11:1-14:21", "Psalm 149:1-9", "Proverbs 31:28-29", "Revelation 21:5-27"], ["Malachi 1:1-4:6", "Psalm 150:1-6", "Proverbs 31:30-31", "Revelation 22:1-21"]];
const YEARLY_PLAN_PATH = "./csb-every-day-with-jesus.json";
const LEGACY_ESV_EVERY_DAY_BIBLE = YEARLY_READING_SCHEDULE;

const PLAN_TEMPLATES = {
  plan1: {
    label: "Plan 1 – ASV 365-Day Reading Plan",
    summary:
      "Read the uploaded 365-day Bible plan using the ASV public-domain text as the baseline. Each day follows the same four-section rhythm from the PDF schedule.",
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

function buildTemplateEntries(templateKey) {
  const template = PLAN_TEMPLATES[templateKey] || PLAN_TEMPLATES.plan1;

  if (template.useEsvEveryDay) {
    return YEARLY_READING_SCHEDULE.flatMap((day, dayIndex) =>
      day.map((passage, sectionIndex) => ({
        id: `sample-day-${dayIndex + 1}-section-${sectionIndex + 1}`,
        reference: passage,
        note: ["Old Testament", "Psalms", "Proverbs", "New Testament"][sectionIndex] || `Section ${sectionIndex + 1}`,
        complete: false,
      })),
    );
  }

  return (template.defaults || []).map((entry, index) => ({
    id: `sample-entry-${index + 1}`,
    ...entry,
    complete: false,
  }));
}

const SAMPLE_PLAN = {
  id: "sample-plan",
  name: "One-Year Bible Reading Plan",
  startDate: "2026-01-01",
  readingDate: "2026-01-01",
  template: "plan1",
  entries: buildTemplateEntries("plan1"),
};

const ASV_BIBLE_PATH = "./asv-bible.json";

const state = {
  plans: [],
  currentPlanId: null,
  selectedPassageId: null,
  speech: null,
  voices: [],
  asvBible: null,
  asvBibleLoaded: false,
  asvBibleError: null,
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
const deletePlanBtn = document.getElementById("deletePlanBtn");
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

function deepCloneValue(value) {
  if (typeof structuredClone === "function") {
    return structuredClone(value);
  }

  if (Array.isArray(value)) {
    return value.map((item) => deepCloneValue(item));
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, nestedValue]) => [key, deepCloneValue(nestedValue)]),
    );
  }

  return value;
}

function getSavedPlans() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [deepCloneValue(SAMPLE_PLAN)];
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length
      ? parsed
      : [deepCloneValue(SAMPLE_PLAN)];
  } catch (error) {
    return [deepCloneValue(SAMPLE_PLAN)];
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

async function loadAsvBibleData() {
  if (state.asvBibleLoaded) {
    return state.asvBible;
  }

  try {
    const response = await fetch(ASV_BIBLE_PATH);
    if (!response.ok) {
      throw new Error(`ASV bible failed to load (${response.status})`);
    }
    state.asvBible = await response.json();
    state.asvBibleLoaded = true;
    return state.asvBible;
  } catch (error) {
    state.asvBibleError = error.message;
    state.asvBibleLoaded = true;
    return null;
  }
}

function normalizeBookName(bookName) {
  if (!bookName) return "";

  const cleaned = bookName.trim().replace(/\s+/g, " ");
  const aliasMap = {
    "Psalm": "Psalms",
    "Songs of Solomon": "Song of Solomon",
    "Song of Songs": "Song of Solomon",
    "Song of Solomon": "Song of Solomon",
  };

  return aliasMap[cleaned] || cleaned;
}

function parseReferenceRange(reference) {
  if (!reference) return null;

  const match = reference
    .trim()
    .replace(/\s+/g, " ")
    .match(/^(.+?)\s+(\d+):(\d+)(?:-(\d+)(?::(\d+))?)?$/);

  if (!match) return null;

  const book = normalizeBookName(match[1]);
  const startChapter = Number(match[2]);
  const startVerse = Number(match[3]);
  const endChapter = Number(match[4] || match[2]);
  const endVerse = Number(match[5] || match[3]);

  return { book, startChapter, startVerse, endChapter, endVerse };
}

function getAsvPassageText(reference) {
  if (!reference || !state.asvBible) {
    return "ASV text is still loading...";
  }

  const parsed = parseReferenceRange(reference);
  if (!parsed) {
    return "Selected passage is not in the ASV plan format.";
  }

  const bookData = state.asvBible[parsed.book];
  if (!bookData) {
    return `ASV text unavailable for ${reference}.`;
  }

  const parts = [];
  for (let chapterNumber = parsed.startChapter; chapterNumber <= parsed.endChapter; chapterNumber += 1) {
    const chapterText = bookData[String(chapterNumber)];
    if (!Array.isArray(chapterText)) {
      continue;
    }

    const verseStart = chapterNumber === parsed.startChapter ? parsed.startVerse - 1 : 0;
    const verseEnd = chapterNumber === parsed.endChapter ? parsed.endVerse : chapterText.length;

    for (let verseIndex = verseStart; verseIndex < verseEnd; verseIndex += 1) {
      const verseText = chapterText[verseIndex];
      if (verseText) {
        parts.push(`${verseIndex + 1}. ${verseText}`);
      }
    }
  }

  return parts.join(" ");
}

function formatEntryLabel(entry) {
  if (!entry) {
    return "Reading passage";
  }

  if (entry.reference) {
    return entry.reference;
  }

  if (entry.book) {
    return `${entry.book} ${entry.chapter}:${entry.fromVerse}-${entry.toVerse}`;
  }

  return "Reading passage";
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

  const reference = entry.reference || `${entry.book} ${entry.chapter}:${entry.fromVerse}-${entry.toVerse}`;

  if (entry.readbackText?.trim()) {
    return `${reference}\n\n${entry.readbackText.trim()}`;
  }

  const asvText = state.asvBible ? getAsvPassageText(reference) : "";
  if (asvText && asvText !== "ASV text is still loading..." && !asvText.startsWith("ASV text unavailable")) {
    return `${reference}\n\n${asvText}`;
  }

  return `"${reference}"\n\nRead the passage prayerfully. Note: ${entry.note || "Keep a simple observation."}`;
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
    .map((entry) => {
      const label = formatEntryLabel(entry);
      const ariaLabel = entry.reference || `${entry.book || "Reading"} ${entry.chapter || ""}`;
      return `
      <div class="progress-item ${entry.complete ? "done" : ""}" data-entry-id="${entry.id}">
        <div>
          <strong>${label}</strong>
          <span>${entry.note || "Daily reflection"}</span>
        </div>
        <button type="button" aria-label="Toggle reading completion for ${ariaLabel}">${entry.complete ? "Completed" : "Mark done"}</button>
      </div>
    `;
    })
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

async function renderSelectedPassage() {
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

  const reference = selected.reference || `${selected.book} ${selected.chapter}:${selected.fromVerse}-${selected.toVerse}`;
  selectedPassageTitle.textContent = reference;

  if (!state.asvBibleLoaded) {
    selectedPassageText.textContent = "Loading ASV text...";
    await loadAsvBibleData();
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

function deleteCurrentPlan() {
  const plan = getCurrentPlan();
  if (!plan) return;

  if (state.plans.length <= 1) {
    alert("Keep at least one plan available. Use Reset plan to clear the current plan instead.");
    return;
  }

  const confirmed = window.confirm(`Delete the plan "${plan.name}"?`);
  if (!confirmed) {
    return;
  }

  state.plans = state.plans.filter((candidate) => candidate.id !== plan.id);
  state.currentPlanId = state.plans[0]?.id || null;
  state.selectedPassageId = state.plans[0]?.entries?.[0]?.id || null;
  savePlans();
  renderAll();
}

async function buildYearlyAsvEntries() {
  try {
    const response = await fetch(YEARLY_PLAN_PATH);
    if (!response.ok) {
      throw new Error(`Schedule request failed (${response.status})`);
    }

    const schedule = await response.json();
    if (!Array.isArray(schedule) || !schedule.length) {
      throw new Error("Schedule is empty.");
    }

    const labels = ["Old Testament", "Psalms", "Proverbs", "New Testament"];
    return schedule.flatMap((dayEntries, dayIndex) =>
      (Array.isArray(dayEntries) ? dayEntries : []).map((reference, sectionIndex) => ({
        id: `esv-day-${dayIndex + 1}-section-${sectionIndex + 1}`,
        reference: reference.trim(),
        note: labels[sectionIndex] || `Section ${sectionIndex + 1}`,
        complete: false,
      })),
    );
  } catch (error) {
    return LEGACY_ESV_EVERY_DAY_BIBLE.flatMap((day, dayIndex) =>
      day.map((passage, sectionIndex) => ({
        id: `esv-day-${dayIndex + 1}-section-${sectionIndex + 1}`,
        reference: passage,
        note: ["Old Testament", "New Testament", "Psalms", "Proverbs"][sectionIndex] || `Section ${sectionIndex + 1}`,
        complete: false,
      })),
    );
  }
}

async function addNewPlan() {
  const templateKey = planTemplateSelect.value || "plan1";
  const template = PLAN_TEMPLATES[templateKey] || PLAN_TEMPLATES.plan1;

  let entries = [];

  if (template.useEsvEveryDay) {
    entries = await buildYearlyAsvEntries();
  } else {
    entries = buildTemplateEntries(templateKey);
  }

  const plan = {
    id: createPlanId(),
    name: template.label.replace(" – ", " "),
    startDate: DAY_MIN,
    readingDate: DAY_MIN,
    template: templateKey,
    entries,
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

clearPlanBtn?.addEventListener("click", resetPlan);
deletePlanBtn?.addEventListener("click", deleteCurrentPlan);
newPlanBtn?.addEventListener("click", addNewPlan);

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
  loadAsvBibleData().then(() => renderSelectedPassage());

  if (!readingDateInput.value) {
    readingDateInput.value = DAY_MIN;
  }

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js", { updateViaCache: "none" }).catch(() => {
      // Keep the app functional even if service worker registration fails.
    });
  }
}

initialize();
