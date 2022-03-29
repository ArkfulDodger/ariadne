
function Option({choice}) {

    function handleClick(){
        console.log(`player chose ${choice}`)
    }
    return (
        <div>
            {/* <h4> a choice component</h4> */}
            <button onClick={handleClick}>{choice}</button>
        </div>
    )
}
export default Option