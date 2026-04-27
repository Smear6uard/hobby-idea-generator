import { Code2, Globe, Link2, Mail } from "lucide-react";

const links = [
  { label: "GitHub", href: "https://github.com", icon: Code2 },
  { label: "Portfolio", href: "#", icon: Globe },
  { label: "LinkedIn", href: "#", icon: Link2 },
  { label: "Contact", href: "mailto:hello@example.com", icon: Mail },
];

export function Footer() {
  return (
    <footer className="section-wrap mb-10">
      <div className="glass-card px-6 py-6">
        <div className="grid gap-5 text-center md:grid-cols-1 md:items-center">
          <div className="mx-auto max-w-xl">
            <p className="text-[0.98rem] font-semibold text-white">HobbyPulse AI</p>
          </div>

          <div className="h-px bg-white/15" />

          <div className="flex flex-wrap items-center justify-center gap-2">
            {links.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                className="inline-flex items-center gap-1 rounded-lg border border-white/20 px-3 py-2 text-[0.78rem] text-slate-200 transition hover:bg-white/10"
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
