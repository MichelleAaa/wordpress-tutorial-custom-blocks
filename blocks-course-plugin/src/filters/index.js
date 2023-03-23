import { addFilter } from '@wordpress/hooks';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { unregisterBlockType } from '@wordpress/blocks';
import domReady from '@wordpress/dom-ready';


//This file was imported into src/index.js

//In the PHP filters, we can only access the items in block.json. In the JS one though, we can also access things in the index.js file's registerBlockType function. (including the edit and save functions.)


const changeParagraphIcon = (settings, name) => {
	if (name === 'core/paragraph') {
		return { ...settings, icon: 'twitter' };
        //The icon is from block.json (it's the icon that shows up in the editor blocks search panel.)
	}
	return settings;
};

//To call the filter:
//The second argument is the namespace/ a name you make up. 
//The third is your function.
addFilter(
	'blocks.registerBlockType',
	'block-course/change-paragraph-icon',
	changeParagraphIcon
);

//This receives the edit component that already exists, BlockEdit. -- It modifies the edit component of all blocks.
const modifyEdit = (BlockEdit) => {
	return (props) => {
		return (
			<>
				<BlockEdit {...props} />
				<InspectorControls>
					<PanelBody>Custom Panel</PanelBody>
				</InspectorControls>
			</>
		);
	};
};

addFilter('editor.BlockEdit', 'block-course/change-edit', modifyEdit);


//This unregisters a block. You need to make sure the dom is already ready before running it.
domReady(() => {
	unregisterBlockType('core/paragraph');
});