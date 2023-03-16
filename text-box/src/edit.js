import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	BlockControls,
	AlignmentToolbar,
} from '@wordpress/block-editor';
// Boxcontrol is an experimental feature, which is why we have to use __experimentalBoxControl.
// Note that this has been commented out as it says it's not allowed to be used and results in an error.
// eslint-disable-next-line
// import { __experimentalBoxControl as BoxControl } from '@wordpress/components';
// import './editor.scss';

// const { __Visualizer: BoxControlVisualizer } = BoxControl; // We deconstruct __Visualizer out of BoxControl and re-name it as BoxControlVIsualizer.

export default function Edit( props ) {
	const { attributes, setAttributes } = props;
	const { text, alignment, style } = attributes;

	const onChangeAlignment = ( newAlignment ) => {
		setAttributes( { alignment: newAlignment } );
	};
	const onChangeText = ( newText ) => {
		setAttributes( { text: newText } );
	};

	return (
		<>
			<BlockControls>
				<AlignmentToolbar
					value={ alignment }
					onChange={ onChangeAlignment }
				/>
			</BlockControls>
			{/* We added the useBlockProps to the wrapper div. It will have the maximum width etc. settings. */}
			<div
				{ ...useBlockProps( {
					className: `text-box-align-${ alignment }`,
				} ) }
			>
				<RichText
					className="text-box-title"
					onChange={ onChangeText }
					value={ text }
					placeholder={ __( 'Your Text', 'text-box' ) }
					tagName="h4"
					allowedFormats={ [] }
				/>
				{/* showValues - if we have style and style.visualizers, then we are adding the padding. -- this is in the editor when you hover over the padding options, it highlights that section of the padding. */}
				{/* <BoxControlVisualizer
					values={ style && style.spacing && style.spacing.padding }
					showValues={
						style && style.visualizers && style.visualizers.padding
					}
				/> */}
			</div>
		</>
	);
}
// Note that __ is used so we can enable translations later.
// allowedFormats will indicate what will show up in the hover editor option menu. -- When we indicated core/bold, we limited the options down to just this one.
