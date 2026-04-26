import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ArenaEffects from '../components/ArenaEffects';
import { characters } from '../data/characters';

const previewNames = characters.map((character) => character.name).join(' / ');
const arenaBackground = `${import.meta.env.BASE_URL}arena-bg.svg`;

function Home() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-abyss">
      <div className="absolute inset-0">
        <img
          src={arenaBackground}
          alt=""
          className="h-full w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(106,230,255,0.16),transparent_30%),linear-gradient(180deg,rgba(6,8,22,0.18),rgba(6,8,22,0.96))]" />
      </div>

      <ArenaEffects />

      <section className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-6 pb-10 pt-8 sm:px-8 lg:px-12">
        <header className="flex items-center justify-between py-4">
          <div>
            <p className="font-display text-lg uppercase tracking-[0.45em] text-cyan-200/80">
              AI Battle Arena
            </p>
            <p className="mt-2 text-sm uppercase tracking-[0.3em] text-slate-300/75">
              Cinematic Frontend Sprint
            </p>
          </div>
          <Link
            to="/select"
            className="rounded-full border border-cyan-300/35 bg-cyan-300/10 px-5 py-3 text-sm uppercase tracking-[0.3em] text-cyan-100 transition hover:bg-cyan-300/20"
          >
            Enter Arena
          </Link>
        </header>

        <div className="grid flex-1 items-end gap-10 py-10 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="max-w-3xl"
          >
            <p className="text-sm uppercase tracking-[0.45em] text-cyan-200/75">
              Stormfront Protocol Online
            </p>
            <h1 className="mt-6 font-display text-5xl uppercase leading-[0.92] text-white sm:text-6xl lg:text-8xl">
              AI Battle Arena
            </h1>
            <p className="mt-6 max-w-xl text-xl leading-8 text-slate-200/88 sm:text-2xl">
              Original metallic warriors descend into a ruined-city coliseum lit by
              plasma storms, ember fallout, and live combat telemetry.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/select"
                className="rounded-full bg-white px-7 py-4 font-display text-sm uppercase tracking-[0.32em] text-slate-950 transition hover:scale-[1.02]"
              >
                Enter Arena
              </Link>
              <Link
                to="/arena"
                className="rounded-full border border-white/20 px-7 py-4 font-display text-sm uppercase tracking-[0.32em] text-white transition hover:border-cyan-200/60 hover:bg-white/5"
              >
                View Battle Deck
              </Link>
            </div>
            <div className="mt-10 text-sm uppercase tracking-[0.32em] text-slate-300/70">
              Deploying original combatants: {previewNames}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease: 'easeOut' }}
            className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1"
          >
            {characters.map((character, index) => (
              <div
                key={character.id}
                className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-md"
              >
                <div
                  className="absolute inset-x-0 top-0 h-24 opacity-70"
                  style={{
                    background: `radial-gradient(circle at top, ${character.aura}, transparent 72%)`,
                  }}
                />
                <div className="relative flex items-center gap-4">
                  <div
                    className={`h-20 w-14 rounded-full bg-gradient-to-b ${character.accent}`}
                  />
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
                      Unit {index + 1}
                    </p>
                    <p className="mt-2 font-display text-lg uppercase tracking-[0.16em] text-white">
                      {character.name}
                    </p>
                    <p className="mt-2 text-sm text-slate-300/80">
                      {character.title}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="grid gap-4 border-t border-white/10 py-6 text-sm uppercase tracking-[0.28em] text-slate-300/78 sm:grid-cols-3">
          <div>Ruined city backdrop</div>
          <div>Metallic AI warrior silhouettes</div>
          <div>Glowing arena energy core</div>
        </div>
      </section>
    </main>
  );
}

export default Home;
