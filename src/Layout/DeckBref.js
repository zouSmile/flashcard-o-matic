import React from "react";
import { deleteDeck } from "../utils/api";
import { Link, useNavigate } from "react-router-dom";

function DeckBref({decks}) {

    const navigate = useNavigate();

    const handleDelete = async (id) => {
      const result = window.confirm("Delete this deck? You will not be able to recover it.");
      if (result) {
        await deleteDeck(id);
        // TODO: After the deck is deleted, send the user to the home page.
        navigate("/");
      }
    }
  
  return (
    <div>
    {decks && decks.map((deck) => (
      <section style={{border: '1px solid'}}>
      <h4>{deck.name}</h4>
      <p>{deck.cards.length} cards</p>
      <p>{deck.description}</p>
      <Link to={`/decks/${deck.id}`}><button>View</button></Link>
      <br />
      <Link to={`/decks/${deck.id}/study`}><button>Study</button></Link>
      <br />
      <button onClick={() => handleDelete(deck.id)}>Delete</button>
</section>
    ))}
  </div>
  );
}

export default DeckBref;
