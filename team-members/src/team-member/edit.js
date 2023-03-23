import { useEffect, useState, useRef } from '@wordpress/element';
import {
	useBlockProps,
	RichText,
	MediaPlaceholder,
	BlockControls,
	MediaReplaceFlow,
	InspectorControls,
	store as blockEditorStore,
} from '@wordpress/block-editor';
// Above, we are accessing the store so we can access the image sizes that are available in the WP media. You can access the store in the console in the editor by typing - wp.data.select("core").getMedia(id of an image you want to get information about) -- inside the object, there's media_details. Inside, is sizes. Inside of that, is a list of the image sizes that were generated for that image. (It depends on which theme as to which sizes are available.)
//to get the sizes currently defined in the theme you are using - wp.data.select("core/block-editor").getSettings() -- then look inside the imageSizes key, which will show you the image sizes available in this theme. -- so we only want to access a size that's avaialble in the theme and also available for that image.
// However, in the block itself, we can't use the developer console commands. So to access the store, we need the below as well:
import { useSelect } from '@wordpress/data';
// The above will allow us to select data from the store. (which is brought in above.)
import { usePrevious } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import { isBlobURL, revokeBlobURL } from '@wordpress/blob';
// isBlobURL receives a url and determines if it's a blob url.
import {
	Spinner,
	withNotices,
	ToolbarButton,
	PanelBody,
	TextareaControl,
	SelectControl,
	Icon,
	Tooltip,
	TextControl,
	Button,
} from '@wordpress/components';
import {
	DndContext,
	useSensor,
	useSensors,
	PointerSensor,
} from '@dnd-kit/core';
import {
	SortableContext,
	horizontalListSortingStrategy,
	arrayMove,
} from '@dnd-kit/sortable';
import { restrictToHorizontalAxis } from '@dnd-kit/modifiers';
// The modifiers library can add restrictions, so you can't move vertically when your list is only horizontal, for instance.
import SortableItem from './sortable-item';

// Attributes in this case are coming from index.js, where it's set up -- instead of in block.json, since this is a child block and that's where we set up attrs.
function Edit( {
	attributes,
	setAttributes,
	context, // context will give us access to anything that was set up in the usesContext section of this child block's index.js file.
	noticeOperations,
	noticeUI,
	isSelected,
} ) {
	const { name, bio, url, alt, id, socialLinks } = attributes;
	const [ blobURL, setBlobURL ] = useState();
	const [ selectedLink, setSelectedLink ] = useState();

	const prevURL = usePrevious( url );
	const prevIsSelected = usePrevious( isSelected );

	const sensors = useSensors(
		useSensor( PointerSensor, {
			activationConstraint: { distance: 5 },
		} ) //The distance controls how many pixels you have to move the pointer so that you can drop it somewhere new in the list.
	);

	const titleRef = useRef();

	// We use useSelect to get data from the store. Here, we are selecting from the 'core' store, and getting the getMedia function so we can check the id with getMedia, if there is one.
	const imageObject = useSelect(
		( select ) => {
			const { getMedia } = select( 'core' );
			return id ? getMedia( id ) : null;
		},
		[ id ]
		// [id] is the dependency
	);

	const imageSizes = useSelect( ( select ) => {
		return select( blockEditorStore ).getSettings().imageSizes;
	}, [] );

	const getImageSizeOptions = () => {
		// If the request is still resolving, we wouldn't have the image yet, so we just return an empty array.
		if ( ! imageObject ) return [];
		const options = [];
		const sizes = imageObject.media_details.sizes;
		for ( const key in sizes ) {
			const size = sizes[ key ];
			const imageSize = imageSizes.find( ( s ) => s.slug === key );
			if ( imageSize ) {
				options.push( {
					label: imageSize.name,
					value: size.source_url,
				} );
			}
		}
		return options;
	};

	const onChangeName = ( newName ) => {
		setAttributes( { name: newName } );
	};
	const onChangeBio = ( newBio ) => {
		setAttributes( { bio: newBio } );
	};
	const onChangeAlt = ( newAlt ) => {
		setAttributes( { alt: newAlt } );
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
	const onChangeImageSize = ( newURL ) => {
		setAttributes( { url: newURL } );
	};
	// To display errors, in the MediaPlaceholder we added the notices= prop. Then in our error call-back we use noticeOperations and pass it the message. (If you try to upload a php file or another non-approved file you will get an error.)
	const onUploadError = ( message ) => {
		// Before creating a new error, we clear the old error, in case there is one:
		noticeOperations.removeAllNotices();
		noticeOperations.createErrorNotice( message );
	};

	const removeImage = () => {
		setAttributes( {
			url: undefined,
			alt: '',
			id: undefined,
		} );
	};

	const addNewSocialItem = () => {
		// We pass in a copy of our original socialLinks, and then just add a new icon in addition.
		setAttributes( {
			socialLinks: [ ...socialLinks, { icon: 'wordpress', link: '' } ],
		} );
		setSelectedLink( socialLinks.length );
	};

	const updateSocialItem = ( type, value ) => {
		const socialLinksCopy = [ ...socialLinks ];
		socialLinksCopy[ selectedLink ][ type ] = value;
		setAttributes( { socialLinks: socialLinksCopy } );
	};

	const removeSocialItem = () => {
		// Slice from the beginning of the array up to where the selected link is, then slice out the index after the selected link to the end. Those two together create a new array (skipping the item we are removing.)
		setAttributes( {
			socialLinks: [
				...socialLinks.slice( 0, selectedLink ),
				...socialLinks.slice( selectedLink + 1 ),
			],
		} );
		setSelectedLink();//This sets selectedLInk to undefined.
	};

	const handleDragEnd = ( event ) => {
		const { active, over } = event;
		if ( active && over && active.id !== over.id ) {
			const oldIndex = socialLinks.findIndex(
				( i ) => active.id === `${ i.icon }-${ i.link }`
			);
			const newIndex = socialLinks.findIndex(
				( i ) => over.id === `${ i.icon }-${ i.link }`
			);
			// After finding the oldIndex and the newIndex items, we can use the ArrayMove method to make the update:
			setAttributes( {
				socialLinks: arrayMove( socialLinks, oldIndex, newIndex ),
			} );
			setSelectedLink( newIndex );
		}
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

	// The below is to create focus on the next text line under the image after there's an image.
	//We check to make sure we don't have a previousUrl (we didn't have a url/image before, becuase then the user may have already filled out the text on the line under the image.  Whether there was previously another url entered, and this is just a replacement, is tracked with a special hook from @wordpress/compose)
	useEffect( () => {
		if ( url && ! prevURL && isSelected ) {
			titleRef.current.focus();
		}
	}, [ url, prevURL ] );

	useEffect( () => {
		if ( prevIsSelected && ! isSelected ) {
			setSelectedLink();
			// this sets the selected link to undefined, so it isn't highlighted if you click out of the block. (otherwise, the social media icon will be selected even when you click out of the box in the editor.)
		}
	}, [ isSelected, prevIsSelected ] );

	return (
	<>
	{/* This is for the sidebar. It allows the user to change the ALT text of the image. -- If the image has alt text already it will show up there. -- It only changes the alt text for this block, not uploaded in the media. */}
		<InspectorControls>
			<PanelBody title={ __( 'Image Settings', 'team-members' ) }>
				{/* This opens an option in the sidebar to select the image size. The url is the url of that specific image size. */}
				{ id && (
					<SelectControl
						label={ __( 'Image Size', 'team-members' ) }
						options={ getImageSizeOptions() }
						value={ url }
						onChange={ onChangeImageSize }
					/>
				) }
				{/* A blubURL is still uploading, so we don't allow editing the alt text until it's uploaded, aka no longer a blobURL. */}
				{ url && ! isBlobURL( url ) && (
					<TextareaControl
						label={ __( 'Alt Text', 'team-members' ) }
						value={ alt }
						onChange={ onChangeAlt }
						help={ __(
							"Alternative text describes your image to people can't see it. Add a short description with its key details.",
							'team-members'
						) }
					/>
				) }
			</PanelBody>
		</InspectorControls>
	{/* This adds an option in the hover toolbar to replace the image. It has options to upload or open the media library. -- It only shows if the url has been entered, aka there's an image already. */}
		{ url && (
			<BlockControls group="inline">
				<MediaReplaceFlow
					name={ __( 'Replace Image', 'team-members' ) }
					onSelect={ onSelectImage }
					onSelectURL={ onSelectURL }
					onError={ onUploadError }
					accept="image/*"
					allowedTypes={ [ 'image' ] }
					mediaId={ id }
					mediaURL={ url }
				/>
				{/* This adds a second button in the toolbar for Remove Image. */}
				<ToolbarButton onClick={ removeImage }>
					{ __( 'Remove Image', 'team-members' ) }
				</ToolbarButton>
			</BlockControls>
		) }
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
			{ context[ 'blocks-course/team-members-columns' ] }
			{/* The above outputs 2, as that's the number from the block.json parent file. */}
			
			{/* // Richtext components are being used to render a place to add the Name and Member Bio. (These will render below the image.) */}
			<RichText
			// we added ref so we can auto-focus on this field after the image is added.
				ref={titleRef}
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
			<div className="wp-block-blocks-course-team-member-social-links">
				<ul>
					<DndContext
						sensors={ sensors }
						onDragEnd={ handleDragEnd }
						modifiers={ [ restrictToHorizontalAxis ] }
					>
						<SortableContext
							items={ socialLinks.map(
								( item ) => `${ item.icon }-${ item.link }`
							) }
							strategy={ horizontalListSortingStrategy }
						>
							{ socialLinks.map( ( item, index ) => {
								return (
									<SortableItem
										key={ `${ item.icon }-${ item.link }` }
										id={ `${ item.icon }-${ item.link }` }
										index={ index }
										selectedLink={ selectedLink }
										setSelectedLink={ setSelectedLink }
										icon={ item.icon }
									/>
								);
							} ) }
						</SortableContext>
					</DndContext>
					{/* We are switching to draggable, as listed above (the li is now in sortable-item.js), so we are removing the below: */}
					{/* { socialLinks.map( ( item, index ) => {
						return (
			// The icon component can be used to display dashicon icons:
							<li
									key={ index }
									className={
										selectedLink === index
											? 'is-selected'
											: null
									}
								>
									<button
										aria-label={ __(
											'Edit Social Link',
											'team-members'
										) }
										onClick={ () =>
											setSelectedLink( index )
										}
									>
										<Icon icon={ item.icon } />
									</button>
								</li>
						);
					} ) } */}
					{ isSelected && (
						<li className="wp-block-blocks-course-team-member-add-icon-li">
							<Tooltip
								text={ __(
									'Add Social Link',
									'team-members'
								) }
							>
								<button
									aria-label={ __(
										'Add Social Link',
										'team-members'
									) }
									onClick={ addNewSocialItem }
								>
									<Icon icon="plus" />
								</button>
							</Tooltip>
						</li>
					) }
				</ul>
			</div>
			{/* The form appears when the social media icon is selected. It allows you to fill out the icon and url. */}
			{ selectedLink !== undefined && (
				<div className="wp-block-blocks-course-team-member-link-form">
					<TextControl
						label={ __( 'Icon', 'text-members' ) }
						value={ socialLinks[ selectedLink ].icon }
						onChange={ ( icon ) => {
							updateSocialItem( 'icon', icon );
						} }
					/>
					<TextControl
						label={ __( 'URL', 'text-members' ) }
						value={ socialLinks[ selectedLink ].link }
						onChange={ ( link ) => {
							updateSocialItem( 'link', link );
						} }
					/>
					<br />
					<Button isDestructive onClick={ removeSocialItem }>
						{ __( 'Remove Link', 'text-members' ) }
					</Button>
				</div>
			) }
		</div>
	</>
	);
}

export default withNotices( Edit );