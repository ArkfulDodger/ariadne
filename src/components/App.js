import Home from './Home';
import Game from './Game/Game';
import Memories from './Memories/Memories';
import { Routes, Route } from 'react-router-dom';


function App() {
  const goalPathLength = 5;

  function generateGoalPath() {
    // let path = "0";
    // for (let i = 0; i < goalPathLength; i++) {
    //   path += Math.round(Math.random());
    // }
    // return path;

    return "0101";
  }

  function printAsTurns(binaryPath) {
    let turnPath = "entrance";
    for (let i = 1; i < binaryPath.length; i++) {
      console.log(binaryPath[i]);
      turnPath += binaryPath[i] === '0' ? " left" : " right";
    }
    return turnPath;
  }

  generateMap(generateGoalPath());

  function generateMap(goalPath) {
    //TODO: account for goal path end.
    // if path to room is goal path, make dead end and set type 


    console.log(goalPath);

    const mapRooms = [];

    const entranceRoom = {
      path: '0',
      type: 'entrance',
      leftPassageType: "dark stairwell up",
      rightPassageType: "torchlit path",
      returnPassageType: "exit",
      onGoalPath: true
    }

    mapRooms.push(entranceRoom);
    addRoomsTo(entranceRoom);
    console.log(mapRooms);

    function addRoomsTo(fromRoom) {
      if (fromRoom.leftPassageType) {
        addNewRoomToMap('0');
      }
      if (fromRoom.rightPassageType) {
        addNewRoomToMap('1');
      }

      function addNewRoomToMap(turn) {
        const path = fromRoom.path + turn;
        const leftPassage = getPassageType(path, path+'0');
        const rightPassage = getPassageType(path, path+'1');

        const newRoom = {
          path: path,
          type: 'random',
          leftPassageType: leftPassage,
          rightPassageType: rightPassage,
          returnPassageType: turn === "0" ? fromRoom.leftPassageType : fromRoom.rightPassageType,
          onGoalPath: isOnGoalPath(path)
        }

        mapRooms.push(newRoom);
        addRoomsTo(newRoom)
      }
    }

    function isOnGoalPath(path) {
      return goalPath.startsWith(path);
    }

    function getPassageType(currentPath, destinationPath) {
      if (isOnGoalPath(destinationPath)) {
        return getRandomPassageType();
      } else {
        if (isOnGoalPath(currentPath)) {
          return getRandomPassageType();
        } else {
          return "";
        }
      }
    }

    function getRandomPassageType() {
      //TODO: do it
      return "dark passage"
    }


    // const room00 = {
    //   path: '00',
    //   type: 'randomly generated',
    //   leftPassageType: "",
    //   rightPassageType: "",
    //   returnPassageType: "dark stairwell down"
    // }

    // const room01 = {
    //   path: '01',
    //   type: 'randomly generated',
    //   leftPassageType: "sturdy wooden door",
    //   rightPassageType: "dusty path",
    //   returnPassageType: "torchlit path"
    // }
  }


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
