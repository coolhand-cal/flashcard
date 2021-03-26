import React, { useState, useEffect } from "react";
import { listDecks } from "../utils/api/index";
import ErrorMessage from "../common/ErrorMessage";
import { Link } from "react-router-dom";
import { Deck } from "./Deck";

//Existing decks are each shown with the deck name, the number of cards, and a “Study,” “View,” and “Delete” button.
//Clicking the “Study” button brings the user to the Study screen.
//Clicking the “Edit” button brings the user to the Edit Deck screen.
//Clicking the “Delete” button shows a warning message before deleting the deck.

function DeckListView() {
  const [decks, setDecks] = useState([]);
  const [error, setError] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const abortController = new AbortController();
    listDecks(abortController.signal)
      .then((data) => {
        if (!isLoaded && data) {
          setDecks(...decks, data);
          setIsLoaded(true);
        }
      })
      .catch(setError);

    return () => abortController.abort();
  });

  if (error) {
    return (
      <ErrorMessage error={error}>
        <p>
          <Link to="/">Return Home</Link>
        </p>
      </ErrorMessage>
    );
  }

  /*
    TODO: In the below section, update the return value to match what is shown on the home scree.

    TODO: You'll need to add buttons to nested routes below.

*/
  const DisplayDeck = (deck) => {
    console.log(deck);
    return (
      <Deck
        id={deck.id}
        cards={deck.cards}
        description={deck.description}
        name={deck.name}
        key={deck.id}
      />
    );
  };

  if (isLoaded) {
    const List = () => decks.map(DisplayDeck);

    return (
      <div className="jumbotron bg-light">
        <List />
        <div className="container text-dark">
          <h1 className="display-4">Deck view</h1>
          <p className="lead">functionality will be added</p>
        </div>
      </div>
    );
  } else return "lOADDING";
}

export default DeckListView;
