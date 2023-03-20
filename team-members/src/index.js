import { registerBlockType, createBlock } from '@wordpress/blocks';
import './team-member'; // this is the nested, inner block for the team-member component.
import './style.scss';
import Edit from './edit';
import save from './save';

registerBlockType( 'blocks-course/team-members', {
	edit: Edit,
	save,
	// Transforms is used to transform from or to another WP Block type.
	transforms: {
		from: [
			// Transform from the gallery block to the team-members block:
			{
				type: 'block',
				blocks: [ 'core/gallery' ],
				transform: ( { images, columns } ) => {
					// For each image, we create a new innerBlock:
					const innerBlocks = images.map( ( { url, id, alt } ) => {
						return createBlock( 'blocks-course/team-member', {
							alt,
							id,
							url,
						} );
					} );
					return createBlock(
						'blocks-course/team-members',
						{
							// if columns is not specified, we default to 2.
							columns: columns || 2,
						},
						innerBlocks
					);
				},
			},
			{
				// Transform from the image block to the team-member block
				type: 'block',
				blocks: [ 'core/image' ],
				isMultiBlock: true,
				transform: ( attributes ) => {
					// For each item in attributes, we get a block.
					const innerBlocks = attributes.map(
						( { url, id, alt } ) => {
							return createBlock( 'blocks-course/team-member', {
								alt,
								id,
								url,
							} );
						}
					);
					return createBlock(
						'blocks-course/team-members',
						{
							// maximum of 3 images can be transferred:
							columns:
								attributes.length > 3 ? 3 : attributes.length,
						},
						innerBlocks
					);
				},
			},
		],
	},
} );
