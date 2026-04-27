import { FormEvent, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { BackgroundDecor } from "./components/BackgroundDecor";
import { FavoritesSection } from "./components/FavoritesSection";
import { Footer } from "./components/Footer";
import { HeroSection } from "./components/HeroSection";
import { Navbar } from "./components/Navbar";
import { QuizSection } from "./components/QuizSection";
import { RecommendationsSection } from "./components/RecommendationsSection";
import { HobbyCard, enrichHobbies } from "./lib/hobbyInsights";

type GenerateRequest = {
  interests: string;
  weekly_time: string;
  budget: string;
};

type GenerateResponse = {
  hobbies: string[];
  meta: {
    model: string;
    latency_ms: number;
    fallback_used: boolean;
  };
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000";

const initialForm: GenerateRequest = {
  interests: "",
  weekly_time: "",
  budget: ""
};

export default function App() {
  const [form, setForm] = useState<GenerateRequest>(initialForm);
  const [hobbyCards, setHobbyCards] = useState<HobbyCard[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [meta, setMeta] = useState<GenerateResponse["meta"] | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [darkMode, setDarkMode] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isValid = useMemo(
    () => Object.values(form).every((value) => value.trim().length > 0),
    [form]
  );

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isValid) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/generate-hobbies`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          interests: form.interests.trim(),
          weekly_time: form.weekly_time.trim(),
          budget: form.budget.trim()
        })
      });

      const data = (await response.json()) as GenerateResponse | { detail?: string };
      if (!response.ok || !("hobbies" in data)) {
        throw new Error(("detail" in data && data.detail) || "Failed to generate hobbies.");
      }

      const weeklyTime = Number.parseInt(form.weekly_time.replace(/\D/g, ""), 10) || 3;
      const budget = Number.parseInt(form.budget.replace(/\D/g, ""), 10) || 30;
      setHobbyCards(enrichHobbies(data.hobbies, weeklyTime, budget));
      setMeta(data.meta);
    } catch (submitError) {
      setHobbyCards([]);
      setMeta(null);
      setError(submitError instanceof Error ? submitError.message : "Unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    document.body.classList.toggle("light-theme", !darkMode);
  }, [darkMode]);

  const favoriteCount = useMemo(() => favorites.size, [favorites]);

  function updateForm(field: keyof GenerateRequest, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function toggleFavorite(title: string) {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(title)) next.delete(title);
      else next.add(title);
      return next;
    });
  }

  return (
    <main className="pb-8">
      <BackgroundDecor />
      <Navbar
        darkMode={darkMode}
        onToggleTheme={() => setDarkMode((prev) => !prev)}
        mobileOpen={mobileOpen}
        onToggleMobile={() => setMobileOpen((prev) => !prev)}
      />
      <HeroSection />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="section-wrap mt-5 rounded-xl border border-cyan-300/25 bg-cyan-400/10 px-4 py-2 text-center text-sm text-cyan-100"
      >
        <span className="font-medium">{favoriteCount}</span> hobbies saved in your shortlist
      </motion.div>

      <QuizSection form={form} onChange={updateForm} onSubmit={onSubmit} loading={loading} />
      <RecommendationsSection
        loading={loading}
        error={error}
        hobbies={hobbyCards}
        meta={meta}
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
      />
      <FavoritesSection favorites={favorites} hobbyCards={hobbyCards} />
      <Footer />
    </main>
  );
}
