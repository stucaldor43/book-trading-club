const Model = require("objection").Model;

class Book extends Model {
    static get tableName() {
        return "book";
    }

    static get relationMappings() {
        const Client = require("./Client");
        const BookDetails = require("./BookDetails");
        
        return {
            metadata: {
                relation: Model.HasManyRelation,
                modelClass: BookDetails,
                join: {
                    from: "book.id",
                    to: "book_details.fk_book_id"
                }
            },
            owner: {
                relation: Model.BelongsToOneRelation,
                modelClass: Client,
                join: {
                    from: "book.fk_client_id",
                    to: "client.id"
                }
            }
        }
    }
}

module.exports = Book;