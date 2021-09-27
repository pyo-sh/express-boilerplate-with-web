import { observable } from '@src/lib/Observer.js';

export const createStore = (reducer) => {
    const state = observable(reducer());
    
    const frozenState = {};
    Object.keys(state).forEach(key => {
        Object.defineProperty(frozenState, key, {
            get: () => state[key],
        })
    });
    
    const dispatch = (action) => {
        const newState = reducer(state, action);

        Object.entries(newState).forEach(([key, value]) => {
            if (!(key in state)) return;
            state[key] = value;
        });
    }

    return { state: frozenState, dispatch };
};

export const actionCreator = (type) => {
    const action = (payload) => ({ type, payload });
    return [type, action];
};
