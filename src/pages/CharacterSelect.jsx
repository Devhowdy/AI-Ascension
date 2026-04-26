import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CharacterCard from '../components/CharacterCard';
import { characters, getCharacterById } from '../data/characters';

function CharacterSelect() {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState('grok-titan');
  const [opponentId, setOpponentId] = useState('claude-wraith');

  const selectedCharacter = useMemo(() => getCharacterById(selectedId), [selectedId]);
  const rivalOptions = characters.filter((character) => character.id !== selectedId);
  const opponent = getCharacterById(
    rivalOptions.some((character) => character.id === opponentId)
      ? opponentId
      : rivalOptions[0].id,
  );

  const handlePlayerSelect = (nextId) => {
    setSelectedId(nextId);
    if (nextId === opponentId) {
      const fallback = characters.find((character) => character.id !== nextId);
      if (fallback) {
        setOpponentId(fallback.id);
      }
    }
  };

  const handleLaunch = () => {
    localStorage.setItem('ai-battle-arena-player', selectedCharacter.id);
    localStorage.setItem('ai-battle-arena-opponent', opponent.id);
    navigate('/arena');
  };

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#050714_0%,#08101f_55%,#050714_100%)] px-6 py-8 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.42em] text-cyan-200/75">
              Character Select
            </p>
            <h1 className="mt-4 font-display text-4xl uppercase tracking-[0.12em] sm:text-5xl">
              Choose the Arena Pairing
            </h1>
          </div>
          <Link
            to="/"
            className="rounded-full border border-white/15 px-5 py-3 text-sm uppercase tracking-[0.3em] text-slate-200 transition hover:border-cyan-200/60 hover:bg-white/5"
          >
            Return Home
          </Link>
        </div>

        <section className="mt-10 grid gap-10 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
                Select your primary warrior
              </p>
              <div className="mt-5 grid gap-5 xl:grid-cols-3">
                {characters.map((character) => (
                  <CharacterCard
                    key={character.id}
                    character={character}
                    selected={character.id === selectedId}
                    onSelect={handlePlayerSelect}
                  />
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
                Assign an opponent
              </p>
              <div className="mt-5 grid gap-5 md:grid-cols-2">
                {rivalOptions.map((character) => (
                  <CharacterCard
                    key={character.id}
                    character={character}
                    selected={character.id === opponent.id}
                    onSelect={setOpponentId}
                    compact
                  />
                ))}
              </div>
            </div>
          </div>

          <motion.aside
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="h-fit rounded-[32px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md"
          >
            <p className="text-xs uppercase tracking-[0.4em] text-cyan-200/70">
              Match Preview
            </p>
            <div className="mt-6 space-y-5">
              <div className="rounded-[28px] border border-cyan-300/18 bg-cyan-300/8 p-5">
                <p className="text-xs uppercase tracking-[0.35em] text-cyan-100/70">
                  Player Unit
                </p>
                <h2 className="mt-3 font-display text-2xl uppercase tracking-[0.12em]">
                  {selectedCharacter.name}
                </h2>
                <p className="mt-3 text-slate-200/80">{selectedCharacter.description}</p>
              </div>

              <div className="rounded-[28px] border border-orange-300/18 bg-orange-300/8 p-5">
                <p className="text-xs uppercase tracking-[0.35em] text-orange-100/70">
                  Rival Unit
                </p>
                <h2 className="mt-3 font-display text-2xl uppercase tracking-[0.12em]">
                  {opponent.name}
                </h2>
                <p className="mt-3 text-slate-200/80">{opponent.description}</p>
              </div>

              <div className="rounded-[28px] border border-white/10 bg-black/25 p-5">
                <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
                  Arena Conditions
                </p>
                <ul className="mt-4 space-y-3 text-sm uppercase tracking-[0.28em] text-slate-200/80">
                  <li>Storm field active</li>
                  <li>Glowing center ring charged</li>
                  <li>Ruined skyline visibility low</li>
                </ul>
              </div>

              <button
                type="button"
                onClick={handleLaunch}
                className="w-full rounded-full bg-white px-6 py-4 font-display text-sm uppercase tracking-[0.32em] text-slate-950 transition hover:scale-[1.01]"
              >
                Launch Battle
              </button>
            </div>
          </motion.aside>
        </section>
      </div>
    </main>
  );
}

export default CharacterSelect;
