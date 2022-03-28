import Home from './Home';
import Game from './Game';
import Memories from './Memories';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/play" element={<Game />}/>
        <Route path="/memories" element={<Memories />}/>
      </Routes>
      
    </div>
  );
}

export default App;
