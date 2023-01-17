import todoRepo from '../../repos/todolist-repository.js';

export default {
    async index(_request, h) {
        return h.view('todo/index', {
            title: 'All',
            todos: await todoRepo.getAll(),
        });
    },

    create(_request, h) {
        return h.view('todo/create', {
            title: 'Create'
        });
    },

    async store(request, h) {
        await todoRepo.store(request.payload);
        return h.redirect('/todo');
    },

    async edit(request, h) {
        const todo = await todoRepo.find(request.params.todo);

        if(!todo) return h.redirect('/404');
        return h.view('todo/edit', {
            title: 'Edit Todo',
            todo
        });
    },

    async update(request, h) {
        const todo = await todoRepo.find(request.params.todo);

        if(!todo) return h.redirect('/404');
        todoRepo.update(todo.id, request.payload);

        return h.redirect('/todo');
    },

    async destroy(request, h) {
        await todoRepo.delete(request.params.todo);
        return h.redirect('/todo');
    },
};
