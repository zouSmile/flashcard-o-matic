import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { Routes, Route } from "react-router-dom";
import DeckList from "./DeckList";
import CreateDeck from "./CreateDeck";
import DeckDetails from "./DeckDetails";
import Cards from "./Cards";
import CreateCard from "./CreateCard";
import EditDeck from "./EditDeck";
import EditCard from "./EditCard";

function Layout() {
  return (
    <React.Fragment>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Routes>
          <Route path="/" element={<DeckList />} />
          <Route path="/decks/new" element={<CreateDeck />} />
          <Route path="/decks/:deckId/study" element={<Cards />} />
          <Route path="/decks/:deckId/cards/new" element={<CreateCard />} />
          <Route path="/decks/:deckId/cards/:cardId/edit"element={<EditCard />} />
          <Route path="/decks/:deckId/edit" element={<EditDeck />} />
          <Route path="/decks/:deckId" element={<DeckDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </React.Fragment>
  );
}

export default Layout;
