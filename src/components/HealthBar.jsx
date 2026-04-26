import StatBar from "./StatBar";

function HealthBar({ fighter, align = "left" }) {
  return (
    <div className={`space-y-4 rounded-2xl border border-white/10 bg-black/25 p-5 ${align === "right" ? "text-right" : ""}`}>
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-[0.35em] text-white/45">
            Combatant
          </div>
          <div className="mt-2 font-display text-2xl uppercase tracking-[0.16em] text-white">
            {fighter.name}
          </div>
        </div>
        <div
          className="h-14 w-14 rounded-full border border-white/15"
          style={{
            background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.65), ${fighter.accent})`,
            boxShadow: `0 0 30px ${fighter.glow}`,
          }}
        />
      </div>
      <StatBar
        label="Health"
        value={fighter.health}
        max={fighter.combat.maxHealth}
        colorClass="bg-gradient-to-r from-red-500 via-orange-400 to-yellow-300"
      />
      <StatBar
        label="Energy"
        value={fighter.energy}
        max={fighter.combat.maxEnergy}
        colorClass="bg-gradient-to-r from-cyan-400 via-sky-300 to-white"
      />
      <div className="flex items-center justify-between text-sm text-white/60">
        <span>Shield {fighter.shield}</span>
        <span>{fighter.defending ? "Defense lattice active" : "Open stance"}</span>
      </div>
    </div>
  );
}

export default HealthBar;
