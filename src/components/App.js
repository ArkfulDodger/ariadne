import Home from './Home';
import Game from './Game/Game';
import Memories from './Memories/Memories';
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';


function App() {
  // whether there is a game currently in progress
  // TODO: pass set method to component(s) which start or stop the current game
  const [isCurGame, setIsCurGame] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/loadStatus/1')
    .then(resp => resp.json())
    .then(data => {
      setIsCurGame(data.isCurGame)
    })
  }, [])

  function updateIsCurGameInDb(isGameBool){
    fetch(`http://localhost:3001/loadStatus/1`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            isCurGame: isGameBool
        })
    })
    .then( res => res.json())
    .then( data => console.log("patched iscurgame", data))
    .catch( error => console.log(error.message));
  }


  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home isCurGame={isCurGame} updateIsCurGameInDb={updateIsCurGameInDb} />}/>
        <Route path="/play" element={<Game isCurGame={isCurGame} updateIsCurGameInDb={updateIsCurGameInDb} />}/>
        <Route path="/memories" element={<Memories isCurGame={isCurGame} />}/>
        <Route path="*" element={<Home isCurGame={isCurGame} />} />
      </Routes>
      
    </div>
  );
}

export default App;
