import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteCard, deleteDeck, readDeck } from "../utils/api";
import NavBar from "./NavBar";
function DeckDetails() {
  const params = useParams();
  const [deckData, setDeckData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDeck = async () => {
      const deckResult = await readDeck(params.deckId);
      setDeckData(deckResult);
    };
    fetchDeck();
  }, [params.deckId]);

  const handleDeckDelete = async (id) => {
    const result = window.confirm("Delete this deck? You will not be able to recover it.");
    if (result) {
      await deleteDeck(id);
      // TODO: After the deck is deleted, send the user to the home page.
      navigate("/");
    }
  }

  const handleCardDelete = async (id) => {
    const result = window.confirm("Delete this card? You will not be able to recover it.");
    if (result) {
      await deleteCard(id);
      setDeckData((currentDeck) => ({
        ...currentDeck,
        cards: currentDeck.cards.filter((card) => card.id !== id),
      }))
    }
  }

  return (
    <section>
      <NavBar id={deckData.id} name={deckData.name} action={""} />
      <h4>{deckData.name}</h4>
      <p>{deckData.description}</p>
      <Link to={`/decks/${deckData.id}/edit`}>
        <button>Edit</button>
      </Link>
      <Link to={`/decks/${deckData.id}/study`}>
        <button>Study</button>
      </Link>
      <Link to={`/decks/${deckData.id}/cards/new`}>
        <button>Add Card</button>
      </Link>
      <button onClick={() => handleDeckDelete(deckData.id)}>Delete</button>
      <div>
        <h2>Cards</h2>
        {deckData.cards &&
          deckData.cards.map((card) => (
            <div key={card.id} style={{border: "solid"}}>
              <p>{card.front}</p>
              <p>{card.back}</p>
              <Link to={`/decks/${deckData.id}/cards/${card.id}/edit`}>
                <button>Edit</button>
              </Link>
              <button onClick={() => handleCardDelete(card.id)}>Delete</button>
            </div>
          ))}
      </div>
    </section>
  );
}

export default DeckDetails;
