import React from "react";
import OfferProposalWindow from "./OfferProposalWindow";

class BookInformationDialog extends React.Component {
    constructor(props) {
        super(props);
        this.deleteBook = this.deleteBook.bind(this);
    }

    deleteBook() {
        fetch(`http://localhost:8080/api/book/${this.props.book.id}`, {
            method: 'DELETE',
            credentials: 'include'
        })
        .then(() => this.props.refreshPage());
    }

    render() {
        const { book, isBookRemovable } = this.props;
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
                    <OfferProposalWindow id={this.props.book.id}/>
                </div>
            </div>
        );
    }
}

BookInformationDialog.defaultProps = {
    refreshPage: () => {}
};

export default BookInformationDialog;