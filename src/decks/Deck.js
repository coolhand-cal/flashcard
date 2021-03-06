import React from "react";
import { Link } from "react-router-dom";
import DeleteDeck from "./DeleteDeck";

function Deck({ id, cards, description, name }) {
  return (
    <div className="container border">
      <div className="row">
        <h2 className="col-10">{name}</h2>
        <p>{`${cards.length} cards`}</p>
      </div>
      <p>{description}</p>
      <div className="row">
        <Link to={`/decks/${id}`} className="btn btn-secondary">
          View
        </Link>
        <Link to={`/decks/${id}/study`} className="btn btn-primary">
          Study
        </Link>
        <DeleteDeck deckId={id} />
      </div>
    </div>
  );
}

export default Deck;
