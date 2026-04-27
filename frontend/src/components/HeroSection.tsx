import { motion } from "framer-motion";
import { Activity, Brain, Compass, Sparkles, Wand2 } from "lucide-react";

export function HeroSection() {
  return (
    <section id="hero" className="app-shell relative pt-16 md:pt-20">
      <div className="bs-glass-card glass-card relative overflow-hidden px-8 py-14 shadow-glow md:px-12 md:py-16">
        <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-fuchsia-500/25 blur-3xl" />
        <div className="absolute -bottom-14 left-10 h-36 w-36 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="mx-auto max-w-3xl text-center lg:mx-0 lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              className="d-inline-flex align-items-center gap-2 rounded-pill border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-xs fw-semibold text-cyan-200"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span className="tracking-[0.18em] uppercase">AI-Powered Discovery</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-5 text-[2rem] font-bold leading-[1.15] text-white sm:text-[2.75rem]"
            >
              Discover hobbies designed around your{" "}
              <span className="text-cyan-300">
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

            <div className="mt-8 d-flex flex-wrap justify-content-center gap-3 lg:justify-start">
              <a href="#quiz" className="btn btn-primary btn-modern animate-pulse-glow px-5 py-3">
                Get Started
              </a>
              <a
                href="#recommendations"
                className="btn btn-outline-light rounded-xl border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                View Recommendations
              </a>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="relative mx-auto w-full max-w-lg"
          >
            <div className="bs-glass-card hobby-dashboard-card elevated-hover card relative overflow-hidden rounded-3xl p-4">
              <div className="absolute right-3 top-3 h-24 w-24 rounded-full bg-cyan-400/20 blur-3xl" />
              <div className="card-body p-1">
                <h3 className="card-title mt-2 text-[1.02rem] font-semibold text-white">Your hobby dashboard</h3>
                <div className="row g-2 mt-2">
                  {[
                    { title: "Creative coding", fit: "95%" },
                    { title: "Indoor climbing", fit: "89%" },
                    { title: "Music production", fit: "84%" },
                    { title: "Urban sketching", fit: "81%" },
                  ].map((item) => (
                    <div key={item.title} className="col-6">
                      <div className="dashboard-mini-card h-100 rounded-xl border border-white/15 bg-white/5 p-3">
                        <p className="mb-2 text-[0.82rem] font-medium text-slate-100">{item.title}</p>
                        <span className="badge rounded-pill bg-info-subtle text-info-emphasis px-2 py-1 text-[11px]">
                          {item.fit} fit
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="meta-copy mt-4 d-flex align-items-center gap-2">
                  <Activity className="h-3.5 w-3.5 text-cyan-300" />
                  AI adapting in real-time to your inputs
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mx-auto mt-10 w-full max-w-6xl">
          <div className="d-flex flex-wrap justify-content-center gap-3 pb-2">
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
              className="feature-chip-card card bs-glass-card animate-float elevated-hover flex min-w-[220px] items-center justify-center gap-3 px-4 py-3 text-[0.88rem] text-slate-200"
            >
              <Icon className="h-4 w-4 text-cyan-300" />
              {label}
            </motion.div>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}
