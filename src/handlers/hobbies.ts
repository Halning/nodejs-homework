import { IncomingMessage, ServerResponse } from 'http';
import { users } from "./users";

export const getUserHobbies = (req: IncomingMessage, res: ServerResponse, userId: string) => {
    // Implementation for retrieving a list of user hobbies
    const user = users.find((user) => user.id === parseInt(userId));
    if (!user) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'User not found' }));
    } else {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(user.hobbies));
    }
};

export const addHobby = (req: IncomingMessage, res: ServerResponse, userId: string) => {
    // Implementation for adding a hobby for a specific user
    const user = users.find((user) => user.id === parseInt(userId));
    if (!user) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'User not found' }));
    } else {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const newHobby = JSON.parse(body) as string;
            user.hobbies.push(newHobby);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(user.hobbies));
        });
    }
};

export const deleteHobby = (
    req: IncomingMessage,
    res: ServerResponse,
    userId: string,
    hobbyId: string
) => {
    // Implementation for deleting a hobby for a specific user
    const user = users.find((user) => user.id === parseInt(userId));
    if (!user) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'User not found' }));
    } else {
        const index = user.hobbies.indexOf(hobbyId);
        if (index === -1) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Hobby not found for the user' }));
        } else {
            user.hobbies.splice(index, 1);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(user.hobbies));
        }
    }
};
