import React from 'react';

class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        alert('mounted!');
        // verify
    }

    render() {
        return (
            <div className="page login">

            </div>
        );
    }
}

export default Login;