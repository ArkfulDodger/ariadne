import Home from './Home';
import Game from './Game/Game';
import Memories from './Memories/Memories';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';


function App() {
  const [isCurGame, setIsCurGame] = useState(false)


  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home isCurGame={isCurGame}/>}/>
        <Route path="/play" element={<Game />}/>
        <Route path="/memories" element={<Memories isCurGame={isCurGame} />}/>
        <Route path="*" element={<Home isCurGame={isCurGame} />} />
      </Routes>
      
    </div>
  );
}

export default App;
