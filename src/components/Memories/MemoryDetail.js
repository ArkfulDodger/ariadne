import React, { useState, useEffect } from "react";

function MemoryDetail ({memoryURL}) {
    return (
        <div>
            <img src={memoryURL}/>
            <h5>More detail</h5>
        </div>
    );
}

export default MemoryDetail;