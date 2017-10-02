module.exports.up = function(knex) {
  return knex.schema
    .createTable("address", (table) => {
        table.increments("id").primary();
        table.string("city");
        table.string("state");
    })
    .createTable("client", (table) => {
        table.increments("id").primary();
        table.string("first_name");
        table.string("last_name");
        table.string("display_name").notNullable().unique("display_name");
        table.integer("fk_address_id").unsigned().references("id").inTable("address");
    })
    .createTable("book", (table) => {
        table.increments("id").primary();
        table.string("author").notNullable();
        table.string("title").notNullable();
        table.string("cover_image_url").notNullable();
        table.integer("fk_client_id").unsigned().references("id").inTable("client").onDelete("CASCADE").notNullable();
    })
    .createTable("offer", (table) => {
        table.integer("fk_book_id").unsigned().references("id").inTable("book").onDelete("CASCADE").notNullable();
        table.integer("fk_book_id2").unsigned().references("id").inTable("book").onDelete("CASCADE").notNullable();
        table.integer("fk_client_id").unsigned().references("id").inTable("client").onDelete("CASCADE").notNullable();
        table.integer("fk_client_id2").unsigned().references("id").inTable("client").onDelete("CASCADE").notNullable();
        table.primary(["fk_book_id", "fk_book_id2", "fk_client_id", "fk_client_id2"]);
    })
};

module.exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists("offer")
        .dropTableIfExists("book")
        .dropTableIfExists("client")
        .dropTableIfExists("address")
};