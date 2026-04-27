import { Menu, MoonStar, Sparkles, Sun, X } from "lucide-react";

type Props = {
  darkMode: boolean;
  onToggleTheme: () => void;
  mobileOpen: boolean;
  onToggleMobile: () => void;
};

export function Navbar({ darkMode, onToggleTheme, mobileOpen, onToggleMobile }: Props) {
  return (
    <header className="sticky top-4 z-40 app-shell">
      <nav className="glass-card grid grid-cols-[auto_1fr_auto] items-center gap-3 px-4 py-3 md:px-6">
        <a className="flex items-center gap-2 text-sm font-semibold text-white" href="#hero">
          <Sparkles className="h-4 w-4 text-cyan-300" />
          HobbyPulse AI
        </a>

        <div className="hidden items-center justify-center gap-2 md:flex">
          <a className="nav-link" href="#quiz">
            Quiz
          </a>
          <a className="nav-link" href="#recommendations">
            Recommendations
          </a>
          <a className="nav-link" href="#favorites">
            Favorites
          </a>
        </div>

        <div className="hidden items-center justify-end gap-2 md:flex">
          <button
            className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-3 py-2 text-sm transition hover:bg-white/10"
            onClick={onToggleTheme}
            type="button"
          >
            {darkMode ? <Sun className="h-4 w-4" /> : <MoonStar className="h-4 w-4" />}
            {darkMode ? "Light" : "Dark"}
          </button>
          <a
            href="#quiz"
            className="rounded-lg bg-gradient-to-r from-violet-500 to-cyan-500 px-3.5 py-2 text-sm font-semibold text-white transition hover:scale-[1.03]"
          >
            Start now
          </a>
        </div>

        <button
          className="justify-self-end rounded-lg border border-white/20 p-2 md:hidden"
          onClick={onToggleMobile}
          type="button"
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="glass-card mt-2 flex flex-col p-3 md:hidden">
          <a className="nav-link" href="#quiz">
            Quiz
          </a>
          <a className="nav-link" href="#recommendations">
            Recommendations
          </a>
          <a className="nav-link" href="#favorites">
            Favorites
          </a>
          <button
            className="mt-2 rounded-lg border border-white/20 px-3 py-2 text-left text-sm transition hover:bg-white/10"
            onClick={onToggleTheme}
            type="button"
          >
            Switch to {darkMode ? "light" : "dark"} mode
          </button>
          <a
            href="#quiz"
            className="mt-2 rounded-lg bg-gradient-to-r from-violet-500 to-cyan-500 px-3 py-2 text-sm font-semibold text-white"
          >
            Start now
          </a>
        </div>
      )}
    </header>
  );
}
