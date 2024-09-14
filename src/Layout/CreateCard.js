import { useNavigate, useParams } from "react-router-dom";
import NavBar from "./NavBar";
import { createCard, readDeck } from "../utils/api";
import React, { useEffect, useState } from "react";
import CardForm from "./CardForm";


function CreateCard() {
  const params = useParams();
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [deckData, setDeckData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDeck = async () => {
      const deckResult = await readDeck(params.deckId);
      setDeckData(deckResult);
    };
    fetchDeck();
  }, [params.deckId]);

  const handleFrontChange = (event) => setFront(event.target.value);
  const handleBackChange = (event) => setBack(event.target.value);

  const handleDone = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    await createCard(params.deckId,{front, back});
    navigate(`/decks/${params.deckId}`);
  }

  const handleSave = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    await createCard(params.deckId,{front, back});
    setFront("");
    setBack("");
  }

 
  return (
    <section>
      <NavBar id = {params.deckId} name={deckData.name} action={"Add Card"} />
      <CardForm action={"create"} front={front} back={back} handleFrontChange={handleFrontChange} handleBackChange={handleBackChange} handleDone={handleDone} handleSave={handleSave} />
    </section>
  );
}

export default CreateCard;
