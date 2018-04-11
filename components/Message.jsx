import React from 'react';

class Message extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        setTimeout(() => this.props.onTimeout(), this.props.seconds * 1000);
    }

    render() {
        let messageType;
        if (this.props.type === 'success') {
            messageType = 'Success';
        }
        else if (this.props.type === 'fail') {
            messageType = 'Failed'
        }

        return (
            <div className={`message message--${this.props.type}`}>
                <h2 className={`message-heading--${this.props.type}`}>{messageType}</h2>
                <p className="message-text">{this.props.message}</p>
            </div>
        );
    }
}

export default Message;