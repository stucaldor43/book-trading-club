import React from "react";
import ReactDom from "react-dom";
import { Router, Route, hashHistory } from "react-router";
import App from "./components/App.jsx";
import AllBooks from "./components/AllBooks.jsx";
import MyBooks from "./components/MyBooks.jsx";
import UserSettings from "./components/UserSettings.jsx";
import TradeRequests from "./components/TradeRequests.jsx";
import { domain, port, protocol } from "./config";
import "./index.html";

ReactDom.render(
  <Router history={hashHistory}>
    <Route path="/" component={App} onEnter={async (nextState, replace, callback) => {
      // const queryString = location.search;
      // if (queryString.indexOf("oauth_token") >= 0 && 
      //     queryString.indexOf("oauth_verifier") >= 0) {
      //       const query = {};
      //       const parameters = queryString.substring(1).split("&");
      //       for (const parameter of parameters) {
      //         query[parameter.split("=")[0]] = parameter.split("=")[1];
      //       }
      //       localStorage.setItem("verifier", query["oauth_verifier"]);
      // }
      // const response = await fetch(`${protocol}://${domain}:${port}/api/get_access_token?token=${localStorage.token}&secret=${localStorage.secret}&verifier=${localStorage.verifier}`, {credentials: "include"});
      // const data = await response.json();
      // console.log(data.status);
      callback();
    }}>
      <Route path="/allbooks/:page" component={AllBooks}/>
      <Route path="/mybooks/:page" component={MyBooks}/>
      <Route path="/settings" component={UserSettings}/>
      <Route path="/traderequests" component={TradeRequests}/>
    </Route>
  </Router>, document.querySelector(".pageContainer")
);