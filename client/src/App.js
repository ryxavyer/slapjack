import React, { useState, useEffect, useCallback } from "react";
import GameBoard from "./components/GameBoard/GameBoard";
import Deck from "./components/Deck/Deck";
import socket from './Socket';
import './css/app.css';

function App() {
  const [deckID, setDeckID] = useState("");
  const [playerID, setPlayerID] = useState("");
  const [topCard, setTopCard] = useState({});
  const [count, setCount] = useState(26); 

  const fetchDeck = useCallback(async (playerID) => {
    setTopCard({});
    let deck = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
    deck = await deck.json();
    setDeckID(deck.deck_id);
    setCount(26);
    let drawn = await fetch(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=26`);
    drawn = await drawn.json();
    let codes = drawn.cards.map(x => {
      return x.code;
    })
    await fetch(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/pile/${playerID}/add/?cards=${codes}`);
  }, [])

  const drawCard = async () => {
    let resp = await fetch(`https://deckofcardsapi.com/api/deck/${deckID}/pile/${playerID}/draw/`);
    resp = await resp.json();
    if(resp.success === true){
      let [card] = resp.cards;
      setTopCard(card);
      setCount(count-1);
    }
  }

  useEffect(() => {

    socket.on("playerID", data => {
      setPlayerID(data);
      fetchDeck(data)
    });
    
    return () => socket.disconnect();
  }, [fetchDeck]);

  return (
    <div>
      <Deck count={count}/>
      <GameBoard topCard={topCard}/>
      <div id="drawButton" className="draw_button" onClick={() => drawCard()}>
          <h1 style={{textAlign: "center", fontSize: "50px", paddingTop: "1%", color: "white"}}>DRAW</h1>
      </div>
      { count === 0 &&
      <div className="reset_button" onClick={() => fetchDeck(playerID)}>
          <h1 style={{textAlign: "center", fontSize: "50px", paddingTop: "1%", color: "white"}}>PLAY AGAIN</h1>
      </div>
      }
    </div>
  );
}

export default App;