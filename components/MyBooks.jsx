import React from "react";

class MyBooks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [
                {
                    title: "Harry Potter and the Sorceror's Stone",
                    author: "J.K. Rowling",
                    imageUrl: "https://images-na.ssl-images-amazon.com/images/I/51HSkTKlauL._SX346_BO1,204,203,200_.jpg"
                },
                {
                    title: "Harry Potter and the Sorceror's Stone",
                    author: "J.K. Rowling",
                    imageUrl: "https://images-na.ssl-images-amazon.com/images/I/51HSkTKlauL._SX346_BO1,204,203,200_.jpg"
                },
                {
                    title: "Harry Potter and the Sorceror's Stone",
                    author: "J.K. Rowling",
                    imageUrl: "https://images-na.ssl-images-amazon.com/images/I/51HSkTKlauL._SX346_BO1,204,203,200_.jpg"
                }
            ]
        };
    }

    componentDidMount() {
        // get users book data
        console.log("data loaded");
    }

    render() {
        const { books } = this.state;
        const bookCollection = books.map((book) => 
          <div className="book">
              <img className="book-thumbnailImage" src={book.imageUrl}/>
              <div className="book-infoContainer">
                <h3 className="book-title">{book.title}</h3>
                <h4 className="book-author">by {book.author}</h4>
              </div>
          </div>
        );

        return (
            <div className="page myBooks">
                <div className="userBookCollection">
                    { bookCollection }
                    { bookCollection }
                    { bookCollection }
                    { bookCollection }
                </div>
            </div>
        );
    }
}

export default MyBooks;