import http from 'http';
import { app } from './src/services/public-holidays.service';

const server = http.createServer(app);

const port = 3000; // Replace this with the desired port number
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

