import React, { useState, useEffect } from "react";

function MemoryDetail ({memoryURL, memoryDetailNote}) {
    return (
        <div>
            <img src={memoryURL}/>
            <h5>{memoryDetailNote}</h5>
        </div>
    );
}

export default MemoryDetail;