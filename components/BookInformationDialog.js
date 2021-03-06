import React from "react";
import OfferProposalWindow from "./OfferProposalWindow";
import { backend } from './../config';

class BookInformationDialog extends React.Component {
    constructor(props) {
        super(props);
        this.deleteBook = this.deleteBook.bind(this);
    }

    componentDidMount() {
        document.querySelector("body").style.overflow = "hidden";
    }

    componentWillUnmount() {
        document.querySelector("body").style.overflow = "auto";
    }

    deleteBook() {
        fetch(`${backend.protocol}://${backend.domain}:${backend.port}/api/book/${this.props.book.id}`, {
            method: 'DELETE',
            credentials: 'include'
        })
        .then(() => this.props.refreshPage())
        .then(() => this.props.closeDialog());
    }

    render() {
        const { book, isBookRemovable, showTradeProposalWindow} = this.props;
        const deleteBookButton = (isBookRemovable) ? <button className="bookDialog-deleteBookButton" 
                                                             onClick={ this.deleteBook }>Delete</button> : null
        return (
            <div className="dialog">
                <div className="wrapper">
                    <span className="bookDialog-closeButton" onClick={ this.props.closeDialog }>x</span>
                    <div className="bookDialog-infoContainer">
                        <h3 className="bookDialog-title">{book.title}</h3>
                        <h4 className="bookDialog-author">by {book.author}</h4>
                    </div>
                    <div className="bookDialog-descriptionContainer">
                        <p className="bookDialog-description">{book.description}</p>
                    </div>
                    <div>
                        { deleteBookButton }
                    </div>
                    {(showTradeProposalWindow) ? <OfferProposalWindow id={this.props.book.id}/> : null }
                </div>
            </div>
        );
    }
}

BookInformationDialog.defaultProps = {
    refreshPage: () => {}
};

export default BookInformationDialog;