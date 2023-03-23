import { __ } from '@wordpress/i18n';
import { TextControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { useEntityProp } from '@wordpress/core-data';
import { useBlockProps } from '@wordpress/block-editor';
import './editor.scss';

export default function Edit() {
	const postType = useSelect((select) => {
		return select('core/editor').getCurrentPostType();
	}, []);

	// This allows us to get and set our metadata. 
	// 'post' is an example of a postType that may be returned by the postType variable listed above. 
	//meta is the data, while setMeta allows us to update the metadata.
	const [meta, setMeta] = useEntityProp('postType', postType, 'meta');
	const subTitleValue = meta._blocks_course_post_subtitle;
	//_blocks_course_post_subtitle is from the metabox.php file in the blocks-course-plugin file. It's an old way of adding additional fields.

	const onSubtitleChange = (value) => {
		setMeta({ ...meta, _blocks_course_post_subtitle: value });
	}; //Since you may have more than one object in the meta fields, you have to copy in the entire meta object with ... and then update the one field you want to change last.

	return (
		<div {...useBlockProps()}>
			{subTitleValue || subTitleValue === '' ? (
				<TextControl
					label={__('Post Subtitle', 'metadata-block')} 
					// metadata-block is our text-domain name, listed in both the plugin.php comment at the top of the file and also in block.json.
					value={subTitleValue}
					onChange={onSubtitleChange}
				/>
			) : (
				__('Meta Field is Not Registered', 'metadata-block')
			)}
		</div>
	);
}