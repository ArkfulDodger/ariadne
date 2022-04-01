import { Link } from "react-router-dom";

function GameEnd({isCurGame, updateIsCurGame, endType, setEndType}) {
    if (isCurGame) {
        updateIsCurGame(false);
    }

    console.log("in GameEnd", endType)

    let endGameMessage = ''
    let endImgSrc = ''

    switch (endType) {
        case 'win' :
            endGameMessage = "You rescued Theseus and escape the Labyrinth together"
            endImgSrc = "https://ak.picdn.net/shutterstock/videos/1052179024/thumb/1.jpg?ip=x480"
            break;
        case 'slay' : 
            endGameMessage = "Wielding the sword, you  defeat the mighty Minotaur and make your escape with Theseus!"
            endImgSrc = "https://tripanthropologist.com/wp-content/uploads/2021/02/mosaic-of-theseus-and-minotaur.jpg"
            break;
        case 'leave' :
            endGameMessage = "You left Theseus to fend for himself, and escaped the maze"
            endImgSrc = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Theseus_and_the_Minotaur.gif/170px-Theseus_and_the_Minotaur.gif"
            break;
        case 'survival' :
            endGameMessage = "You push Theseus toward the Minotaur and make your escape, his screams echoing through the labyrinth as he is brutally killed... but you got out okay, so this is technically a win?"
            endImgSrc = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Theseus_and_the_Minotaur.gif/170px-Theseus_and_the_Minotaur.gif"
            break;
        case 'sacrifice' :
            endGameMessage = `You throw yourself between your love and the Minotaur and yell for him to run. He doesn't. He's not smart. And you both very much die. But at least you're together in the afterlife?`
            endImgSrc="https://serenademagazine.com/wp-content/uploads/2021/07/Orpheus_and_Eurydice-header-1200x799.png"
            break;
        case 'die' :
            endGameMessage = `You are quickly overpowered and gored to death by the minotaur... It's not all bad - Hermes showed up to take you to the underworld`
            endImgSrc="https://serenademagazine.com/wp-content/uploads/2021/07/Orpheus_and_Eurydice-header-1200x799.png"
            break;
        case 'bothdie' :
            endGameMessage = `You and Theseus valiantly put up a fight... and are gored to death by the minotaur... It's not all bad - Hermes showed up to take you both to the underworld`
            endImgSrc="https://serenademagazine.com/wp-content/uploads/2021/07/Orpheus_and_Eurydice-header-1200x799.png"
            break;
        case 'diplomacy' :
            endGameMessage = `You are gored to death by the minotaur. Looks as though some minds cannot be reasoned with... It's not all bad - Hermes showed up to take you to the underworld`
            endImgSrc="https://serenademagazine.com/wp-content/uploads/2021/07/Orpheus_and_Eurydice-header-1200x799.png"
            break;
        case 'caught' :
            endGameMessage = `You are finally caught and gored to death by the minotaur... It's not all bad - Hermes showed up to take you to the underworld`
            endImgSrc="https://serenademagazine.com/wp-content/uploads/2021/07/Orpheus_and_Eurydice-header-1200x799.png"
            break;
        case 'swordwin' :
            endGameMessage = "Wielding the sword, you defeat the mighty Minotaur. The halls less dangerous, you eventually find Theseus and make your escape!"
            endImgSrc = "https://tripanthropologist.com/wp-content/uploads/2021/02/mosaic-of-theseus-and-minotaur.jpg"
            break;
        case 'musicfail' :
            endGameMessage = `You begin to play your calming music yet again... and are gored to death by the minotaur... Seems like second time isn't the charm... Hermes shows up to take you to the underworld`
            endImgSrc="https://serenademagazine.com/wp-content/uploads/2021/07/Orpheus_and_Eurydice-header-1200x799.png"
            break;
        case 'restart' :
            endGameMessage = "You abandoned all hope"
            endImgSrc = ''
        default: endGameMessage = "ok how did you get here?" 
    }
    
    return (
        <div className="gameEnd">
            <h2>{endGameMessage}</h2>
            <img src= {endImgSrc} />
            <div className="gameEndButtons">
                <Link to="/">Return to Main Menu</Link>  
                {/* <Link to="/play">Go to a new Labyrinth</Link> */}
                <Link to="/memories">Reflect on your Journey</Link>  
            </div>
        </div>
    )
}
export default GameEnd