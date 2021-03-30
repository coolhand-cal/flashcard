import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Deck from "../decks/Deck";
import { listDecks } from "../utils/api/index";

//Existing decks are each shown with the deck name, the number of cards, and a “Study,” “View,” and “Delete” button.
//Clicking the “Study” button brings the user to the Study screen.
//Clicking the “Edit” button brings the user to the Edit Deck screen.
//Clicking the “Delete” button shows a warning message before deleting the deck.

function DeckListView() {
  const [decks, setDecks] = useState([]);
  const [error, setError] = useState(undefined);
  const [isdecksLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const abortController = new AbortController();
    async function loadDecks() {
      try {
        const response = await listDecks(abortController.signal);
        if (!isdecksLoaded && response) {
          setDecks(...decks, response);
        }
        setIsLoaded(true);
      } catch (error) {
        setError(error);
      }
    }
    loadDecks();
    return () => abortController.abort();
  }, [isdecksLoaded]);

  /*
    TODO: In the below section, update the return value to match what is shown on the home scree.

    TODO: You'll need to add buttons to nested routes below.

*/
  const DisplayDeck = (deck) => {
    return (
      <Deck
        id={deck.id}
        key={deck.id}
        cards={deck.cards}
        description={deck.description}
        name={deck.name}
      />
    );
  };

  const List = () => {
    if (decks.length > 0) return decks.map(DisplayDeck);
    else return "loading";
  };

  return (
    <div className="jumbotron bg-light">
      <Link to="decks/new" className="btn btn-secondary">
        + Create Deck
      </Link>
      <List />
    </div>
  );
}

export default DeckListView;
