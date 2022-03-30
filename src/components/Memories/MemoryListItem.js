import React, { useState, useEffect } from "react";
import MemoryDetail from "./MemoryDetail";

function MemoryListItem ({memory}) {
    //state for if displaying all info or short
    const [detailOpen, setDetailOpen] = useState(false)
    function toggleDetail(){
        setDetailOpen(!detailOpen)
    }

    return (
        <div className="memoryItem">
            <h3 onClick={toggleDetail}>Journey number {memory.id}</h3>
            <h4>{memory.endType}</h4>
            {detailOpen ? <MemoryDetail /> : null}
        </div>
    );
}

export default MemoryListItem;