import React, { useEffect, useState } from "react";
import { createDeck } from "../utils/api/index";
import { Link, useHistory } from "react-router-dom";

function NewDeck() {
  const history = useHistory();
  const initialFormState = {
    deckName: "",
    description: "",
  };

  const [formData, setFormData] = useState({ ...initialFormState });
  const [newDeck, setNewDeck] = useState(undefined);
  const [error, setError] = useState(undefined);
  useEffect(() => {
    const abortController = new AbortController();
    async function addDeck() {
      try {
        const result = await createDeck(newDeck, abortController.signal);
        history.push(`/decks/${result.id}`);
      } catch (error) {
        setError(error);
      }
    }
    if (newDeck) addDeck();

    return () => abortController.abort();
  }, [newDeck]);

  // TODO: When the form is submitted, a new post should be created, and the form contents cleared.
  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    //create deck here and add to db
    const thisDeck = {
      name: formData.deckName,
      description: formData.description,
      cards: [],
    };
    setNewDeck(thisDeck);
  };

  const NavBar = () => {
    return (
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item " aria-current="page">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Create Deck
          </li>
        </ol>
      </nav>
    );
  };

  // display Form
  return (
    <div>
      <NavBar />
      <form name="create" onSubmit={handleSubmit}>
        <fieldset>
          <legend>Create Deck</legend>
          <div className="form-group">
            <label htmlFor="deckName">Name: </label>
            <input
              id="deckName"
              name="deckName"
              required={true}
              value={formData.deckName}
              onChange={handleChange}
              className="form-control"
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description: </label>
            <textarea
              id="description"
              name="description"
              required={true}
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div>
            <button type="submit">Submit</button>
            <Link to="/" className="btn btn-secondary">
              Cancel
            </Link>
          </div>
        </fieldset>
      </form>
    </div>
  );
}

export default NewDeck;
