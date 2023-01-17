import qb from '../utils/knex.js';

const table = 'todos';

export default {
    async find(id) {
        return qb.from(table)
            .where({ id })
            .first()
            .then(todo => this.mapData(todo));
    },

    async getAll() {
        return qb.from(table)
            .orderBy('created_at', 'DESC')
            .then(res => res.map(todo => this.mapData(todo)));
    },

    async store(data) {
        return qb.insert({
                name: data.name,
                is_done: this.getDoneData(data),
            }).into(table);
    },

    async update(id, data) {
        return qb.table(table)
            .where({ id })
            .update({
                name: data.name,
                is_done: this.getDoneData(data),
                updated_at: qb.fn.now(),
            });
    },

    async delete(id) {
        return qb.table(table)
            .where({ id })
            .delete();
    },

    getDoneData(data) {
        if(data.is_done == undefined) return 0;
        return 1;
    },

    mapData(data) {
        if(data == undefined) return;

        return {
            id: data.id,
            name: data.name,
            is_done: data.is_done,
        }
    }
}
