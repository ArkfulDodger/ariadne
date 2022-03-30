import React, { useState, useEffect } from "react";

function SrollTextContainer (props) {

    const [hasScrolled, setHasScrolled] = useState(false)
    
    function handleScroll(){
        if (!hasScrolled){
            (console.log("scroll")) //find some way to wait til after 1st paragraph, then offer a shorter version that renders onbutton click?
        }
        setHasScrolled(true)
    }

    return (
        <div className="scroll-box" onScroll={handleScroll}>
            <p>You have always lived in your father's palace, another jewel in King Minos' shining court. As a child, you loved to wander your father's island, watching the farmers and shepherds at their work. You have many siblings, bright with your father's royal lineage might, and your mother Pasiphae's immortal blood. You saw your mother pregnant many times during your childhood, so you could not understand the dark mood that suffused the court and your family when her stomach grew round again, the summer after Poseiden blessed Crete with a beautiful white bull.</p> 
            
            <p>When your half-brother was born, you were shocked to see the horror on everyone's faces. You were charmed by his dark brown cow-eyes, by his soft brown fur, by the tiny horns peaking out beside his ears. Minotaur, they called him. Not a name, but a classification. Beast, they also called him, as he grew faster than any other child you had ever seen. Monster, they started using after he bit the serving-boy.</p>
            
            <p>Though he'd never been able to speak a word, he communicated his hunger easily enough. His anger and his strength scared you, and you knew it was not always goats or pigs he craved. Even so, it seemed unspeakably cruel to leave him alone in the structure Daedelus built beneath the palace, a massive, shifting maze of halls and chambers, impossible to navigate without aid.</p>
            
            <p>As you grew older, you came to understand the people's fear, as petty criminals, then slow servents, then even members of the court were sentenced to death in the Labyrinth. After your brother Androgeos was killed in Athens, you were almost relieved that your father demanded Athenian sacrifices to the maze. At least you would no longer have faces you had known all your life disappear on the slightest provocation.</p>
            
            <p>But then you met one of the Athenians set to Crete to feed the Minotaur - a handsome young man who caught your eye and who stood proud before your father, though he knew what he was to face. One of your sisters told you his name was Theseus, that he too was the son of a demigod and a king, that he had volunteered to come to Crete, that he hoped to stop the bloodshed, one way or another.</p>
            
            <p>You, of course, fell for his many charms. You couldn't let him die in the mysterious maze beneath the palace, devoured by your own half-brother. So, you offered him your help: you gave him a ball of string, long and strong enough to help him find his way through the meandering passages, and you brought him a sword to protect him in the maze. You accompanied him to the entrace of the Labyrinth, and you watched him dissapear into the dark within.</p>
            
            <p>But that was days ago now, and you're starting to fear the worst. Theseus, who has promised to bring you with him on his triumphant return to Athens, must still be lost, somewhere within the maze. Now it falls to you, nervous as you feel, to make your way through the Labyrinth, find Theseus, and escape without falling prey to the hulking Minotaur that stalks the paths.</p>
        </div>
    );
}

export default SrollTextContainer;