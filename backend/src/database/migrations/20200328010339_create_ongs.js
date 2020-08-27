
exports.up = function(knex) {//Up é oq quero q seja feito
    return knex.schema.createTable('ongs', (table) => {
        table.string('id').primary()
        table.string('name').notNullable()
        table.string('email').notNullable()
        table.string('whatsapp').notNullable()
        table.string('city').notNullable()
        table.string('uf', 2).notNullable()
    })
  
};

exports.down = function(knex) {//Down é oq fazer se o up der pau
  return knex.schema.dropTable('ongs')
};
