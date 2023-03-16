/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {
	useBlockProps,
	RichText,
	getColorClassName,
} from '@wordpress/block-editor';
import classnames from 'classnames';


export default function save( { attributes } ) {
	const {
		text,
		alignment,
		backgroundColor,
		textColor,
		customBackgroundColor,
		customTextColor,
	} = attributes;

	const backgroundClass = getColorClassName(
		'background-color',
		backgroundColor
	);

	const textClass = getColorClassName( 'color', textColor );

	const classes = classnames( `text-box-align-${ alignment }`, {
		[ textClass ]: textClass,
		[ backgroundClass ]: backgroundClass,
	} );

	return (
		// Note that we switched className to classes, as we are now using the classnames module.
		// For style, we only add it if we don't have a backgroundClass. Otherwise, we will add our customBackgroundColor, which lives in our attributes (and was set up in block.json)
		<RichText.Content
			{ ...useBlockProps.save( {
				className: classes,
				style: {
					backgroundColor: backgroundClass
						? undefined
						: customBackgroundColor,
					color: textClass ? undefined : customTextColor,
				},
			} ) }
			tagName="h4"
			value={ text }
		/>
	);
}

// RichText returns an editable text input. But in the save function, we need to display what will display in the front-end, so it shouldn't be editable in the front-end for this component. -- That's why we are using RichText.Content, to display the content.
