import React from "react";
import BookInformationDialog from "./BookInformationDialog";

class MyBooks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [
                {
                    id: 1,
                    title: "Harry Potter and the Sorceror's Stone",
                    author: "J.K. Rowling",
                    imageUrl: "https://images-na.ssl-images-amazon.com/images/I/51HSkTKlauL._SX346_BO1,204,203,200_.jpg",
                    description: "One day just before his eleventh birthday, an owl tries to deliver a mysterious letter—the first of a sequence of events that end in Harry meeting a giant man named Hagrid. Hagrid explains Harry's history to him: When he was a baby, the Dark wizard, Lord Voldemort, attacked and killed his parents in an attempt to kill Harry; but the only mark on Harry was a mysterious lightning-bolt scar on his forehead."
                },
                {
                    id: 2,
                    title: "Harry Potter and the Sorceror's Stone",
                    author: "J.K. Rowling",
                    imageUrl: "https://images-na.ssl-images-amazon.com/images/I/51HSkTKlauL._SX346_BO1,204,203,200_.jpg",
                    description: "One day just before his eleventh birthday, an owl tries to deliver a mysterious letter—the first of a sequence of events that end in Harry meeting a giant man named Hagrid. Hagrid explains Harry's history to him: When he was a baby, the Dark wizard, Lord Voldemort, attacked and killed his parents in an attempt to kill Harry; but the only mark on Harry was a mysterious lightning-bolt scar on his forehead."
                },
                {
                    id: 3,
                    title: "Harry Potter and the Sorceror's Stone",
                    author: "J.K. Rowling",
                    imageUrl: "https://images-na.ssl-images-amazon.com/images/I/51HSkTKlauL._SX346_BO1,204,203,200_.jpg",
                    description: "One day just before his eleventh birthday, an owl tries to deliver a mysterious letter—the first of a sequence of events that end in Harry meeting a giant man named Hagrid. Hagrid explains Harry's history to him: When he was a baby, the Dark wizard, Lord Voldemort, attacked and killed his parents in an attempt to kill Harry; but the only mark on Harry was a mysterious lightning-bolt scar on his forehead."
                }
            ],
            book: null,
            isBookInformationDialogOpen: false,
            isAddBookDialogOpen: false
        };
        this.openBookInformationDialog = this.openBookInformationDialog.bind(this);
        this.closeBookInformationDialog = this.closeBookInformationDialog.bind(this);
    }

    componentDidMount() {
        // get users book data
        console.log("data loaded");
    }

    openBookInformationDialog(id, evt) {
        this.setState({
            isBookInformationDialogOpen: true,
            book: this.state.books.find((book) => book.id === id)
        });
    }

    closeBookInformationDialog() {
        this.setState({ isBookInformationDialogOpen: false });
    }

    render() {
        const { books, isBookInformationDialogOpen } = this.state;
        const BookDialog = (isBookInformationDialogOpen) ? <BookInformationDialog book={ this.state.book } closeDialog={ this.closeBookInformationDialog }/> : null;
        const bookCollection = books.map((book) => 
          <div className="book" onClick={ this.openBookInformationDialog.bind(this, book.id) }>
              <img className="book-thumbnailImage" src={book.imageUrl}/>
              <div className="book-infoContainer">
                <h3 className="book-title">{book.title}</h3>
                <h4 className="book-author">by {book.author}</h4>
              </div>
          </div>
        );

        return (
            <div className="page myBooks">
                <div className="myBooks-buttonContainer">
                    <button className="addBookButton">Add Book</button>
                </div>
                <div className="userBookCollection">
                    { bookCollection }
                    { bookCollection }
                    { bookCollection }
                    { bookCollection }
                </div>
                { BookDialog }
            </div>
        );
    }
}

export default MyBooks;