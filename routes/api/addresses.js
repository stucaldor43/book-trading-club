const router = require("express").Router();
const Address = require("./../../models/Address");
const Client = require("./../../models/Client");
const jsonparser = require("body-parser").json();

router.get("/", async (req, res) => {
    const client = await Client
                        .query()
                        // .select("client.first_name", "client.last_name")
                        .where("display_name", req.session.username || req.ip)
                        .first();
    const address = await client
                        .$relatedQuery("address")
                        .first()
    res.json({
        first_name: client.first_name,
        last_name: client.last_name,
        city: address.city,
        state: address.state
    });    
});

router.patch("/", jsonparser, async (req, res) => {
    const client = await Client
                            .query()
                            .where("display_name", req.session.username || req.ip)
                            .first();
    const address = await client
                            .$relatedQuery("address")
                            .first()
                            .patch({
                                city: req.body.city || "",
                                state: req.body.state || ""
                            });
    const fullName = await Client
                            .query()
                            .patchAndFetchById(client.id, {
                                first_name: req.body.first_name || "",
                                last_name: req.body.last_name || ""
                            })
    res.json({ address });
});

module.exports = router;