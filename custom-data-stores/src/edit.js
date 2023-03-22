import { useBlockProps } from '@wordpress/block-editor';
import { useSelect, useDispatch } from '@wordpress/data';

export default function Edit() {
	// Gets the title of the current post from the store:
	const title = useSelect((select) => {
		return select('core/editor').getEditedPostAttribute('title');
	});
	// we pass useDispatch the name of the store. It will return the methods that show up in wp.data.dispatch('core/editor') in the console.
	const { editPost } = useDispatch('core/editor');
	return (
		<div {...useBlockProps()}>
			<h2>{title}</h2>
			<input
				value={title}
				onChange={(e) => editPost({ title: e.target.value })}
			/>
		</div>
	);
}