const Model = require("objection").Model;

class BookDetails extends Model {
    static get tableName() {
        return "book_details";
    }

    static get relationMappings() {
        const Book = require("./Book");

        return {
            book: {
                relation: Model.BelongsToOneRelation,
                modelClass: Book,
                join: {
                    from: "book_details.fk_book__id",
                    to: "book.id"
                }
            }
        };
    }
}

module.exports = BookDetails;