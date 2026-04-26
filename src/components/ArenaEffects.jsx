import { motion } from "framer-motion";

function ArenaEffects({ player, opponent, round, winner }) {
  return (
    <div className="relative min-h-[420px] overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(120,243,255,0.16),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.05),rgba(0,0,0,0.14)_40%,rgba(0,0,0,0.6)_100%)] shadow-arena">
      <div className="absolute inset-0 bg-grid-fade bg-[size:46px_46px] opacity-25 [mask-image:linear-gradient(to_bottom,rgba(255,255,255,0.5),transparent_85%)]" />
      <motion.div
        className="absolute inset-x-[-12%] bottom-[-15%] h-56 rounded-full border border-cyan-300/20"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-x-[10%] bottom-10 h-14 rounded-full border border-white/10 bg-cyan-300/10 blur-md"
        animate={{ opacity: [0.35, 0.6, 0.35], scale: [0.98, 1.03, 0.98] }}
        transition={{ repeat: Infinity, duration: 3.4, ease: "easeInOut" }}
      />
      <div className="absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.22),transparent_55%)]" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.72))]" />

      <motion.div
        className="absolute left-[12%] bottom-16 h-56 w-32 rounded-t-[48px] rounded-b-[24px] bg-gradient-to-b from-white/70 to-white/5"
        style={{ boxShadow: `0 0 48px ${player.glow}` }}
        animate={{
          y: winner === "player" ? [0, -10, 0] : [0, -4, 0],
          rotate: winner === "opponent" ? [-1, 0, -1] : [0, 1.5, 0],
        }}
        transition={{ repeat: Infinity, duration: 2.6, ease: "easeInOut" }}
      >
        <div
          className="absolute inset-x-6 top-6 h-10 rounded-full"
          style={{ background: player.accent }}
        />
        <div className="absolute inset-x-8 top-20 h-20 rounded-[28px] border border-white/10 bg-black/25" />
      </motion.div>

      <motion.div
        className="absolute right-[12%] bottom-16 h-56 w-32 rounded-t-[48px] rounded-b-[24px] bg-gradient-to-b from-white/70 to-white/5"
        style={{ boxShadow: `0 0 48px ${opponent.glow}` }}
        animate={{
          y: winner === "opponent" ? [0, -10, 0] : [0, -4, 0],
          rotate: winner === "player" ? [1, 0, 1] : [0, -1.5, 0],
        }}
        transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
      >
        <div
          className="absolute inset-x-6 top-6 h-10 rounded-full"
          style={{ background: opponent.accent }}
        />
        <div className="absolute inset-x-8 top-20 h-20 rounded-[28px] border border-white/10 bg-black/25" />
      </motion.div>

      <div className="absolute left-6 top-6 rounded-full border border-white/10 bg-black/30 px-4 py-2 text-xs uppercase tracking-[0.35em] text-white/60">
        Round {round}
      </div>
      <div className="absolute right-6 top-6 rounded-full border border-white/10 bg-black/30 px-4 py-2 text-xs uppercase tracking-[0.35em] text-white/60">
        {winner ? "Match Complete" : "Combat Active"}
      </div>
      <div className="absolute inset-x-0 bottom-5 text-center">
        <div className="font-display text-[clamp(1.5rem,4vw,2.8rem)] uppercase tracking-[0.35em] text-white/80">
          Null City Arena
        </div>
      </div>
    </div>
  );
}

export default ArenaEffects;
