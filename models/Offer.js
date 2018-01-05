const Model = require("objection").Model;

class Offer extends Model {
    static get tableName() {
        return "offer";
    }
}

module.exports = Offer;