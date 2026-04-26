function BattleLog({ entries }) {
  return (
    <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-black/35 p-5 backdrop-blur-md">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-display text-lg uppercase tracking-[0.32em] text-white/90">
          Battle Log
        </h3>
        <span className="text-xs uppercase tracking-[0.3em] text-cyan-200/75">
          Live Feed
        </span>
      </div>
      <div className="space-y-3">
        {entries.map((entry, index) => (
          <div
            key={`${entry}-${index}`}
            className="rounded-2xl border border-white/6 bg-white/[0.03] px-4 py-3 text-sm text-slate-200/90"
          >
            {entry}
          </div>
        ))}
      </div>
    </div>
  );
}

export default BattleLog;
