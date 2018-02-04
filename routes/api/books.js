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
    const totalPages = Math.max((bookTotal % 20 === 0) ? bookTotal / 20: Math.floor(bookTotal / 20) + 1 , 1);                    
    const page = req.query.page || 1;
    const maxRecordsPerPage = 20;
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


router.get("/search", async(req, res) => {
    const bookTotal = (await Book
        .query()
        .distinct('title', 'author')
        .select('book_details.author',
        'book_details.title', 'book_details.cover_image_url',
        'book_details.description')
        .join('book_details', 'book.id', 'book_details.fk_book_id')
        .where("title", "ilike", (req.query.term.trim().length < 1) ? '' : `%${ req.query.term }%`)).length;
    const totalPages = Math.max((bookTotal % 20 === 0) ? bookTotal / 20: Math.floor(bookTotal / 20) + 1 , 1);                    
    const page = req.query.page || 1;
    const maxRecordsPerPage = 20;
    const items = await Book
            .query()
            .distinct('title', 'author')
            .select('book.id as id', 'book_details.author',
            'book_details.title', 'book_details.cover_image_url',
            'book_details.description')
            .join('book_details', 'book.id', 'book_details.fk_book_id')
            .where("title", "ilike", (req.query.term.trim().length < 1) ? '' : `%${ req.query.term }%`)
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

router.patch("/trade", jsonparser, async (req, res) => {
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
            .andWhere("offered_book", req.body.tradeProposerBookId);
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
    const owners = await Book
                            .query()
                            .select("*")
                            .join('client', 'book.fk_client_id', 'client.id')
                            .join('book_details', 'book.id', 'book_details.fk_book_id')
                            .where('author', details.author)
                            .andWhere('title', details.title)
                            // .whereNot("display_name", req.session.username);
    res.json({ owners });
});

router.post("/", jsonparser, async (req, res) => {
    const user = await Client
                        .query()
                        .where("display_name", req.session.username || req.ip)
                        .first();
    if (!user) { res.sendStatus(403) };
    const ownedBooks = await user
                                .$relatedQuery("books_owned")
                                .insert({fk_client_id: user.id});
    const data = await ownedBooks
                        .$relatedQuery("metadata")
                        .insert({
                            author: req.body.author,
                            title: req.body.title,
                            cover_image_url: req.body.book_thumbnail_url,
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