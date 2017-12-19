const router = require("express").Router();
const Book = require("./../../models/Book");
const jsonparser = require("body-parser").json();

router.get("/:id", async (req, res) => {
    const book = await Book
                        .query()
                        .findById(req.params.id)
    if (!book) {
    res.sendStatus(400)
    }
    res.sendStatus(204);
});

router.post("/", async (req, res) => {

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