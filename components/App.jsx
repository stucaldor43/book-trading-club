import React from "react";
import Header from "./Header.jsx";
import Login from "./Login.jsx";
import { backend } from './../config';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { signedIn: false };
        this.signIn = this.signIn.bind(this);
        this.signOut = this.signOut.bind(this);
    }

    signIn() {
        this.setState({signedIn: true});
    }

    signOut() {
        this.setState({signedIn: false});
    }

    render() {
        return (
            <div>
              <Header isSignedIn={this.state.signedIn} signInHandler={this.signIn} logOutHandler={this.signOut}>Header</Header>
                {(this.props.location.pathname.indexOf('/login') === 0) ? <Login signedIn={this.state.signedIn} signIn={this.signIn}/> : this.props.children }
              <footer className="footer">
                <p className="footer-copyright">Anthony Cook &copy; 2018</p>
              </footer>
            </div>
        );
    }
}

export default App;