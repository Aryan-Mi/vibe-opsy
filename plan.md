# Project Specification: Vibe-Opsy (Retro 3D Frontend)

## 1. Project Overview

Build a retro-futuristic, interactive 3D frontend for a skin lesion detection app ("Vibe-Opsy"). The scene features a 3D Macintosh-style computer. The user interacts with the virtual computer screen to upload an image. Upon analysis, a physical "receipt/polaroid" result prints out of the computer's floppy drive slot.

## 2. Tech Stack

* **Framework:** React (Vite)
* **Language:** TypeScript
* **3D Engine:** React Three Fiber (R3F) + Three.js
* **Helpers:** `@react-three/drei` (Essential for `<Html>` and model loading)
* **Animation:** `framer-motion` (for UI) + `framer-motion-3d` (for 3D object movement)
* **Styling:** Tailwind CSS (for the screen interfaces)
* **Package Manager:** **pnpm**

## 3. Assets

The following models are located in the `/public` directory:

1. `macintosh.glb` - The main computer model.
2. `mouse.glb` - A retro mouse model (to be used as a custom 3D cursor).

## 4. Implementation Requirements

### Phase A: The 3D Scene Setup

* **Canvas:** Full-screen R3F Canvas.
* **Lighting:** Studio lighting setup to make the beige plastic of the Macintosh look realistic but stylized.
* **Camera:** Fixed perspective, centered on the computer model.

### Phase B: The Computer Model (`<Computer />`)

* **Loading:** Load `macintosh.glb` using `useGLTF`.
* **Screen Replacement:**
* Identify the mesh node corresponding to the glass screen.
* Overlay/Occlude it using `@react-three/drei`'s `<Html transform occlude>` component to embed a React DOM element directly onto the 3D model's face.
* **CRT Effect:** The embedded HTML container must have a CSS overlay that simulates a "grainy" CRT monitor (scanlines, slight flicker, vignette).



### Phase C: The Custom Mouse (`<RetroMouse />`)

* **Cursor Behavior:** The system cursor should be hidden. The `mouse.glb` model should track the user's mouse position on the screen (projected into 3D space).
* **Cable Removal:**
* Inspect the `nodes` object returned by `useGLTF`.
* Identify the mesh node responsible for the "cable/wire".
* Programmatically set `visible={false}` on that node to detach the mouse.



### Phase D: State Management & UI Flow

The app functions as a simple state machine with 3 phases:

#### 1. State: `IDLE` (The Upload Screen)

* **Screen UI:** A retro OS interface (Mac OS System 7 style).
* **Content:** A large, pixelated "UPLOAD" button.
* **Action:** Clicking the button triggers a hidden file input. On file selection, transition to `ANALYZING`.

#### 2. State: `ANALYZING` (The Matrix Loading)

* **Screen UI:** Switch to a "Hacker/Terminal" aesthetic.
* **Style:** Dark black background, bright neon green text (`#00FF41`).
* **Content:**
* ASCII art style text.
* "ANALYZING SUBJECT..." text typing out.
* A progress bar made of block characters `[||||||.....]`.


* **Duration:** `setTimeout` for 3 seconds, then transition to `RESULT`.

#### 3. State: `RESULT` (The Receipt Print)

* **Trigger:** When analysis ends.
* **Animation Sequence (Crucial):**
1. **Spawn:** A 3D plane (the receipt) spawns inside the computer model (hidden).
2. **Eject:** The receipt animates *down and forward* out of the "floppy disk slot" (the gap at the bottom of the Macintosh model).
3. **Levitate:** Once fully ejected, the receipt smoothly floats towards the camera (z-axis) and centers itself, blurring the background.


* **Receipt Design:**
* Looks like a hybrid of a Polaroid and a CVS receipt.
* **Header:** "Vibe-Opsy Results" (Dot matrix font).
* **Body:** Display the uploaded user image (grayscale/dithered filter applied).
* **Footer:** Mocked diagnosis text (e.g., "Benign - Confidence 98%").


* **Dismissal:**
* User can drag/swipe the receipt to the side (using `useDrag` or Framer Motion).
* On dismissal, the receipt flies off-screen, and the computer resets to `IDLE`.



## 5. Development Steps (Prompt for LLM)

Please implement the project following these steps:

1. **Scaffold:** Initialize the project with Vite + React + TS and install dependencies (`three`, `@types/three`, `@react-three/fiber`, `@react-three/drei`, `framer-motion`, `framer-motion-3d`, `autoprefixer`, `postcss`, `tailwindcss`).
2. **Scene Component:** Set up the basic scene with the Computer model.
3. **Node Inspection:** Create a temporary `console.log(nodes)` for both models to identify the Screen node name and the Mouse Cable node name.
4. **Mouse Integration:** Implement the custom mouse cursor and hide the cable mesh.
5. **Screen Logic:** Build the CRT container and the `Idle` vs `Analyzing` UI states in HTML/CSS.
6. **Receipt Animation:** Implement the 3D animation path for the result ticket.

---

**User Note for the LLM:**

* For the CRT effect, please use a CSS-based approach (pointer-events-none overlay with `mix-blend-mode: overlay` and a noise background image) to ensure the "Upload" button remains clickable.
* Use dummy data for the analysis results for now.