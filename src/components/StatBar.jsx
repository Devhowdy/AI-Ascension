function StatBar({ label, value, tone = 'cyan' }) {
  const toneClass =
    tone === 'amber'
      ? 'from-amber-300 via-orange-400 to-red-400'
      : 'from-cyan-300 via-sky-400 to-teal-300';

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm uppercase tracking-[0.28em] text-slate-300">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${toneClass}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

export default StatBar;
