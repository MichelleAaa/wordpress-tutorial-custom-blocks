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
	},
	edit: Edit,
	save: Save,
} );