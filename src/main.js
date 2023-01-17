import dotenv from 'dotenv';
import ejs from 'ejs';
import Hapi from '@hapi/hapi';
import Vision from '@hapi/vision';
import routes from './http/routes.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));

const init = async () => {
    const server = Hapi.server({
        host: process.env.APP_HOST,
        port: process.env.APP_PORT,
    });

    await server.register(Vision);

    server.route(routes);
    server.views({
        engines: {
            html: ejs,
        },
        relativeTo: __dirname,
        path: './views',
        layout: './layout',
    });

    await server.start();
    console.log(`Server running on ${server.info.uri}`);
}

init();
