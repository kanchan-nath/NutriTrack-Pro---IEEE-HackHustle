# 🥗 NutriTrack Pro v2

**AI-powered nutrition intelligence** — track your daily meals, analyse nutrient gaps, and get personalised dietary recommendations powered by Claude AI.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🧬 **Smart Nutrition Tracking** | 65-food Indian + global database with 14 nutrients per item |
| 📸 **Photo Meal Detection** | Upload a plate photo — Claude Vision identifies foods automatically |
| 🤖 **AI Analysis** | Clinical-grade nutritionist report: deficiencies, symptoms, supplements, meal plan |
| 📊 **Live Dashboard** | Real-time nutrient bars, diet score, budget tracker |
| 🩺 **Symptom Linking** | Map symptoms (fatigue, hair fall, etc.) to likely deficiencies |
| 💾 **Persistent History** | Last 7 days' diet scores saved locally |
| 💰 **Budget Awareness** | Per-meal cost tracking with ₹/day budget control |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18 or above
- **npm** 9 or above

### Installation

```bash
# 1. Unzip the project
unzip nutritrack-pro.zip
cd nutritrack-pro

# 2. Install dependencies
npm install

# 3. Start the development server
npm start
```

The app opens at **http://localhost:3000**.

---

## 🔑 API Key Setup

NutriTrack Pro calls the **Anthropic API** directly from the browser for:
- 📸 Photo-to-food identification (Claude Vision)
- 🤖 Full nutrition analysis & meal plan generation

### How to add your API key

Open `src/NutriTrackPro.jsx` and search for both `fetch("https://api.anthropic.com/v1/messages"` calls. Add your key to the `headers` object:

```js
headers: {
  "Content-Type": "application/json",
  "x-api-key": "sk-ant-YOUR_KEY_HERE",        // ← add this
  "anthropic-version": "2023-06-01",           // ← add this
  "anthropic-dangerous-direct-browser-access": "true"  // ← required for CORS
},
```

> ⚠️ **Security note:** Hardcoding an API key in client-side code exposes it publicly. For a production deployment, create a small backend proxy (Node/Express, Cloudflare Worker, etc.) that forwards requests and injects the key server-side.

---

## 📁 Project Structure

```
nutritrack-pro/
├── public/
│   └── index.html          # HTML shell + Google Fonts preload
├── src/
│   ├── index.jsx           # React root + window.storage polyfill
│   ├── index.css           # Global reset & scrollbar styles
│   └── NutriTrackPro.jsx   # Main component (all logic + UI)
├── .env.example            # Environment variable reference
├── .gitignore
├── package.json
└── README.md
```

---

## 🏗️ Build for Production

```bash
npm run build
```

Outputs a static bundle to `build/`. Deploy to Vercel, Netlify, or any static host.

---

## 🧩 `window.storage` Polyfill

The component was originally written for the **claude.ai artifact runtime** which provides a `window.storage` API. When running locally, `src/index.jsx` automatically polyfills this with `localStorage` — no changes to the component are needed.

---

## 🛠️ Tech Stack

- **React 18** (Create React App)
- **Anthropic Claude API** — `claude-sonnet-4-20250514`
- **Google Fonts** — Syne + Inter
- Pure inline CSS (no UI library dependencies)

---

## 📝 License

For educational and personal use. Consult a registered dietitian for medical dietary advice.
