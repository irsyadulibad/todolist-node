import qb from '../src/utils/knex.js';

const migrate = async () => {
    await qb.schema.dropTableIfExists('todos');

    await qb.schema.createTable('todos', function(table) {
        table.increments();
        table.string('name').notNullable();
        table.tinyint('is_done').notNullable().defaultTo(0);
        table.timestamps(true, true);
    });

    qb.destroy();
}

migrate();
console.log('Success migrate the database');
