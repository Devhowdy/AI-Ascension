import { motion } from "framer-motion";

function CharacterCard({
  character,
  selected,
  disabled,
  roleLabel,
  onClick,
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? undefined : { y: -6, scale: 1.01 }}
      whileTap={disabled ? undefined : { scale: 0.99 }}
      className={`group relative overflow-hidden rounded-2xl border px-5 pb-5 pt-4 text-left transition duration-300 ${
        selected
          ? "border-white/40 bg-white/10 shadow-arena"
          : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/8"
      } ${disabled ? "cursor-not-allowed opacity-45" : ""}`}
    >
      <div
        className={`absolute inset-x-6 top-4 h-40 rounded-[1.5rem] bg-gradient-to-br ${character.portraitClass} opacity-80 blur-[2px]`}
      />
      <div className="relative">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs uppercase tracking-[0.35em] text-white/50">
            {roleLabel}
          </span>
          <span
            className="rounded-full border border-white/15 px-3 py-1 text-xs uppercase tracking-[0.3em] text-white/70"
            style={{ boxShadow: `0 0 24px ${character.glow}` }}
          >
            {character.title}
          </span>
        </div>
        <div className="relative mb-5 h-44 overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-950/60">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_40%),linear-gradient(180deg,rgba(255,255,255,0.05),transparent_50%)]" />
          <div
            className={`absolute inset-0 bg-gradient-to-b ${character.portraitClass} opacity-60`}
          />
          <div className="character-silhouette absolute inset-x-[20%] bottom-0 h-[84%]" />
          <div className="absolute inset-x-8 bottom-3 h-4 rounded-full bg-white/20 blur-xl" />
        </div>
        <h3 className="font-display text-2xl uppercase tracking-[0.18em] text-white">
          {character.name}
        </h3>
        <p className="mt-2 text-base leading-6 text-white/70">
          {character.tagline}
        </p>
        <div className="mt-5 grid grid-cols-3 gap-3 text-center">
          {Object.entries(character.coreStats).map(([label, value]) => (
            <div
              key={label}
              className="rounded-xl border border-white/10 bg-black/25 px-2 py-3"
            >
              <div className="text-xs uppercase tracking-[0.24em] text-white/45">
                {label}
              </div>
              <div className="mt-2 font-display text-xl text-white">{value}</div>
            </div>
          ))}
        </div>
      </div>
    </motion.button>
  );
}

export default CharacterCard;
