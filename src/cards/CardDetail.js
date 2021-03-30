import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import DeleteCard from "./DeleteCard";

export default function CardDetail({ id, front, back }) {
  const { deckId } = useParams();
  return (
    <div className="container border">
      <div className="row">
        <div className="col-6">
          <h4>front</h4>
          <p>{front}</p>
          <Link
            to={`/decks/${deckId}/cards/${id}/edit`}
            className="btn btn-secondary"
          >
            Edit
          </Link>
        </div>
        <div className="col-6">
          <h4>back</h4>
          <p>{back}</p>
          <DeleteCard cardId={id} />
        </div>
      </div>
    </div>
  );
}
