import { motion } from "framer-motion";
import { Activity, Brain, Compass, Sparkles, Wand2 } from "lucide-react";

export function HeroSection() {
  return (
    <section id="hero" className="app-shell relative pt-14 md:pt-16">
      <div className="glass-card relative overflow-hidden px-6 py-12 md:px-10 md:py-14">
        <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-fuchsia-500/25 blur-3xl" />
        <div className="absolute -bottom-14 left-10 h-36 w-36 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="mx-auto max-w-3xl text-center lg:mx-0 lg:text-left">
            <motion.p
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200"
            >
              <Sparkles className="h-3.5 w-3.5" />
              AI-Powered Discovery
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-5 text-[2rem] font-bold leading-[1.15] text-white sm:text-[2.75rem]"
            >
              Discover hobbies designed around your{" "}
              <span className="bg-gradient-to-r from-violet-300 via-cyan-300 to-blue-300 bg-clip-text text-transparent">
                personality.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="body-copy mt-5 sm:text-[0.98rem]"
            >
              Skip generic lists. HobbyPulse maps your goals, time, and energy to
              beginner-friendly hobbies with AI rationale, difficulty, and weekly fit.
            </motion.p>

            <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
              <a
                href="#quiz"
                className="animate-pulse-glow rounded-xl bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-glow transition hover:scale-[1.03]"
              >
                Get Started
              </a>
              <a
                href="#recommendations"
                className="rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                View Recommendations
              </a>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="relative mx-auto w-full max-w-md"
          >
            <div className="glass-card relative overflow-hidden rounded-3xl p-5">
              <div className="absolute right-3 top-3 h-24 w-24 rounded-full bg-cyan-400/20 blur-3xl" />
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">Live AI Preview</p>
              <h3 className="mt-2 text-[1.02rem] font-semibold text-white">Your hobby dashboard</h3>
              <div className="mt-4 space-y-3">
                {["Creative coding", "Indoor climbing", "Music production"].map((item, index) => (
                  <div
                    key={item}
                    className="flex items-center justify-between rounded-xl border border-white/15 bg-white/5 px-3 py-2"
                  >
                    <span className="text-[0.9rem] text-slate-200">{item}</span>
                    <span className="rounded-full bg-cyan-400/20 px-2 py-0.5 text-[11px] text-cyan-200">
                      {index === 0 ? "95%" : index === 1 ? "89%" : "84%"} fit
                    </span>
                  </div>
                ))}
              </div>
              <div className="meta-copy mt-4 flex items-center gap-2">
                <Activity className="h-3.5 w-3.5 text-cyan-300" />
                AI adapting in real-time to your inputs
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mx-auto mt-10 grid max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Brain, label: "Smart matching" },
            { icon: Compass, label: "Clear direction" },
            { icon: Wand2, label: "AI personalization" },
            { icon: Sparkles, label: "Motivational flow" },
          ].map(({ icon: Icon, label }, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + index * 0.08 }}
              className="glass-card animate-float flex items-center gap-3 px-4 py-3 text-[0.88rem] text-slate-200"
            >
              <Icon className="h-4 w-4 text-cyan-300" />
              {label}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
