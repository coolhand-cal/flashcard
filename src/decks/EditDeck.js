import React, { useEffect, useState } from "react";
import { readDeck, updateDeck } from "../utils/api/index";
import { useParams, Link, useHistory } from "react-router-dom";

function EditDeck() {
  const history = useHistory();
  const { deckId } = useParams();
  const [originDeck, setOriginDeck] = useState(undefined);
  const initialFormState = {
    deckName: "",
    description: "",
  };

  const [formData, setFormData] = useState({ ...initialFormState });
  const [newDeck, setNewDeck] = useState(undefined);
  const [error, setError] = useState(undefined);
  useEffect(() => {
    const abortController = new AbortController();
    async function loadData() {
      try {
        const response = await readDeck(deckId, abortController.signal);
        if (response) {
          setOriginDeck(response);
        }
      } catch (error) {
        setError(error);
      }
    }

    async function addDeck() {
      try {
        const result = await updateDeck(newDeck, abortController.signal);
        history.goBack();
      } catch (error) {
        setError(error);
      }
    }
    if (!originDeck) loadData();
    if (originDeck)
      setFormData({
        ...formData,
        deckName: originDeck.name,
        description: originDeck.description,
      });
    if (newDeck) addDeck();

    return () => abortController.abort();
  }, [newDeck, originDeck]);

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
      id: deckId,
    };
    setNewDeck(thisDeck);
  };

  const NavBar = () => {
    if (originDeck)
      return (
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item " aria-current="page">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item " aria-current="page">
              <Link to={`/decks/${deckId}`}>{originDeck.name}</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Edit
            </li>
          </ol>
        </nav>
      );
    else return "loading";
  };
  // display Form
  return (
    <div>
      <NavBar />
      <form name="create" onSubmit={handleSubmit}>
        <fieldset>
          <legend>Edit Deck</legend>
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
          </div>
        </fieldset>
      </form>
    </div>
  );
}

export default EditDeck;
