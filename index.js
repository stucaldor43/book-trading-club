import React from "react";
import ReactDom from "react-dom";
import { Router, Route, hashHistory, IndexRoute } from "react-router";
import App from "./components/App.jsx";
import Home from "./components/Home.jsx";
import AllBooks from "./components/AllBooks.jsx";
import MyBooks from "./components/MyBooks.jsx";
import UserSettings from "./components/UserSettings.jsx";
import TradeRequests from "./components/TradeRequests.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import "./index.html";

ReactDom.render(
  <Router history={hashHistory}>
    <Route path="/" component={App} onEnter={async (nextState, replace, callback) => {
      callback();
    }}>
      <IndexRoute component={Home}/>
      <Route path="/allbooks/:page" component={AllBooks}/>
      <Route path="/mybooks/:page" component={MyBooks}/>
      <Route path="/settings" component={UserSettings}/>
      <Route path="/traderequests" component={TradeRequests}/>
      <Route path="/login" component={Login}/>
      <Route path="/register" component={Register}/>
    </Route>
  </Router>, document.querySelector(".pageContainer")
);