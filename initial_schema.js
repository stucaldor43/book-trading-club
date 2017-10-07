module.exports.up = function(knex) {
  return knex.schema
    .createTableIfNotExists("address", (table) => {
        table.increments("id").primary();
        table.string("city");
        table.string("state");
    })
    .createTableIfNotExists("client", (table) => {
        table.increments("id").primary();
        table.string("first_name");
        table.string("last_name");
        table.string("display_name").notNullable().unique("display_name");
        table.integer("fk_address_id").unsigned().references("id").inTable("address");
    })
    .createTableIfNotExists("book", (table) => {
        table.increments("id").primary();
        table.integer("fk_client_id").unsigned().references("id").inTable("client").onDelete("CASCADE").notNullable();
    })
    .createTableIfNotExists("book_details", (table) => {
        table.increments("id").primary();
        table.string("author").notNullable();
        table.string("title").notNullable();
        table.string("cover_image_url").notNullable();
        table.integer("fk_book_id").unsigned().references("id").inTable("book").onDelete("CASCADE").notNullable();
    })
    .createTableIfNotExists("offer", (table) => {
        table.integer("requested_book").unsigned().references("id").inTable("book").onDelete("CASCADE").notNullable();
        table.integer("offered_book").unsigned().references("id").inTable("book").onDelete("CASCADE").notNullable();
        table.primary(["requested_book", "offered_book"]);
    })
};

module.exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists("offer")
        .dropTableIfExists("book")
        .dropTableIfExists("client")
        .dropTableIfExists("address")
        .dropTableIfExists("book_details")
};