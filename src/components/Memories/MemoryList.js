import React, { useState, useEffect } from "react";
import MemoryListItem from "./MemoryListItem";

function MemoryList ({memories}) {
    const renderedMemories = memories.map(memory => {
        //console.log(memory.endType)
        return <MemoryListItem memory={memory} />
    })
    return (
        <div className="memoryList">
            <h2>Memory List!</h2>
            {renderedMemories}
        </div>
    );
}

export default MemoryList;