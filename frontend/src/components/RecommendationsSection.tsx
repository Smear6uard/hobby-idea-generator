import { motion } from "framer-motion";
import {
  Bookmark,
  Brush,
  ChevronDown,
  Clock3,
  Cpu,
  DollarSign,
  Dumbbell,
  Heart,
  Lightbulb,
  Package,
  Signal,
  Sparkles,
} from "lucide-react";
import { HobbyCard } from "../lib/hobbyInsights";

type Meta = {
  model: string;
  latency_ms: number;
  fallback_used: boolean;
};

type Props = {
  loading: boolean;
  error: string;
  hobbies: HobbyCard[];
  meta: Meta | null;
  favorites: Set<string>;
  onToggleFavorite: (hobby: string) => void;
};

function LoadingSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="glass-card animate-pulse p-5">
          <div className="mb-3 h-5 w-1/2 rounded bg-white/10" />
          <div className="mb-2 h-4 w-full rounded bg-white/10" />
          <div className="mb-4 h-4 w-2/3 rounded bg-white/10" />
          <div className="h-24 rounded bg-white/10" />
        </div>
      ))}
    </div>
  );
}

function getIconForCategory(category: HobbyCard["category"]) {
  if (category === "Creative") return Brush;
  if (category === "Fitness") return Dumbbell;
  if (category === "Mindfulness") return Heart;
  if (category === "Tech") return Cpu;
  return Lightbulb;
}

export function RecommendationsSection({
  loading,
  error,
  hobbies,
  meta,
  favorites,
  onToggleFavorite,
}: Props) {
  return (
    <section id="recommendations" className="section-wrap">
      <div className="bs-glass-card glass-card p-8 md:p-10">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="section-title">AI Recommendations</h2>
            <p className="section-subtitle">Curated ideas with clear effort, cost, and why-fit signals.</p>
          </div>
          {meta && (
            <div className="flex flex-wrap gap-2 text-xs text-cyan-100">
              <span className="rounded-full bg-cyan-500/15 px-3 py-1">Model: {meta.model}</span>
              <span className="rounded-full bg-cyan-500/15 px-3 py-1">Latency: {meta.latency_ms}ms</span>
            </div>
          )}
        </div>

        {loading && (
          <>
            <p className="mb-2 flex items-center gap-2 text-[0.9rem] text-cyan-200">
              <Sparkles className="h-4 w-4 animate-pulse" />
              AI is composing your personalized hobby path...
            </p>
            <div className="mb-4 inline-flex items-center gap-1">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-cyan-300 [animation-delay:0ms]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-cyan-300 [animation-delay:120ms]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-cyan-300 [animation-delay:240ms]" />
            </div>
            <LoadingSkeleton />
          </>
        )}

        {!loading && error && (
          <p className="rounded-xl border border-rose-400/40 bg-rose-400/10 px-4 py-3 text-sm text-rose-100">
            {error}
          </p>
        )}

        {!loading && !error && hobbies.length === 0 && (
          <p className="body-copy rounded-xl border border-white/15 bg-white/5 px-4 py-6">
            Your recommendations will appear here after you complete the quiz.
          </p>
        )}

        {!loading && !error && hobbies.length > 0 && (
          <motion.div layout className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {hobbies.map((hobby, index) => {
              const CategoryIcon = getIconForCategory(hobby.category);
              return (
                <motion.article
                  key={hobby.title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.06 }}
                  className="bs-glass-card card elevated-hover group relative overflow-hidden p-5 hover:border-cyan-300/40"
                >
                  <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-cyan-500/20 blur-2xl" />
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <div className="flex min-w-0 flex-1 items-start gap-2">
                      <div className="mt-0.5 rounded-lg bg-cyan-500/15 p-2 text-cyan-200">
                        <CategoryIcon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-[1.02rem] font-semibold text-white">{hobby.title}</h3>
                        <p className="body-copy text-[0.88rem]">{hobby.description}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      aria-label={`Save ${hobby.title}`}
                      onClick={() => onToggleFavorite(hobby.title)}
                      className={`rounded-lg p-2 transition ${
                        favorites.has(hobby.title)
                          ? "bg-cyan-400/25 text-cyan-200"
                          : "bg-white/10 text-slate-300 hover:text-white"
                      }`}
                    >
                      <Bookmark className="h-4 w-4" />
                    </button>
                  </div>

                  {hobby.materials.length > 0 && (
                    <details className="group mb-4 w-full rounded-lg border border-white/10 bg-white/5 open:border-cyan-400/25 open:bg-white/[0.07]">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-3 py-2.5 text-left text-[11px] font-medium uppercase tracking-wide text-slate-400 outline-none ring-cyan-400/40 marker:content-none focus-visible:ring-2 [&::-webkit-details-marker]:hidden">
                        <span className="flex items-center gap-1.5 text-slate-300">
                          <Package className="h-3.5 w-3.5 text-cyan-300" />
                          Key materials
                        </span>
                        <ChevronDown className="h-4 w-4 shrink-0 text-slate-500 transition-transform duration-200 group-open:rotate-180" aria-hidden />
                      </summary>
                      <ul className="space-y-1.5 border-t border-white/10 px-3 pb-3 pt-2 text-[0.85rem] leading-snug text-slate-200">
                        {hobby.materials.map((material, mi) => (
                          <li key={`${hobby.title}-mat-${mi}`} className="flex gap-2">
                            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cyan-400/80" />
                            <span>{material}</span>
                          </li>
                        ))}
                      </ul>
                    </details>
                  )}

                  <div className="mb-4 grid grid-cols-2 gap-2 text-xs">
                    <Stat icon={Signal} label="Difficulty" value={hobby.difficulty} />
                    <Stat icon={DollarSign} label="Cost" value={hobby.estimatedCost} />
                    <Stat icon={Clock3} label="Time" value={hobby.timeCommitment} />
                    <Stat icon={Cpu} label="Category" value={hobby.category} />
                  </div>

                  <p className="rounded-lg border border-cyan-300/20 bg-cyan-500/10 p-3 text-[0.88rem] leading-relaxed text-cyan-100">
                    <span className="font-semibold">Why this matches you:</span> {hobby.whyMatch}
                  </p>
                </motion.article>
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Clock3;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/5 p-2 text-slate-200">
      <p className="mb-1 flex items-center gap-1 text-[11px] text-slate-400">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </p>
      <p className="text-xs font-medium">{value}</p>
    </div>
  );
}
