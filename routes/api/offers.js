const router = require("express").Router();
const Book = require("./../../models/Book");
const BookDetails = require("./../../models/BookDetails");
const Client = require("./../../models/Client");
const jsonparser = require("body-parser").json();
const Offer = require("./../../models/Offer");

router.get("/requests_received", async (req, res) => {
    const user = await Client
                        .query()
                        .where("display_name", req.session.username || req.ip)
                        .first();
    const offers = await Book
                        .query()
                        .select('bk.author as requested_book_author',
                        'bk.title as requested_book_title', 'bk.cover_image_url as requested_book_cover_image_url',
                        'bk.description as requested_book_description' , 'bk2.author as offered_book_author',
                        'bk2.title as offered_book_title', 'bk2.cover_image_url as offered_book_cover_image_url',
                        'bk2.description as offered_book_description')
                        .join("offer", "book.id", "requested_book")
                        .join('book_details as bk', 'requested_book', 'bk.fk_book_id')
                        .join('book_details as bk2', 'offered_book', 'bk2.fk_book_id')
                        .where("book.fk_client_id", user.id)
    res.json({ offers });
});

router.get("/proposals", async (req, res) => {
    const user = await Client
                        .query()
                        .where("display_name", req.session.username || req.ip)
                        .first();
    const offers = await Book
                        .query()
                        .select('bk.author as requested_book_author',
                        'bk.title as requested_book_title', 'bk.cover_image_url as requested_book_cover_image_url',
                        'bk.description as requested_book_description' , 'bk2.author as offered_book_author',
                        'bk2.title as offered_book_title', 'bk2.cover_image_url as offered_book_cover_image_url',
                        'bk2.description as offered_book_description')
                        .join("offer", "book.id", "offered_book")
                        .join('book_details as bk', 'requested_book', 'bk.fk_book_id')
                        .join('book_details as bk2', 'offered_book', 'bk2.fk_book_id')
                        .where("book.fk_client_id", user.id)
    res.json({ offers });
});

router.post("/", jsonparser, async (req, res) => {
    const { requested_book_id, offered_book_id } = req.body;
    const booksInOffer = await Book
                            .query()
                            .whereIn("id", [r_book_id, o_book_id])
    if (booksInOffer.length !== 2) {
        res.sendStatus(400);
    }
    const offer = await Offer
                        .query()
                        .insert({offered_book: offered_book_id, requested_book: requested_book_id})
    res.json({ offer });
});

module.exports = router;