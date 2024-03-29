import { useBlockProps, RichText } from '@wordpress/block-editor';
import classnames from 'classnames';
import { omit } from 'lodash';
import blockData from './block.json';

// Each deprication is an object.
// We have to include the save function for our block. You can copy/paste it from save.js for the original configuration.
const v1 = {
    // In block.json we have supports. Even if you haven't changed anything in the block.json file, you still have to copy/paste the supports and attributes lists.
	supports: { 
		html: false,
		color: {
			background: true,
			text: true,
			gradients: true,
		},
		spacing: {
			padding: true,
		},
	},
	attributes: {
		// here, we are updating for v2 deprecation, which changes from alignment to textAlignment:
		...omit( blockData.attributes, [ 'textAlignment' ] ),
		alignment: {
			type: 'string',
			default: 'left',
		},
		// This was for the first deprecation:
		text: {
			type: 'string',
			source: 'html',
			selector: 'h4',
		},
	},
	// This is for the v2 deprecation:
	migrate: ( attributes ) => {
		return {
			...omit( attributes, [ 'alignment' ] ),
			textAlignment: attributes.alignment,
		};
	},
	save: ( { attributes } ) => {
		const { text, alignment, shadow, shadowOpacity } = attributes;

		const classes = classnames( `text-box-align-${ alignment }`, {
			'has-shadow': shadow,
			[ `shadow-opacity-${ shadowOpacity }` ]: shadow && shadowOpacity,
		} );

		return (
			<RichText.Content
				{ ...useBlockProps.save( {
					className: classes,
				} ) }
				tagName="h4"
				value={ text }
			/>
		);
	},
};

export default v1;