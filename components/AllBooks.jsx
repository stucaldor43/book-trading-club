import React from "react";
import BookInformmationDialog from "./BookInformationDialog";
import BookInformationDialog from "./BookInformationDialog";
import Filter from "./Filter";

class AllBooks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [
                {
                    title: "Javascript: The Good Parts",
                    author: "Douglas Crockford",
                    imageUrl: "https://images-na.ssl-images-amazon.com/images/I/5131OWtQRaL._SX381_BO1,204,203,200_.jpg"
                },
                {
                    title: "JavaScript Patterns: Build Better Applications With Coding and Design Patterns",
                    author: "Stoyan Stefanov",
                    imageUrl: "https://images-na.ssl-images-amazon.com/images/I/51%2BSiphz7AL._SX377_BO1,204,203,200_.jpg"
                },
                {
                    title: "Effective JavaScript: 68 Specific Ways to Harness the Power of JavaScript (Effective Software Development Series)",
                    author: "David Herman",
                    imageUrl: "https://images-na.ssl-images-amazon.com/images/I/5123h9QhY8L._SX379_BO1,204,203,200_.jpg"
                },
                {
                    title: "Javascript: The Good Parts",
                    author: "Douglas Crockford",
                    imageUrl: "https://images-na.ssl-images-amazon.com/images/I/5131OWtQRaL._SX381_BO1,204,203,200_.jpg"
                },
                {
                    title: "JavaScript Patterns: Build Better Applications With Coding and Design Patterns",
                    author: "Stoyan Stefanov",
                    imageUrl: "https://images-na.ssl-images-amazon.com/images/I/51%2BSiphz7AL._SX377_BO1,204,203,200_.jpg"
                },
                {
                    title: "Effective JavaScript: 68 Specific Ways to Harness the Power of JavaScript (Effective Software Development Series)",
                    author: "David Herman",
                    imageUrl: "https://images-na.ssl-images-amazon.com/images/I/5123h9QhY8L._SX379_BO1,204,203,200_.jpg"
                },
                {
                    title: "Javascript: The Good Parts",
                    author: "Douglas Crockford",
                    imageUrl: "https://images-na.ssl-images-amazon.com/images/I/5131OWtQRaL._SX381_BO1,204,203,200_.jpg"
                },
                {
                    title: "JavaScript Patterns: Build Better Applications With Coding and Design Patterns",
                    author: "Stoyan Stefanov",
                    imageUrl: "https://images-na.ssl-images-amazon.com/images/I/51%2BSiphz7AL._SX377_BO1,204,203,200_.jpg"
                },
                {
                    title: "Effective JavaScript: 68 Specific Ways to Harness the Power of JavaScript (Effective Software Development Series)",
                    author: "David Herman",
                    imageUrl: "https://images-na.ssl-images-amazon.com/images/I/5123h9QhY8L._SX379_BO1,204,203,200_.jpg"
                }
            ],
            isBookDialogOpen: false,
            isFilteringBookEntries: false,
            filteredEntries: [],
            currentlySelectedBook: null
        }
        this.openBookDialog = this.openBookDialog.bind(this);
        this.closeBookDialog = this.closeBookDialog.bind(this);
    }

    componentDidMount() {
        // get book data
    }

    openBookDialog(id, evt) {
        const { books } = this.state;
        this.setState({ 
            isBookDialogOpen: true,
            currentlySelectedBook: books.find((book) => book.id === id)
        });
    }

    closeBookDialog() {
        this.setState({ isBookDialogOpen: false });
    }

    render() {
        const { currentlySelectedBook, books, isBookDialogOpen, filteredEntries, isFilteringBookEntries} = this.state;
        const BookDialog = (isBookDialogOpen) ? <BookInformationDialog book={ currentlySelectedBook }
                                                                       closeDialog={ this.closeBookDialog }
                                                                       isBookRemovable={ false }/> : null;
        const bookItems = (isFilteringBookEntries) ? filteredEntries : books;
        const bookCollection = bookItems.map((book) => 
          <div className="book" onClick={ this.openBookDialog.bind(this, book.id) }>
              <img className="book-thumbnailImage" src={book.imageUrl} width="229" height="345"/>
              <div className="book-infoContainer">
                <h3 className="book-title">{book.title}</h3>
                <h4 className="book-author">{book.author}</h4>
              </div>
          </div>
        );

        return (
            <div className="page">
                <Filter items={[this.state.books[0]]}
                           stopFilteringEntries={() => this.setState({isFilteringBookEntries: false})}
                           renderItems={(items) => this.setState({filteredEntries: items, isFilteringBookEntries: true})}
                           url="http://google.com"/>
                <div className="userBookCollection">
                    { bookCollection }
                </div>
                { BookDialog }
            </div>
        );
    }
}

export default AllBooks;