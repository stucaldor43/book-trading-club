const router = require("express").Router();

router.get("/", (req, res) => {
    res.send(req.session.username);
});

module.exports = router;