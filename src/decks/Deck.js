import React from "react";
import { Link } from "react-router-dom";

export function Deck({ id, cards, description, name }) {
  const componentStyle = {};
  const API_BASE_URL = "http://localhost:3000";
  return (
    <div className="container">
      <div className="row" style={componentStyle}>
        <h2 className="col-10">{name}</h2>
        <p>{`${cards.length} cards`}</p>
      </div>
      <p>{description}</p>
      <div className="row" style={componentStyle}>
        <Link
          to={`${API_BASE_URL}/decks/${id}/view`}
          className="btn btn-secondary"
          key={id}
        >
          View
        </Link>
        <button className="btn btn-primary" key={id}>
          Study
        </button>
        <button className="btn btn-danger" key={id}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default Deck;
