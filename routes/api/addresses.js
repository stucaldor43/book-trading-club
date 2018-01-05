const router = require("express").Router();
const Address = require("./../../models/Address");
const Client = require("./../../models/Client");
const jsonparser = require("body-parser").json();

router.get("/", async (req, res) => {
    const client = await Client
                        .query()
                        .where("display_name", req.session.username || req.ip)
                        .first();
    const address = await client
                        .$relatedQuery("address")
                        .first()
    res.json({ address });    
});

router.patch("/", jsonparser, async (req, res) => {
    const client = await Client
                            .query()
                            .where("display_name", req.session.username || req.ip)
                            .first();
    const address = await Address
                            .query()
                            .patch({
                                city: req.body.city || "",
                                state: req.body.state || ""
                            });
    res.json({ address });
});

module.exports = router;