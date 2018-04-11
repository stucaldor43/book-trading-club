import React from "react";
import jsonp from "jsonp";
import { debounce } from './../helpers/utils';
import { backend } from './../config';
import Message from './Message.jsx';

class AddBookDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showingMessage: false,
            messageType: 'success',
            message: '',
        };
        this.keyUpHandler = this.keyUpHandler.bind(this);
        this.fetchBookData = debounce(this.fetchBookData.bind(this), 800);
    }

    fetchBookData(isbn) {
        jsonp(`https://www.googleapis.com/books/v1/volumes?q=+isbn:${isbn}&key=AIzaSyDYdUSvMksIolQN4oFMsVRgrI_6m66heWo`, (err, data) => {
            if (data.error || data.totalItems === 0) { 
                this.showMessage('fail', 'Sorry, we were unable to add the requested book to your library');
                return; 
            }
            const item = data.items[0];
            const bookInfo = {
                author: item.volumeInfo.authors[0],
                title: item.volumeInfo.title,
                book_thumbnail_url: item.volumeInfo.imageLinks.thumbnail,
                description: item.volumeInfo.description || '',
            };
            fetch(`${backend.protocol}://${backend.domain}:${backend.port}/api/book`, {
                method: 'POST',
                body: JSON.stringify(bookInfo),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })
            .then(() => {
                this.showMessage('success', 'The book was added to your library');
            })
            .then(() => this.props.refreshPage())
        });
        // don't commit with api key
    } 

    keyUpHandler(evt) {
        evt.persist();
        if (evt.key === "Enter") {
            const textInputValue = evt.target.value;
            const isbn = (textInputValue.indexOf("-") >= 0) ? textInputValue.split("-").join("") : textInputValue;
            this.fetchBookData(isbn);
        }
    }

    showMessage(messageType, message) {
        this.setState({
            showingMessage: true,
            messageType,
            message
        })
    }

    render() {
        return (
            <div className="dialog">
                <div className="wrapper">
                    <span className="closeButton" onClick={ this.props.closeDialog }>x</span>
                    <div>
                        <input type="text" placeholder="ISBN number" onKeyUp={ this.keyUpHandler }/>
                    </div>
                </div>
                { this.state.showingMessage && <Message onTimeout={() => this.setState({showingMessage: false})} 
                                                        seconds={3} 
                                                        type={this.state.messageType} 
                                                        message={this.state.message}/> }
            </div>
        );
    }
}

export default AddBookDialog;