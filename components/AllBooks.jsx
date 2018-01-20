import React from "react";
import BookInformationDialog from "./BookInformationDialog";
import Filter from "./Filter";
import Pagination from "./Pagination.jsx";

class AllBooks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            maxPages: 1,
            isBookDialogOpen: false,
            isFilteringBookEntries: false,
            filteredEntries: [],
            currentlySelectedBook: null
        }
        this.openBookDialog = this.openBookDialog.bind(this);
        this.closeBookDialog = this.closeBookDialog.bind(this);
        this.goToPage = this.goToPage.bind(this);
    }

    componentDidMount() {
        this.goToPage(this.props.params.page);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.params.page !== this.props.params.page) {
            this.goToPage(this.props.params.page);
        }
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

    render() {
        const { currentlySelectedBook, books, isBookDialogOpen, filteredEntries, isFilteringBookEntries, maxPages} = this.state;
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
            <div className="page">
                <Filter items={[this.state.books[0]]}
                           stopFilteringEntries={() => this.setState({isFilteringBookEntries: false})}
                           renderItems={(items) => this.setState({filteredEntries: items, isFilteringBookEntries: true})}
                           url="http://google.com"/>
                <div className="userBookCollection">
                    { bookCollection }
                </div>
                { BookDialog }
                <Pagination page={Number(this.props.params.page)}
                            maxPages={maxPages}
                            url={'/allbooks/'}/>
            </div>
        );
    }
}

export default AllBooks;