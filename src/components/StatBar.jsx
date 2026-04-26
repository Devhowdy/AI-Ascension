function StatBar({ label, value, max, colorClass, valueLabel }) {
  const width = `${Math.max(0, Math.min(100, (value / max) * 100))}%`;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.28em] text-white/55">
        <span>{label}</span>
        <span>{valueLabel ?? `${Math.round(value)}/${max}`}</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-white/8">
        <div
          className={`h-full rounded-full ${colorClass} transition-[width] duration-500`}
          style={{ width }}
        />
      </div>
    </div>
  );
}

export default StatBar;
