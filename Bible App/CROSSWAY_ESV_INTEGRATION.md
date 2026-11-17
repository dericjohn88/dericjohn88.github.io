# ESV Every Day Bible Integration

## Overview
The Bible App now uses the complete **Crossway ESV Every Day Bible** 365-day reading plan instead of placeholder data.

## Plan Structure
- **365 daily readings** covering the entire Bible in one year
- **4 sections per day**:
  1. Old Testament passage
  2. New Testament passage
  3. Psalm passage
  4. Proverb passage
  
- **Estimated reading time**: ~15 minutes per day
- **Coverage**: Full OT & NT once; Psalms & Proverbs twice

## Example Daily Reading
**Day 1:**
- Genesis 1:1-2:25 (Old Testament)
- Matthew 1:1-2:12 (New Testament)
- Psalm 1:1-6 (Psalms)
- Proverbs 1:1-6 (Proverbs)

## How to Use

### Create a New Plan
1. Click **"New plan"** button
2. Select **"Plan 1 – ESV Every Day Bible (Crossway)"**
3. Enter a plan name (optional)
4. Set the **start date** (plan begins from Day 1)
5. Click submit

### Track Progress
- The app automatically calculates which day you should be on based on the start date
- Use the **reading date selector** to jump to any day
- Mark readings as complete (✓)
- See daily progress in the **Today's plan progress** section

### Listen on the Go
- Use **"Read aloud"** to hear passages with text-to-speech
- Pre-download today's audio with **"Pre-download today's audio"**
- Adjust voice and speaking rate in voice controls

## Data Source
- **Source**: [khornberg/readingplans](https://github.com/khornberg/readingplans) GitHub repository
- **Plan Name**: "Every Day in the Word" (ESV.org official plan)
- **Publisher**: Crossway
- **Bible Version**: ESV (English Standard Version)

## Technical Details

### Entry Format
Each reading entry uses reference notation:
```javascript
{
  id: "esv-day-1-section-1",
  reference: "Genesis 1:1-2:25",
  note: "Old Testament",
  complete: false
}
```

### Date Calculation
The app calculates which day to show based on:
```
Day Number = Current Date - Start Date + 1
Slice = (Day Number - 1) * 4 to Day Number * 4
```

This gives you exactly 4 entries (sections) for each day.

### Features with ESV Plan
- ✅ **Full Bible Coverage** - All 66 books over 365 days
- ✅ **Balanced Daily Reading** - OT, NT, Psalms, Proverbs each day
- ✅ **Mobile Offline Support** - Works with PWA + service worker caching
- ✅ **Audio/Text-to-Speech** - Hear passages read aloud
- ✅ **Progress Tracking** - Mark sections complete
- ✅ **Date Navigation** - Jump to any day in the plan

## Plan Options

| Plan | Type | Use Case |
|------|------|----------|
| **Plan 1** | ESV Every Day Bible (Crossway) | Balanced, proven plan for 1-year Bible reading |
| **Plan 2** | Seven-Section Rotation | Rotate through different Bible sections by day |
| **Plan 3** | Cover-to-Cover Order | Read straight through Genesis to Revelation |

## Notes
- If you stop reading for days, you can adjust the reading date to catch up
- All progress is saved locally (IndexedDB) on your device
- No internet required after the app is installed
- Share a plan by exporting your reading schedule as JSON
