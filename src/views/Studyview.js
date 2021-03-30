import React, { useState, useEffect } from "react";
import ErrorMessage from "../common/ErrorMessage";
import { Link, useParams } from "react-router-dom";
import { readDeck, listCards } from "../utils/api/index";
import Card from "../cards/Card";

function StudyView() {
  /// declare constants

  const { deckId } = useParams();
  const [error, setError] = useState(undefined);
  const [currentCard, setCurrentCard] = useState(0);
  const [deck, setDeck] = useState(undefined);

  // call useEffect to load Deack and Cards
  useEffect(() => {
    const abortController = new AbortController();
    async function loadData() {
      try {
        const deckResponse = await readDeck(deckId, abortController.signal);
        if (deckResponse) setDeck(deckResponse);
      } catch (error) {
        setError(error);
      }
    }
    loadData();

    return () => abortController.abort();
  }, [deckId]);

  //Breadcrumb navigation

  const NavBar = () => {
    if (deck)
      return (
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item " aria-current="page">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item " aria-current="page">
              <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Study
            </li>
          </ol>
        </nav>
      );
    else return "loading";
  };

  // take a card and return a card Component
  const displayCard = (card) => {
    return (
      <Card
        id={card.id}
        front={card.front}
        back={card.back}
        index={currentCard}
        deckSize={deck.cards.length}
        changeCard={setCurrentCard}
      />
    );
  };

  // if data is loaded (deck and deck.cards) display the current card
  if (deck && deck.cards.length > 2) {
    const CurrentCard = () => displayCard(deck.cards[currentCard]);
    return (
      <div className="container">
        <NavBar />
        <h2>{`${deck.name}: Study`}</h2>
        <CurrentCard />
      </div>
    );
  } else if (deck && deck.cards.length >= 0)
    return (
      <div className="container">
        <NavBar />
        <h2>Not enough Cards</h2>
        <p>{`You need at leat 3 cards to study. there are ${deck.cards.length} cards in this deck`}</p>
        <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">
          Add Card
        </Link>
      </div>
    );
  else return "Loading...";
}

export default StudyView;
