const router = require("express").Router();
const Book = require("./../../models/Book");
const BookDetails = require("./../../models/BookDetails");
const Client = require("./../../models/Client");
const jsonparser = require("body-parser").json();
const Offer = require("./../../models/Offer");

router.get("/", async (req, res) => {
    const bookTotal = (await Book
                        .query()
                        .distinct('title', 'author')
                        .select('book_details.author',
                        'book_details.title', 'book_details.cover_image_url',
                        'book_details.description')
                        .join('book_details', 'book.id', 'book_details.fk_book_id')).length;
    const maxRecordsPerPage = 20;
    const totalPages = Math.max((bookTotal % maxRecordsPerPage === 0) ? bookTotal / maxRecordsPerPage: Math.floor(bookTotal / maxRecordsPerPage) + 1 , 1);                    
    const page = req.query.page || 1;
    const books = await Book
                        .query()
                        .distinct('title', 'author')
                        .select('book.id as id', 'book_details.author',
                        'book_details.title', 'book_details.cover_image_url',
                        'book_details.description')
                        .join('book_details', 'book.id', 'book_details.fk_book_id')
                        .offset((page - 1) * maxRecordsPerPage)
                        .limit(maxRecordsPerPage)
    if (!books) {
        res.sendStatus(400)
    }
    res.json(Object.assign({}, { books, totalPages }));
});

router.get("/mybooks", async(req, res) => {
    const user = await Client
                        .query()
                        .where("display_name", req.session.username || req.ip)
                        .first();
    const bookTotal = (await Book
        .query()
        .distinct('title', 'author')
        .select('book_details.author',
        'book_details.title', 'book_details.cover_image_url',
        'book_details.description')
        .join('book_details', 'book.id', 'book_details.fk_book_id')
        .where('fk_client_id', user.id)).length;
    const maxRecordsPerPage = 20;
    const totalPages = Math.max((bookTotal % maxRecordsPerPage === 0) ? bookTotal / maxRecordsPerPage: Math.floor(bookTotal / maxRecordsPerPage) + 1 , 1);                    
    const page = req.query.page || 1;
    const books = await Book
            .query()
            .distinct('title', 'author')
            .select('book.id as id', 'book_details.author',
            'book_details.title', 'book_details.cover_image_url',
            'book_details.description')
            .join('book_details', 'book.id', 'book_details.fk_book_id')
            .where('fk_client_id', user.id)
            .offset((page - 1) * maxRecordsPerPage)
            .limit(maxRecordsPerPage)
    if (!books) {
        res.sendStatus(400)
    }
    res.json(Object.assign({}, { books, totalPages }));
});

router.get("/mybooks/search", async(req, res) => {
    const user = await Client
                        .query()
                        .where("display_name", req.session.username || req.ip)
                        .first();
    const bookTotal = (await Book
        .query()
        .distinct('title', 'author')
        .select('book_details.author',
        'book_details.title', 'book_details.cover_image_url',
        'book_details.description')
        .join('book_details', 'book.id', 'book_details.fk_book_id')
        .where('fk_client_id', user.id)
        .where("title", "ilike", (req.query.term.trim().length < 1) ? '' : `%${ req.query.term }%`)).length;
    const maxRecordsPerPage = 20;
    const totalPages = Math.max((bookTotal % maxRecordsPerPage === 0) ? bookTotal / maxRecordsPerPage: Math.floor(bookTotal / maxRecordsPerPage) + 1 , 1);                    
    const page = req.query.page || 1;
    const items = await Book
            .query()
            .distinct('title', 'author')
            .select('book.id as id', 'book_details.author',
            'book_details.title', 'book_details.cover_image_url',
            'book_details.description')
            .join('book_details', 'book.id', 'book_details.fk_book_id')
            .where('fk_client_id', user.id)
            .where("title", "ilike", (req.query.term.trim().length < 1) ? '' : `%${ req.query.term }%`)
            .offset((page - 1) * maxRecordsPerPage)
            .limit(maxRecordsPerPage)
    if (!items) {
    res.sendStatus(400)
    }
    res.json(Object.assign({}, { items, totalPages }));
});

router.get("/search", async(req, res) => {
    const user = await Client
                        .query()
                        .where("display_name", req.session.username || req.ip)
                        .first();
    const bookTotal = (await Book
        .query()
        .distinct('title', 'author')
        .select('book_details.author',
        'book_details.title', 'book_details.cover_image_url',
        'book_details.description')
        .join('book_details', 'book.id', 'book_details.fk_book_id')
        .where("title", "ilike", (req.query.term.trim().length < 1) ? '' : `%${ req.query.term }%`)
        .andWhere('book.fk_client_id', req.query.owned_books_only ? '=' : '>=', req.query.owned_books_only ? user.id : 0)).length;
    const maxRecordsPerPage = 20;
    const totalPages = Math.max((bookTotal % maxRecordsPerPage === 0) ? bookTotal / maxRecordsPerPage: Math.floor(bookTotal / maxRecordsPerPage) + 1 , 1);                    
    const page = req.query.page || 1;
    const items = await Book
            .query()
            .distinct('title', 'author')
            .select('book.id as id', 'book_details.author',
            'book_details.title', 'book_details.cover_image_url',
            'book_details.description')
            .join('book_details', 'book.id', 'book_details.fk_book_id')
            .where("title", "ilike", (req.query.term.trim().length < 1) ? '' : `%${ req.query.term }%`)
            .andWhere('book.fk_client_id', req.query.owned_books_only ? '=' : '>=', req.query.owned_books_only ? user.id : 0)
            .offset((page - 1) * maxRecordsPerPage)
            .limit(maxRecordsPerPage)
    if (!items) {
    res.sendStatus(400)
    }
    res.json(Object.assign({}, { items, totalPages }));
});

router.get("/:id", async (req, res) => {
    const book = await Book
                        .query()
                        .select('book_details.author',
                        'book_details.title', 'book_details.cover_image_url',
                        'book_details.description')
                        .join('book_details', 'book.id', 'book_details.fk_book_id')
                        .where('book.id', req.params.id)
    if (!book) {
        res.sendStatus(400)
    }
    res.json({ book });
});

router.post("/trade", jsonparser, async (req, res) => {
    const tradeProposer = await Client
                                    .query()
                                    .where("display_name", req.body.tradeProposerName)
                                    .first();
    const tradeConfirmer = await Client
                                    .query()
                                    .where("display_name", req.session.username || req.ip)
                                    .first();
    const proposedOffer = await Offer
                                    .query()
                                    .where("requested_book", req.body.tradeConfirmerBookId)
                                    .andWhere("offered_book", req.body.tradeProposerBookId)
                                    .first();
    if (proposedOffer) { res.sendStatus(403);}
    await Book
            .query()
            .patch({fk_client_id: tradeProposer.id})
            .where("id", req.body.tradeConfirmerBookId);
    await Book
            .query()
            .patch({fk_client_id: tradeConfirmer.id})
            .where("id", req.body.tradeProposerBookId);
    await Offer
            .query()
            .delete()
            .where("requested_book", req.body.tradeConfirmerBookId)
            .orWhere("requested_book", req.body.tradeProposerBookId)
            .orWhere("offered_book", req.body.tradeConfirmerBookId)
            .orWhere("offered_book", req.body.tradeProposerBookId)
});

router.get("/:id/owners", async (req, res) => {
    const user = await Client
                        .query()
                        .where("display_name", req.session.username || req.ip)
                        .first();
    const book = await Book
                        .query()
                        .findById(req.params.id);
    const details = await book.$relatedQuery("metadata").first();
    const bookTotal = (await Book
                            .query()
                            .select("*")
                            .join('client', 'book.fk_client_id', 'client.id')
                            .join('book_details', 'book.id', 'book_details.fk_book_id')
                            .where('author', details.author)
                            .andWhere('title', details.title)
                            .whereNot('client.id', user.id)).length
    const maxRecordsPerPage = 20;
    const totalPages = Math.max((bookTotal % maxRecordsPerPage === 0) ? bookTotal / maxRecordsPerPage: Math.floor(bookTotal / maxRecordsPerPage) + 1 , 1);                    
    const page = req.query.page || 1;
    const owners = await Book
                            .query()
                            .select("*")
                            .join('client', 'book.fk_client_id', 'client.id')
                            .join('book_details', 'book.id', 'book_details.fk_book_id')
                            .where('author', details.author)
                            .andWhere('title', details.title)
                            .whereNot('client.id', user.id)
                            .offset((page - 1) * maxRecordsPerPage)
                            .limit(maxRecordsPerPage)
                            // .whereNot("display_name", req.session.username);
    res.json({ owners, totalPages });
});

router.post("/", jsonparser, async (req, res) => {
    const user = await Client
                        .query()
                        .where("display_name", req.session.username || req.ip)
                        .first();
    if (!user) { res.sendStatus(403) };
    const bookIsAlreadyOwnedByuser = ((await Book
            .query()
            .select('*')
            .join('book_details', 'book.id', 'book_details.fk_book_id')
            .where('book.fk_client_id', user.id)
            .andWhere('title', req.body.title)
            .andWhere('author', req.body.author)).length > 0) ? true : false
    if (bookIsAlreadyOwnedByuser) { res.sendStatus(403) };
    const ownedBooks = await user
                                .$relatedQuery("books_owned")
                                .insert({fk_client_id: user.id});
    const data = await ownedBooks
                        .$relatedQuery("metadata")
                        .insert({
                            author: req.body.author,
                            title: req.body.title,
                            cover_image_url: req.body.book_thumbnail_url || 'http://via.placeholder.com/128x212',
                            description: req.body.description || ""
                        });
    res.json({ data });
});

router.delete("/:id", async (req, res) => {
    const book = await Book
                        .query()
                        .deleteById(req.params.id)
    if (!book) {
        res.sendStatus(400)
    }
    res.sendStatus(204);
});

module.exports = router;