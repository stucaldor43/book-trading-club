import React from "react";
import Pagination from './Pagination.jsx';
import BookInformationDialog from './BookInformationDialog';

class BookSearchResults extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            maxPages: 1,
            books: [],
            currentlySelectedBook: null,
            isBookDialogOpen: false
        }
        this.goToPage = this.goToPage.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.previousPage = this.previousPage.bind(this);
    }

    componentDidMount() {
        this.goToPage(this.state.page);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.page !== this.state.page) {
            this.goToPage(this.state.page);
        }
        if (prevProps.url !== this.props.url) {
            this.setState({page: 1}, () => this.goToPage(this.state.page));
        }
    }

    goToPage(page) {
        fetch(`${this.props.url}${page}`, {
            credentials: 'include'
        })
        .then((res) => res.json())
        .then(({items, books, totalPages}) => {
            return this.setState({books: items, maxPages: totalPages});
        })
    }

    nextPage(e) {
        e.preventDefault();
        this.setState((state) => ({page: state.page + 1}));
    }

    previousPage(e) {
        e.preventDefault();
        this.setState((state) => ({page: state.page - 1}));
    }

    render() {
        const {url} = this.props;
        const {page, maxPages, isBookDialogOpen, currentlySelectedBook} = this.state;
        const BookDialog = (isBookDialogOpen) ? <BookInformationDialog book={ currentlySelectedBook }
                                                                       closeDialog={ () => this.setState({isBookDialogOpen: false}) }
                                                                       isBookRemovable={ false }/> : null;
        const bookCollection = this.state.books.map((book) => 
          <div className="book" onClick={ () => this.setState({isBookDialogOpen: true, currentlySelectedBook: book}) }>
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
                {<Pagination page={page}
                             maxPages={maxPages}
                             url={url}
                             previousLinkClickHandler={this.previousPage}
                             nextLinkClickHandler={this.nextPage}/>}
            </div>
        );
    }
}

export default BookSearchResults;