const router = require("express").Router();
const Client = require("./../../models/Client");
const { jsend } = require("./../../helpers/utils.js");

router.get("/:id", async (req, res) => {
    const client = await Client
                            .query()
                            .findById(req.params.id);
    if (!client) {
        return res.sendStatus(400);
    }
    res.json(jsend.success({client}));
});

router.post("/", async (req, res) => {
    const clientsWithSameName = await Client
                                        .query()
                                        .where("display_name", req.session.username || req.ip);
    if (clientsWithSameName.length > 0) {
        return res.sendStatus(400);
    }
    const newUser = await Client
                            .query()
                            .insert({display_name: req.session.username || req.ip})
    await newUser
            .$relatedQuery("address")
            .insert({});
    res.json(jsend.success({client: newUser}));
});

router.delete("/:id", async (req, res) => {
    const user = await Client
                        .query()
                        .where("display_name", req.session.username || req.ip)
                        .first();
    if (!user || (user.id !== Number(req.params.id))) {
        res.sendStatus(400);
    }
    await Client.query().deleteById(user.id);
    res.sendStatus(204);
});

module.exports = router;