import React from 'react';

class BookInformationDialog extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { book, isBookRemovable } = this.props;
        const deleteBookButton = (isBookRemovable) ? <button className="bookDialog-deleteBookButton" 
                                                             onClick={ this.props.deleteBook }>Delete</button> : null
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
                </div>
            </div>
        );
    }
}

export default BookInformationDialog;