import React from "react";
import withCollection from "./withCollection";
import { backend } from './../config';

const MyBooks = withCollection(`${backend.protocol}://${backend.domain}:${backend.port}/api/book/mybooks/?page=`)
(`${backend.protocol}://${backend.domain}:${backend.port}/api/book/mybooks/search`)(true)(true)(false);

export default MyBooks;