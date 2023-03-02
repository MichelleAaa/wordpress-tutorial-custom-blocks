import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	BlockControls,
	InspectorControls,
	AlignmentToolbar,
	PanelColorSettings,
	ContrastChecker,
} from '@wordpress/block-editor';
import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
	const { text, alignment, backgroundColor, textColor } = attributes;
	const onChangeAlignment = ( newAlignment ) => {
		setAttributes( { alignment: newAlignment } );
	};
	const onChangeText = ( newText ) => {
		setAttributes( { text: newText } );
	};
	const onBackgroundColorChange = ( newBgColor ) => {
		setAttributes( { backgroundColor: newBgColor } );
	};
	const onTextColorChange = ( newTextColor ) => {
		setAttributes( { textColor: newTextColor } );
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
							value: backgroundColor,
							onChange: onBackgroundColorChange,
							label: __( 'Background Color', 'text-box' ),
						},
						{
							value: textColor,
							onChange: onTextColorChange,
							label: __( 'Text Color', 'text-box' ),
						},
					] }
				>
{/* //The contrast checking receives the two colors that you want to check for contrast. In the sidebar it will display a warning if the contrast is low. */}
					<ContrastChecker
						textColor={ textColor }
						backgroundColor={ backgroundColor }
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
						backgroundColor,
						color: textColor,
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