# Specification

## Summary
**Goal:** Let admins move locally-stored portal data between different sharing links by exporting and importing a single JSON file.

**Planned changes:**
- Add an Admin “Data Transfer” section/card with an **Export** action that downloads a JSON containing LocalStorage `maspar_catalog` and `maspar_new_arrivals_banner`, including empty/null values when not set.
- Add an Admin **Import** flow to upload a previously exported JSON, validate and safely parse it, confirm before overwriting, restore LocalStorage keys, and trigger in-app sync so Admin and Public Viewer update immediately without a full reload.
- Update the Admin storage notice/help text to clearly state data does not sync across different links/domains/devices and that Export/Import is the supported way to move data (English-only).

**User-visible outcome:** Admins can export the current catalog + New Arrivals banner to a JSON file and import it on another sharing link to immediately see the same data in both Admin and Public Viewer, with clear English prompts and error messages.
