import { FETCH_TODOS, CREATE_TODO, TOGGLE_TODO } from './types';

//Controls are another type of action. Instead of updating the state directly, they can dispatch API requests.

// This is a control action creator. (Which returns an object that at minimum returns the type.):
export const fetchTodos = () => {
	return {
		type: FETCH_TODOS,
	};
};

export const createTodo = (title) => {
	return {
		type: CREATE_TODO,
		title,
	};
}

export const toggleTodo = (todo) => {
	return {
		type: TOGGLE_TODO,
		todo,
	};
};

// Control functions are run whenever we dispatch the control action. Each key should correspond to the action type.
export default {
	FETCH_TODOS() {
		return window
			.fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
			.then((response) => {
				if (response.ok) {
					return response.json();
				}
				// The default behavior of fetch would return the error in the try block (of our function in resolvers.js) instead of the catch block... so we have to manually set it up to throw an Error.
				throw new Error('Could not fetch todos');
			});
	},
	// Most of this code comes from the Creating a Resource section of the API we are using -- we get the object parameter from the action creator:
	CREATE_TODO({ title }) {
		return window
			.fetch('https://jsonplaceholder.typicode.com/todos', {
				method: 'POST',
				body: JSON.stringify({
					title,
					completed: false,
					userId: 1,
				}),
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
			})
			.then((response) => {
				if (response.ok) {
					return response.json();
				}
				throw new Error('Could not create todo.');
			});
	},
	// This is a patch request, mostly copied from the API docs. It will modify the completed option. (Which controls whether the checkbox is selected or not.)
	TOGGLE_TODO({ todo }) {
		return window
			.fetch(`https://jsonplaceholder.typicode.com/todos/${todo.id}`, {
				method: 'PATCH',
				body: JSON.stringify({
					// We set it to the opposite of what it currently is:
					completed: !todo.completed,
				}),
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
			})
			.then((response) => {
				if (response.ok) {
					return response.json();
				}
				throw new Error('Could not update todo.');
			});
	},
};
