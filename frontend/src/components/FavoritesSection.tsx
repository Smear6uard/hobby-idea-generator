import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Bookmark, ChevronDown, Package, Sparkles } from "lucide-react";
import { HobbyCard } from "../lib/hobbyInsights";

type Props = {
  savedHobbies: HobbyCard[];
};

export function FavoritesSection({ savedHobbies }: Props) {
  const [filter, setFilter] = useState<"All" | HobbyCard["category"]>("All");

  const savedCards = useMemo(() => {
    return savedHobbies.filter((card) => {
      return filter === "All" ? true : card.category === filter;
    });
  }, [savedHobbies, filter]);

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
                {card.materials.length > 0 && (
                  <details className="group mt-3 rounded-lg border border-white/10 bg-white/5 open:border-cyan-400/25 open:bg-white/[0.07]">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-2.5 py-2 text-left text-[10px] font-medium uppercase tracking-wide text-slate-400 outline-none ring-cyan-400/40 marker:content-none focus-visible:ring-2 [&::-webkit-details-marker]:hidden">
                      <span className="flex items-center gap-1 text-slate-300">
                        <Package className="h-3 w-3 text-cyan-300" />
                        Materials
                      </span>
                      <ChevronDown className="h-3.5 w-3.5 shrink-0 text-slate-500 transition-transform duration-200 group-open:rotate-180" aria-hidden />
                    </summary>
                    <ul className="space-y-1 border-t border-white/10 px-2.5 pb-2.5 pt-2 text-[0.8rem] text-slate-200">
                      {card.materials.map((m, mi) => (
                        <li key={`${card.title}-fav-m-${mi}`}>• {m}</li>
                      ))}
                    </ul>
                  </details>
                )}
                <p className="body-copy mt-2 text-[0.88rem]">{card.whyMatch}</p>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
