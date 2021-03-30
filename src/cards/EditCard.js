import React, { useEffect, useState } from "react";
import { readCard, updateCard, readDeck } from "../utils/api/index";
import { useParams, Link, useHistory } from "react-router-dom";

function EditCard() {
  const history = useHistory();
  const { deckId, cardId } = useParams();
  const [originCard, setOriginCard] = useState(undefined);
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
    const abortController2 = new AbortController();
    async function loadData() {
      try {
        const cardResponse = await readCard(cardId, abortController.signal);
        if (cardResponse) setOriginCard(cardResponse);
        const deckResponse = await readDeck(deckId, abortController2.signal);
        if (deckResponse) setOriginDeck(deckResponse);
      } catch (error) {
        setError(error);
      }
    }

    async function addCard() {
      try {
        const result = await updateCard(newCard, abortController.signal);
        history.goBack();
      } catch (error) {
        setError(error);
      }
    }
    if (!originCard) loadData();
    if (originCard && !newCard)
      setFormData({
        ...formData,
        cardFront: originCard.front,
        cardBack: originCard.back,
      });
    if (newCard) addCard();

    return () => abortController.abort();
  }, [newCard, originCard]);

  // TODO: When the form is submitted, a new post should be created, and the form contents cleared.
  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    //create card here and add to db
    const thisCard = {
      front: formData.cardFront,
      back: formData.cardBack,
      deckId: deckId,
      id: cardId,
    };
    setNewCard(thisCard);
  };

  const NavBar = () => {
    if (originCard && originDeck) {
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
    } else return "loading";
  };
  // display Form
  return (
    <div>
      <NavBar />
      <form name="create" onSubmit={handleSubmit}>
        <fieldset>
          <legend>Edit Card</legend>
          <div className="form-group">
            <label htmlFor="cardFront">Front: </label>
            <input
              id="cardFront"
              name="cardFront"
              required={true}
              value={formData.cardFront}
              onChange={handleChange}
              className="form-control"
            ></input>
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

export default EditCard;
