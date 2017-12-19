import React from "react";

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
            ]
        }
    }

    componentDidMount() {
        // get book data
    }

    render() {
        const { books } = this.state;
        const bookCollection = books.map((book) => 
          <div class="book">
              <img class="book-thumbnailImage" src={book.imageUrl}/>
              <h3 class="book-title">{book.title}</h3>
              <h4 class="book-author">{book.author}</h4>
          </div>
        );

        return (
            <div class="userBookCollection">
              <h1>Available Books</h1>
                { bookCollection }
            </div>
        );
    }
}

export default AllBooks;