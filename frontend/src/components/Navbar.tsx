import { Menu, MoonStar, Sparkles, Sun, X } from "lucide-react";

type Props = {
  darkMode: boolean;
  onToggleTheme: () => void;
  mobileOpen: boolean;
  onToggleMobile: () => void;
};

export function Navbar({ darkMode, onToggleTheme, mobileOpen, onToggleMobile }: Props) {
  return (
    <header className="sticky top-0 z-50 w-full flex flex-col items-center justify-between">
      <nav className="glass-card w-full rounded-none border-x-0 border-t-0 py-3 shadow-glow">
        <div className="app-shell relative flex flex-row items-center justify-between">
          <a className="flex items-center gap-2 text-sm font-semibold text-white md:min-w-[190px]" href="#hero">
            <Sparkles className="h-4 w-4 text-cyan-300" />
            HobbyPulse AI
          </a>
          </div>
          </nav>
    </header>
  );
}
