import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import React, { useState } from "react";
import { createDeck } from "../utils/api";

function CreateDeck() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");


  const handleNameChange = (event) => setName(event.target.value);
  const handleDescriptionChange = (event) => setDescription(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    const theNewDeck = await createDeck({name, description});
    navigate(`/decks/${theNewDeck.id}`);
  }

  return (
    <section>
      <NavBar id={""} name={""} action={"Create Deck"} />
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
        <button type="button" onClick={() => navigate("/")}>Cancel</button>
        <button type="submit" onClick={handleSubmit}>Submit</button>
      </form>
    </section>
  );
}

export default CreateDeck;
