Goal:
Build a SPA front-end app MLOps demo project called Vibe-Opsy. This first iteration is a mock-up only: all model behavior is simulated with timeouts, loading states, and animated transitions.

Project description:
- Vibe-Opsy is a front-end app for a skin-lesion detection demo (Harvard dataset).
- The experience starts with a grainy/crt effect type of screen filling the entire like as if the PC/TV just turned on after a second of delay
  - Then the logo/title (Vibe-Opsy) slowly renders in the center. 
  - The logo should exactly look like the old IBM logos where its giant, light and with dark stripes going through it horizontally.
  - And at the bottom we should have the text which says "Press any key to upload your image...", which is a reference to "Press any key to continue..."
- After a succesful image upload, the screen should transition into a new page (keep the grain/crt effect).
  - The page is split into 2 columns:
    1. First column is inspired by the old file lists on an IBM computer designs. But here instead of showing file list, it shows the list of skin lesion categories.
       - The list text color should be the matrix green with black/gray background.
       - The list should include multiple columns like lesion name, code, cancerous and results (based on user's scanned image).
    2. Second column on the right should be like an retro looking image preview of the user's uploaded image.
       - The image should have the same matrix colored border and the same ibm or retro pc feel
       - Make sure that the image preview size is mixed. So that no matter the image, the components layout and size is always the same
       - And then finally, under the image there should be a text which say "Press Esc/Back to go back..."


Technical requirements:
- Package manager: pnpm
- Everything else should be derived based on what makes sense for the scope of this project.
- Note that nothing is installed or setup yet.

Skin lesion categories (7 classes):
  - Melanocytic nevi
  - Melanoma
  - Benign keratosis
  - Basal cell carcinoma
  - Actinic keratoses
  - Vascular lesions
  - Dermatofibroma