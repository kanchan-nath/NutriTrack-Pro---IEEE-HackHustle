import React from "react";
import { createRoot } from "react-dom/client";
import NutriTrackPro from "./NutriTrackPro";
import "./index.css";

// ── Polyfill for window.storage used in NutriTrackPro ────────────────────────
// The component uses window.storage.get / window.storage.set (from claude.ai's
// artifact runtime). When running locally we fall back to localStorage.
if (!window.storage) {
  window.storage = {
    get: async (key) => {
      const value = localStorage.getItem(key);
      return value !== null ? { key, value } : null;
    },
    set: async (key, value) => {
      localStorage.setItem(key, value);
      return { key, value };
    },
    delete: async (key) => {
      localStorage.removeItem(key);
      return { key, deleted: true };
    },
    list: async (prefix = "") => {
      const keys = Object.keys(localStorage).filter((k) => k.startsWith(prefix));
      return { keys, prefix };
    },
  };
}

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <NutriTrackPro />
  </React.StrictMode>
);
