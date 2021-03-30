import React from "react";
import { Link } from "react-router-dom";
import DeleteDeck from "./DeleteDeck";

function DeckDetails({ id, cards, description, name }) {
  return (
    <div className="container border">
      <h2 className="col-10">{name}</h2>
      <p>{description}</p>
      <div className="row">
        <Link to={`/decks/${id}/edit`} className="btn btn-secondary">
          Edit
        </Link>
        <Link to={`/decks/${id}/study`} className="btn btn-primary">
          Study
        </Link>
        <Link to={`/decks/${id}/cards/new`} className="btn btn-primary">
          Add Card
        </Link>
        <DeleteDeck deckId={id} />
      </div>
    </div>
  );
}

export default DeckDetails;
