import React from "react";
import withCollection from "./withCollection";

const AllBooks = withCollection('http://localhost:8080/api/book/?page=')
('http://localhost:8080/api/book/search')(false)(false);

export default AllBooks;