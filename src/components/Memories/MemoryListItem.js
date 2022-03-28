import React, { useState, useEffect } from "react";
import MemoryDetail from "./MemoryDetail";

function MemoryListItem (props) {
    return (
        <div>
            <h3>Memory List Item!</h3>
            <MemoryDetail />
        </div>
    );
}

export default MemoryListItem;