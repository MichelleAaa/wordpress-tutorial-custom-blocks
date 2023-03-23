import { registerFormatType, toggleFormat } from '@wordpress/rich-text';
import { RichTextToolbarButton } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

// Imported this file into index.js.

// When we type in text in a paragraph element or something, this file is going to allow us to highlight a portion of that text, and then have a menu of new options for styling that text. In this case, we only added a second Highlight option which only adds the yellow background color (note that you have to click the down arrow < angular bracket to see the option we added.)

const HighlightFormatButton = ({ isActive, value, onChange }) => {
	return (
		<RichTextToolbarButton
			icon="edit"
			title={__('Highlight', 'blocks-course')}
			onClick={() => {
				onChange(
					toggleFormat(value, {
						type: 'block-course/highlight',
						attributes: {
							style: 'background-color: #f0ff00',
						},
					})
				);
			}}
			isActive={isActive}
		/>
	);
};


registerFormatType('block-course/highlight', {
	title: __('Highlight', 'blocks-course'),
	tagName: 'span',
    // the tagname is what wraps the text that we selected (that we highlighted and are going to style differently from the rest of the text, such as in something like a paragraph element):
	className: null, //we are going to use inline styling above to style the span instead of adding a classname, but that's also an option.
	edit: HighlightFormatButton, //edit is the component that is going to appear near the hover toolbar when you are in a paragraph or some text element and are selecting a portion of the text.
});

//After selecting some text, click the down arrow in the hover toolbar, and selecting the highlight function, the HTMl looks like so:
//<p>testing this <span style="background-color: #f0ff00">out</span></p>