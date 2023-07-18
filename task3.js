import csvtojson from "csvtojson";
import fs from "fs";
import readline from "readline";

// Create a readline.Interface instance
const readInterface = readline.createInterface({
    input: fs.createReadStream('./csv/input.csv'),
    output: process.stdout,
    console: false
});

// Create a write stream
const writeStream = fs.createWriteStream('./txt/output.txt');

// Read and convert each line
readInterface.on('line', (line) => {
    csvtojson({ noheader: true, output: 'json' })
        .fromString(line)
        .then((jsonObj) => {
            // Write to the output file
            writeStream.write(JSON.stringify(jsonObj));
            writeStream.write('\n');
        })
        .catch((error) => console.error('CSV to JSON conversion error:', error));
});

readInterface.on('error', (error) => {
    console.error('Read error:', error);
});

writeStream.on('error', (error) => {
    console.error('Write error:', error);
});
