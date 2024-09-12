import React, { useEffect, useState } from "react";
import { listDecks } from "../utils/api";
import NotFound from "./NotFound";

import DeckBref from "./DeckBref";
import { Link } from "react-router-dom";

function DeckList() {
  const [decks, setDecks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    async function loadDecks() {
      try {
        const fetchDecks = await listDecks();
        setDecks(fetchDecks);
      } catch (error) {
        setError(error);
      }
    }
    loadDecks();
    return () => abortController.abort();
  }, [decks]);

  if (error) {
    return <NotFound />;
  }
  return (
    <div>
      <Link to="/decks/new">
        <button>+ Create Deck</button>
      </Link>
      <DeckBref decks={decks} />
    </div>
  );
}
export default DeckList;
