import { ADD_TODO, POPULATE_TODOS, UPDATE_TODO } from './types';

// It's best to start as an object in case you have to add additional items to the store later (as in that case, you can just add a new key/value pair.)
const DEFAULT_STATE = {
	items: [],
};

// The reducer function receives the action object from actions.js and then checks the type. Based on the type, it performs the action to return a new state.
const reducer = (state = DEFAULT_STATE, action) => {
	switch (action.type) {
		case ADD_TODO:
// In redux we always return a new object, which is why we are copying the state in with ...state
			return { ...state, items: [...state.items, action.todo] };

		case POPULATE_TODOS:
			return { ...state, items: action.todos };

		case UPDATE_TODO: {
			const itemsCopy = [...state.items];
			itemsCopy[action.index] = action.todo;
			return { ...state, items: itemsCopy };
		}

		default:
			return state;
	}
};

export default reducer;