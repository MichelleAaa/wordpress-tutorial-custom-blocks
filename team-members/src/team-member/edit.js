import { useEffect, useState } from '@wordpress/element';
import {
	useBlockProps,
	RichText,
	MediaPlaceholder,
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { isBlobURL, revokeBlobURL } from '@wordpress/blob';
// isBlobURL receives a url and determines if it's a blob url.
import { Spinner, withNotices } from '@wordpress/components';

// Attributes in this case are coming from index.js, where it's set up -- instead of in block.json, since this is a child block and that's where we set up attrs.
function Edit( { attributes, setAttributes, noticeOperations, noticeUI } ) {
	const { name, bio, url, alt, id } = attributes;
	const [ blobURL, setBlobURL ] = useState();

	const onChangeName = ( newName ) => {
		setAttributes( { name: newName } );
	};
	const onChangeBio = ( newBio ) => {
		setAttributes( { bio: newBio } );
	};
	const onSelectImage = ( image ) => {
		if ( ! image || ! image.url ) {
			setAttributes( { url: undefined, id: undefined, alt: '' } );
			return;
		}
		setAttributes( { url: image.url, id: image.id, alt: image.alt } );
	};
	const onSelectURL = ( newURL ) => {
		// We set id as undefined to clear any potential old values. Same with the alt text.
		setAttributes( {
			url: newURL,
			id: undefined,
			alt: '',
		} );
	};
	// To display errors, in the MediaPlaceholder we added the notices= prop. Then in our error call-back we use noticeOperations and pass it the message. (If you try to upload a php file or another non-approved file you will get an error.)
	const onUploadError = ( message ) => {
		// Before creating a new error, we clear the old error, in case there is one:
		noticeOperations.removeAllNotices();
		noticeOperations.createErrorNotice( message );
	};

	useEffect( () => {
		if ( ! id && isBlobURL( url ) ) {
			setAttributes( {
				url: undefined,
				alt: '',
			} );
		}
	}, [] ); // due to the empty array of dependencies, it will run only once, when the component mounts for the first time.

	useEffect( () => {
		if ( isBlobURL( url ) ) {
			setBlobURL( url );
		} else {
			revokeBlobURL( blobURL );
			setBlobURL();
		}
	}, [ url ] ); // runs whenever the URL changes. -- this is for the image upload which is why we are using the BlobURL. -- Otherwise, we clear the state.

	return (
		
		<div { ...useBlockProps() }>
			{/* The actual image only displays if we have a url (aka the user went through the MediaPlaceholder to upload or select an image from the media library.) */}
			{ url && (
				<div
// Check isBlobURL (url) to see if it's a blob URL. If so, then we add the class is-loading.   
					className={ `wp-block-blocks-course-team-member-img${
						isBlobURL( url ) ? ' is-loading' : ''
					}` }
				>
					<img src={ url } alt={ alt } />
{/* The spinner is only visible if we have a BlobURL -- when the image is done uploading the spinner will dissapear. */}
					{ isBlobURL( url ) && <Spinner /> }
				</div>
			) }
			{/* The MediaPlaceholder provides an interface to upload an image or choose an item from the media library. */}
			{/* Accept will disable the ability to upload files that are not images.
			allowedTypes=... prevents the user from accessing items in the media library that aren't images. */}
			<MediaPlaceholder
				icon="admin-users"
				onSelect={ onSelectImage }
				onSelectURL={ onSelectURL }
				onError={ onUploadError }
				accept="image/*"
				allowedTypes={ [ 'image' ] }
				disableMediaButtons={ url }
				// diableMediaButtons url means that if url is true, then the MediaPlaceholder no longer will display -- we want this once we have the image url so the image can render in the code above.
				notices={ noticeUI }
			/>
			{/* // Richtext components are being used to render a place to add the Name and Member Bio. (These will render below the image.) */}
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

export default withNotices( Edit );