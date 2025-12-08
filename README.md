# Document Agreement Component

A modern Angular 18+ standalone component that lets users view legal documents (PDFs), review revisions, and agree to document types — with validation, inline viewing, fullscreen support, and reactive state management.

---

## Setup Instructions

1. Clone the repository:

```bash
git clone https://github.com/davmmcdonald/document-agreement-component.git
cd document-agreement-component
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
ng serve
```

Then open your browser to `http://localhost:4200`.

4. The current implementation uses a **mock endpoint / mock service** to provide document metadata and PDFs (from `src/assets/`). No real backend is required to run or test the component.

---

## Assumptions Made

* All legal documents are delivered as PDFs.
* Documents referenced by the mock service correspond to files placed under the `assets/` directory.
* For each document **type**, there may be either:

  * A single “full” document, or
  * A pair of documents: one “full” and one “changes-only” revision.
* The user’s agreement is per **document type**, not per individual file.
* On submission, the “full” document ID is submitted — even if the user reviewed only the “changes-only” version.
* Because this is a sample / demo, no persistent backend or user authentication is implemented — state isn’t stored beyond the session.

---

## Design Decisions & Tradeoffs

**What this component uses & why**

* Angular 18+ **standalone component** + **signals**: simplifies state management (loading, document groups, alerts) without requiring a full NgModule wrapper.
* **Reactive Forms** with dynamic controls and `Validators.requiredTrue`: cleanly handles agreement validation across an arbitrary number of document types.
* **`iframe` for PDF display**: simple, built‑in browser feature; works across platforms without extra dependencies.
* **Fullscreen toggle per document**: improves readability especially for longer or detailed PDFs.
* **Alert / notification system with auto‑fade**: lightweight, easy to integrate, improves UX on submission or error states.

**Tradeoffs / Limitations**

* The component relies on a mock service — while great for quick setup and testing, a real backend integration would be needed for production, including network error handling and secure PDF retrieval.
* Using `iframe` for PDFs is straightforward, but might not provide the best UX on mobile or smaller screens (e.g. pinch‑to-zoom, search in PDF, annotations). A dedicated PDF library might improve that.
* Alerts are simple and auto‑fade — but a more robust notification or feedback system (to handle repeated alerts, stacking, dismissal) could be more user‑friendly.
* No persistence of agreement state — if the user refreshes or navigates away, agreements are lost.

---

## Additional Features / Improvements You Could Add

* Persist agreement state to a backend (e.g. via API) so users’ consent is recorded.
* Implement a **full PDF viewer** using a library (with zoom, search, annotation, mobile-friendly UI).
* Add **mobile-first responsive design**, improving layout and readability on smaller screens.
* Show **skeleton loaders or per-document loading indicators** especially if retrieving many PDFs or large files.
* Allow users to **download** the full (or revision) documents.
* Extend submission to include **non-agreed documents + optional comments**, e.g. “I disagree because…”.
* Add accessibility improvements — e.g. better keyboard navigation for fullscreen toggle, aria‑attributes for dynamic alerts or PDF frames.
* Add unit tests / integration tests to cover various states (loading, error, submission, form validation).