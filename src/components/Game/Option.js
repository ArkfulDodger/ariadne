
function Option({choice}) {

    function handleClick(){
        console.log(`player chose ${choice}`)
    }
    return (
        <>
            <button onClick={handleClick}>{choice}</button>
        </>
    )
}
export default Option