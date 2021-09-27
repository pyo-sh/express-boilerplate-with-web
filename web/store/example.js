import { createStore, actionCreator } from '@src/core/Store.js';

const initState = {
    test: 0,
};

export const [ TEST_ACTION, testAction ] = actionCreator('TEST_ACTION');

const testStore = createStore((state = initState, action = {}) => {
    switch(action.type) {
        default:
            return state;
    } 
});

export default testStore;
