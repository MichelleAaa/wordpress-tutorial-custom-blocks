/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, RichText } from '@wordpress/block-editor';
import classnames from 'classnames';

export default function save( { attributes } ) {
	const { text, alignment } = attributes;

	const classes = classnames( `text-box-align-${ alignment }` );

	return (
		<RichText.Content
			{ ...useBlockProps.save( {
				className: classes,
			} ) }
			tagName="h4"
			value={ text }
		/>
	);
}

// RichText returns an editable text input. But in the save function, we need to display what will display in the front-end, so it shouldn't be editable in the front-end for this component. -- That's why we are using RichText.Content, to display the content.
