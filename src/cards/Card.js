import React, { useState } from "react";

export default function Card({ id, front, back, index, deckSize, changeCard }) {
  const [cardFace, setCardFace] = useState("front");
  const current = index + 1;

  // flip card to opposite side
  const flipcard = () => {
    if (cardFace === "front") setCardFace("back");
    else setCardFace("front");
  };

  // load next card in Deck
  const nextCard = () => {
    if (current != deckSize) changeCard(current);
    else if (window.confirm("Restart Cards?")) {
      changeCard(0);
    }
  };

  if (cardFace === "front")
    return (
      <div className="container border">
        <p>{`card ${current} of ${deckSize}`}</p>
        <p>{front}</p>
        <button className="btn btn-secondary" onClick={flipcard}>
          Flip
        </button>
      </div>
    );
  else
    return (
      <div className="container border">
        <p>{`card ${current} of ${deckSize}`}</p>
        <p>{back}</p>
        <button className="btn btn-secondary" onClick={flipcard}>
          Flip
        </button>
        <button className="btn btn-primary" onClick={nextCard}>
          Next
        </button>
      </div>
    );
}
