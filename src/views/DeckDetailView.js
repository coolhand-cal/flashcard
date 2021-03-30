import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { readDeck, listCards } from "../utils/api/index";
import CardDetail from "../cards/CardDetail";
import DeckDetails from "../decks/DeckDetails";

export function DeckDetailView() {
  //declare  constants
  const { deckId } = useParams();
  const [error, setError] = useState(undefined);
  const [deck, setDeck] = useState(undefined);

  //load deck and cards
  useEffect(() => {
    const abortController = new AbortController();
    async function loadData() {
      try {
        const deckResponse = await readDeck(deckId, abortController.signal);
        setDeck(deckResponse);
      } catch (error) {
        setError(error);
      }
    }
    loadData();
    return () => abortController.abort();
  }, []);

  // Breadcrumb nav
  const NavBar = () => {
    if (deck)
      return (
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item " aria-current="page">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
            </li>
          </ol>
        </nav>
      );
    else return "loading";
  };

  //displays deck details
  const DisplayDeck = ({ thisDeck }) => {
    return (
      <DeckDetails
        id={thisDeck.id}
        description={thisDeck.description}
        name={thisDeck.name}
      />
    );
  };

  //displays cards
  const displayCard = (card) => {
    return (
      <CardDetail
        id={card.id}
        key={card.id}
        front={card.front}
        back={card.back}
      />
    );
  };

  const CardList = () => {
    if (deck.cards && deck.cards.length > 0) {
      return deck.cards.map(displayCard);
    } else {
      return "There are lots cards in this deck";
    }
  };

  //return html

  if (deck) {
    return (
      <div>
        <NavBar />
        <DisplayDeck thisDeck={deck} />
        <h2>Cards</h2>
        <CardList />
      </div>
    );
  } else {
    return (
      <div className="container">
        <NavBar />
        <h2>Error</h2>
        <p>{`No deck found with id ${deckId}`}</p>
        <Link to={`/`} className="btn btn-primary">
          Go Home
        </Link>
      </div>
    );
  }
}

export default DeckDetailView;
