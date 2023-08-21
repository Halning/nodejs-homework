import { IncomingMessage, ServerResponse } from 'http';

export interface Users {
    id: number;
    name: string;
    email: string;
    hobbies: string[];
}

export const users: Users[] = [
    {
        id: 1,
        name: 'Ann',
        email: 'ann@google.com',
        hobbies: ['books', 'sport', 'dancing'],
    },
    {
        id: 2,
        name: 'Ben',
        email: 'ben@google.com',
        hobbies: ['series', 'sport'],
    },
];

export const getUsers = (req: IncomingMessage, res: ServerResponse) => {
    // Implementation for retrieving a list of users
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(
        JSON.stringify(users.map(({ id, name, email }) => ({ id, name, email })))
    );
};

export const getUserById = (req: IncomingMessage, res: ServerResponse, userId: string) => {
    // Implementation for retrieving a user by id
    const user = users.find((user) => user.id === parseInt(userId));
    if (!user) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Users not found' }));
    } else {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ id: user.id, name: user.name, email: user.email }));
    }
};

export const createUser = (req: IncomingMessage, res: ServerResponse) => {
    // Implementation for creating a new user
    // Sample JSON request body: { "name": "John", "email": "john@google.com" }
    let body = '';
    req.on('data', (chunk) => {
        body += chunk.toString();
    });
    req.on('end', () => {
        const newUser = JSON.parse(body) as Users;
        const nextId = users.length > 0 ? users[users.length - 1].id + 1 : 1;
        newUser.id = nextId;
        newUser.hobbies = [];
        users.push(newUser);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(newUser));
    });
};

export const deleteUser = (req: IncomingMessage, res: ServerResponse, userId: string) => {
    // Implementation for deleting a user by id
    const index = users.findIndex((user) => user.id === parseInt(userId));
    if (index === -1) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Users not found' }));
    } else {
        users.splice(index, 1);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Users deleted successfully' }));
    }
};

export const updateUser = (req: IncomingMessage, res: ServerResponse, userId: string) => {
    // Implementation for partially updating user properties
    const index = users.findIndex((user) => user.id === parseInt(userId));
    if (index === -1) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Users not found' }));
    } else {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const updatedFields = JSON.parse(body);
            users[index] = { ...users[index], ...updatedFields };
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(users[index]));
        });
    }
};