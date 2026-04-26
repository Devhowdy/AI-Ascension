import { Routes, Route } from "react-router-dom";

function Landing() {
  return (
    <div style={{textAlign:"center",marginTop:"20%"}}>
      <h1>AI Battle Arena</h1>
      <a href="/battle">Launch Battle</a>
    </div>
  );
}

function Battle() {
  return (
    <div style={{textAlign:"center",marginTop:"20%"}}>
      <h1>Battle Arena</h1>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/battle" element={<Battle />} />
    </Routes>
  );
}
