import { useState, useEffect, useRef } from "react";

// ── COMPLETE FOOD DATABASE (65 foods, Indian + Global) ──────────────────────
const FOOD_DB = {
  "poha": { cal: 250, protein: 4, iron: 2.8, vitC: 0, vitD: 0, vitB12: 0, calcium: 20, zinc: 0.8, mag: 30, vitA: 0, folate: 18, omega3: 0, fiber: 3, sugar: 2, price: 15, cat: "breakfast", region: "indian" },
  "idli": { cal: 130, protein: 4, iron: 1.2, vitC: 0, vitD: 0, vitB12: 0, calcium: 30, zinc: 0.5, mag: 18, vitA: 0, folate: 20, omega3: 0, fiber: 1, sugar: 0.5, price: 20, cat: "breakfast", region: "indian" },
  "dosa": { cal: 168, protein: 3.9, iron: 1.5, vitC: 0, vitD: 0, vitB12: 0, calcium: 15, zinc: 0.6, mag: 22, vitA: 0, folate: 25, omega3: 0, fiber: 2, sugar: 1, price: 25, cat: "breakfast", region: "indian" },
  "upma": { cal: 180, protein: 5, iron: 1.8, vitC: 0, vitD: 0, vitB12: 0, calcium: 22, zinc: 0.7, mag: 35, vitA: 0, folate: 22, omega3: 0, fiber: 3, sugar: 1, price: 18, cat: "breakfast", region: "indian" },
  "paratha": { cal: 300, protein: 7, iron: 2, vitC: 0, vitD: 0, vitB12: 0, calcium: 40, zinc: 1, mag: 28, vitA: 0, folate: 20, omega3: 0.1, fiber: 4, sugar: 1, price: 20, cat: "breakfast", region: "indian" },
  "oats": { cal: 307, protein: 11, iron: 4, vitC: 0, vitD: 0, vitB12: 0, calcium: 54, zinc: 3.6, mag: 138, vitA: 0, folate: 56, omega3: 0.1, fiber: 8, sugar: 1, price: 12, cat: "breakfast", region: "global" },
  "egg": { cal: 78, protein: 6, iron: 1, vitC: 0, vitD: 1.1, vitB12: 0.6, calcium: 56, zinc: 0.6, mag: 6, vitA: 75, folate: 24, omega3: 0.1, fiber: 0, sugar: 0.6, price: 8, cat: "breakfast", region: "global" },
  "bread": { cal: 79, protein: 3, iron: 1, vitC: 0, vitD: 0, vitB12: 0, calcium: 38, zinc: 0.5, mag: 15, vitA: 0, folate: 30, omega3: 0, fiber: 1.9, sugar: 2, price: 5, cat: "breakfast", region: "global" },
  "milk": { cal: 149, protein: 8, iron: 0.1, vitC: 0, vitD: 2.9, vitB12: 1.1, calcium: 276, zinc: 1, mag: 24, vitA: 112, folate: 12, omega3: 0, fiber: 0, sugar: 12, price: 10, cat: "beverage", region: "global" },
  "yogurt": { cal: 100, protein: 17, iron: 0.1, vitC: 1, vitD: 2, vitB12: 1.3, calcium: 187, zinc: 1.5, mag: 20, vitA: 13, folate: 17, omega3: 0, fiber: 0, sugar: 7, price: 15, cat: "snack", region: "global" },
  "chai": { cal: 60, protein: 2, iron: 0.2, vitC: 0, vitD: 0, vitB12: 0.2, calcium: 80, zinc: 0.2, mag: 10, vitA: 20, folate: 5, omega3: 0, fiber: 0, sugar: 8, price: 5, cat: "beverage", region: "indian" },
  "dal": { cal: 182, protein: 12, iron: 3.3, vitC: 1, vitD: 0, vitB12: 0, calcium: 50, zinc: 1.5, mag: 50, vitA: 1, folate: 200, omega3: 0.1, fiber: 8, sugar: 2, price: 20, cat: "lunch", region: "indian" },
  "rajma": { cal: 340, protein: 22, iron: 6.7, vitC: 4, vitD: 0, vitB12: 0, calcium: 90, zinc: 2.8, mag: 80, vitA: 0, folate: 230, omega3: 0.2, fiber: 13, sugar: 3, price: 25, cat: "lunch", region: "indian" },
  "chole": { cal: 270, protein: 14, iron: 4.7, vitC: 2, vitD: 0, vitB12: 0, calcium: 105, zinc: 2.5, mag: 78, vitA: 1, folate: 172, omega3: 0.1, fiber: 12, sugar: 8, price: 22, cat: "lunch", region: "indian" },
  "roti": { cal: 120, protein: 4, iron: 1.5, vitC: 0, vitD: 0, vitB12: 0, calcium: 30, zinc: 0.8, mag: 25, vitA: 0, folate: 15, omega3: 0, fiber: 3, sugar: 0.5, price: 5, cat: "lunch", region: "indian" },
  "rice": { cal: 206, protein: 4.3, iron: 1.9, vitC: 0, vitD: 0, vitB12: 0, calcium: 16, zinc: 0.8, mag: 19, vitA: 0, folate: 5, omega3: 0, fiber: 0.6, sugar: 0, price: 8, cat: "lunch", region: "indian" },
  "khichdi": { cal: 195, protein: 8, iron: 2.5, vitC: 0, vitD: 0, vitB12: 0, calcium: 45, zinc: 1.2, mag: 40, vitA: 0, folate: 80, omega3: 0.1, fiber: 4, sugar: 1, price: 18, cat: "lunch", region: "indian" },
  "sambar": { cal: 80, protein: 4, iron: 1.8, vitC: 15, vitD: 0, vitB12: 0, calcium: 40, zinc: 0.8, mag: 30, vitA: 25, folate: 60, omega3: 0, fiber: 4, sugar: 3, price: 15, cat: "lunch", region: "indian" },
  "paneer": { cal: 265, protein: 18, iron: 0.5, vitC: 0, vitD: 0.5, vitB12: 0.4, calcium: 480, zinc: 2, mag: 18, vitA: 80, folate: 10, omega3: 0, fiber: 0, sugar: 0, price: 35, cat: "protein", region: "indian" },
  "palak paneer": { cal: 220, protein: 14, iron: 3, vitC: 20, vitD: 0.3, vitB12: 0.3, calcium: 350, zinc: 1.5, mag: 50, vitA: 300, folate: 120, omega3: 0.1, fiber: 3, sugar: 2, price: 40, cat: "dinner", region: "indian" },
  "chicken curry": { cal: 280, protein: 28, iron: 1.5, vitC: 2, vitD: 0.2, vitB12: 0.4, calcium: 30, zinc: 2, mag: 35, vitA: 30, folate: 10, omega3: 0.2, fiber: 1, sugar: 2, price: 60, cat: "dinner", region: "indian" },
  "fish curry": { cal: 210, protein: 22, iron: 1, vitC: 3, vitD: 8, vitB12: 2, calcium: 60, zinc: 1.2, mag: 40, vitA: 50, folate: 15, omega3: 1.5, fiber: 0.5, sugar: 2, price: 50, cat: "dinner", region: "indian" },
  "egg curry": { cal: 185, protein: 12, iron: 1.8, vitC: 2, vitD: 1.5, vitB12: 1, calcium: 70, zinc: 1.2, mag: 20, vitA: 100, folate: 30, omega3: 0.2, fiber: 1, sugar: 2, price: 30, cat: "dinner", region: "indian" },
  "biryani": { cal: 350, protein: 15, iron: 2.5, vitC: 3, vitD: 0.2, vitB12: 0.5, calcium: 45, zinc: 1.5, mag: 40, vitA: 20, folate: 30, omega3: 0.2, fiber: 2, sugar: 3, price: 80, cat: "dinner", region: "indian" },
  "aloo sabzi": { cal: 150, protein: 3, iron: 1.2, vitC: 15, vitD: 0, vitB12: 0, calcium: 25, zinc: 0.5, mag: 30, vitA: 5, folate: 30, omega3: 0, fiber: 3, sugar: 2, price: 15, cat: "dinner", region: "indian" },
  "mixed veg": { cal: 100, protein: 3.5, iron: 1.5, vitC: 25, vitD: 0, vitB12: 0, calcium: 50, zinc: 0.7, mag: 35, vitA: 150, folate: 50, omega3: 0, fiber: 4, sugar: 4, price: 20, cat: "dinner", region: "indian" },
  "chicken breast": { cal: 165, protein: 31, iron: 1, vitC: 0, vitD: 0.2, vitB12: 0.3, calcium: 15, zinc: 1, mag: 29, vitA: 9, folate: 4, omega3: 0.1, fiber: 0, sugar: 0, price: 50, cat: "protein", region: "global" },
  "salmon": { cal: 208, protein: 20, iron: 0.3, vitC: 0, vitD: 14.4, vitB12: 3.2, calcium: 12, zinc: 0.4, mag: 27, vitA: 58, folate: 25, omega3: 2.2, fiber: 0, sugar: 0, price: 120, cat: "protein", region: "global" },
  "tuna": { cal: 132, protein: 29, iron: 1.3, vitC: 0, vitD: 5.4, vitB12: 2.5, calcium: 10, zinc: 0.6, mag: 35, vitA: 20, folate: 2, omega3: 0.3, fiber: 0, sugar: 0, price: 80, cat: "protein", region: "global" },
  "lentils": { cal: 230, protein: 18, iron: 6.6, vitC: 3, vitD: 0, vitB12: 0, calcium: 38, zinc: 2.5, mag: 71, vitA: 2, folate: 358, omega3: 0.1, fiber: 15, sugar: 2, price: 20, cat: "protein", region: "global" },
  "spinach": { cal: 23, protein: 2.9, iron: 2.7, vitC: 28, vitD: 0, vitB12: 0, calcium: 99, zinc: 0.5, mag: 79, vitA: 469, folate: 194, omega3: 0.1, fiber: 2.2, sugar: 0.4, price: 20, cat: "vegetable", region: "global" },
  "broccoli": { cal: 55, protein: 3.7, iron: 0.7, vitC: 89, vitD: 0, vitB12: 0, calcium: 47, zinc: 0.4, mag: 21, vitA: 60, folate: 63, omega3: 0, fiber: 5, sugar: 1.5, price: 50, cat: "vegetable", region: "global" },
  "carrot": { cal: 52, protein: 1.2, iron: 0.3, vitC: 6, vitD: 0, vitB12: 0, calcium: 42, zinc: 0.2, mag: 14, vitA: 835, folate: 19, omega3: 0, fiber: 2.8, sugar: 4.7, price: 15, cat: "vegetable", region: "global" },
  "sweet potato": { cal: 103, protein: 2.3, iron: 0.8, vitC: 20, vitD: 0, vitB12: 0, calcium: 40, zinc: 0.4, mag: 27, vitA: 961, folate: 11, omega3: 0, fiber: 4, sugar: 4.2, price: 20, cat: "vegetable", region: "global" },
  "tomato": { cal: 22, protein: 1.1, iron: 0.3, vitC: 14, vitD: 0, vitB12: 0, calcium: 10, zinc: 0.2, mag: 11, vitA: 42, folate: 15, omega3: 0, fiber: 1.2, sugar: 2.6, price: 10, cat: "vegetable", region: "global" },
  "banana": { cal: 89, protein: 1.1, iron: 0.3, vitC: 9, vitD: 0, vitB12: 0, calcium: 5, zinc: 0.2, mag: 27, vitA: 3, folate: 20, omega3: 0, fiber: 2.6, sugar: 12, price: 10, cat: "fruit", region: "global" },
  "mango": { cal: 99, protein: 1.4, iron: 0.2, vitC: 60, vitD: 0, vitB12: 0, calcium: 18, zinc: 0.1, mag: 14, vitA: 112, folate: 43, omega3: 0, fiber: 2.6, sugar: 14, price: 20, cat: "fruit", region: "indian" },
  "apple": { cal: 95, protein: 0.5, iron: 0.2, vitC: 8, vitD: 0, vitB12: 0, calcium: 11, zinc: 0.1, mag: 9, vitA: 5, folate: 5, omega3: 0, fiber: 4.4, sugar: 10, price: 30, cat: "fruit", region: "global" },
  "orange": { cal: 62, protein: 1.2, iron: 0.1, vitC: 70, vitD: 0, vitB12: 0, calcium: 60, zinc: 0.1, mag: 13, vitA: 11, folate: 40, omega3: 0, fiber: 3.1, sugar: 12, price: 15, cat: "fruit", region: "global" },
  "guava": { cal: 68, protein: 2.6, iron: 0.3, vitC: 228, vitD: 0, vitB12: 0, calcium: 18, zinc: 0.2, mag: 22, vitA: 31, folate: 49, omega3: 0, fiber: 5.4, sugar: 9, price: 10, cat: "fruit", region: "indian" },
  "papaya": { cal: 59, protein: 0.9, iron: 0.3, vitC: 62, vitD: 0, vitB12: 0, calcium: 24, zinc: 0.1, mag: 21, vitA: 55, folate: 37, omega3: 0, fiber: 2.3, sugar: 8, price: 15, cat: "fruit", region: "indian" },
  "almonds": { cal: 164, protein: 6, iron: 1, vitC: 0, vitD: 0, vitB12: 0, calcium: 75, zinc: 0.9, mag: 76, vitA: 0, folate: 14, omega3: 0, fiber: 3.5, sugar: 1.2, price: 15, cat: "snack", region: "global" },
  "walnuts": { cal: 185, protein: 4.3, iron: 0.8, vitC: 0.4, vitD: 0, vitB12: 0, calcium: 28, zinc: 0.9, mag: 44, vitA: 1, folate: 28, omega3: 2.5, fiber: 1.9, sugar: 0.7, price: 20, cat: "snack", region: "global" },
  "peanuts": { cal: 166, protein: 7.3, iron: 0.6, vitC: 0, vitD: 0, vitB12: 0, calcium: 26, zinc: 0.9, mag: 48, vitA: 0, folate: 68, omega3: 0, fiber: 2.4, sugar: 1.1, price: 10, cat: "snack", region: "global" },
  "flaxseeds": { cal: 55, protein: 1.9, iron: 0.6, vitC: 0, vitD: 0, vitB12: 0, calcium: 26, zinc: 0.4, mag: 40, vitA: 0, folate: 10, omega3: 2.4, fiber: 2.8, sugar: 0.2, price: 5, cat: "snack", region: "global" },
  "cheese": { cal: 113, protein: 7, iron: 0.2, vitC: 0, vitD: 0.1, vitB12: 0.5, calcium: 204, zinc: 0.9, mag: 8, vitA: 75, folate: 5, omega3: 0, fiber: 0, sugar: 0.1, price: 25, cat: "protein", region: "global" },
  "potato": { cal: 163, protein: 4.3, iron: 1.9, vitC: 17, vitD: 0, vitB12: 0, calcium: 26, zinc: 0.6, mag: 48, vitA: 2, folate: 48, omega3: 0, fiber: 3.8, sugar: 1.3, price: 10, cat: "vegetable", region: "global" },
  "green tea": { cal: 2, protein: 0, iron: 0.1, vitC: 0, vitD: 0, vitB12: 0, calcium: 2, zinc: 0, mag: 2, vitA: 0, folate: 5, omega3: 0, fiber: 0, sugar: 0, price: 5, cat: "beverage", region: "global" },
  "orange juice": { cal: 112, protein: 2, iron: 0.5, vitC: 124, vitD: 0, vitB12: 0, calcium: 27, zinc: 0.1, mag: 27, vitA: 25, folate: 74, omega3: 0, fiber: 0.5, sugar: 21, price: 30, cat: "beverage", region: "global" },
  "beef": { cal: 250, protein: 26, iron: 2.7, vitC: 0, vitD: 0.1, vitB12: 2.4, calcium: 20, zinc: 4.8, mag: 21, vitA: 2, folate: 8, omega3: 0.1, fiber: 0, sugar: 0, price: 80, cat: "protein", region: "global" },
};

const RDV_BASE = { cal: 2000, protein: 50, iron: 18, vitC: 90, vitD: 15, vitB12: 2.4, calcium: 1000, zinc: 11, mag: 400, vitA: 700, folate: 400, omega3: 1.1, fiber: 25, sugar: 50 };

const getRDV = (p) => {
  const r = { ...RDV_BASE };
  if (p.gender === "male") { r.protein = 56; r.iron = 8; r.vitC = 90; r.zinc = 11; r.mag = 400; r.vitA = 900; r.omega3 = 1.6; r.fiber = 38; }
  if (p.conditions.includes("pregnancy")) { r.iron = 27; r.folate = 600; r.protein = 71; r.calcium = 1000; r.vitD = 15; }
  if (p.conditions.includes("anemia")) r.iron = 27;
  if (p.conditions.includes("diabetes")) r.sugar = 25;
  if (p.age >= 60) { r.vitD = 20; r.calcium = 1200; r.vitB12 = 2.6; }
  if (p.age <= 19) { r.calcium = 1300; r.iron = 15; }
  return r;
};

const NMETA = {
  cal: { label: "Calories", unit: "kcal", icon: "🔥", color: "#f4a261" },
  protein: { label: "Protein", unit: "g", icon: "💪", color: "#e76f51" },
  iron: { label: "Iron", unit: "mg", icon: "🩸", color: "#e63946" },
  vitC: { label: "Vitamin C", unit: "mg", icon: "🍊", color: "#f4d35e" },
  vitD: { label: "Vitamin D", unit: "mcg", icon: "☀️", color: "#ffd166" },
  vitB12: { label: "Vitamin B12", unit: "mcg", icon: "🧠", color: "#9b5de5" },
  calcium: { label: "Calcium", unit: "mg", icon: "🦴", color: "#b8c0cc" },
  zinc: { label: "Zinc", unit: "mg", icon: "🛡️", color: "#4cc9f0" },
  mag: { label: "Magnesium", unit: "mg", icon: "⚡", color: "#4361ee" },
  vitA: { label: "Vitamin A", unit: "mcg", icon: "👁️", color: "#f77f00" },
  folate: { label: "Folate", unit: "mcg", icon: "🧬", color: "#80b918" },
  omega3: { label: "Omega-3", unit: "g", icon: "🐟", color: "#48cae4" },
  fiber: { label: "Fiber", unit: "g", icon: "🌾", color: "#a7c957" },
  sugar: { label: "Sugar", unit: "g", icon: "🍬", color: "#ff9f1c" },
};

const SYMPTOMS = [
  { id: "fatigue", label: "Chronic Fatigue", links: ["iron", "vitB12", "vitD", "mag"] },
  { id: "hairfall", label: "Hair Fall", links: ["iron", "zinc", "protein", "vitD"] },
  { id: "nails", label: "Brittle Nails", links: ["iron", "calcium", "zinc"] },
  { id: "cramps", label: "Muscle Cramps", links: ["mag", "calcium"] },
  { id: "mood", label: "Low Mood / Depression", links: ["vitD", "vitB12", "omega3", "folate"] },
  { id: "skin", label: "Dry / Flaky Skin", links: ["vitA", "vitC", "omega3", "zinc"] },
  { id: "immunity", label: "Frequent Illness", links: ["vitC", "vitD", "zinc"] },
  { id: "vision", label: "Poor Night Vision", links: ["vitA"] },
  { id: "bones", label: "Bone / Joint Pain", links: ["vitD", "calcium", "mag"] },
  { id: "brainfog", label: "Brain Fog / Poor Focus", links: ["vitB12", "iron", "omega3"] },
  { id: "bleeding", label: "Bleeding Gums", links: ["vitC"] },
  { id: "digestion", label: "Bloating / Poor Gut", links: ["fiber", "mag"] },
];

const MEALS_LIST = ["Breakfast", "Lunch", "Dinner", "Snacks"];
const CONDITIONS = ["anemia", "diabetes", "pregnancy", "thyroid", "hypertension", "vegan", "vegetarian", "lactose intolerant"];
const TABS = [{ id: "profile", icon: "👤", label: "Profile" }, { id: "meals", icon: "🍽", label: "Meals" }, { id: "symptoms", icon: "🩺", label: "Symptoms" }, { id: "dashboard", icon: "📊", label: "Dashboard" }];

// Colours
const C = { bg: "#0e0f14", card: "#161821", border: "#252836", accent: "#f4a261", accentDark: "#c47840", green: "#06d6a0", red: "#ef233c", blue: "#4cc9f0", purple: "#9b5de5", text: "#e2e8f0", muted: "#6b7280", gold: "#ffd166" };

export default function NutriTrackPro() {
  const [tab, setTab] = useState("profile");
  const [profile, setProfile] = useState({ name: "", age: 21, gender: "female", weight: 58, height: 162, conditions: [], budget: 150, sector: "student" });
  const [meals, setMeals] = useState({ Breakfast: [], Lunch: [], Dinner: [], Snacks: [] });
  const [inputs, setInputs] = useState({ Breakfast: "", Lunch: "", Dinner: "", Snacks: "" });
  const [sugg, setSugg] = useState({});
  const [symptoms, setSymptoms] = useState([]);
  const [history, setHistory] = useState([]);
  const [photoLoading, setPhotoLoading] = useState({});
  const [err, setErr] = useState("");
  const [filterCat, setFilterCat] = useState("all");
  const [activeSection, setActiveSection] = useState(null);
  const fileRefs = { Breakfast: useRef(), Lunch: useRef(), Dinner: useRef(), Snacks: useRef() };

  const rdv = getRDV(profile);

  useEffect(() => {
    (async () => { try { const r = await window.storage.get("nt-history"); if (r) setHistory(JSON.parse(r.value)); } catch { } })();
  }, []);

  const totals = (() => {
    const t = {}; Object.keys(rdv).forEach(k => t[k] = 0);
    Object.values(meals).flat().forEach(f => { const d = FOOD_DB[f]; if (d) Object.keys(rdv).forEach(k => t[k] = (t[k] || 0) + (d[k] || 0)); });
    return t;
  })();

  const todayCost = Object.values(meals).flat().reduce((s, f) => s + (FOOD_DB[f]?.price || 0), 0);
  const dietScore = Math.round(Object.keys(rdv).reduce((s, k) => s + Math.min(pct(k), 100), 0) / Object.keys(rdv).length);

  function pct(k) { return rdv[k] ? Math.min(Math.round((totals[k] || 0) / rdv[k] * 100), 200) : 0; }
  function barC(p) { return p < 30 ? "#ef233c" : p < 60 ? "#ff8c42" : p < 85 ? "#ffd166" : p <= 115 ? "#06d6a0" : "#4cc9f0"; }
  function scoreC(s) { return s >= 80 ? "#06d6a0" : s >= 60 ? "#ffd166" : s >= 40 ? "#ff8c42" : "#ef233c"; }

  const addFood = (meal, f) => {
    const food = (f || inputs[meal]).trim().toLowerCase();
    if (!food) return;
    if (!FOOD_DB[food]) { setErr(`"${food}" not found. Try: dal, roti, egg, banana...`); return; }
    setErr("");
    setMeals(p => ({ ...p, [meal]: [...p[meal], food] }));
    setInputs(p => ({ ...p, [meal]: "" }));
    setSugg(p => ({ ...p, [meal]: [] }));
  };

  const removeFood = (meal, i) => setMeals(p => ({ ...p, [meal]: p[meal].filter((_, j) => j !== i) }));

  const handleInput = (meal, val) => {
    setInputs(p => ({ ...p, [meal]: val }));
    setSugg(p => ({ ...p, [meal]: val.length > 0 ? Object.keys(FOOD_DB).filter(f => f.includes(val.toLowerCase())).slice(0, 7) : [] }));
  };

  const toggleCond = c => setProfile(p => ({ ...p, conditions: p.conditions.includes(c) ? p.conditions.filter(x => x !== c) : [...p.conditions, c] }));
  const toggleSymp = s => setSymptoms(p => p.includes(s) ? p.filter(x => x !== s) : [...p, s]);

  // Photo → Claude Vision
  const handlePhoto = async (meal, file) => {
    if (!file) return;
    setPhotoLoading(p => ({ ...p, [meal]: true }));
    const reader = new FileReader();
    reader.onload = async (e) => {
      const b64 = e.target.result.split(",")[1], mt = file.type;
      try {
        const res = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "claude-sonnet-4-20250514", max_tokens: 200,
            system: `Identify foods in meal photo. Return ONLY a JSON array of lowercase food names from this exact list: ${Object.keys(FOOD_DB).join(", ")}. No markdown. Just the array.`,
            messages: [{ role: "user", content: [{ type: "image", source: { type: "base64", media_type: mt, data: b64 } }, { type: "text", text: "Identify foods. Return JSON array only." }] }]
          })
        });
        const data = await res.json();
        const text = data.content.map(i => i.text || "").join("");
        const foods = JSON.parse(text.replace(/```json|```/g, "").trim());
        if (Array.isArray(foods)) foods.forEach(f => { if (FOOD_DB[f]) setMeals(p => ({ ...p, [meal]: [...p[meal], f] })); });
      } catch { }
      setPhotoLoading(p => ({ ...p, [meal]: false }));
    };
    reader.readAsDataURL(file);
  };

  const filteredFoods = Object.entries(FOOD_DB).filter(([, v]) => filterCat === "all" || v.cat === filterCat);

  // ── UI ──────────────────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "'Segoe UI',system-ui,sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;800&family=Inter:wght@300;400;500;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes glow{0%,100%{box-shadow:0 0 8px rgba(244,162,97,0.3)}50%{box-shadow:0 0 20px rgba(244,162,97,0.6)}}
        @keyframes barFill{from{width:0%}}
        .fade{animation:fadeUp 0.35s ease}
        .tab:hover{background:rgba(244,162,97,0.08)!important;color:${C.accent}!important;}
        .food-chip:hover{background:rgba(244,162,97,0.2)!important;border-color:${C.accent}!important;}
        .sugg:hover{background:rgba(244,162,97,0.1)!important;}
        .sym:hover{border-color:${C.accent}!important;}
        .cond:hover{border-color:${C.accent}!important;}
        .btn:hover{opacity:0.88;transform:translateY(-1px);}
        .sec:hover{border-color:rgba(244,162,97,0.4)!important;cursor:pointer;}
        input:focus,select:focus{outline:none!important;border-color:${C.accent}!important;}
        ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:${C.accent};border-radius:2px}
      `}</style>

      {/* HEADER */}
      <div style={{ background: C.card, borderBottom: `1px solid ${C.border}`, padding: "12px 16px", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 34, height: 34, background: `linear-gradient(135deg,${C.accent},${C.accentDark})`, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Syne", fontWeight: 800, fontSize: 14, color: "#0e0f14" }}>NT</div>
            <div>
              <div style={{ fontFamily: "Syne", fontWeight: 800, fontSize: 17, color: C.text, letterSpacing: -0.3 }}>NutriTrack <span style={{ color: C.accent }}>Pro</span></div>
              <div style={{ fontSize: 9, color: C.muted, letterSpacing: 2 }}>AI NUTRITION INTELLIGENCE</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 9, color: C.muted, letterSpacing: 1 }}>DIET SCORE</div>
              <div style={{ fontFamily: "Syne", fontWeight: 800, fontSize: 20, color: scoreC(dietScore), lineHeight: 1 }}>{dietScore}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 9, color: C.muted, letterSpacing: 1 }}>TODAY SPEND</div>
              <div style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 16, color: todayCost > profile.budget ? C.red : C.green }}>₹{todayCost}<span style={{ fontSize: 10, color: C.muted }}>/₹{profile.budget}</span></div>
            </div>
            {profile.name && <div style={{ width: 34, height: 34, borderRadius: "50%", background: `linear-gradient(135deg,${C.accent},${C.accentDark})`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14, color: "#0e0f14" }}>{profile.name[0].toUpperCase()}</div>}
          </div>
        </div>
      </div>

      {/* TABS */}
      <div style={{ background: C.card, borderBottom: `1px solid ${C.border}`, position: "sticky", top: 57, zIndex: 99 }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex" }}>
          {TABS.map(t => (
            <div key={t.id} className="tab" onClick={() => setTab(t.id)} style={{ flex: 1, textAlign: "center", padding: "10px 4px", fontSize: 10, fontWeight: 600, letterSpacing: 1, cursor: "pointer", color: tab === t.id ? C.accent : C.muted, borderBottom: `2px solid ${tab === t.id ? C.accent : "transparent"}`, background: tab === t.id ? "rgba(244,162,97,0.05)" : "transparent", transition: "all 0.2s" }}>
              <div style={{ fontSize: 15, marginBottom: 2 }}>{t.icon}</div>
              {t.label.toUpperCase()}
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "20px 14px" }}>

        {/* ── PROFILE ── */}
        {tab === "profile" && (
          <div className="fade">
            <h2 style={{ fontFamily: "Syne", fontSize: 24, fontWeight: 800, marginBottom: 4 }}>Your Health Profile</h2>
            <p style={{ color: C.muted, fontSize: 13, marginBottom: 20 }}>Personalized RDV values are calculated based on your age, gender, and health conditions.</p>
            {err && <div style={{ background: "rgba(239,35,60,0.1)", border: "1px solid rgba(239,35,60,0.3)", borderRadius: 8, padding: "8px 14px", marginBottom: 14, fontSize: 12, color: "#ff6b6b" }}>{err}</div>}

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 16 }}>
              <div style={{ background: C.card, borderRadius: 14, padding: 20, border: `1px solid ${C.border}` }}>
                <div style={{ fontSize: 10, letterSpacing: 2, color: C.accent, marginBottom: 14, fontWeight: 600 }}>BASIC INFO</div>
                {[["Name", "text", "name", "Your name"], ["Age", "number", "age", "21"], ["Weight (kg)", "number", "weight", "58"], ["Height (cm)", "number", "height", "162"]].map(([l, type, k, ph]) => (
                  <div key={k} style={{ marginBottom: 12 }}>
                    <label style={{ fontSize: 11, color: C.muted, display: "block", marginBottom: 5, letterSpacing: 0.5 }}>{l}</label>
                    <input type={type} value={profile[k]} placeholder={ph} onChange={e => setProfile(p => ({ ...p, [k]: type === "number" ? +e.target.value : e.target.value }))} style={{ width: "100%", padding: "9px 12px", background: "rgba(255,255,255,0.04)", border: `1px solid ${C.border}`, borderRadius: 8, color: C.text, fontSize: 13, transition: "border 0.2s" }} />
                  </div>
                ))}
                <div style={{ marginBottom: 12 }}>
                  <label style={{ fontSize: 11, color: C.muted, display: "block", marginBottom: 5, letterSpacing: 0.5 }}>Gender</label>
                  <select value={profile.gender} onChange={e => setProfile(p => ({ ...p, gender: e.target.value }))} style={{ width: "100%", padding: "9px 12px", background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, color: C.text, fontSize: 13, cursor: "pointer" }}>
                    <option value="female">Female</option><option value="male">Male</option>
                  </select>
                </div>
                <div style={{ marginBottom: 12 }}>
                  <label style={{ fontSize: 11, color: C.muted, display: "block", marginBottom: 5, letterSpacing: 0.5 }}>Sector / Role</label>
                  <select value={profile.sector} onChange={e => setProfile(p => ({ ...p, sector: e.target.value }))} style={{ width: "100%", padding: "9px 12px", background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, color: C.text, fontSize: 13, cursor: "pointer" }}>
                    {["student", "working professional", "homemaker", "elderly", "athlete", "pregnant"].map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 11, color: C.muted, display: "block", marginBottom: 5, letterSpacing: 0.5 }}>Daily Budget (₹)</label>
                  <input type="number" value={profile.budget} onChange={e => setProfile(p => ({ ...p, budget: +e.target.value }))} style={{ width: "100%", padding: "9px 12px", background: "rgba(255,255,255,0.04)", border: `1px solid ${C.border}`, borderRadius: 8, color: C.text, fontSize: 13 }} />
                </div>
              </div>

              <div style={{ background: C.card, borderRadius: 14, padding: 20, border: `1px solid ${C.border}` }}>
                <div style={{ fontSize: 10, letterSpacing: 2, color: C.accent, marginBottom: 8, fontWeight: 600 }}>HEALTH CONDITIONS</div>
                <p style={{ fontSize: 11, color: C.muted, marginBottom: 12 }}>Adjusts your recommended daily values</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
                  {CONDITIONS.map(c => (
                    <div key={c} className="cond" onClick={() => toggleCond(c)} style={{ padding: "6px 14px", borderRadius: 20, fontSize: 11, cursor: "pointer", border: `1px solid ${profile.conditions.includes(c) ? C.accent : C.border}`, background: profile.conditions.includes(c) ? "rgba(244,162,97,0.1)" : "transparent", color: profile.conditions.includes(c) ? C.accent : C.muted, fontWeight: profile.conditions.includes(c) ? 600 : 400, transition: "all 0.15s" }}>{c}</div>
                  ))}
                </div>

                <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 10, padding: 14, border: `1px solid ${C.border}` }}>
                  <div style={{ fontSize: 10, letterSpacing: 2, color: C.muted, marginBottom: 10 }}>YOUR PERSONALIZED RDV</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px 12px" }}>
                    {Object.entries(NMETA).slice(0, 10).map(([k, m]) => (
                      <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", borderBottom: `1px solid ${C.border}`, fontSize: 11 }}>
                        <span style={{ color: C.muted }}>{m.icon} {m.label}</span>
                        <span style={{ fontWeight: 600, color: m.color }}>{rdv[k]}{m.unit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <button className="btn" onClick={() => setTab("meals")} style={{ marginTop: 18, padding: "13px 32px", background: C.accent, border: "none", borderRadius: 10, color: "#0e0f14", fontSize: 13, fontWeight: 700, cursor: "pointer", letterSpacing: 1, transition: "all 0.2s" }}>
              CONTINUE TO MEAL LOG →
            </button>
          </div>
        )}

        {/* ── MEALS ── */}
        {tab === "meals" && (
          <div className="fade">
            <h2 style={{ fontFamily: "Syne", fontSize: 24, fontWeight: 800, marginBottom: 4 }}>Today's Meals</h2>
            <p style={{ color: C.muted, fontSize: 13, marginBottom: 14 }}>Type food names or upload a plate photo. Click any chip to remove it.</p>
            {err && <div style={{ background: "rgba(239,35,60,0.1)", border: "1px solid rgba(239,35,60,0.3)", borderRadius: 8, padding: "8px 14px", marginBottom: 14, fontSize: 12, color: "#ff6b6b" }}>{err}</div>}

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(420px,1fr))", gap: 14, marginBottom: 16 }}>
              {MEALS_LIST.map(meal => (
                <div key={meal} style={{ background: C.card, borderRadius: 14, padding: 18, border: `1px solid ${C.border}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.accent, boxShadow: `0 0 6px ${C.accent}` }} />
                      <span style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 14 }}>{meal}</span>
                    </div>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <span style={{ fontSize: 11, color: C.muted }}>₹{meals[meal].reduce((s, f) => s + (FOOD_DB[f]?.price || 0), 0)}</span>
                      <input ref={fileRefs[meal]} type="file" accept="image/*" style={{ display: "none" }} onChange={e => handlePhoto(meal, e.target.files[0])} />
                      <button onClick={() => fileRefs[meal].current.click()} style={{ padding: "4px 10px", background: "rgba(255,255,255,0.05)", border: `1px solid ${C.border}`, borderRadius: 6, fontSize: 10, cursor: "pointer", color: C.muted, letterSpacing: 0.5 }}>
                        {photoLoading[meal] ? "⏳ scanning..." : "📷 PHOTO"}
                      </button>
                    </div>
                  </div>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, minHeight: 32, marginBottom: 12 }}>
                    {meals[meal].map((f, i) => (
                      <div key={i} className="food-chip" onClick={() => removeFood(meal, i)} style={{ background: "rgba(244,162,97,0.1)", border: `1px solid rgba(244,162,97,0.25)`, borderRadius: 20, padding: "4px 12px", fontSize: 11, color: C.accent, display: "flex", alignItems: "center", gap: 6, cursor: "pointer", transition: "all 0.15s" }}>
                        {NMETA[Object.keys(NMETA).find(k => FOOD_DB[f]?.[k] > 0)]?.icon || "🍽"} {f} <span style={{ color: C.red, fontSize: 13, lineHeight: 1 }}>×</span>
                      </div>
                    ))}
                    {!meals[meal].length && <span style={{ color: "#2a3040", fontSize: 11, fontStyle: "italic" }}>No items logged</span>}
                  </div>

                  <div style={{ position: "relative" }}>
                    <div style={{ display: "flex", gap: 8 }}>
                      <input value={inputs[meal]} onChange={e => handleInput(meal, e.target.value)} onKeyDown={e => e.key === "Enter" && addFood(meal)} placeholder="dal, roti, egg, banana, rajma..." style={{ flex: 1, padding: "9px 12px", background: "rgba(255,255,255,0.04)", border: `1px solid ${C.border}`, borderRadius: 8, color: C.text, fontSize: 12 }} />
                      <button className="btn" onClick={() => addFood(meal)} style={{ background: C.accent, border: "none", borderRadius: 8, padding: "9px 16px", color: "#0e0f14", fontWeight: 700, cursor: "pointer", fontSize: 12, letterSpacing: 0.5, transition: "all 0.2s" }}>ADD</button>
                    </div>
                    {sugg[meal]?.length > 0 && (
                      <div style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, right: 60, background: "#1a1d27", border: `1px solid ${C.border}`, borderRadius: 8, zIndex: 20, overflow: "hidden", boxShadow: "0 8px 24px rgba(0,0,0,0.4)" }}>
                        {sugg[meal].map(s => (
                          <div key={s} className="sugg" onClick={() => addFood(meal, s)} style={{ padding: "8px 14px", fontSize: 12, color: C.text, borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", cursor: "pointer", transition: "background 0.1s" }}>
                            <span>{s}</span>
                            <span style={{ color: C.muted, fontSize: 10 }}>₹{FOOD_DB[s]?.price} · {FOOD_DB[s]?.cat}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Food DB Browser */}
            <div style={{ background: C.card, borderRadius: 14, padding: 18, border: `1px solid ${C.border}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
                <div style={{ fontSize: 10, letterSpacing: 2, color: C.muted }}>FOOD DATABASE ({Object.keys(FOOD_DB).length} items)</div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {["all", "breakfast", "lunch", "dinner", "protein", "vegetable", "fruit", "snack", "beverage"].map(cat => (
                    <button key={cat} onClick={() => setFilterCat(cat)} style={{ padding: "3px 10px", borderRadius: 12, fontSize: 10, border: `1px solid ${filterCat === cat ? C.accent : C.border}`, background: filterCat === cat ? "rgba(244,162,97,0.15)" : "transparent", color: filterCat === cat ? C.accent : C.muted, cursor: "pointer", letterSpacing: 0.5 }}>{cat.toUpperCase()}</button>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                {filteredFoods.map(([f, d]) => (
                  <span key={f} style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${C.border}`, borderRadius: 14, padding: "3px 10px", fontSize: 10, color: C.muted, cursor: "pointer" }} onClick={() => { }}>
                    {f} <span style={{ color: C.accent, fontSize: 9 }}>₹{d.price}</span>
                  </span>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", gap: 12, marginTop: 14, flexWrap: "wrap" }}>
              <button className="btn" onClick={() => setTab("symptoms")} style={{ padding: "12px 28px", background: C.accent, border: "none", borderRadius: 10, color: "#0e0f14", fontSize: 12, fontWeight: 700, cursor: "pointer", letterSpacing: 1, transition: "all 0.2s" }}>ADD SYMPTOMS →</button>
              <button className="btn" onClick={() => setTab("dashboard")} style={{ padding: "12px 28px", background: "rgba(6,214,160,0.15)", border: `1px solid ${C.green}`, borderRadius: 10, color: C.green, fontSize: 12, fontWeight: 700, cursor: "pointer", letterSpacing: 1 }}>📊 VIEW NUTRIENT DASHBOARD</button>
            </div>
          </div>
        )}

        {/* ── SYMPTOMS ── */}
        {tab === "symptoms" && (
          <div className="fade">
            <h2 style={{ fontFamily: "Syne", fontSize: 24, fontWeight: 800, marginBottom: 4 }}>Symptom Checker</h2>
            <p style={{ color: C.muted, fontSize: 13, marginBottom: 18 }}>Report symptoms you've been experiencing. AI cross-maps these with your diet to find nutritional root causes.</p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 10, marginBottom: 16 }}>
              {SYMPTOMS.map(s => (
                <div key={s.id} className="sym" onClick={() => toggleSymp(s.id)} style={{ background: symptoms.includes(s.id) ? "rgba(244,162,97,0.07)" : C.card, border: `1.5px solid ${symptoms.includes(s.id) ? C.accent : C.border}`, borderRadius: 12, padding: "13px 15px", cursor: "pointer", transition: "all 0.2s", display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <div style={{ width: 18, height: 18, borderRadius: "50%", border: `2px solid ${symptoms.includes(s.id) ? C.accent : C.border}`, background: symptoms.includes(s.id) ? C.accent : "transparent", marginTop: 1, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {symptoms.includes(s.id) && <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#0e0f14" }} />}
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 3 }}>{s.label}</div>
                    <div style={{ fontSize: 10, color: C.muted }}>May indicate: {s.links.slice(0, 2).map(k => NMETA[k]?.label).join(", ")} deficiency</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 14, marginBottom: 14, display: "flex", gap: 12, alignItems: "center" }}>
              <div style={{ fontSize: 28 }}>🩺</div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600 }}>{symptoms.length} symptom{symptoms.length !== 1 ? "s" : ""} selected</div>
                <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>AI will correlate these with your {Object.values(meals).flat().length} logged foods to find nutritional gaps.</div>
              </div>
            </div>

            <button className="btn" onClick={() => setTab("dashboard")} style={{ padding: "13px 36px", background: C.accent, border: "none", borderRadius: 10, color: "#0e0f14", fontSize: 13, fontWeight: 700, cursor: "pointer", letterSpacing: 1, transition: "all 0.2s" }}>
              📊 GO TO DASHBOARD
            </button>
          </div>
        )}

        {/* ── DASHBOARD ── */}
        {tab === "dashboard" && (
          <div className="fade">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12, marginBottom: 18 }}>
              <div>
                <h2 style={{ fontFamily: "Syne", fontSize: 24, fontWeight: 800 }}>Nutrient Dashboard</h2>
                <p style={{ color: C.muted, fontSize: 13 }}>Your intake vs personalized daily targets ({Object.values(meals).flat().length} foods logged)</p>
              </div>
              <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: "12px 18px", textAlign: "center" }}>
                <div style={{ fontFamily: "Syne", fontWeight: 800, fontSize: 42, color: scoreC(dietScore), lineHeight: 1 }}>{dietScore}</div>
                <div style={{ fontSize: 9, letterSpacing: 2, color: C.muted, marginTop: 4 }}>DIET SCORE</div>
                <div style={{ fontSize: 10, color: scoreC(dietScore), marginTop: 2, fontWeight: 600 }}>{dietScore >= 80 ? "EXCELLENT" : dietScore >= 60 ? "MODERATE" : dietScore >= 40 ? "POOR" : "CRITICAL"}</div>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))", gap: 10, marginBottom: 18 }}>
              {Object.keys(rdv).map(k => {
                const p = pct(k), m = NMETA[k], col = barC(p);
                return (
                  <div key={k} style={{ background: C.card, borderRadius: 12, padding: "14px", border: `1px solid ${C.border}` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ fontSize: 15 }}>{m.icon}</span>
                        <span style={{ fontSize: 11, fontWeight: 600, color: C.text }}>{m.label}</span>
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 700, color: col }}>{p}%</span>
                    </div>
                    <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 4, height: 5, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${Math.min(p, 100)}%`, background: `linear-gradient(90deg,${col}88,${col})`, borderRadius: 4, animation: "barFill 0.8s ease", transition: "width 0.8s" }} />
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: 5, fontSize: 10, color: C.muted }}>
                      <span>{(totals[k] || 0).toFixed(1)}{m.unit}</span>
                      <span>/ {rdv[k]}{m.unit}</span>
                    </div>
                    {p < 40 && <div style={{ marginTop: 4, fontSize: 9, color: C.red, letterSpacing: 0.5, fontWeight: 600 }}>⚠ {m.label} low</div>}
                    {p > 130 && <div style={{ marginTop: 4, fontSize: 9, color: C.blue }}>↑ Excess</div>}
                  </div>
                );
              })}
            </div>

            {/* 7-day trend */}
            {history.length > 0 && (
              <div style={{ background: C.card, borderRadius: 14, padding: 18, border: `1px solid ${C.border}`, marginBottom: 14 }}>
                <div style={{ fontSize: 10, letterSpacing: 2, color: C.muted, marginBottom: 14 }}>7-DAY SCORE HISTORY</div>
                <div style={{ display: "flex", gap: 8, alignItems: "flex-end", height: 80 }}>
                  {history.map((h, i) => (
                    <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                      <div style={{ width: "100%", background: scoreC(h.score), borderRadius: "4px 4px 0 0", height: `${Math.max(h.score, 8)}%`, maxHeight: "100%", transition: "height 0.5s ease" }} />
                      <div style={{ fontSize: 11, fontWeight: 700, color: scoreC(h.score) }}>{h.score}</div>
                      <div style={{ fontSize: 8, color: C.muted }}>{h.date.split("/").slice(0, 2).join("/")}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}


          </div>
        )}

        {/* ── AI REPORT ── */}


        <div style={{ marginTop: 32, textAlign: "center", fontSize: 9, color: "#2a3040", letterSpacing: 2, paddingTop: 14, borderTop: `1px solid ${C.border}` }}>
          NUTRITRACK PRO · AI NUTRITION INTELLIGENCE · FOR EDUCATIONAL USE · CONSULT A REGISTERED DIETITIAN FOR MEDICAL ADVICE
        </div>
      </div>
    </div>
  );
}