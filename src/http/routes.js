import todoList from "./controllers/todolist-controller.js";

export default [
    {
        method: 'GET',
        path: '/',
        handler: (_request, h) => h.view('index', { title: 'Dashboard' }),
    },
    {
        method: 'GET',
        path: '/todo',
        handler: todoList.index,
    },
    {
        method: 'GET',
        path: '/todo/create',
        handler: todoList.create,
    },
    {
        method: 'POST',
        path: '/todo',
        handler: todoList.store,
    },
    {
        method: 'GET',
        path: '/todo/{todo}/edit',
        handler: todoList.edit,
    },
    {
        method: 'POST',
        path: '/todo/{todo}',
        handler: todoList.update,
    },
    {
        method: 'GET',
        path: '/todo/{todo}/delete',
        handler: todoList.destroy,
    },
];
