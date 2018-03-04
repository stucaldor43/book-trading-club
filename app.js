const express = require("express");
const app = express();
const objection = require("objection");
const Model = objection.Model;
const Knex = require("knex");
const knexOptions = require("./knexfile.js");

const knex = Knex(knexOptions);
const createTables = require("./initial_schema.js").up;
Model.knex(knex);

// const test = async () => {
//     const Address = require("./models/Address");
//     const myAddress = await Address
//                         .query()
//                         .insert({city: "Central Islip", state: "NY"});
//     return console.log(myAddress.city);                               
// };

const initDB = async () => {
    await createTables(knex);
    // test();
    return console.log("Database Initialized");
}
initDB();

const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);
const store = new KnexSessionStore({
    knex: knex,
    tablename: "sessions",
    createtable: true
});
app.use("/", session({
    name: "app.sid",
    secret: process.env.BOOK_TRADING_APP_SERVER_SECRET,
    resave: false,
    saveUninitialized: false,
    store
}));
app.use("/", require("./routes"));
app.listen(process.env.PORT || 8080);