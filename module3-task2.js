import { WithTime } from "./src/event-emiters/WithTime.js";
import fetch from "node-fetch";

const withTime = new WithTime();

withTime.on('begin', () => console.log('About to execute'));
withTime.on('end', () => console.log('Done with execute'));

async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

withTime.execute(fetchData, 'https://jsonplaceholder.typicode.com/posts/1')
    .then(data => console.log('Data:', data))
    .catch(err => console.error('Error:', err));

console.log(withTime.rawListeners("end"));
