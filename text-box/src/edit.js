import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	BlockControls,
	InspectorControls,
	AlignmentToolbar,
	PanelColorSettings,
	ContrastChecker,
	withColors,
} from '@wordpress/block-editor';
import './editor.scss';

function Edit( props ) {
	// These properties are coming in part from the higher-order function at the bottom, withColors, which returns Edit, after adding properties. 
	const {
		attributes,
		setAttributes,
		backgroundColor,
		textColor,
		setBackgroundColor,
		setTextColor,
	} = props;
	const { text, alignment } = attributes;

	const onChangeAlignment = ( newAlignment ) => {
		setAttributes( { alignment: newAlignment } );
	};
	const onChangeText = ( newText ) => {
		setAttributes( { text: newText } );
	};
	return (
		<>
			<InspectorControls>
				<PanelColorSettings
					title={ __( 'Color Settings', 'text-box' ) }
					icon="admin-appearance"
					initialOpen
					disableCustomColors={ false }
					// This allows the user to also select a custom color, instead of only being able to choose what’s available in the theme for custom colors listed in functions.php.
					colorSettings={ [
						{
							value: backgroundColor.color,
							onChange: setBackgroundColor,
							label: __( 'Background Color', 'text-box' ),
						},
						{
							value: textColor.color,
							onChange: setTextColor,
							label: __( 'Text Color', 'text-box' ),
						},
					] }
				>
{/* //The contrast checking receives the two colors that you want to check for contrast. In the sidebar it will display a warning if the contrast is low. */}
					<ContrastChecker
						textColor={ textColor.color }
						backgroundColor={ backgroundColor.color }
					/>
				</PanelColorSettings>
			</InspectorControls>
			<BlockControls>
				<AlignmentToolbar
					value={ alignment }
					onChange={ onChangeAlignment }
				/>
			</BlockControls>
			<RichText
				{ ...useBlockProps( {
					className: `text-box-align-${ alignment }`,
					style: {
						backgroundColor: backgroundColor.color,
						color: textColor.color,
					},
				} ) }
				onChange={ onChangeText }
				value={ text }
				placeholder={ __( 'Your Text', 'text-box' ) }
				tagName="h4"
				allowedFormats={ [] }
			/>
		</>
	);
}
// Note that __ is used so we can enable translations later.
// allowedFormats will indicate what will show up in the hover editor option menu. -- When we indicated core/bold, we limited the options down to just this one.

// withColors is a function that returns another function. -- The edit function is now wrapped in this higher-order function.
export default withColors({
	backgroundColor: "backgroundColor",
	textColor: "color",

})(Edit);