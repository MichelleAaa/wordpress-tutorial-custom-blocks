import {
	useBlockProps,
	InnerBlocks,
	InspectorControls,
} from '@wordpress/block-editor';
import { PanelBody, RangeControl } from '@wordpress/components'; // These are needed to add functionality for the sidebar. The input is rangeControl.
import { __ } from '@wordpress/i18n';
import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
	const { columns } = attributes;

	const onChangeColumns = ( newColumns ) => {
		setAttributes( { columns: newColumns } );
	};
	return (
		// In our styles file we style columns 1-6 for the below variable classname:
		<div
			{ ...useBlockProps( {
				className: `has-${ columns }-columns`,
			} ) }
		>
{/* This is for the sidebar functionality to adjust the number of columns: */}
			<InspectorControls>
				<PanelBody>
					<RangeControl
						label={ __( 'Columns', 'team-members' ) }
						min={ 1 }
						max={ 6 }
						onChange={ onChangeColumns }
						value={ columns }
					/>
				</PanelBody>
			</InspectorControls>
			<InnerBlocks
				allowedBlocks={ [ 'blocks-course/team-member' ] }
				orientation="horizontal"//this is for the drag/drop functionality. We are making the orientation horizontal so when we drag/drop the line that shows up for where we will place it is a vertical one.
// The template means that whenever we add the Team Members block, it will atomatically load the template items we listed. -- in the name of the child block, you could also have a second parameter in the arrays, an object, with name: and bio: with values. But that would be if you were auto-filling data. -- In this case it's not needed though.
				template={ [
					[ 'blocks-course/team-member' ],
					[ 'blocks-course/team-member' ],
					[ 'blocks-course/team-member' ],
				] }
// You can also add a templateBlock="all" attribute -- that would prevent the user from adding more blocks, removing them, or dragging/dropping them. But we aren't going to do this right now. (It's good for a static one though.) "insert" would just prevent inserting, but allow drag/drop. We don't need any of those features though.
			/>
		</div>
	);
}