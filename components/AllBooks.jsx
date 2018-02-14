import React from "react";
import BookInformationDialog from "./BookInformationDialog";
import Pagination from "./Pagination.jsx";
import BookSearchResults from "./BookSearchResults";

class AllBooks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            maxPages: 1,
            isBookDialogOpen: false,
            isFilteringBookEntries: false,
            filteredEntries: [],
            currentlySelectedBook: null,
            searchInput: ''
        }
        this.changeHandler = this.changeHandler.bind(this);
        this.openBookDialog = this.openBookDialog.bind(this);
        this.closeBookDialog = this.closeBookDialog.bind(this);
        this.goToPage = this.goToPage.bind(this);
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
            location.href = "/#/allbooks/1";
        }
    }

    changeHandler(evt) {
        evt.persist();
        this.setState({[evt.target.name]: evt.target.value});
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

    goToPage(page) {
        fetch(`http://localhost:8080/api/book/?page=${page}`, {
            credentials: 'include'
        })
        .then((res) => res.json())
        .then((data) => {
            return this.setState({books: data.books, maxPages: data.totalPages});
        })
    }

    renderFullBookList() {
        const {currentlySelectedBook, books, isBookDialogOpen, filteredEntries, isFilteringBookEntries} = this.state;
        const BookDialog = (isBookDialogOpen) ? <BookInformationDialog book={ currentlySelectedBook }
                                                                       closeDialog={ this.closeBookDialog }
                                                                       isBookRemovable={ false }/> : null;
        const bookItems = (isFilteringBookEntries) ? filteredEntries : books;
        const bookCollection = bookItems.map((book) => 
          <div className="book" onClick={ this.openBookDialog.bind(this, book.id) }>
              <img className="book-thumbnailImage" src={book.cover_image_url} width="229" height="345"/>
              <div className="book-infoContainer">
                <h3 className="book-title">{book.title}</h3>
                <h4 className="book-author">{book.author}</h4>
              </div>
          </div>
        );

        return (
            <div>
                <div className="userBookCollection">
                    { bookCollection }
                </div>
                { BookDialog }
            </div>
        );
    }

    render() {
        const {maxPages, searchInput} = this.state;
        return (
            <div className="page">
                <input name="searchInput" value={searchInput} onChange={this.changeHandler}/>
                {(searchInput.trim().length === 0) ? this.renderFullBookList() : <BookSearchResults url={`http://localhost:8080/api/book/search/?term=${searchInput}&page=`}/>}
                <Pagination page={Number(this.props.params.page)}
                            maxPages={maxPages}
                            url={'/allbooks/'}/>
            </div>
        );
    }
}

export default AllBooks;