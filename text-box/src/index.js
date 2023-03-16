/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType, createBlock } from '@wordpress/blocks';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';
import { __ } from '@wordpress/i18n';
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
	// This adds a variation. The details are different from the block.json file since we are making a new name and title, etc.
	// Now in our block, we have a new block that is called Gradient Text Box. It has the same functionality, just has a different default gradient background.
	variations: [
		{
			name: 'blocks-course/gradient-text-box',
			title: __( 'Gradient Text Box' ),
			icon: 'wordpress',
			attributes: {
				gradient: 'red-to-blue',
			},
		},
	],
// transforms shows up in the editor panel hover toolbar over the block. 
// We are transforming from the paragraph block, at core/paragram. (So the paragraph block will now have an option to transform into our custom block, the text-box.)
// The transform function is the one that's responsible for doing the transforming. -- It receives the attributes of the block that we are transforming from. -- The return function is our function, the blocks-course/text-box. Then we are sending over the text content and alignment selection. (Note that text and alignment are properties in our block.json file, and we are getting content and align from the paragraph element.)
	transforms: {
		from: [
			{
				type: 'block',
				blocks: [ 'core/paragraph' ],
				transform: ( { content, align } ) => {
					return createBlock( 'blocks-course/text-box', {
						text: content,
						alignment: align,
					} );
				},
			},
// Enter is when you type in the regex expression and press enter. It will then create a text-box. (So if you are in the paragraph box and type textbox, it will create the text-box block.) -- We are also passing some attributes of shadow and gradient.
			{
				type: 'enter',
				regExp: /textbox/i,
				transform: () => {
					return createBlock( 'blocks-course/text-box', {
						shadow: true,
						gradient: 'red-to-blue',
					} );
				},
			},
// We can open a pargraph and type in textbox plus a space, and it will generate a textbox. 
			{
				type: 'prefix',
				prefix: 'textbox',
				transform: () => {
					return createBlock( 'blocks-course/text-box' );
				},
			},
		],
// This can transform our custom text-box block into a standard WP paragraph block.
// The transform function receives the attributes of our block. (Our text-box, in the block.json file, has text and alignment properties. The WP paragraph block calls these content and align.) -- Now in our text-box, when we select the first option in the hover toolbar, transform to - Paragraph will be an option.
// isMatch is a function that receives our text-box attributes. we can return true or false based on something in our attributes. (it controls whether the transform option is visible.) -- If we don't have content, aka text, in the text-box, then we can't transform it into a paragraph.
		to: [
			{
				type: 'block',
				blocks: [ 'core/paragraph' ],
				isMatch: ( { text } ) => {
					return text ? true : false;
				},
				transform: ( { text, alignment } ) => {
					return createBlock( 'core/paragraph', {
						content: text,
						align: alignment,
					} );
				},
			},
		],
	},
} );
