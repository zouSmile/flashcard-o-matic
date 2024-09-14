import { useNavigate, useParams } from "react-router-dom";
import NavBar from "./NavBar";
import React, { useEffect, useState } from "react";
import { readDeck, updateDeck } from "../utils/api";

function EditDeck() {
  const params = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDeck = async () => {
      const deckResult = await readDeck(params.deckId);
      setName(deckResult.name);
      setDescription(deckResult.description);
    };
    fetchDeck();
  }, [params.deckId]);

  const handleNameChange = (event) => setName(event.target.value);
  const handleDescriptionChange = (event) => setDescription(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    await updateDeck({ id: params.deckId, name, description });
    navigate(`/decks/${params.deckId}`);
  };

  return (
    <section>
      <NavBar id={""} name={""} action={"Edit Deck"} />
      <form>
        <label htmlFor="name">
          Name
          <br />
          <input
            id="front"
            type="text"
            name="name"
            onChange={handleNameChange}
            value={name}
          />
        </label>
        <br />
        <label htmlFor="description">
          Description
          <br />
          <textarea
            id="back"
            type="text"
            name="description"
            onChange={handleDescriptionChange}
            value={description}
          />
        </label>
        <br />
        <button
          type="button"
          onClick={() => navigate(`/decks/${params.deckId}`)}
        >
          Cancel
        </button>
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </section>
  );
}

export default EditDeck;
