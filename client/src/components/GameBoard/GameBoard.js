import React from 'react';
import '../../css/gameboard.css';

const GameBoard = ({ topCard }) => {

    return(
            <div className='outer__div'>
                <div className='activePile__div'>
                    {(topCard != null && Object.keys(topCard).length !== 0) 
                    ? <img height="750" width="525" src={topCard.images.svg} alt={"Not Found"}/> 
                    : <h2 className="emptyPile__message">DRAW TO START GAME</h2>}
                </div>
            </div>
    )
}

export default GameBoard