import React, { useState, useEffect } from "react";
import MemoryListItem from "./MemoryListItem";

function MemoryList ({memories}) {
    const renderedMemories = memories.map(memory => {
        //console.log(memory.endType)
        return <MemoryListItem memory={memory} />
    })
    return (
        <div className="memoryList">
            <p>You think back to the many times you have traversed the Labyrinth in past lives</p>
            {renderedMemories}
        </div>
    );
}

export default MemoryList;