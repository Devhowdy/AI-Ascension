import { motion } from 'framer-motion';
import StatBar from './StatBar';

function CharacterCard({
  character,
  selected,
  onSelect,
  mode = 'select',
  compact = false,
}) {
  return (
    <motion.button
      type="button"
      whileHover={{ y: -6, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      disabled={!onSelect}
      onClick={() => onSelect?.(character.id)}
      className={`group relative overflow-hidden rounded-[30px] border p-6 text-left transition ${
        selected
          ? 'border-cyan-300/70 bg-white/10 shadow-glow'
          : 'border-white/10 bg-white/[0.04]'
      } ${onSelect ? '' : 'cursor-default'}`}
    >
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background: `radial-gradient(circle at top, ${character.aura}, transparent 58%)`,
        }}
      />
      <div className="relative space-y-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-cyan-200/70">
              {mode === 'select' ? 'Arena Candidate' : 'Combatant'}
            </p>
            <h3 className="mt-3 font-display text-2xl uppercase tracking-[0.12em] text-white">
              {character.name}
            </h3>
            <p className="mt-2 text-sm uppercase tracking-[0.28em] text-slate-400">
              {character.title}
            </p>
          </div>
          <div
            className={`h-20 w-16 rounded-full bg-gradient-to-b ${character.accent} opacity-90 blur-[1px]`}
          />
        </div>

        <p className="max-w-sm text-base leading-6 text-slate-200/88">
          {character.description}
        </p>

        {!compact && (
          <div className="space-y-3">
            <StatBar label="Power" value={character.stats.power} />
            <StatBar label="Defense" value={character.stats.defense} tone="amber" />
            <StatBar label="Speed" value={character.stats.speed} />
            <StatBar label="Focus" value={character.stats.focus} tone="amber" />
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {character.loadout.map((item) => (
            <span
              key={item}
              className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.25em] text-slate-300"
            >
              {item}
            </span>
          ))}
        </div>

        {selected && (
          <div className="text-xs uppercase tracking-[0.4em] text-cyan-200">
            Locked In
          </div>
        )}
      </div>
    </motion.button>
  );
}

export default CharacterCard;
