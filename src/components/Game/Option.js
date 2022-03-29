
function Option({choice, handleClick}) {
    
    return (
        <>
            <button onClick={handleClick}>{choice}</button>
        </>
    )
}
export default Option