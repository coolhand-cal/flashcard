import React, { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { createCard, readDeck } from "../utils/api/index";

function NewCard() {
  const history = useHistory();
  const { deckId, cardId } = useParams();
  const [originDeck, setOriginDeck] = useState(undefined);
  const initialFormState = {
    cardFront: "",
    cardBack: "",
  };

  const [formData, setFormData] = useState({ ...initialFormState });
  const [newCard, setNewCard] = useState(undefined);
  const [error, setError] = useState(undefined);
  useEffect(() => {
    const abortController = new AbortController();
    // const abortController2 = new AbortController();
    async function loadData() {
      try {
        const deckResponse = await readDeck(deckId, abortController.signal);
        if (deckResponse) setOriginDeck(deckResponse);
      } catch (error) {
        setError(error);
      }
    }
    async function addCard() {
      try {
        await createCard(deckId, newCard, abortController.signal);
        history.goBack();
      } catch (error) {
        setError(error);
      }
    }
    if (!originDeck) loadData();
    if (newCard != undefined) {
      addCard();
    }
    return () => abortController.abort();
  }, [newCard]);

  // TODO: When the form is submitted, a new post should be created, and the form contents cleared.
  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    //create card here and add to db
    const thisCard = {
      jib: formData.cardFront,
      faba: formData.cardBack,
    };
    const thatCard = {
      front: formData.cardFront,
      back: formData.cardBack,
    };
    setNewCard(thatCard);
  };

  // nav bar
  const NavBar = () => {
    if (originDeck) {
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
              Add Card
            </li>
          </ol>
        </nav>
      );
    } else return "loading";
  };
  // display Form
  return (
    <div>
      <NavBar />
      <form name="create" onSubmit={handleSubmit}>
        <fieldset>
          <legend>Create Card</legend>
          <div className="form-group">
            <label htmlFor="cardFront">Front: </label>
            <textarea
              id="cardFront"
              name="cardFront"
              required={true}
              rows={4}
              value={formData.cardFront}
              onChange={handleChange}
              className="form-control"
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="cardBack">Back: </label>
            <textarea
              id="cardBack"
              name="cardBack"
              required={true}
              rows={4}
              value={formData.cardBack}
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

export default NewCard;
