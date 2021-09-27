class Observer{
    constructor() {
        this.currentObserver = null;
        return {
            observe: this.observe.bind(this),
            observable: this.observable.bind(this),
        }
    }
    observe(callback){
        this.currentObserver = callback;
        callback();
        this.currentObserver = null;
    }
    observable(state){
        Object.keys(state).forEach((key) => {
            let closureValue = state[key];
            const observers = new Set();
    
            Object.defineProperty(state, key, {
                get: (() => {
                    if (this.currentObserver) observers.add(this.currentObserver);
                    return closureValue;
                }).bind(this),
                set(updateValue) {
                    if (closureValue === updateValue) return;
                    if (JSON.stringify(closureValue) === JSON.stringify(updateValue)) return;
                    closureValue = updateValue;
                    observers.forEach(fn => fn());
                }
            })
        });
        return state;
    }
}

export const { observe, observable } = new Observer();
