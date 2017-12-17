import React from "react";
import { Link } from "react-router";
import { domain, port, protocol } from "./../config";

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.signIn = this.signIn.bind(this);
    }

    async signIn() {
        const response = await fetch(`${protocol}://${domain}:${port}/api/get_request_token`, {credentials: "include"});
        const json = await response.json();
        localStorage.setItem("token", json.data.token);
        localStorage.setItem("secret", json.data.secret);
        location.assign(`https://api.twitter.com/oauth/authorize?oauth_token=${localStorage.getItem("token")}`);
    }
    
    render() {
        return (
            <header className="header">
              <div className="header-navWrapper">
                  <nav className="header-navigation">
                    <Link to="/allbooks" className="header-navLink">Books</Link>
                    <Link to="/mybooks" className="header-navLink">My Library</Link>
                    <Link to="/settings" className="header-navLink">Profile</Link>
                    <Link to="/traderequests" className="header-navLink">Requests</Link>
                    {/* <button onClick={ this.signIn }>Sign In</button>
                    <button onClick={ () => fetch("http://localhost:8080/api/client/4",  {credentials: "include"})} >Test sessions </button>
                    { this.props.children } */}
                </nav>
              </div>
              <div className="header-logo">
                <span className="header-logoText">Book Trading Club</span>
              </div>
            </header>
        );
    }
}

export default Header;