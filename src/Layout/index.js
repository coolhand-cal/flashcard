import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router";
import Header from "./Header";
import DeckListView from "../views/DeckListView";
import DeckDetailView from "../views/DeckDetailView";
import NotFound from "./NotFound";
import StudyView from "../views/Studyview";
import NewDeck from "../decks/NewDeck";
import EditDeck from "../decks/EditDeck";
import EditCard from "../cards/EditCard";
import NewCard from "../cards/NewCard";

function Layout() {
  return (
    <div className="app">
      <Header />
      <Switch>
        <Route exact={true} path="/">
          <div className="container">
            <DeckListView />
          </div>
        </Route>
        <Route path="/decks/new">
          <NewDeck />
        </Route>
        <Route path="/decks/:deckId/edit">
          <EditDeck />
        </Route>
        <Route path="/decks/:deckId/study">
          <StudyView />
        </Route>
        <Route path="/decks/:deckId/cards/new">
          <NewCard />
        </Route>
        <Route path="/decks/:deckId/cards/:cardId/edit">
          <EditCard />
        </Route>
        <Route path="/decks/:deckId">
          <DeckDetailView />
        </Route>

        <Route>
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default Layout;
