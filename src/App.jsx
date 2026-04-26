import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CharacterSelect from './pages/CharacterSelect';
import BattleArena from './pages/BattleArena';

function App() {
  return (
    <div className="min-h-screen bg-abyss text-white">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/select" element={<CharacterSelect />} />
        <Route path="/arena" element={<BattleArena />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
