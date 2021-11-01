import React, { useState, useEffect, useCallback } from "react";
import GameBoard from "./components/GameBoard/GameBoard";
import Deck from "./components/Deck/Deck";
import socket from './Socket';

function App() {
  const [deckID, setDeckID] = useState("");

  const fetchDeck = useCallback(async () => {
    let deck = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    deck = await deck.json()
    setDeckID(deck.deck_id)
  }, [])

  const buildPile = useCallback(async () => {
    let drawn = await fetch(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=26`)
    drawn = await drawn.json()
    let codes = drawn.cards.map(x => {
      return x.code
    })
    console.log(codes)
    let pile = await fetch(`https://deckofcardsapi.com/api/deck/${deckID}/pile/player1/add/?cards=${codes}`)
    pile = await pile.json()
    console.log(pile)
  })

  useEffect(() => {
    socket.on("FromAPI", data => {
      console.log(data);
    });

    fetchDeck()
    buildPile()
    return () => socket.disconnect();
  }, [fetchDeck]);

  return (
    <>
    <GameBoard deckID={deckID}/>
    <Deck deckID={deckID}/>
    </>
  );
}

export default App;