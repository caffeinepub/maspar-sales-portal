# Specification

## Summary
**Goal:** Add a predefined, shared label set and use it in the Admin Upload form via a dropdown so admins select labels instead of typing them.

**Planned changes:**
- Create a dedicated frontend module that exports the predefined label list as a single source of truth: Colorart, Vintage, Hermosa, Rurban, Essentials, Eternal Treasure, Hues, Inhouse, Cotsmere, Little Maspar, Generic, Maspar.
- Update Admin Upload form to include a label selection control (dropdown/combobox) populated from the shared label list.
- On label selection, auto-populate the English label field with the selected label value while keeping the Hindi label field present and editable.
- Ensure existing add-item flow continues to persist items to localStorage and display correctly in Admin catalog manager and Public Viewer.

**User-visible outcome:** Admins can pick a label from a predefined dropdown during upload; the English label is filled automatically, and the Hindi label can still be entered/overridden manually.
