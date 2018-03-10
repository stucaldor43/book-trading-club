import React from "react";
import ReactDom from "react-dom";
import { Router, Route, hashHistory } from "react-router";
import App from "./components/App.jsx";
import AllBooks from "./components/AllBooks.jsx";
import MyBooks from "./components/MyBooks.jsx";
import UserSettings from "./components/UserSettings.jsx";
import TradeRequests from "./components/TradeRequests.jsx";
import "./index.html";

ReactDom.render(
  <Router history={hashHistory}>
    <Route path="/" component={App} onEnter={async (nextState, replace, callback) => {
      callback();
    }}>
      <Route path="/allbooks/:page" component={AllBooks}/>
      <Route path="/mybooks/:page" component={MyBooks}/>
      <Route path="/settings" component={UserSettings}/>
      <Route path="/traderequests" component={TradeRequests}/>
    </Route>
  </Router>, document.querySelector(".pageContainer")
);