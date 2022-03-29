import React, { useState, useEffect } from "react";
import MemoryList from "./MemoryList";

function Memories (props) {
    //each memory will need to know if it's displaying all it's info
    //list of mems themselves pulled from db into state, they know 
    //enter or reenter labyrthin 
    //memories pulls down
    return (
        <div>
            <h1>Memories!!!</h1>
            <MemoryList />
        </div>
    );
}

export default Memories;