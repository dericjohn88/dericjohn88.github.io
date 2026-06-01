# dericjohn88.github.io

Static GitHub Pages dashboard for hosted tools, endpoint inventory, and an optional owner-only operator panel.

## Structure

- `index.html`: main landing page and tool dashboard shell
- `styles.css`: site styling translated from the Wix embed theme
- `app.js`: lightweight client-side rendering for tool cards and detail view
- `site-config.js`: local configuration for the optional Google owner layer

## Notes

- The site is now a plain static dashboard that can be extended with additional tool entries over time.
- The Google owner layer is client-side only. It can hide the operator panel for convenience, but it does not replace backend security.
