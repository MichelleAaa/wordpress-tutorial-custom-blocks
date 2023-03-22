export const getTodos = (state) => {
	return state.items;
};

// note that if you go into the console in the editor (with this plugin already activated) - wp.data.select('blocks-course/todos') -- now you can see the getTodos method is available.

// These were added for the to-dos-list plugin: (Most of the rest of the code for this plugin was created to back up the to-dos block plugin.)
export const getTodosNumber = (state) => {
	return state.items.length;
};

export const getDoneTodos = (state) => {
	return state.items.filter((todo) => todo.completed).length;
};
// In the console in the editor these could be accessed like: wp.data.select('blocks-course/todos').getDoneTodosNumber() - it will output the number of todos that are checked.

export const getUnDoneTodos = (state) => {
	return state.items.filter((todo) => !todo.completed).length;
};

