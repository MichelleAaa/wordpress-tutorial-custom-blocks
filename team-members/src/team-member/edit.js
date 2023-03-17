import { useBlockProps, RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

// Attributes in this case are coming from index.js, where it's set up -- instead of in block.json, since this is a child block and that's where we set up attrs.
export default function Edit( { attributes, setAttributes } ) {
	const { name, bio } = attributes;
	const onChangeName = ( newName ) => {
		setAttributes( { name: newName } );
	};
	const onChangeBio = ( newBio ) => {
		setAttributes( { bio: newBio } );
	};
	return (
		// Richtext components are being used to render a place to add the Name and Member Bio. (These will render below the image.)
		<div { ...useBlockProps() }>
			<RichText
				placeholder={ __( 'Member Name', 'team-member' ) }
				tagName="h4"
				onChange={ onChangeName }
				value={ name }
				allowedFormats={ [] }
			/>
			{/* allowedFormats with the empty array prevents the users from being able to format these two text fields at all since the arrays are empty. */}
			<RichText
				placeholder={ __( 'Member Bio', 'team-member' ) }
				tagName="p"
				onChange={ onChangeBio }
				value={ bio }
				allowedFormats={ [] }
			/>
		</div>
	);
}