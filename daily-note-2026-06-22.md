---
date: 2026-06-22
type: daily
tags: [daily]
---

## Daily/2026-06-22

### Work
- [ ] Removed "PUBLIC / PRIVATE" AI slop text from hero banner (completed)
- [ ] Added YOLO mode prohibition to SOUL.md (completed)
- [ ] Added Chinese-specific tools avoidance rule to SOUL.md (completed)
- [ ] Normalized Google Fonts links across all application pages (autotrader, f3-workout-randomizer, financial-test-app, travel) to match main landing page format (completed)

## Schedule — 2026-06-22
- 06:22 AM — Soul.md updates and local site verification

## Log
- 06:22 AM — Started session, reviewed SOUL.md updates
- 06:24 AM — Confirmed `.hero-copy::after` with `PUBLIC / PRIVATE` content is already absent from styles.css
- 06:25 AM — Patched SOUL.md to add YOLO mode prohibition and Chinese-specific tools avoidance
- 06:27 AM — Verified local server at http://localhost:3000 is running; page renders correctly

## Wins — 2026-06-22
✅ Removed AI slop text "PUBLIC / PRIVATE" from dericjohn88.github.io hero banner
✅ Added YOLO mode prohibition flag to SOUL.md
✅ Added Chinese-specific tools avoidance note to SOUL.md

## Context
- Files modified: `C:\\Users\deric\.hermes\SOUL.md`
- Project: dericjohn88.github.io

## Standard for new application pages
- Any new project page added to dericjohn88.github.io must use the same head/font format as the main landing page and existing application pages
- Required `<head>` assets (in order):
  1. `<meta charset="UTF-8" />`
  2. `<meta name="viewport" content="width=device-width, initial-scale=1.0" />`
  3. `<title>` (application-specific)
  4. Google Fonts preconnect links for `fonts.googleapis.com` and `fonts.gstatic.com`
  5. Google Fonts stylesheet: `Fraunces` + `Manrope` weights 400/500/600/700
  6. `<link rel="stylesheet" href="../styles.css" />`
- Page body should use `.site-shell` > `.section-block` layout with `.section-heading`, `.detail-copy`, `.detail-section`, `.detail-list` classes from `styles.css`
- Do NOT add inline `<style>` blocks or duplicate font CSS in individual app pages
