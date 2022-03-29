
function Option({choice}) {

    function handleClick(){
        console.log(`player chose ${choice}`)
    }
    return (
        <>
            {/* <h4> a choice component</h4> */}
            <button onClick={handleClick}>{choice}</button>
        </>
    )
}
export default Option