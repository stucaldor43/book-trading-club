const Model = require("objection").Model;

class Client extends Model {
    static get tableName() {
        return "client";
    }

    static get relationMappings() {
        const Address = require("./Address");
        const Book = require("./Book");
        const Offer = require("./Offer");

        return {
            address: {
                relation: Model.BelongsToOneRelation,
                modelClass: Address,
                join: {
                    from: "client.fk_address_id",
                    to: "address.id"
                }
            },
            books_owned: {
                relation: Model.HasManyRelation,
                modelClass: Book,
                join: {
                    from: "client.id",
                    to: "book.fk_client_id"
                }
            }
        }
    }
}

module.exports = Client;