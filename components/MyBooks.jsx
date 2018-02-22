import React from "react";
import withCollection from "./withCollection";

const MyBooks = withCollection('http://localhost:8080/api/book/mybooks/?page=')
('http://localhost:8080/api/book/mybooks/search')(true)(true);

export default MyBooks;