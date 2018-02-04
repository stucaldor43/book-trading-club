import React from "react";
import {debounce} from './../helpers/utils';
import AutoComplete from './AutoComplete';

class BookOfferDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            autoCompleteSuggestions: [],
            bookTitleInput: ""
        };
        this.changeHandler = this.changeHandler.bind(this);
        this.search = debounce(this.search, 800).bind(this);
        this.submitOffer = this.submitOffer.bind(this);
        this.fillTextboxUsingSuggestion = this.fillTextboxUsingSuggestion.bind(this);
    }

    changeHandler(evt) {
        this.setState({[evt.target.name]: evt.target.value});
    }

    search() {
        fetch(`http://localhost:8080/api/book/search/?term=${ this.state.bookTitleInput }`, {credentials: "include"})
            .then((response) => response.json())
            .then(data => {
                return this.setState({ autoCompleteSuggestions: data.items.slice(0, 5).map((item) => item.title) });
            })
            .catch(() => {});
    }

    submitOffer() {
        const data = {requested_book_id: this.props.requestedBookId, offered_book_title: this.state.bookTitleInput};
        fetch(`http://localhost:8080/api/offer`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include'
        })
        .then((data) => {
            this.props.close();
        })
    }

    fillTextboxUsingSuggestion(text) {
        this.setState({bookTitleInput: text});
    }

    render() {
        const {autoCompleteSuggestions} = this.state;
        return (
            <div className="bookOfferDialog">
                <div className="bookOfferDialog-inputContainer">
                    <input name="bookTitleInput" className="bookOfferDialog-bookTitleInput" type="text" onKeyUp={this.search} onChange={this.changeHandler} value={this.state.bookTitleInput}/>
                    <AutoComplete suggestions={autoCompleteSuggestions}
                                  completeInputText={this.fillTextboxUsingSuggestion}/>
                </div>
                <button className="bookOfferDialog-submitOfferButton" onClick={this.submitOffer}>Submit Offer</button>
            </div>
        );
    }
}

export default BookOfferDialog;