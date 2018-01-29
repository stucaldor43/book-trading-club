module.exports.up = function(knex) {
  return knex.schema
    .createTable("address", (table) => {
        table.increments("id").primary();
        table.string("city").defaultTo("");
        table.string("state").defaultTo("");
    })
    .createTable("client", (table) => {
        table.increments("id").primary();
        table.string("first_name");
        table.string("last_name");
        table.string("display_name").notNullable().unique("display_name");
        table.integer("fk_address_id").unsigned().references("id").inTable("address").onDelete("RESTRICT");
    })
    .createTable("book", (table) => {
        table.increments("id").primary();
        table.integer("fk_client_id").unsigned().references("id").inTable("client").onDelete("CASCADE").notNullable();
    })
    .createTable("book_details", (table) => {
        table.increments("id").primary();
        table.string("author").notNullable();
        table.string("title").notNullable();
        table.string("cover_image_url").notNullable();
        table.text("description");
        table.integer("fk_book_id").unsigned().references("id").inTable("book").onDelete("CASCADE").notNullable();
    })
    .createTable("offer", (table) => {
        table.increments("id").primary();
        table.integer("requested_book").unsigned().references("id").inTable("book").onDelete("CASCADE").notNullable();
        table.integer("offered_book").unsigned().references("id").inTable("book").onDelete("CASCADE").notNullable();
    })
    .catch((reason) => console.log(reason));
};

module.exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists("offer")
        .dropTableIfExists("book_details")
        .dropTableIfExists("book")
        .dropTableIfExists("client")
        .dropTableIfExists("address")
        .dropTableIfExists("sessions")
        .catch((reason) => console.log(reason));
};