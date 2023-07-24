const os = require('os');
const fs = require('fs');
const { exec } = require('child_process');
const logPath = 'activityMonitor.log';

function getCommand() {
    switch (os.type()) {
        case 'Windows_NT':
            return 'powershell "Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object { $_.Name + \' \' + $_.CPU + \' \' + $_.WorkingSet }"';
        case 'Linux':
        case 'Darwin': // macOS
            return 'ps -A -o %cpu,%mem,comm | sort -nr | head -n 1';
        default:
            console.error('Unsupported OS');
            process.exit(1);
    }
}

function refresh() {
    exec(getCommand(), (err, stdout, stderr) => {
        if (err) {
            console.error(err);
            return;
        }

        const output = stdout.trim();
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        process.stdout.write(output);

        const now = Math.floor(new Date().getTime() / 1000); // Unix time
        if (now % 60 === 0) { // Once per minute
            fs.appendFileSync(logPath, `${now} : ${output}\n`);
        }
    });
}

setInterval(refresh, 100); // Refresh 10 times per second