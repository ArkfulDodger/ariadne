import Home from './Home';
import Game from './Game/Game';
import Memories from './Memories/Memories';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';


function App() {
  // whether there is a game currently in progress
  // TODO: pass set method to component(s) which start or stop the current game
  const [isCurGame, setIsCurGame] = useState(false);


  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home isCurGame={isCurGame} setIsCurGame={setIsCurGame} />}/>
        <Route path="/play" element={<Game isCurGame={isCurGame} setIsCurGame={setIsCurGame} />}/>
        <Route path="/memories" element={<Memories isCurGame={isCurGame} />}/>
        <Route path="*" element={<Home isCurGame={isCurGame} />} />
      </Routes>
      
    </div>
  );
}

export default App;
