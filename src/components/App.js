import Home from './Home';
import Game from './Game/Game';
import Memories from './Memories/Memories';
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MessagePopup from './Game/MessagePopup';


//#region default and constant values

const defaultGameInfo = {
  curLocation: ["0", ""],
  entryDirection: 'south',
  stringPath: '0',
  minoLocation: '00',
  minoIsEnabled: true,
  itemsArray: [],
  foundTheseus: false,
  playerInfo: {
    hasTheseus: false
  },
  goalPath: "000000",
}

const defaultMap = [
  {
    path: '0',
    type: 'entrance',
    roomVisited: false,
    westPassageType: "",
    eastPassageType: "",
    southPassageType: "exit",
    westPassageVisited: false,
    eastPassageVisited: false,
    southPassageVisited: true,
    onGoalPath: true
  }
]

const defaultGameObject = {
  ...defaultGameInfo,
  map: defaultMap
};

const goalPathLength = 5;

//#endregion


function App() {
  const navigate = useNavigate();

  //#region state declarations & CRUD functions

  // state declarataions
  const [contentLoaded, setContentLoaded] = useState(false);
  const [isMessageUp, setIsMessageUp] = useState(false);
  const [messagePopupContent, setMessagePopupContent] = useState({});

  const [isCurGame, setIsCurGame] = useState(false);
  const [curGameInfo, setcurGameInfo] = useState(defaultGameInfo);
  const [map, setMap] = useState(defaultMap);
  const [curGame, setCurGame] = useState(defaultGameObject);
  const [passages, setPassages] = useState([]);
  const [messages, setMessages] = useState([]);

  const { goalPath } = curGame;
  const passageTypeArray = passages.length > 0 ? passages.map(passObj => passObj['nav-text']) : ["a torchlit path"];

  // fetch initial game data
  useEffect(() => {
  const p0IsCurGame = fetch('http://localhost:3001/loadStatus/1');
  const p1CurGame = fetch(`http://localhost:3001/current-game/1`);
  const p2Passages = fetch('http://localhost:3001/passages');
  const p3Messages = fetch('http://localhost:3001/messages')

  // set all states once data retrieved
  Promise.all([p0IsCurGame, p1CurGame, p2Passages, p3Messages])
    .then(respArr => Promise.all(respArr.map(resp => resp.json())))
    .then(data => {
      console.log(data);
      setIsCurGame(data[0].isCurGame);
      setCurGame(data[1]);
      setcurGameInfo(getGameInfoFromGameObj(data[1]));
      setMap(data[1].map);
      setPassages(data[2]);
      setMessages(data[3]);
      setContentLoaded(true);
    })
    .catch(() => alert('inital game fetch could not complete'))
  }, [])

  // helper to set persistent isCurGame
  function updateIsCurGame(isGameBool) {
    return fetch(`http://localhost:3001/loadStatus/1`, {
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
    .then( data => {
      console.log("set isCurGame to", data.isCurGame)
      setIsCurGame(data.isCurGame)})
    .catch( error => console.log(error.message));
  }

  // helper to set persistent curGameInfo (& update curGame)
  function updateCurGameInfo (updatedCurGameInfo) {
    return fetch(`http://localhost:3001/current-game/1`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(updatedCurGameInfo)
    })
      .then( res => res.json())
      .then( updatedCurGame => {
        console.log('persisted curGameInfo update');
        setCurGame(updatedCurGame);
        setcurGameInfo(getGameInfoFromGameObj(updatedCurGame))
      })
      .catch( error => alert(error.message));
  }

  // helper to update persistent map (& update curGame)
  function updateMap(updatedMapData) {
    return fetch(`http://localhost:3001/current-game/1`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({map: updatedMapData})
    })
      .then( res => res.json())
      .then( updatedCurGame => {
        console.log('persisted map update');
        setCurGame(updatedCurGame)
        setMap(updatedCurGame.map);
      })
      .catch( error => alert(error.message));
  }

  // helper to get gameInfo object when you have a game object
  // ignores id and map
  function getGameInfoFromGameObj(gameObj) {
    const newGameInfoObject = {};
    Object.keys(gameObj).forEach( key => {
      if (key !== 'id' && key !== 'map') {
        newGameInfoObject[key] = gameObj[key];
      }
    })
    return newGameInfoObject;
  }

  //#endregion

  //#region Map Building Helper Functions
  
  function generateGoalPath() {
    let path = "0";
    for (let i = 0; i < goalPathLength; i++) {
        path += Math.round(Math.random());
    }

    console.log('goal path:', path)
    return path;
  }

  function generateMap(goalPath) {

    const newMap = [];
    const usedPassageTypes = [];

    const entranceRoom = {
        path: '0',
        type: 'entrance',
        roomVisited: false,
        westPassageType: getRandomPassageType(),
        eastPassageType: getRandomPassageType(),
        southPassageType: "exit",
        westPassageVisited: false,
        eastPassageVisited: false,
        southPassageVisited: false,
        onGoalPath: true
    }

    newMap.push(entranceRoom);
    addRoomsTo(entranceRoom);
    return newMap;

    function addRoomsTo(fromRoom) {
      if (fromRoom.westPassageType) {
          addNewRoomToMap('0');
      }
      if (fromRoom.eastPassageType) {
          addNewRoomToMap('1');
      }
    
      function addNewRoomToMap(turnNum) {
        const path = fromRoom.path + turnNum;
        let westPassage
        let eastPassage

        let roomType = ''
            if (path===goalPath) {
          roomType = 'theseus'
          westPassage = null
          eastPassage = null
        } else {
          roomType="random" // TODO: set to random chamber type
          westPassage = getPassageType(path, path+'0');
          eastPassage = getPassageType(path, path+'1');
        }

        const newRoom = {
        path: path,
        type: roomType,
        roomVisited: false,
        westPassageType: westPassage,
        eastPassageType: eastPassage,
        southPassageType: turnNum === "0" ? fromRoom.westPassageType : fromRoom.eastPassageType,
        westPassageVisited: false,
        eastPassageVisited: false,
        southPassageVisited: false,
        onGoalPath: isOnGoalPath(path)
        }

        newMap.push(newRoom);
        addRoomsTo(newRoom)
      }
    }

    function isOnGoalPath(path) {
      return goalPath.startsWith(path);
    }

    function getPassageType(currentPath, destinationPath) {
      if (isOnGoalPath(destinationPath) || isOnGoalPath(currentPath)) {
        return getRandomPassageType();
      } else {
        return "";
      }
    }

    function getRandomPassageType() {
        let passageType = passageTypeArray[Math.floor(Math.random()*passageTypeArray.length)];
        if (passageType === "exit" || usedPassageTypes.includes(passageType)) {
            passageType = getRandomPassageType();
        }
        usedPassageTypes.push(passageType);
        if (usedPassageTypes.length >= passageTypeArray.length - 1) {
          usedPassageTypes.length = 0;
        }
        return passageType
    }
  }



  //#endregion

  //#region Game Control Helper Functions
  
  function startNewGame() {
    console.log("----START NEW GAME----");

    const newGoalPath = generateGoalPath();
    const newMap = generateMap(newGoalPath);
    
    updateIsCurGame(true);
    updateCurGameInfo({
      ...defaultGameInfo,
      goalPath: newGoalPath
    })
    .then(() => updateMap(newMap))
    .then(() => {
      console.log('navigating to play');
      navigate('/play')
      displayMessagePopup('string')
    })
  }
  
  function restartGame() {
    console.log("----RESTART GAME----");
    // TODO: pass info to memories, wait for response, then...
    startNewGame();
  }

  function resumeGame() {
    console.log("----RESUME GAME----");
    navigate('/play')
  }

  function displayMessagePopup (calledMessage) {
    if (!contentLoaded) {return}

    const messageContent = messages.find(message => message.type === calledMessage)
    setMessagePopupContent(messageContent);
    setIsMessageUp(true);
  }

  function closeMessagePopup() {
    setMessagePopupContent({});
    setIsMessageUp(false);
  }

  //#endregion


  return (
    <div className="App">
      <Routes>
        <Route path="/" element={
          <Home
            isCurGame={isCurGame}
            startNewGame={startNewGame}
            restartGame={restartGame} 
            resumeGame={resumeGame}
          />
        }/>
        <Route path="/play" element={(
          <Game 
            isCurGame={isCurGame} 
            updateIsCurGame={updateIsCurGame} 
            curGame={curGame} 
            curGameInfo={curGameInfo}
            map={map}
            updateCurGameInfo={updateCurGameInfo}
            updateMap={updateMap}
            passages={passages}
            restartGame={restartGame}
            contentLoaded={contentLoaded}
            displayMessagePopup={displayMessagePopup}
          />
        )}/>
        <Route path="/memories" element={<Memories isCurGame={isCurGame} />}/>
        {/* <Route path="*" element={<Home isCurGame={isCurGame} />} /> */}
      </Routes>
      {isMessageUp &&
        <MessagePopup
          messagePopupContent={messagePopupContent}
          closeMessagePopup={closeMessagePopup}
        />
      }
    </div>
  );
}

export default App;
