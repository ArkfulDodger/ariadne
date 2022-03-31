import OptionBox from "./OptionBox"

const Minotaur = (props) => {
    const minoResponseOptions= [
        {
            choiceText : "FLEE",
            flavorText : "Run away as fast as you can"
        },
        {
            choiceText: "FIGHT",
            flavorText: "Stand your ground and face the monster"
        },
        {
            choiceText: "speak",
            flavorText: "try to reach with your half-brother"
        }
    ]

    function handlePlayerResponse(event){
        console.log("player chose ", event.target.innerText)
    }
    const minotaurURL = "https://www.pcgamesn.com/wp-content/uploads/2018/10/Assassins-Creed-Odyssey-Minotaur-900x507.jpg"
    return (
        <div className="minotaur">
            {/* <h2>Minotaur -- RUN (or fight or whatever)</h2> */}
            <img src={minotaurURL} alt="an image of a threatening Minotaur, holding an axe"/>
            <OptionBox options={minoResponseOptions} handleClick={handlePlayerResponse}/>
        </div>
    )
}
export default Minotaur