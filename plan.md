Goal
Build a React SPA front-end app using Vite + TypeScript for a light-hearted MLOps demo called Vibe-Opsy. This first iteration is a mock-up only: all model behavior is simulated with timeouts, loading states, and animated transitions.

Project description
- Vibe-Opsy is a playful front-end app for a skin-lesion detection demo (Harvard dataset).
- The experience starts with a bold landing page that introduces the concept.
- The user uploads an image, sees an animated “processing” step, and then transitions to a results summary.
- There is no real backend in this version; all results are mocked.

Mocked flow
- Upload button triggers a faux “scan” sequence (progress, subtle UI reactions).
- After a short delay (2–3s), transition to a results view.
- Results include a mock label, confidence, and a playful “receipt” printout.


Technical requirements
- Vite + React + TypeScript
- Package manager: pnpm
- 3D option: react-three-fiber (three.js) for lightweight 3D/illusion
- Motion option: motion.dev for UI transitions and sequencing


Design moodboard
- Retro medical kiosk aesthetic: clinical cues + supermarket receipt register vibes.
- Sharp corners, bold UI frames, and slightly industrial/diagnostic motifs.
- Use a custom retro font (placeholder to be swapped later).
- Neutral/sterile/medical palette (cool neutrals + muted accents).
- Include a 3D element or illusion (e.g., kiosk/scanner or receipt printer).
- Receipt-print animation after upload, showing date + mock result.

Proposed structure
- Landing view
  - Hero title, short description, retro UI accents.
  - CTA upload button + drag-and-drop target.
- Scan/processing view
  - Animated “scan” treatment, progress indicator, playful copy.
  - Ambient motion and micro-interactions.
- Results view
  - Summary (label + confidence + short explanation).
  - Receipt printout with timestamp, app title, warnings, barcode, and result details.
  - Reset/“Scan another” action.

Components (initial)
- AppShell: background, global layout, theme tokens.
- LandingHero: headline, CTA, short copy.
- UploadPanel: drag/drop, file picker, preview thumbnail.
- ScannerStage: progress/scan animation.
- ResultsCard: label/confidence + short explanation.
- ReceiptPrinter: animated print effect + receipt markup.

State and flow (mocked)
- Idle -> Uploading -> Scanning -> Result.
- Simulated delays with setTimeout and animation sequencing.
- Optional: seeded mock results for consistency.

Receipt content (mocked)
- Header: "Vibe-Opsy Results" + scan timestamp.
- Warning labels: "Mock demo, not medical advice."
- Result section: primary label + confidence.
- Category checklist (7 classes):
  - Melanocytic nevi
  - Melanoma
  - Benign keratosis
  - Basal cell carcinoma
  - Actinic keratoses
  - Vascular lesions
  - Dermatofibroma
- Visuals: fake barcode + receipt footer.

Implementation decisions (initial)
- Single continuous screen with animated state swaps (no routing).
- Use motion.dev for transitions and sequencing.
- Use CSS 3D/illusion for the kiosk/receipt (subtle, not hero-sized).
- Receipt shows exactly one positive category and the rest negative.
- Primary result label mapping is TBD; iterate after first build.

Tone
- Lighthearted and subtle humor; playful but not silly.

Accessibility and UX
- Keyboard-friendly upload and buttons.
- Clear loading states and reduced motion fallback.
- Responsive layout (mobile-first, then desktop).

Non-goals for iteration 1
- Backend integration, real inference, authentication.
