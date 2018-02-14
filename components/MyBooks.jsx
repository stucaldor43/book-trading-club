import React from "react";
import BookInformationDialog from "./BookInformationDialog";
import AddBookDialog from "./AddBookDialog";
import Filter from "./Filter";
import Pagination from "./Pagination.jsx";
import BookSearchResults from "./BookSearchResults";

class MyBooks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            book: null,
            isBookInformationDialogOpen: false,
            isFilteringBookEntries: false,
            filteredEntries: [],
            isAddBookDialogOpen: false,
            maxPages: 1,
            searchInput: ""
        };
        this.changeHandler = this.changeHandler.bind(this);
        this.goToPage = this.goToPage.bind(this);
        this.openBookInformationDialog = this.openBookInformationDialog.bind(this);
        this.closeBookInformationDialog = this.closeBookInformationDialog.bind(this);
        this.openAddBookDialog = this.openAddBookDialog.bind(this);
        this.closeAddBookDialog = this.closeAddBookDialog.bind(this);
        this.renderFullBookList = this.renderFullBookList.bind(this);
    }

    componentDidMount() {
        this.goToPage(this.props.params.page);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.params.page !== this.props.params.page) {
            this.goToPage(this.props.params.page);
        }
        const {searchInput} = this.state;
        if (prevState.searchInput.length > 0 && searchInput.length === 0) {
            location.href = "/#/mybooks/1";
        }
    }

    changeHandler(evt) {
        evt.persist();
        this.setState({[evt.target.name]: evt.target.value});
    }

    goToPage(page) {
        fetch(`http://localhost:8080/api/book/mybooks/?page=${page}`, {
            credentials: 'include'
        })
        .then((res) => res.json())
        .then((data) => {
            return this.setState({books: data.books, maxPages: data.totalPages});
        })
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

    openAddBookDialog() {
        this.setState({ isAddBookDialogOpen: true });
    }

    closeAddBookDialog() {
        this.setState({ isAddBookDialogOpen: false });
    }

    renderFullBookList() {
        const {books, isBookInformationDialogOpen, isAddBookDialogOpen, filteredEntries, isFilteringBookEntries} = this.state;
        const BookDialog = (isBookInformationDialogOpen) ? <BookInformationDialog book={ this.state.book } 
                                                                                  closeDialog={ this.closeBookInformationDialog } 
                                                                                  isBookRemovable={ true }/> : null;
        const AddBookView = (isAddBookDialogOpen) ? <AddBookDialog closeDialog={ this.closeAddBookDialog }/> : null;
        const bookItems = (isFilteringBookEntries) ? filteredEntries : books;
        const bookCollection = bookItems.map((book) => 
          <div className="book" onClick={ this.openBookInformationDialog.bind(this, book.id) }>
              <img className="book-thumbnailImage" src={book.cover_image_url} width="229" height="345"/>
              <div className="book-infoContainer">
                <h3 className="book-title">{book.title}</h3>
                <h4 className="book-author">by {book.author}</h4>
              </div>
          </div>
        );

        return (
            <div>
                <div className="userBookCollection">
                    { bookCollection }
                </div>
                { BookDialog }
                { AddBookView }
            </div>
        );
    }

    render() {
        const {maxPages, searchInput} = this.state;

        return (
            <div className="page myBooks">
                <div className="myBooks-buttonContainer">
                    <input name="searchInput" value={searchInput} onChange={this.changeHandler}/>
                    <button className="addBookButton" onClick={ this.openAddBookDialog }>Add book</button>
                </div>
                {(searchInput.trim().length === 0) ? this.renderFullBookList() : <BookSearchResults url={`http://localhost:8080/api/book/mybooks/search/?term=${searchInput}&page=`}
                                                                                                    canBooksBeDeleted={true}/>}
                <Pagination page={Number(this.props.params.page)}
                            maxPages={maxPages}
                            url={'/mybooks/'}/>
            </div>
        );
    }
}

export default MyBooks;