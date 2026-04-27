import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Bookmark, Sparkles } from "lucide-react";
import { HobbyCard } from "../lib/hobbyInsights";

type Props = {
  favorites: Set<string>;
  hobbyCards: HobbyCard[];
};

export function FavoritesSection({ favorites, hobbyCards }: Props) {
  const [filter, setFilter] = useState<"All" | HobbyCard["category"]>("All");

  const savedCards = useMemo(() => {
    return hobbyCards.filter((card) => {
      if (!favorites.has(card.title)) return false;
      return filter === "All" ? true : card.category === filter;
    });
  }, [favorites, hobbyCards, filter]);

  const filters: Array<"All" | HobbyCard["category"]> = [
    "All",
    "Creative",
    "Mindfulness",
    "Fitness",
    "Tech",
    "Lifestyle",
  ];

  return (
    <section id="favorites" className="section-wrap">
      <div className="bs-glass-card glass-card p-8 md:p-10">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="section-title">Saved Hobbies Dashboard</h2>
            <p className="section-subtitle">Keep a curated shortlist and filter by category.</p>
          </div>
          <span className="shortlist-count-chip inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium">
            <Bookmark className="h-3.5 w-3.5" />
            {savedCards.length} saved
          </span>
          <div className="flex flex-wrap gap-2">
            {filters.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setFilter(option)}
                className={`pill-option ${
                  filter === option ? "border-cyan-300 bg-cyan-300/20 text-white" : "text-slate-300"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {savedCards.length === 0 ? (
          <div className="shortlist-empty body-copy rounded-xl border border-dashed px-4 py-9 text-center">
            <Sparkles className="mx-auto mb-3 h-6 w-6 text-cyan-300" />
            No favorites yet. Bookmark recommendations to build your personalized hobby stack.
          </div>
        ) : (
          <div className="columns-1 gap-3 md:columns-2 xl:columns-3">
            {savedCards.map((card, index) => (
              <motion.article
                key={card.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="shortlist-card bs-glass-card card elevated-hover mb-3 break-inside-avoid rounded-xl p-4 hover:border-cyan-300/40"
              >
                <p className="mb-2 text-[0.76rem] uppercase tracking-[0.12em] text-cyan-200">{card.category}</p>
                <h3 className="text-[0.97rem] font-semibold text-white">{card.title}</h3>
                <p className="body-copy mt-2 text-[0.88rem]">{card.whyMatch}</p>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
