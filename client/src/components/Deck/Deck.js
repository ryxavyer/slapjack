import React from 'react';
import back from "./../../images/back.png";
import '../../css/deck.css';

const Deck = ({ count }) => {

    return(
            <div className='deck__div'>
                <div className='float__deck'>
                    <img className="back-image" src={back} alt={"Not Found"}/>
                </div>
                <div className='float__count'>
                    <h1 style={{fontSize: "60px", textAlign: "center", paddingTop: "8%", color: "white"}}>{count}</h1>
                </div>
            </div>
    )
}

export default Deck