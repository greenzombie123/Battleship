export default class EventEmitter {
    constructor() {
      this.listeners = {};
    }
  
    on(event, listener) {
      if (!this.listeners[event]) {
        this.listeners[event] = [];
      }
      this.listeners[event].push(listener);
    }
  
    emit(event, ...args) {
      const eventListeners = this.listeners[event];
      if (eventListeners) {
        eventListeners.forEach(listener => {
          listener(...args);
        });
      }
    }
  
    off(event, listener) {
      const eventListeners = this.listeners[event];
      if (eventListeners) {
        this.listeners[event] = eventListeners.filter(l => l !== listener);
      }
    }
  }