import { parse } from 'url';
import {
    getUsers,
    getUserById,
    createUser,
    deleteUser,
    updateUser,
} from './handlers/users';
import * as http from "http";
import {IncomingMessage, ServerResponse} from "http";
import { addHobby, deleteHobby, getUserHobbies } from "./handlers/hobbies";

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    const { pathname } = parse(req.url!, true);

    if (pathname === null) {
        return;
    }

    // User endpoints
    if (pathname === '/users' && req.method === 'GET') {
        return getUsers(req, res);
    }

    if (pathname.startsWith('/users/') && req.method === 'GET') {
        const userId = pathname.split('/')[2];
        return getUserById(req, res, userId);
    }

    if (pathname === '/users' && req.method === 'POST') {
        return createUser(req, res);
    }

    if (pathname.startsWith('/users/') && req.method === 'DELETE') {
        const userId = pathname.split('/')[2];
        return deleteUser(req, res, userId);
    }

    if (pathname.startsWith('/users/') && req.method === 'PATCH') {
        const userId = pathname.split('/')[2];
        return updateUser(req, res, userId);
    }

    // Hobby endpoints
    if (pathname.startsWith('/users/') && pathname.endsWith('/hobbies') && req.method === 'GET') {
        const userId = pathname.split('/')[2];
        return getUserHobbies(req, res, userId);
    }

    if (pathname.startsWith('/users/') && pathname.endsWith('/hobbies') && req.method === 'POST') {
        const userId = pathname.split('/')[2];
        return addHobby(req, res, userId);
    }

    if (pathname.startsWith('/users/') && pathname.includes('/hobbies/') && req.method === 'DELETE') {
        const [userId, hobbyId] = pathname.split('/').slice(2);
        return deleteHobby(req, res, userId, hobbyId);
    }

    // Handle unknown routes
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Route not found' }));
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
