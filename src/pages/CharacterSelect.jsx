import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import CharacterCard from "../components/CharacterCard";

function CharacterSelect({ characters, selection, onSelectionChange }) {
  const navigate = useNavigate();

  const handlePlayerSelect = (playerId) => {
    const opponentId =
      selection.opponentId === playerId
        ? characters.find((fighter) => fighter.id !== playerId)?.id ?? playerId
        : selection.opponentId;

    onSelectionChange({ playerId, opponentId });
  };

  const handleOpponentSelect = (opponentId) => {
    const playerId =
      selection.playerId === opponentId
        ? characters.find((fighter) => fighter.id !== opponentId)?.id ?? opponentId
        : selection.playerId;

    onSelectionChange({ playerId, opponentId });
  };

  return (
    <main className="arena-shell min-h-screen px-6 py-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 border-b border-white/10 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.45em] text-cyan-100/65">
              Loadout Selection
            </p>
            <h1 className="mt-4 font-display text-[clamp(2.6rem,7vw,5.6rem)] uppercase leading-[0.9] tracking-[0.12em] text-white">
              Choose the duel
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-7 text-white/68">
              Lock in a player champion and a rival combat shell before entering
              the arena.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/"
              className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm uppercase tracking-[0.28em] text-white/70 transition hover:text-white"
            >
              Home
            </Link>
            <button
              type="button"
              onClick={() => navigate("/arena")}
              className="rounded-full border border-cyan-200/30 bg-cyan-200/12 px-5 py-3 font-display text-sm uppercase tracking-[0.3em] text-white transition hover:border-cyan-100/55 hover:bg-cyan-200/18"
            >
              Launch Battle
            </button>
          </div>
        </div>

        <div className="mt-10 grid gap-12">
          <section>
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-white/45">
                  Player Unit
                </p>
                <h2 className="mt-2 font-display text-2xl uppercase tracking-[0.16em] text-white">
                  Select your warrior
                </h2>
              </div>
            </div>
            <div className="grid gap-5 lg:grid-cols-3">
              {characters.map((character, index) => (
                <motion.div
                  key={character.id}
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: index * 0.08 }}
                >
                  <CharacterCard
                    character={character}
                    selected={selection.playerId === character.id}
                    disabled={selection.opponentId === character.id}
                    roleLabel="Pilot"
                    onClick={() => handlePlayerSelect(character.id)}
                  />
                </motion.div>
              ))}
            </div>
          </section>

          <section>
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-white/45">
                  Rival Unit
                </p>
                <h2 className="mt-2 font-display text-2xl uppercase tracking-[0.16em] text-white">
                  Select the opponent
                </h2>
              </div>
            </div>
            <div className="grid gap-5 lg:grid-cols-3">
              {characters.map((character, index) => (
                <motion.div
                  key={character.id}
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: index * 0.08 + 0.12 }}
                >
                  <CharacterCard
                    character={character}
                    selected={selection.opponentId === character.id}
                    disabled={selection.playerId === character.id}
                    roleLabel="Rival"
                    onClick={() => handleOpponentSelect(character.id)}
                  />
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default CharacterSelect;
