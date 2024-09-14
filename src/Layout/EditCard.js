import { useNavigate, useParams } from "react-router-dom";
import NavBar from "./NavBar";
import { readCard , updateCard } from "../utils/api";
import React, { useEffect, useState } from "react";
import CardForm from "./CardForm";

function EditCard() {
  const params = useParams();
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [deckName, setDeckName] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchCard = async () => {
      const cardResult = await readCard(params.cardId);
      setFront(cardResult.front);
      setBack(cardResult.back);
      setDeckName(cardResult.deckName);
    };
    fetchCard();
  }, [params.cardId]);

  const handleFrontChange = (event) => setFront(event.target.value);
  const handleBackChange = (event) => setBack(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    try {
      await updateCard({ id: params.cardId, deckId: params.deckId, front, back });
      navigate(`/decks/${params.deckId}`);
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };

  return (
    <section>
      <NavBar id={params.deckId} name={deckName} action={"Edit Card"} />
      <CardForm
        action={"edit"}
        front={front}
        back={back}
        handleFrontChange={handleFrontChange}
        handleBackChange={handleBackChange}
        handleSubmit={handleSubmit}
        handleCancel={() => navigate(`/decks/${params.deckId}`)}
      />
    </section>
  );
}

export default EditCard;
