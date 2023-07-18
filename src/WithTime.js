import { EventEmitter } from "./EventEmitter.js";

export class WithTime extends EventEmitter {
    async execute(asyncFunc, ...args) {
        this.emit('begin');
        console.time('execute');
        const data = await asyncFunc(...args);
        console.timeEnd('execute');
        this.emit('end');
        return data;
    }
}
