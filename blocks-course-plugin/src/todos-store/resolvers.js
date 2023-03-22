import { dispatch } from '@wordpress/data';
import { fetchTodos } from './controls';
import { populateTodos } from './actions';

export function* getTodos() {

	try {
		const todos = yield fetchTodos();
	// the code will stop after the execution of the fetchTodos() due to the yield statement, waiting for it to finish, before moving onto the return line:

	// After the fetch is completed, we have the todos. We then have to call populateTodos to call another action creator object to be created, and pass in the todos data, so the state can be updated by the reducer.
		return populateTodos(todos);
	} catch (error) {

		// wp.data.dispatch('core/notices').createErrorNotice('error message here') -- this is how you could access the same function from the console in the editor screen. It will create an error notice at the top of the panel with your text. 
		return dispatch('core/notices').createErrorNotice(
			error.message || 'Could not fetch todos.'
		);
	}
}

//The function in resolvers has to have the same name as the one in selectors.js, as it's going to handle the side-effects/API calls that the function in selectors isn't allowed to do.
//with function* getTodos() - the resolver function will run whenever the selector function getTodos() runs. -- function* is a generator function. It's a function that can stop its execution at a certain point, and then can continue again later. It's useful when working with API's. 

//To send an API request in a resolver, we need to create controls.

//The data that comes back from the API request, and is now in our custom store, can be accessed in the editor screen console with:
//wp.data.select('blocks-course/todos').getTodos()