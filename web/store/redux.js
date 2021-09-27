import * as example from '@src/store/example.js';

function combineReducers(stores) {
    const matchDispatch = new Map();
    const totalStore = {};
    const totalDispatch = {};
    Object.entries(stores).map(([storeName, store]) => {
        // action은 useDispatch에서 어떤 store를 참조할 것인지 알아야 한다.
        Object.values(store).forEach((attr) => {
            if(attr?.name === "action" && (typeof attr === 'function'))
                matchDispatch.set(attr('').type, storeName);
        });
        // totalStore, totalDispatch를 통해 store들 접근
        const { state, dispatch } = store.default;
        totalStore[storeName] = state || {};
        totalDispatch[storeName] = dispatch;
    });

    // 전체 state에서 접근할 수 있도록...?
    const useSelector = (callback) => {
        const result = callback(totalStore);
        if(result === undefined) throw 'Redux : Invalid State!';
        return result;
    };

    const useDispatch = () => (action) => {
        if(!('type' in action)) throw 'Redux : Invalid Action!';

        const storeName = matchDispatch.get(action.type);
        if(!storeName || !(storeName in totalDispatch)) throw 'Redux : Unknown Action!';
        totalDispatch[storeName](action);
    };

    return { useSelector, useDispatch };
}

export const {
    useSelector,
    useDispatch
}   = combineReducers({
        example,
    });
