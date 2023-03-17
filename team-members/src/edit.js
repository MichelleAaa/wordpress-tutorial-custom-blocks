import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import './editor.scss';

export default function Edit() {
	return (
		// The InnerBlocks allowedBlocks property limits which block types are allowed inside of the outer container box. -- Here, we are only allowing images for now.
		<div { ...useBlockProps() }>
			<InnerBlocks allowedBlocks={ [ 'core/image' ] } />
		</div>
	);
}