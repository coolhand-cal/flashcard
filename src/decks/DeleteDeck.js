import React, { useEffect, useState } from "react";
import { deleteDeck } from "../utils/api/index";
import { useHistory } from "react-router-dom";

// effect calles to delete Button dependant on idToDelete
function DeleteDeck({ deckId }) {
  const history = useHistory();
  const [idToDelete, setIdToDelete] = useState(undefined);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    const abortController = new AbortController();
    if (idToDelete) {
      async function removeDeck() {
        try {
          await deleteDeck(idToDelete, abortController.signal);
          history.push("/");
        } catch (error) {
          setError(error);
        }
      }
      removeDeck();

      return () => abortController.abort();
    }
  }, [idToDelete]);

  // called when delete button clicked.
  const handleClick = (event) => {
    event.preventDefault();
    if (window.confirm("Delete Deck?")) {
      setIdToDelete(deckId);
    }
  };
  return (
    <button className="btn btn-danger" onClick={handleClick}>
      Delete
    </button>
  );
}

export default DeleteDeck;
