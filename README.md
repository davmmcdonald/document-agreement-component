# Document Agreement Component

Angular 18+ standalone component to view legal documents (PDFs), review revisions, and agree to document types with validation, inline viewing, fullscreen toggle, and reactive state management.

---

## Setup

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

Open your browser at `http://localhost:4200`.
4. Uses a mock service to provide document metadata and PDFs (from `src/assets/`).

---

## Assumptions

* Users have a modern browser with PDF support.
* PDFs are moderately sized and load quickly; no advanced caching or pagination is required.
* Document types are relatively stable; new types are infrequent.
* Users will review documents in order and complete all agreements in a single session.
* Error handling focuses on display and auto-dismissal rather than detailed logging or retries.

---

## Design & Tradeoffs

* Angular 18+ standalone component + signals for reactive state.
* Reactive Forms with validation for agreement checkboxes.
* PDFs displayed using sanitized `iframe`.
* Fullscreen toggle for better PDF viewing.
* Alerts auto-fade for error/success messages.

**Tradeoffs:**

* Mock service expedites testing, not production-ready.
* `iframe` simple but less mobile-friendly; PDF library may improve UX.
* Alerts are simple; more robust notification system could improve usability.
* No persistence of agreements across sessions.

---

## Additional Features / Improvements

* Persist agreement state to backend.
* Full PDF viewer with zoom, search, annotations.
* Mobile-first responsive layout.
* Skeleton/loading indicators for each document.
* Option to download full or revision PDFs.
* Handle non-agreed documents with comments.
* Accessibility improvements (keyboard navigation, ARIA).
* Unit/integration tests for validation, loading, and submission states.