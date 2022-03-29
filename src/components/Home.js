import React, { useState, useEffect } from "react";
import ScrollTextContainer from "./SrollTextContainer"

function Home (props) {
    //needs to know if there is a current game in progress to render enter button
    return (
        <div>
            <h1>Home Page</h1>
            <ScrollTextContainer />
        </div>
    );
}

export default Home;