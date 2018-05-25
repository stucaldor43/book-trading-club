import React from 'react';
import { backend } from './../config';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'username': '',
            'password': ''
        };
        this.register = this.register.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
    }
    
    changeHandler(evt) {
        this.setState({[evt.target.name]: evt.target.value});
    }

    register() {
        fetch(`${backend.protocol}://${backend.domain}:${backend.port}/api/register`, {
            method: 'POST',
            body: JSON.stringify({
                username: this.state['username'],
                password: this.state['password']
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        .then((res) => {
            if (res.status === 200) {
                const path = "/";
                location.assign(path);
            }
            // handle failure case
        })
    }

    render() {
        return (
            <div className="page registration">
                <input name="username" type="text" onChange={this.changeHandler}/>
                <input name="password" type="password" onChange={this.changeHandler}/>
                <input type="submit" onClick={this.register} value="Register"/>
            </div>
        );
    }


}

export default Register;