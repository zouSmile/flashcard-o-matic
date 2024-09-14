import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { useNavigate, useParams, Link } from "react-router-dom";
import { readDeck } from "../utils/api";
import NotFound from "./NotFound";
function Cards() {
  const [deckInfo, setDeckInfo] = useState({});
  const [error, setError] = useState(null);
  const [cardNo, setCardNo] = useState(1);
  const [next, setNext] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  function handleNext() {
    if (cardNo < deckInfo.cards.length) {
      setCardNo(cardNo + 1);
    } else if (cardNo === deckInfo.cards.length) {
      const result = window.confirm(
        "Restart Cards? Click 'cancel' to return to  the home page"
      );
      if (result) {
        setCardNo(1);
      } else {
        navigate("/");
      }
    }
    setNext(false);
  }

  useEffect(() => {
    const abortController = new AbortController();
    async function loadCards() {
      try {
        const fetchCards = await readDeck(params.deckId);
        setDeckInfo(fetchCards);
      } catch (error) {
        setError(error);
      }
    }
    loadCards();
    return () => abortController.abort();
  }, [params.deckId]);

  if (error) {
    return <NotFound />;
  }

  return (
    <section>
      <NavBar id={deckInfo.id} name={deckInfo.name} action={"Study"} />
      <h2>Study: {deckInfo.name}</h2>
      {deckInfo.cards &&
        (deckInfo.cards.length > 2 ? (
          <React.Fragment>
            <p>
              Card {cardNo} of {deckInfo.cards.length}
            </p>
            {next ? (
              <p>{deckInfo.cards.at(cardNo - 1).back}</p>
            ) : (
              <p>{deckInfo.cards.at(cardNo - 1).front}</p>
            )}
            <button onClick={() => setNext(!next)}>Flip</button>
            {next && <button onClick={handleNext}>Next</button>}
          </React.Fragment>
        ) : (
          <React.Fragment>
            <h3>Not enough cards</h3>
            <p>
              You need at least 3 cards to study. There are{" "}
              {deckInfo.cards.length} cards in this deck
            </p>
            <Link to={`/decks/${deckInfo.id}/cards/new`}>
              <button>+ Add Cards</button>
            </Link>
          </React.Fragment>
        ))}
    </section>
  );
}
export default Cards;
