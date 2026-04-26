import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ArenaEffects from "../components/ArenaEffects";
import BattleLog from "../components/BattleLog";
import HealthBar from "../components/HealthBar";
import { runTurn } from "../utils/battle";

function BattleArena({
  player,
  opponent,
  battleState,
  setBattleState,
  resetBattle,
}) {
  const actions = [
    {
      label: "Attack",
      helper: "Steady damage and energy gain",
      onClick: () => setBattleState((current) => runTurn(current, "attack")),
      accent: "from-orange-400/40 to-red-500/20",
      disabled: !!battleState.winner,
    },
    {
      label: "Defend",
      helper: "Raise shield and recharge",
      onClick: () => setBattleState((current) => runTurn(current, "defend")),
      accent: "from-slate-300/20 to-cyan-300/20",
      disabled: !!battleState.winner,
    },
    {
      label: "Special Move",
      helper: "Costs 40 energy for a burst strike",
      onClick: () => setBattleState((current) => runTurn(current, "special")),
      accent: "from-cyan-300/40 to-yellow-200/20",
      disabled: battleState.player.energy < 40 || !!battleState.winner,
    },
  ];

  return (
    <main className="arena-shell min-h-screen px-6 py-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 border-b border-white/10 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.45em] text-cyan-100/65">
              Battle Arena
            </p>
            <h1 className="mt-4 font-display text-[clamp(2.6rem,7vw,5.6rem)] uppercase leading-[0.9] tracking-[0.12em] text-white">
              {player.name} vs {opponent.name}
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-7 text-white/68">
              Execute a local-state prototype match with reactive bars, battle
              feed updates, and animated arena energy.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/select"
              className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm uppercase tracking-[0.28em] text-white/70 transition hover:text-white"
            >
              Re-select
            </Link>
            <button
              type="button"
              onClick={resetBattle}
              className="rounded-full border border-white/10 bg-white/5 px-5 py-3 font-display text-sm uppercase tracking-[0.3em] text-white transition hover:border-white/20"
            >
              Reset Battle
            </button>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.15fr_minmax(320px,0.85fr)]">
          <div className="space-y-6">
            <div className="grid gap-4 lg:grid-cols-2">
              <HealthBar fighter={battleState.player} />
              <HealthBar fighter={battleState.opponent} align="right" />
            </div>
            <ArenaEffects
              player={battleState.player}
              opponent={battleState.opponent}
              round={battleState.round}
              winner={battleState.winner}
            />
          </div>

          <div className="space-y-6">
            <div className="rounded-[1.75rem] border border-white/10 bg-black/30 p-5 shadow-arena">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-[0.35em] text-white/45">
                    Command Deck
                  </div>
                  <h2 className="mt-2 font-display text-2xl uppercase tracking-[0.16em] text-white">
                    Choose an action
                  </h2>
                </div>
                <div className="rounded-full border border-white/10 px-3 py-2 text-xs uppercase tracking-[0.3em] text-white/55">
                  Round {battleState.round}
                </div>
              </div>

              <div className="mt-5 grid gap-3">
                {actions.map((action) => (
                  <motion.button
                    key={action.label}
                    type="button"
                    onClick={action.onClick}
                    disabled={action.disabled}
                    whileHover={action.disabled ? undefined : { y: -2 }}
                    whileTap={action.disabled ? undefined : { scale: 0.995 }}
                    className={`overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-r ${action.accent} px-5 py-4 text-left transition ${
                      action.disabled ? "cursor-not-allowed opacity-40" : "hover:border-white/20"
                    }`}
                  >
                    <div className="font-display text-lg uppercase tracking-[0.16em] text-white">
                      {action.label}
                    </div>
                    <div className="mt-1 text-sm text-white/70">{action.helper}</div>
                  </motion.button>
                ))}
              </div>

              <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm leading-6 text-white/68">
                {battleState.winner === "player" &&
                  `${player.name} owns the platform. Reset to run the simulation again or return to selection for a new matchup.`}
                {battleState.winner === "opponent" &&
                  `${opponent.name} takes the win. Reset the arena or swap loadouts for another pass.`}
                {battleState.winner === "draw" &&
                  "Both combatants fell in the same exchange. Reset the arena to rerun the clash."}
                {!battleState.winner &&
                  "Attack builds momentum, defend adds shield, and special moves spend stored energy for burst damage."}
              </div>
            </div>

            <BattleLog entries={battleState.log} />
          </div>
        </div>
      </div>
    </main>
  );
}

export default BattleArena;
