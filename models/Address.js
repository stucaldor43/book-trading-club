const Model = require("objection").Model;

class Address extends Model {
    static get tableName() {
        return "address";
    }

    static get relationMappings() {
        const Client = require("./Client");
        
        return {
            resident: {
                relation: Model.HasManyRelation,
                modelClass: Client,
                join: {
                    from: "address.id",
                    to: "client.fk_address_id"
                }
            }
        }
    }
}

module.exports = Address;