# Specification

## Summary
**Goal:** Fix the portal theme so the new brand orange (#FAA831) and a grey-dominant (“70% grey”) glassmorphism look apply consistently across the frontend, replacing any remaining old orange (#F15A22).

**Planned changes:**
- Update global theme tokens and CSS variables (including header gradient and primary accents) to use #FAA831 and remove remaining references to #F15A22.
- Update Tailwind theme configuration so `maspar.orange` maps to #FAA831 and any related orange-tinted glow/shadow values align with the new orange accent.
- Audit key UI areas (Header, Tabs, Collection cards, Search/Filters panel, Item grid cards, Media viewer modal) to remove hardcoded primary hex colors and ensure components rely on theme tokens for consistent grey surfaces + orange accents.
- Ensure grey-neutral surfaces and text contrast remain readable in both light and dark modes with the updated glassmorphism styling.

**User-visible outcome:** On a fresh load, the portal displays a consistent grey-dominant glass theme with orange #FAA831 used only for emphasis (active states, rings, highlights), with no visible remnants of the old orange theme.
