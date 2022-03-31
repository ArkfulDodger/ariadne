import { render } from "@testing-library/react";
import React, { useState, useEffect } from "react";
import MemoryListItem from "./MemoryListItem";
import {v4 as uuid} from 'uuid';

function MemoryList ({memories}) {
    const renderedMemories = memories.map(memory => {
        return <MemoryListItem key={uuid()} memory={memory} />
    })
    const reversedMemories = renderedMemories.reverse()
    return (
        <div className="memoryList">
            <p>You think back to the many times you have traversed the Labyrinth in past lives</p>
            {reversedMemories}
        </div>
    );
}

export default MemoryList;