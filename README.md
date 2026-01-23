# Vibe-Opsy Frontend

> A retro-futuristic 3D web interface for skin lesion analysis
>
> DTU MLOps Course 02476 (Winter 2026)

## Contributors

- Aryan Mirzazadeh
- Mohamad Marwan Summakieh
- Trinity Sara McConnachie Evans
- Vladyslav Horbatenko
- Yuen Yi Hui

---

## Overview

**Vibe-Opsy** is the interactive frontend for our skin lesion classification system. It features a nostalgic 1991 Macintosh Classic computer rendered in 3D that users can interact with to analyze dermatoscopic images.

Upload an image of a skin lesion, watch the retro CRT screen come to life, and receive AI-powered diagnostic results printed on a vintage thermal receipt.

This repository contains the complete frontend application, separate from the [backend ML pipeline](https://github.com/Aryan-Mi/dtu-vibe-ops-02476) which handles model training, deployment, and inference.

## Features

### 🖥️ Interactive 3D Experience

- 3D Macintosh Classic (1991) model
- Authentic CRT screen with scanline effects and phosphor glow

### 🎨 Retro UI Design

- **Idle State**: Mac OS System 7 inspired upload interface
- **Analysis State**: Matrix-style terminal with real-time progress indicators
- **Results State**: Windows 95 style diagnostic display
- Thermal receipt-style results with drag-to-dismiss interaction
- Custom retro mouse cursor and brutalist background elements
- Dial-up modem sound during analysis
- CRT screen flicker and scanline animations
- Paper texture and dot-matrix typography on receipts

### 📊 Diagnostic Information

- Multi-class lesion classification (7 categories)
- Confidence scores and probability distributions
- Malignant vs. benign categorization
- Date/time stamped results

## Tech Stack

### Core Framework

- **React 19** - UI library with concurrent features
- **TypeScript** - Type-safe development
- **Vite 7** - Lightning-fast build tool and dev server

### 3D Graphics

- **Three.js** - WebGL 3D rendering engine
- **React Three Fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers and abstractions for R3F

### Animation & Interaction

- **Framer Motion** - Production-ready animation library
- **framer-motion-3d** - 3D animation extensions

### Styling

- **Tailwind CSS 4** - Utility-first CSS framework
- **Custom CSS** - Retro CRT effects, dot-matrix fonts, paper textures

### Deployment

- **Cloudflare Workers** - Edge-deployed static site hosting
- **Wrangler** - Cloudflare development and deployment CLI

## Project Structure

```
vibe-opsy/
├── public/
│   ├── macintosh.glb          # 3D model file
│   ├── dial-up-effect.mp3     # Sound effects
│   └── cursor-mouse.svg       # Custom cursor
├── src/
│   ├── components/
│   │   ├── Computer.tsx       # 3D Macintosh model component
│   │   ├── Scene.tsx          # Three.js scene setup
│   │   ├── ScreenUI.tsx       # CRT screen interface states
│   │   └── Receipt.tsx        # Draggable results receipt
│   ├── services/
│   │   └── api.ts             # Backend API integration
│   ├── App.tsx                # Main application logic
│   ├── main.tsx               # Application entry point
│   └── index.css              # Global styles & effects
├── vite.config.ts             # Vite configuration
├── wrangler.jsonc             # Cloudflare deployment config
└── package.json               # Dependencies & scripts
```

## Installation & Development

### Prerequisites

- Node.js 18+
- pnpm 10+ (package manager)

### Setup

```bash
# Clone the repository
git clone https://github.com/Aryan-Mi/vibe-opsy.git
cd vibe-opsy

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
# Build optimized production bundle
pnpm build

# Preview production build locally
pnpm preview
```

### Deployment to Cloudflare

Currently the CI/CD actions are setup on the cloudflare dashboard.

It checks the master branch for new commits and re-deploys the front-end on new commits.

The deployed website can be accessed from: https://vibe-opsy.aryan-mi.workers.dev

## API Integration

The frontend communicates with a deployed ML inference API:

- **Production**: `https://skin-lesion-api-267598825904.europe-west1.run.app`
- **Endpoint**: `POST /inference`
- **Payload**: `multipart/form-data` with image file
- **Response**: JSON with classification results

In development mode, Vite proxy configuration routes `/api/*` requests to the production backend to avoid CORS issues.

## Lesion Classifications

The model classifies skin lesions into seven categories:

| Code    | Full Name            | Type      |
| ------- | -------------------- | --------- |
| `nv`    | Melanocytic Nevi     | Benign    |
| `mel`   | Melanoma             | Malignant |
| `bkl`   | Benign Keratosis     | Benign    |
| `bcc`   | Basal Cell Carcinoma | Malignant |
| `akiec` | Actinic Keratoses    | Malignant |
| `vasc`  | Vascular Lesions     | Benign    |
| `df`    | Dermatofibroma       | Benign    |

## 3D Model Attribution

The Macintosh Classic 3D model is sourced from Sketchfab:

**"Macintosh Classic (1991)"** by [Liam Tart](https://sketchfab.com/LiamTart)  
Licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)  
Source: https://sketchfab.com/3d-models/macintosh-classic-1991-3b66e98d137d4a23aaa725ce0a8aec28

## Acknowledgments

- Developed as part of DTU's MLOps course (02476)
- Backend ML pipeline: [vibe-opsy-backend repository](https://github.com/Aryan-Mi/dtu-vibe-ops-02476)
- Dataset: HAM10000 dermatoscopic image dataset

---

**Note**: This is a course project for educational purposes. Not intended for medical diagnosis.
