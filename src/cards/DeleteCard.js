import React, { useEffect, useState } from "react";
import { deleteCard } from "../utils/api/index";
import { useHistory } from "react-router-dom";

// effect calles to delete Button dependant on idToDelete
function DeleteCard({ cardId }) {
  const history = useHistory();
  const [idToDelete, setIdToDelete] = useState(undefined);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    const abortController = new AbortController();
    if (idToDelete) {
      async function removeCard() {
        try {
          await deleteCard(idToDelete, abortController.signal);
          setIdToDelete(undefined);
        } catch (error) {
          setError(error);
        }
      }
      removeCard();
      window.location.reload();

      return () => abortController.abort();
    }
  });

  // called when delete button clicked.
  const handleClick = (event) => {
    event.preventDefault();
    if (window.confirm("Delete Card?")) {
      setIdToDelete(cardId);
    }
  };
  return (
    <button className="btn btn-danger" onClick={handleClick}>
      Delete
    </button>
  );
}

export default DeleteCard;
