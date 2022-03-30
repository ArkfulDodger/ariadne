import React, { useState, useEffect } from "react";
import MemoryDetail from "./MemoryDetail";

function MemoryListItem ({memory}) {
    //state for if displaying all info or short
    const [detailOpen, setDetailOpen] = useState(false)
    function toggleDetail(){
        setDetailOpen(!detailOpen)
    }

    let memoryResult
    if (memory.endType === "win"){
        memoryResult = "You rescued Thesues from the Labyrinth"
    }
    return (
        <div className="memoryItem">
            <h3 onClick={toggleDetail}>Journey {memory.id}</h3>
            <h4>{memoryResult}</h4>
            {detailOpen ? <MemoryDetail /> : null}
        </div>
    );
}

export default MemoryListItem;