# Specification

## Summary
**Goal:** Fix the Public Viewer so clicking any catalog item reliably opens the correct media viewer modal (Image/Video/PDF) and does not close unexpectedly.

**Planned changes:**
- Investigate and fix the click/open flow so the MediaViewerModal always opens from an item card click and stays open until the user explicitly closes it.
- Ensure the modal renders the correct viewer component based on the item’s media type (image/video/pdf).
- Add a safe client-side cleanup/migration step when loading catalog items from LocalStorage to normalize legacy/invalid `mediaType` values and handle missing/invalid `mediaSource` gracefully without runtime errors.

**User-visible outcome:** In the Public Viewer, clicking any catalog item consistently opens a modal that shows the correct image/video/PDF preview, and malformed stored items show the existing English error UI instead of failing silently.
