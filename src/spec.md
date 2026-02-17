# Specification

## Summary
**Goal:** Remove all user-facing “Collection” UI and wording from the Admin page while keeping catalog item creation working via an internal default collection value.

**Planned changes:**
- Remove the “Collection” field (label/control) from the Admin upload form so Admin users cannot view or change collection when creating catalog items.
- Ensure form submission still creates a valid catalog item by applying a safe default collection value internally (not shown in the UI).
- Remove the “Collection” column from the Admin catalog table (header and row cells) while keeping the table usable and Actions working.
- Update any remaining Admin-facing text to eliminate the word “Collection” and keep the Admin UI English-only and clear.

**User-visible outcome:** Admin users can upload and manage catalog items without seeing any “Collection” field/column/text, and uploads continue to succeed normally.
