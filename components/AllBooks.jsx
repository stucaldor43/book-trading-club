import React from "react";
import withCollection from "./withCollection";
import { backend } from './../config';

const AllBooks = withCollection(`${backend.protocol}://${backend.domain}:${backend.port}/api/book/?page=`)
(`${backend.protocol}://${backend.domain}:${backend.port}/api/book/search`)(false)(false)(true);

export default AllBooks;