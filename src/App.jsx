import { useMemo, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { characters } from "./data/characters";
import { createBattleState } from "./utils/battle";
import Home from "./pages/Home";
import CharacterSelect from "./pages/CharacterSelect";
import BattleArena from "./pages/BattleArena";

const defaultPlayer = characters[0];
const defaultOpponent = characters[1];

function App() {
  const [selection, setSelection] = useState({
    playerId: defaultPlayer.id,
    opponentId: defaultOpponent.id,
  });
  const [battleState, setBattleState] = useState(() =>
    createBattleState(defaultPlayer, defaultOpponent),
  );

  const player = useMemo(
    () => characters.find((fighter) => fighter.id === selection.playerId) ?? defaultPlayer,
    [selection.playerId],
  );
  const opponent = useMemo(
    () =>
      characters.find((fighter) => fighter.id === selection.opponentId) ??
      defaultOpponent,
    [selection.opponentId],
  );

  const updateSelection = (nextSelection) => {
    setSelection(nextSelection);
    const nextPlayer =
      characters.find((fighter) => fighter.id === nextSelection.playerId) ??
      defaultPlayer;
    const nextOpponent =
      characters.find((fighter) => fighter.id === nextSelection.opponentId) ??
      defaultOpponent;
    setBattleState(createBattleState(nextPlayer, nextOpponent));
  };

  const resetBattle = () => {
    setBattleState(createBattleState(player, opponent));
  };

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/select"
        element={
          <CharacterSelect
            characters={characters}
            selection={selection}
            onSelectionChange={updateSelection}
          />
        }
      />
      <Route
        path="/arena"
        element={
          <BattleArena
            player={player}
            opponent={opponent}
            battleState={battleState}
            setBattleState={setBattleState}
            resetBattle={resetBattle}
          />
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
