function Option({props}) {
    const {choice} = props
    
    return (
        <div>
            <h3> a choice component</h3>
            <button>{choice}</button>
        </div>
    )
}
export default Option