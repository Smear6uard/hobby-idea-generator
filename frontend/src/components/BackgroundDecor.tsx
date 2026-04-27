export function BackgroundDecor() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute left-[-6rem] top-16 h-64 w-64 animate-float rounded-full bg-violet-500/20 blur-3xl" />
      <div className="absolute right-[-5rem] top-36 h-72 w-72 animate-float rounded-full bg-cyan-500/20 blur-3xl [animation-delay:1.2s]" />
      <div className="absolute bottom-[-8rem] left-1/3 h-72 w-72 animate-float rounded-full bg-blue-600/20 blur-3xl [animation-delay:2.4s]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:28px_28px]" />
    </div>
  );
}
