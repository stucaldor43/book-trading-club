import React from "react";
import Header from "./Header.jsx";
import { backend } from "./../config";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { signedIn: false };
        this.signIn = this.signIn.bind(this);
        this.signOut = this.signOut.bind(this);
        this.verify = this.verify.bind(this);
    }

    componentDidMount() {
        if (location.href.indexOf('oauth_token') >= 0) {
            this.verify();
        }
        
    }

    async verify() {
        const queryString = location.search;
        if (queryString.indexOf("oauth_token") >= 0 && 
            queryString.indexOf("oauth_verifier") >= 0) {
              const query = {};
              const parameters = queryString.substring(1).split("&");
              for (const parameter of parameters) {
                query[parameter.split("=")[0]] = parameter.split("=")[1];
              }
              localStorage.setItem("verifier", query["oauth_verifier"]);
        }
        const response = await fetch(`${backend.protocol}://${backend.domain}:${backend.port}/api/get_access_token?token=${localStorage.token}&secret=${localStorage.secret}&verifier=${localStorage.verifier}`, {credentials: "include"});
        const data = await response.json();
        if (data.status = 'success') {
            this.signIn();
        }
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
              <Header isSignedIn={this.state.signedIn} logOutHandler={this.signOut}>Header</Header>
                { this.props.children }
              <footer></footer>
            </div>
        );
    }
}

export default App;