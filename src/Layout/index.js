import React from "react";
import { Switch, Route } from "react-router";
import Header from "./Header";
import DeckListView from "../decks/DeckListView";

function Layout() {
  const deckurl = `http://localhost:5000/decks`;
  const cardurl = `http://localhost:5000/cards`;

  return (
    <div>
      <Header />
      <Switch>
        <Route exact={true} path="/">
          <div className="container">
            {/* TODO: Implement the screen starting here */}
            {/*TODO: Set up routing */}
            {/*TODO:  create deck button */}
            {/*TODO:  create deck component and map deck db to components*/}
            <h1>see me</h1>
            <DeckListView />
          </div>
        </Route>
      </Switch>
    </div>
  );
}

export default Layout;
