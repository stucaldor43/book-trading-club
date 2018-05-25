import React from "react";
import { Link } from "react-router";
import { backend } from "./../config";
import Message from './Message.jsx';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isNavOpen: false,
            'username': '',
            'password': '',
            showingMessage: false,
            messageType: 'fail',
            message: 'Invalid username/password' 
        };
        this.showMessage = this.showMessage.bind(this);
        this.signIn = this.signIn.bind(this);
        this.toggleMenuVisibility = this.toggleMenuVisibility.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
    }

    showMessage() {
        this.setState({showingMessage: true});
    }

    signIn(username, password) {
        fetch(`${backend.protocol}://${backend.domain}:${backend.port}/api/login`, {
            method: 'POST',
            body: JSON.stringify({
                username,
                password
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        .then((res) => {
            if (res.status === 200) {
                this.props.signInHandler();
            }
            document.querySelector("input[name=username]").value = "";
            document.querySelector("input[name=password]").value = "";
            this.setState({username: '', password: ''});
        })
        .then(() => this.showMessage());
    }

    changeHandler(evt) {
        this.setState({[evt.target.name]: evt.target.value});
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
        const {username, password} = this.state;
        const userActionButton = (this.props.isSignedIn) ? <button className="header-logoutButton" onClick={ this.props.logOutHandler }>Sign Out</button> : <span><input name="username" type="text" placeholder="username" onChange={this.changeHandler}/><input name="password" type="password" placeholder="password" onChange={this.changeHandler}/><button className="header-loginButton" onClick={ () => this.signIn(username, password) }>Sign In</button></span>;
        const signedInUserLinks = (this.props.isSignedIn) ? <span><Link onClick={ this.toggleMenuVisibility } to="/mybooks/1" className="header-navLink">My Library</Link>
        <Link onClick={ this.toggleMenuVisibility } to="/settings" className="header-navLink">Profile</Link>
        <Link onClick={ this.toggleMenuVisibility } to="/traderequests" className="header-navLink">Requests</Link></span> : null;

        return (
            <header className="header">
              <div className="header-navWrapper">
                <div className={ hamburgerClasses } onClick={ this.toggleMenuVisibility }>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>
                <div className="header-actions">
                    { userActionButton }
                </div>
                <nav className={ navigationClasses }>
                    <span onClick={ this.toggleMenuVisibility } className="header-navigation-closeButton">x</span>
                    <Link onClick={ this.toggleMenuVisibility } to="/allbooks/1" className="header-navLink">Books</Link>
                    { signedInUserLinks }
                </nav>
              </div>
              <div className="header-logo">
                <span className="header-logoText"><span className="header-primaryColorText">Book Trading</span> <span className="header-secondaryColorText">Club</span></span>
              </div>
              { this.state.showingMessage && <Message onTimeout={() => this.setState({showingMessage: false})} 
                                                        seconds={3} 
                                                        type={this.state.messageType} 
                                                        message={this.state.message}/> }
            </header>
        );
    }
}

export default Header;