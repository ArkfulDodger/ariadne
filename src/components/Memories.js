import React, { useState, useEffect } from "react";
import MemoryList from "./MemoryList";

function Memories (props) {
    return (
        <div>
            <h1>Memories!!!</h1>
            <MemoryList />
        </div>
    );
}

export default Memories;