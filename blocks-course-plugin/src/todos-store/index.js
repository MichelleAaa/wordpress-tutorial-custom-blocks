import { createReduxStore, register } from '@wordpress/data'; // To register a new store, you have to install the @wordpress/data package.
import reducer from './reducer';
import * as selectors from './selectors';
import * as actions from './actions';
import * as resolvers from './resolvers';
import controls from './controls';

const store = createReduxStore('blocks-course/todos', {
	reducer, // this is technically reducer: reducer - reducers are used to change the state of something in our store. It receives the old state and an action, and then returns the new state.
	selectors, // the selector is used to pull data from the store.
	actions, // the action is used to generate an action object, which is passed to the reducer, to perform a function.
	resolvers, //Selectors shouldn't call an API or have any side effects. So we are going to use resolvers in addition to the selector function.
	controls, //To send an API request in a resolver, we need to create controls.
});

register(store);