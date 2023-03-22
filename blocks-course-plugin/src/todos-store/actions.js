import { dispatch } from '@wordpress/data';
import { ADD_TODO, POPULATE_TODOS, UPDATE_TODO } from './types';
import { createTodo, toggleTodo as toggleTodoControl } from './controls';//we re-name the function becuase we already have one with the same name in the file.

// The action is an object which has a type and any other arguments you need. So here, we need to pass in the todo parameter.
// Note that arrow functions can't be generator functions, which is why this was converted back to a normal function:
export function* addTodo(title) {
	try {
		const todo = yield createTodo(title);
		return {
			type: ADD_TODO,
			todo,
		};
	} catch (error) {
		return dispatch('core/notices').createErrorNotice(
			error.message || 'Could not create todo.'
		);
	}
}

export function* toggleTodo(todo, index) {
	try {
		// Loading is so we can disable the checkbox while we are waiting for the update:
		yield updateTodo({ ...todo, loading: true }, index);
		const updatedTodo = yield toggleTodoControl(todo);
		return updateTodo(updatedTodo, index);
	} catch (error) {
		return dispatch('core/notices').createErrorNotice(
			error.message || 'Could not update todo.'
		);
	}
}

export const updateTodo = (todo, index) => {
	return {
		type: UPDATE_TODO,
		index,
		todo,
	};
};

export const populateTodos = (todos) => {
	return {
		type: POPULATE_TODOS,
		todos,
	};
};