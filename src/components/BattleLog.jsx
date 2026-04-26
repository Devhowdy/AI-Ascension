function BattleLog({ entries }) {
  const toneClasses = {
    system: "border-white/10 text-white/60",
    player: "border-cyan-300/25 text-cyan-100",
    opponent: "border-orange-300/25 text-orange-100",
    neutral: "border-white/10 text-white/75",
  };

  return (
    <div className="rounded-[1.75rem] border border-white/10 bg-black/30 p-5 shadow-arena">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-xl uppercase tracking-[0.2em] text-white">
          Battle Log
        </h3>
        <span className="text-xs uppercase tracking-[0.3em] text-white/45">
          Live Feed
        </span>
      </div>
      <div className="mt-4 space-y-3">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className={`rounded-2xl border px-4 py-3 text-sm leading-6 ${
              toneClasses[entry.tone] ?? toneClasses.neutral
            }`}
          >
            {entry.text}
          </div>
        ))}
      </div>
    </div>
  );
}

export default BattleLog;
