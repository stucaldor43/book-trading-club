const router = require("express").Router();
const { jsend } = require("./../../helpers/utils");
const Client = require("./../../models/Client");
const jsonparser = require("body-parser").json();
const bcrypt = require("bcrypt");

const allowOrigin = (req, res, next) => {
    res.set({
        "Access-Control-Allow-Origin": "http://localhost:8081",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE"
    });
    next();
};
router.use(allowOrigin);
router.post("/register", jsonparser, async (req, res) => {
    const clientsWithSameName = await Client
                                        .query()
                                        .where("display_name", req.body.username || req.ip);
    if (clientsWithSameName.length > 0) {
        return res.sendStatus(400);
    }
    const saltRounds = 10;
    bcrypt.hash(req.body.password, saltRounds, async (err, hashedPassword) => {
        if (err) {
            console.log(err)
            res.sendStatus(500)
        }
        const newUser = await Client
            .query()
            .insert({
                display_name: req.body.username || req.ip,
                password: hashedPassword
            });
        await newUser
            .$relatedQuery("address")
            .insert({});
        res.sendStatus(200);
    });
});
router.post("/login", jsonparser, async (req, res) => {
    const user = await Client
                        .query()
                        .where("display_name", req.body.username)
                        .first();
    if (!user) {
        res.sendStatus(401);
        return;
    }
    bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (!result) {
            res.sendStatus(401);
            return;
        }
        req.session.username = user.screen_name;
        res.sendStatus(200);
    });
});
router.use("/client", require("./clients"));
router.use("/address", require("./addresses"));
router.use("/book", require("./books"));
router.use("/bookdetails", require("./book_details"));
router.use("/offer", require("./offers"))
module.exports = router;