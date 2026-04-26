import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ArenaEffects from '../components/ArenaEffects';
import BattleLog from '../components/BattleLog';
import CharacterCard from '../components/CharacterCard';
import HealthBar from '../components/HealthBar';
import { characters } from '../data/characters';

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const arenaBackground = `${import.meta.env.BASE_URL}arena-bg.svg`;
const getCharacterById = (id) =>
  characters.find((character) => character.id === id) ?? characters[0];
const getSignature = (character) =>
  character.signature ?? `${character.name} Overdrive`;

const defaultEntries = [
  'Arena uplink established. Crowd noise rolling through the ruined skyline.',
  'Combat cores aligned. Both units are waiting for the opening move.',
];

function BattleArena() {
  const [playerId, setPlayerId] = useState('grok-titan');
  const [opponentId, setOpponentId] = useState('claude-wraith');
  const [playerHealth, setPlayerHealth] = useState(100);
  const [opponentHealth, setOpponentHealth] = useState(100);
  const [playerEnergy, setPlayerEnergy] = useState(68);
  const [opponentEnergy, setOpponentEnergy] = useState(68);
  const [guarding, setGuarding] = useState(false);
  const [logs, setLogs] = useState(defaultEntries);

  useEffect(() => {
    const storedPlayer = localStorage.getItem('ai-battle-arena-player');
    const storedOpponent = localStorage.getItem('ai-battle-arena-opponent');

    if (storedPlayer) {
      setPlayerId(storedPlayer);
    }

    if (storedOpponent && storedOpponent !== storedPlayer) {
      setOpponentId(storedOpponent);
      return;
    }

    const fallbackOpponent = characters.find((character) => character.id !== storedPlayer);
    if (fallbackOpponent) {
      setOpponentId(fallbackOpponent.id);
    }
  }, []);

  const player = useMemo(() => getCharacterById(playerId), [playerId]);
  const opponent = useMemo(() => getCharacterById(opponentId), [opponentId]);

  const pushLog = (entry) => {
    setLogs((current) => [entry, ...current].slice(0, 6));
  };

  const enemyResponse = (mode, playerIsGuarding = false) => {
    const responseDamage = randomInt(8, 16);
    const reducedDamage = playerIsGuarding
      ? Math.max(5, responseDamage - 7)
      : responseDamage;
    const energyShift = mode === 'special' ? 10 : 6;

    setPlayerHealth((current) => Math.max(0, current - reducedDamage));
    setOpponentEnergy((current) => Math.min(100, current + energyShift));
    setGuarding(false);
    pushLog(`${opponent.name} retaliates for ${reducedDamage} damage.`);
  };

  const handleAttack = () => {
    const damage = randomInt(12, 20);
    const nextHealth = Math.max(0, opponentHealth - damage);
    setOpponentHealth(nextHealth);
    setPlayerEnergy((current) => Math.min(100, current + 10));
    pushLog(`${player.name} lands a direct strike for ${damage} damage.`);
    if (nextHealth > 0) {
      enemyResponse('attack');
    }
  };

  const handleDefend = () => {
    setGuarding(true);
    setPlayerEnergy((current) => Math.min(100, current + 14));
    pushLog(`${player.name} raises a defensive lattice and absorbs the next hit.`);
    enemyResponse('defend', true);
  };

  const handleSpecial = () => {
    if (playerEnergy < 35) {
      pushLog(`${player.name} needs more charge before using ${getSignature(player)}.`);
      return;
    }

    const damage = randomInt(20, 30);
    const nextHealth = Math.max(0, opponentHealth - damage);
    setOpponentHealth(nextHealth);
    setPlayerEnergy((current) => Math.max(0, current - 35));
    pushLog(`${player.name} triggers ${getSignature(player)} for ${damage} damage.`);
    if (nextHealth > 0) {
      enemyResponse('special');
    }
  };

  const handleReset = () => {
    setPlayerHealth(100);
    setOpponentHealth(100);
    setPlayerEnergy(68);
    setOpponentEnergy(68);
    setGuarding(false);
    setLogs([...defaultEntries]);
  };

  const winner =
    playerHealth === 0 ? opponent.name : opponentHealth === 0 ? player.name : null;

  return (
    <main className="relative min-h-screen overflow-hidden bg-abyss">
      <div className="absolute inset-0">
        <img
          src={arenaBackground}
          alt=""
          className="h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,8,19,0.72),rgba(4,8,19,0.96))]" />
      </div>
      <ArenaEffects />

      <section className="relative mx-auto max-w-7xl px-6 py-8 sm:px-8 lg:px-12">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.42em] text-cyan-200/75">
              Battle Arena
            </p>
            <h1 className="mt-4 font-display text-4xl uppercase tracking-[0.12em] text-white sm:text-5xl">
              Live AI Versus AI Combat
            </h1>
          </div>
          <div className="flex gap-3">
            <Link
              to="/select"
              className="rounded-full border border-white/15 px-5 py-3 text-sm uppercase tracking-[0.28em] text-white transition hover:border-cyan-200/60 hover:bg-white/5"
            >
              Change Matchup
            </Link>
            <Link
              to="/"
              className="rounded-full border border-cyan-300/35 bg-cyan-300/10 px-5 py-3 text-sm uppercase tracking-[0.28em] text-cyan-100 transition hover:bg-cyan-300/20"
            >
              Home
            </Link>
          </div>
        </header>

        <div className="mt-10 grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-6">
            <div className="grid gap-5 lg:grid-cols-2">
              <CharacterCard character={player} selected compact mode="battle" />
              <CharacterCard character={opponent} selected compact mode="battle" />
            </div>

            <div className="rounded-[32px] border border-white/10 bg-black/30 p-6 backdrop-blur-md">
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="space-y-4">
                  <h2 className="font-display text-xl uppercase tracking-[0.18em] text-white">
                    {player.name}
                  </h2>
                  <HealthBar label="Health" value={playerHealth} />
                  <HealthBar label="Energy" value={playerEnergy} tone="amber" />
                </div>
                <div className="space-y-4">
                  <h2 className="font-display text-xl uppercase tracking-[0.18em] text-white">
                    {opponent.name}
                  </h2>
                  <HealthBar label="Health" value={opponentHealth} tone="amber" />
                  <HealthBar label="Energy" value={opponentEnergy} />
                </div>
              </div>

              <motion.div
                initial={false}
                animate={{
                  boxShadow: winner
                    ? '0 0 65px rgba(255, 255, 255, 0.22)'
                    : '0 0 50px rgba(106, 230, 255, 0.16)',
                }}
                className="mt-8 overflow-hidden rounded-[30px] border border-white/10 bg-arenaGrid bg-[length:100%_100%,26px_26px,26px_26px] px-6 py-10"
              >
                <div className="grid gap-8 text-center lg:grid-cols-3 lg:items-center">
                  <div className="space-y-3">
                    <p className="text-xs uppercase tracking-[0.36em] text-slate-400">
                      Player Core
                    </p>
                    <div className="mx-auto h-28 w-20 rounded-full bg-gradient-to-b from-cyan-300 via-sky-400 to-slate-200 shadow-glow" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.42em] text-cyan-200/75">
                      Combat Status
                    </p>
                    <h3 className="mt-4 font-display text-3xl uppercase tracking-[0.18em] text-white sm:text-4xl">
                      {winner ? `${winner} Wins` : guarding ? 'Defense Matrix Up' : 'Arena Hot'}
                    </h3>
                    <p className="mt-4 text-slate-300/85">
                      {winner
                        ? 'Reset the battle or choose a new matchup to run the next simulation.'
                        : 'Use attack, defend, or a charged special move to control the tempo.'}
                    </p>
                  </div>
                  <div className="space-y-3">
                    <p className="text-xs uppercase tracking-[0.36em] text-slate-400">
                      Rival Core
                    </p>
                    <div className="mx-auto h-28 w-20 rounded-full bg-gradient-to-b from-amber-300 via-orange-400 to-red-300 shadow-ember" />
                  </div>
                </div>
              </motion.div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                <button
                  type="button"
                  onClick={handleAttack}
                  disabled={Boolean(winner)}
                  className="rounded-full bg-white px-4 py-4 font-display text-sm uppercase tracking-[0.28em] text-slate-950 transition enabled:hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Attack
                </button>
                <button
                  type="button"
                  onClick={handleDefend}
                  disabled={Boolean(winner)}
                  className="rounded-full border border-white/20 px-4 py-4 font-display text-sm uppercase tracking-[0.28em] text-white transition enabled:hover:border-cyan-200/60 enabled:hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Defend
                </button>
                <button
                  type="button"
                  onClick={handleSpecial}
                  disabled={Boolean(winner)}
                  className="rounded-full border border-orange-300/35 bg-orange-300/10 px-4 py-4 font-display text-sm uppercase tracking-[0.28em] text-orange-100 transition enabled:hover:bg-orange-300/20 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Special Move
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="rounded-full border border-white/20 px-4 py-4 font-display text-sm uppercase tracking-[0.28em] text-white transition hover:border-white/40 hover:bg-white/5"
                >
                  Reset Battle
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <BattleLog entries={logs} />

            <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md">
              <p className="text-xs uppercase tracking-[0.4em] text-cyan-200/72">
                Signature Systems
              </p>
              <div className="mt-5 space-y-4">
                <div className="rounded-2xl border border-white/8 bg-black/20 p-4">
                  <h3 className="font-display text-lg uppercase tracking-[0.16em]">
                    {getSignature(player)}
                  </h3>
                  <p className="mt-2 text-sm text-slate-300/85">
                    Requires 35 energy. High-damage burst tuned to the selected combatant.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/8 bg-black/20 p-4">
                  <h3 className="font-display text-lg uppercase tracking-[0.16em]">
                    {getSignature(opponent)}
                  </h3>
                  <p className="mt-2 text-sm text-slate-300/85">
                    The rival uses the same core rules, keeping the duel readable and fast.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default BattleArena;
