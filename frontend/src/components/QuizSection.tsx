import { FormEvent, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

type QuizForm = {
  interests: string;
  weekly_time: string;
  budget: string;
};

type Props = {
  form: QuizForm;
  onChange: (field: keyof QuizForm, value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  loading: boolean;
};

const budgetOptions = ["$0-30", "$30-80", "$80-150", "$150+"];

export function QuizSection({ form, onChange, onSubmit, loading }: Props) {
  const [step, setStep] = useState(0);
  const progress = [
    form.interests.trim().length > 0,
    form.weekly_time.trim().length > 0,
    form.budget.trim().length > 0,
  ].filter(Boolean).length;
  const stepTitles = ["Interests", "Time availability", "Budget range"];
  const canContinue = useMemo(() => {
    if (step === 0) return form.interests.trim().length > 0;
    if (step === 1) return form.weekly_time.trim().length > 0;
    return form.budget.trim().length > 0;
  }, [step, form]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    if (step < 2) {
      event.preventDefault();
      setStep((prev) => Math.min(2, prev + 1));
      return;
    }
    onSubmit(event);
  }

  return (
    <section id="quiz" className="section-wrap">
      <motion.div layout className="glass-card p-6 md:p-8">
        <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="section-title">Personalization Quiz</h2>
            <p className="section-subtitle">Answer a few inputs and we shape recommendations around you.</p>
          </div>
          <span className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-xs text-cyan-200">
            Step {step + 1}/3 • {progress}/3 complete
          </span>
        </div>

        <div className="mb-6 h-2 rounded-full bg-white/10">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(progress / 3) * 100}%` }}
            className="h-2 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400"
          />
        </div>

        <form onSubmit={handleSubmit} className="grid gap-5">
          <p className="meta-copy">Now editing: {stepTitles[step]}</p>
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="step-interests"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
              >
                <label className="mb-2 block text-sm font-medium text-slate-200" htmlFor="interests">
                  What are you curious about?
                </label>
                <textarea
                  id="interests"
                  className="input-modern min-h-32"
                  value={form.interests}
                  onChange={(e) => onChange("interests", e.target.value)}
                  placeholder="music, creativity, confidence, social hobbies..."
                />
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="step-time"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                className="grid gap-4 md:grid-cols-2"
              >
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-200" htmlFor="weekly_time">
                    Weekly time commitment
                  </label>
                  <input
                    id="weekly_time"
                    className="input-modern"
                    value={form.weekly_time}
                    onChange={(e) => onChange("weekly_time", e.target.value)}
                    placeholder="e.g. 4 hours"
                  />
                </div>
                <div className="rounded-xl border border-white/15 bg-white/5 px-4 py-3">
                  <p className="mb-1 text-xs uppercase tracking-[0.16em] text-cyan-200">Tip</p>
                  <p className="body-copy text-[0.9rem]">
                    Honest availability helps the AI avoid overambitious suggestions.
                  </p>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step-budget"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
              >
                <label className="mb-2 block text-sm font-medium text-slate-200">Monthly budget</label>
                <div className="flex flex-wrap gap-2">
                  {budgetOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => onChange("budget", option)}
                      className={`pill-option ${
                        form.budget === option ? "border-cyan-300 bg-cyan-300/20 text-white" : "text-slate-300"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                <div className="mt-4 rounded-xl border border-white/15 bg-white/5 p-4">
                  <p className="body-copy mb-2 text-[0.9rem]">Energy preference</p>
                  <input
                    type="range"
                    min={1}
                    max={10}
                    defaultValue={6}
                    className="w-full accent-cyan-400"
                    aria-label="Energy preference slider"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex flex-wrap justify-between gap-3">
            <button
              type="button"
              onClick={() => setStep((prev) => Math.max(0, prev - 1))}
              disabled={step === 0 || loading}
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-4 py-3 text-sm text-slate-200 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </button>

            <div className="flex items-center gap-2">
              {step < 2 && (
                <button
                  type="submit"
                  disabled={!canContinue || loading}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-glow transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Continue
                  <ChevronRight className="h-4 w-4" />
                </button>
              )}
              {step === 2 && (
                <button
                  type="submit"
                  disabled={!canContinue || loading}
                  className="rounded-xl bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? "Generating with AI..." : "Generate My Hobby Plan"}
                </button>
              )}
            </div>
          </div>
        </form>
      </motion.div>
    </section>
  );
}
