# dericjohn88.github.io

Hosted Website for API Calls
Static GitHub Pages dashboard for hosted tools, public status views, and a Firebase-backed owner panel.

## Structure

- `index.html`: main landing page and tool dashboard shell
- `styles.css`: dark-mode site styling for the public dashboard and owner panel
- `app.js`: lightweight client-side rendering for tool cards and detail view
- `site-config.js`: public Firebase configuration and Firestore collection names

## Notes

- The site is now a plain static dashboard that can be extended with additional tool entries over time.
- The repository only contains public Firebase configuration. Private access should be enforced by Firebase Authentication and Firestore rules.

## Firebase Setup

1. Fill in the Firebase values in `site-config.js`.
2. Enable Google sign-in in Firebase Authentication.
3. Add your GitHub Pages domain to Firebase authorized domains.
4. Create a Firestore collection named `privateTools`.
5. Add one document per public tool using the tool slug as the document id.

Expected Firestore document example for `privateTools/meal-reminder`:

```json
{
	"apiBaseUrl": "https://dericjohn88.github.io",
	"endpoints": [
		{ "label": "Health", "path": "/api/health" },
		{ "label": "Tool List", "path": "/api/tools" },
		{ "label": "Tool Detail", "path": "/api/tools/meal-reminder" }
	],
	"lastUpdated": "June 2026",
	"owner": "Deric John",
	"summary": "Owner-only tool notes and endpoint inventory."
}
```
