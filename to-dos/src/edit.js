import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { useBlockProps } from '@wordpress/block-editor';
import { CheckboxControl, TextControl, Button } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import './editor.scss';

export default function Edit() {
	const [newTodo, setNewTodo] = useState('');
	const [addingTodo, setAddingTodo] = useState(false);

	// Get the todos from the store in the other plugin (in the blocks-course-plugin folder -- which must also be activated in wp-admin panel for this second plugin to work):
	const todos = useSelect((select) => {
		const todosStore = select('blocks-course/todos');
// If the other plugin isn't on, then we don't have an answer from todosStore, so it won't move on to try to call the getTodos().
		return todosStore && todosStore.getTodos();
	}, []);
	const actions = useDispatch('blocks-course/todos');
	const addTodo = actions && actions.addTodo; // before calling actions.addTodo we ensure that addTodo is true, aka there was a response.
	const toggleTodo = actions && actions.toggleTodo;
	return (
		<div {...useBlockProps()}>
{/* If there's no todos, aka the other plugin isn't working, we get an error message: */}
			{!todos && (
				<p>
					{__(
						'Please make sure your plugin is activated',
						'blocks-course-todo-list'
					)}
				</p>
			)}
			{todos && (
				<>
					<ul>
						{todos.map((todo, index) => (
							<li
								key={todo.id}
								className={todo.completed && 'todo-completed'}
							>
		{/* For each todo we display a checkbox */}
								<CheckboxControl
									disabled={todo.loading}
									label={todo.title}
									checked={todo.completed}
									onChange={() => {
										// The plugin for the API call could be disabled, so first we check if it's true:
										if (toggleTodo) {
											toggleTodo(todo, index);
										}
									}}
								/>
							</li>
						))}
					</ul>
					<form
						onSubmit={async (e) => {
							e.preventDefault();//this prevents browser refresh when the form is submitted.
							if (addTodo && newTodo) {
								setAddingTodo(true);//before sending the form and wiating for it to process, we set addingTodo to true so the button will be disabled (so they can't click it a second time.)
								await addTodo(newTodo);
								setNewTodo('');
								setAddingTodo(false);//this re-enables the button.
							}
						}}
						className="addtodo-form"
					>
						<TextControl
							value={newTodo}
							onChange={(v) => setNewTodo(v)}
						/>
						<Button disabled={addingTodo} type="submit" isPrimary>
							{__('Add Todo', 'blocks-course-todo-list')}
						</Button>
					</form>
				</>
			)}
		</div>
	);
}