import React, { useState, useEffect } from "react";
import MemoryListItem from "./MemoryListItem";

function MemoryList (props) {
    return (
        <div>
            <h2>Memory List!</h2>
            <MemoryListItem />
        </div>
    );
}

export default MemoryList;