export class EventEmitter {
    listeners = {};  // key-value pair

    addListener(eventName, fn) {
        if (!this.listeners[eventName]) {
            this.listeners[eventName] = [];
        }
        this.listeners[eventName].push(fn);
        return this;
    }

    on(eventName, fn) {
        return this.addListener(eventName, fn);
    }

    removeListener(eventName, fn) {
        let listeners = this.listeners[eventName];
        if (!listeners) return this;
        for(let i = 0; i < listeners.length; i++){
            if(listeners[i] === fn){
                listeners.splice(i,1);
                i--;
            }
        }
        return this;
    }

    off(eventName, fn) {
        return this.removeListener(eventName, fn);
    }

    once(eventName, fn) {
        const onceWrapper = (...args) => {
            fn.apply(this, args);
            this.off(eventName, onceWrapper);
        }
        return this.on(eventName, onceWrapper);
    }

    emit(eventName, ...args) {
        let listeners = this.listeners[eventName];
        if (!listeners) return false;
        listeners.forEach((listener) => {
            listener.apply(this, args);
        });
        return true;
    }

    listenerCount(eventName) {
        let listeners = this.listeners[eventName] || [];
        return listeners.length;
    }

    rawListeners(eventName) {
        return this.listeners[eventName];
    }
}
