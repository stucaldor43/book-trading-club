import React from "react";
import { Link } from "react-router";
import { domain, port, protocol } from "./../config";

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.signIn = this.signIn.bind(this);
        this.toggleMenuVisibility = this.toggleMenuVisibility.bind(this);
        this.state = {
            isNavOpen: false
        };
    }

    async signIn() {
        const response = await fetch(`${protocol}://${domain}:${port}/api/get_request_token`, {credentials: "include"});
        const json = await response.json();
        localStorage.setItem("token", json.data.token);
        localStorage.setItem("secret", json.data.secret);
        location.assign(`https://api.twitter.com/oauth/authorize?oauth_token=${localStorage.getItem("token")}`);
    }
    
    toggleMenuVisibility() {
        this.setState((state) => {
            return {
                isNavOpen: !state.isNavOpen
            }
        });
    }

    render() {
        const hamburgerClasses = "hamburger " + (this.state.isNavOpen ? "hamburger-isNotPresent" : "");
        const navigationClasses = "header-navigation " + (this.state.isNavOpen ? "header-navigation-isPresent" : "header-navigation-isNotPresent");
        return (
            <header className="header">
              <div className="header-navWrapper">
                <div className={ hamburgerClasses } onClick={ this.toggleMenuVisibility }>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>
                <nav className={ navigationClasses }>
                    <span onClick={ this.toggleMenuVisibility } className="header-navigation-closeButton">x</span>
                    <Link to="/allbooks/1" className="header-navLink">Books</Link>
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