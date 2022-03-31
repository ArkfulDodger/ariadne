import React, { useState, useEffect } from "react";

function MessagePopup ({closeMessagePopup, messagePopupContent: {type="messge", image="", header="Message", body="Message Body"}}) {

    return (
        <div className="message-popup">
            <div className="box">
                <div>
                    {image && <img src={image} alt={type}></img>}
                    <h2>{header}</h2>
                    <p>{body}</p>
                </div>
                <button onClick={closeMessagePopup}>Close</button>
            </div>
        </div>
    );
}

export default MessagePopup;