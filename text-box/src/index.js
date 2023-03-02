/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';

/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';
import metadata from './block.json';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
// Note that the first parameter comes from block.json's name field.
registerBlockType( metadata.name, {
	icon: 
	{
		src: "text-page",
		background: "#f03",
		foreground: '#fff',
		// The above gives the icon with a background and foreground color in the wp-admin panel's block search screen.
	},
	// If you prefer to use an svg:
	// 	{
	// 	src: (
	// 	<svg
	// 			version="1.1"
	// 			viewBox="0 0 500 500"
	// 			preserveAspectRatio="xMinYMin meet"
	// 		>
	// 			<circle cx="250" cy="250" r="200" />
	// 		</svg>
	// 	),
	// 	background: "#f03",
	// 	foreground: '#fff',
	// },
	/**
	 * @see ./edit.js
	 */
	edit: Edit,

	/**
	 * @see ./save.js
	 */
	save,
} );
