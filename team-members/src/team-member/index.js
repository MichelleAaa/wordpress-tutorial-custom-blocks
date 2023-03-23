import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import Edit from './edit';
import Save from './save';

// This is a separate file for our Team Member block, which will be allowed inside of the InnerBlocks component. -- This is an inner block inside of the main block, which is why it uses the registerBlockType method as well, and also has a save/edit function.

registerBlockType( 'blocks-course/team-member', {
	title: __( 'Team Member', 'team-members' ),
	description: __( 'A team member item', 'team-members' ),
	icon: 'admin-users',
    // Note that we have to specify a parent here so that this block doesn't show up in the editor block search. 
	parent: [ 'blocks-course/team-members' ],
    // html false and reusable removes some options from the block -- for html, it removes the ability to edit it as html when you clikc the hover menu.
	supports: {
		reusable: false,
		html: false,
	},
	usesContext: [ 'blocks-course/team-members-columns' ], // you pass an array of the items you want to pass to the child element from the parent block.json file.
	attributes: {
		name: {
			type: 'string',
			source: 'html',
			selector: 'h4',
		},
		bio: {
			type: 'string',
			source: 'html',
			selector: 'p',
		},
		id: {
			type: 'number',
		},
		alt: {
			type: 'string',
			source: 'attribute',
			selector: 'img',
			attribute: 'alt',
			default: '',
		},
		url: {
			type: 'string',
			source: 'attribute',
			selector: 'img',
			attribute: 'src',
		},
		socialLinks: {
			type: 'array',
			default: [],
			// A query can lookup multiple items. Here the selector is the classname plus ul, li.
			source: 'query',
			selector: '.wp-block-blocks-course-team-member-social-links ul li',
			// This is to extract the data-icon attribute from each li.
			query: {
				icon: {
					source: 'attribute',
					attribute: 'data-icon',
				},
				link: {
					source: 'attribute',
					selector: 'a',
					attribute: 'href',
				},
			},
		},
	},
	edit: Edit,
	save: Save,
} );