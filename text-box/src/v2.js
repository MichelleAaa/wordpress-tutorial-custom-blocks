import { useBlockProps, RichText } from '@wordpress/block-editor';
import classnames from 'classnames';
// The omit function removes a key from an object. So we have the attributes object from block.json, and we are going to use omit to remove an key from it.
import { omit } from 'lodash';
import blockData from './block.json';

const v2 = {
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
        // Here, we areadding in all the attributes, and just omitting the textAlignment value from the block.json's attributes, becuase in the old version it was called alignment. Then below, we are adding alignment, the old value, back in.
		...omit( blockData.attributes, [ 'textAlignment' ] ),
		alignment: {
			type: 'string',
			default: 'left',
		},
	},
    // The migrate function receives the attribute or attributes of the old version of block.json. You then return the old attribute and return the new attribute (aka the new attribute name is textAlignment).
    // This migrate function is required for the Edit function to work correctly on the deprecated blocks.
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
				tagName="p"
				value={ text }
			/>
		);
	},
};

export default v2;