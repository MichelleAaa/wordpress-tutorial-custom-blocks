import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	BlockControls,
	AlignmentToolbar,
	InspectorControls,
} from '@wordpress/block-editor';
// Boxcontrol is an experimental feature, which is why we have to use __experimentalBoxControl.
// Note that this has been commented out as it says it's not allowed to be used and results in an error.
// eslint-disable-next-line
// import { __experimentalBoxControl as BoxControl } from '@wordpress/components';
import {
	// eslint-disable-next-line
	// __experimentalBoxControl as BoxControl,
	PanelBody,
	// rangecontrol is used to add the opacity control in the editor sidebar.
	RangeControl,
} from '@wordpress/components';
import classnames from 'classnames';
import './editor.scss';

// const { __Visualizer: BoxControlVisualizer } = BoxControl; // We deconstruct __Visualizer out of BoxControl and re-name it as BoxControlVIsualizer.

export default function Edit( props ) {
	const { attributes, setAttributes } = props;
	const { text, textAlignment, style, shadow, shadowOpacity } = attributes;

	const onChangeAlignment = ( newAlignment ) => {
		setAttributes( { textAlignment: newAlignment } );
	};
	const onChangeText = ( newText ) => {
		setAttributes( { text: newText } );
	};
	const onChangeShadowOpacity = ( newShadowOpacity ) => {
		setAttributes( { shadowOpacity: newShadowOpacity } );
	};
	const toggleShadow = () => {
		setAttributes( { shadow: ! shadow } );
	};

	const classes = classnames( `text-box-align-${ textAlignment }`, {
		'has-shadow': shadow,
		[ `shadow-opacity-${ shadowOpacity }` ]: shadow && shadowOpacity,
	} );

	return (
		<>
			<InspectorControls>
{/* Note that updates to styles.scss were required for this. shadow-opacity-40, for example, needs to be set up, along with the others. */}
{/* If shadow is turned on, then we add the panel: */}
				{ shadow && (
					<PanelBody title={ __( 'Shadow Setting', 'text-box' ) }>
						<RangeControl
							label={ __( 'Shadow Opacity', 'text-box' ) }
							value={ shadowOpacity }
							min={ 10 }
							max={ 40 }
							step={ 10 }
							onChange={ onChangeShadowOpacity }
						/>
					</PanelBody>
				) }
			</InspectorControls>
			<BlockControls
				controls={ [
					{
						icon: 'admin-page',
						title: __( 'Shadow', 'text-box' ),
						onClick: toggleShadow,
						isActive: shadow,
					},
				] }
			>
				<AlignmentToolbar
					value={ textAlignment }
					onChange={ onChangeAlignment }
				/>
			</BlockControls>
			<div
				{ ...useBlockProps( {
					className: classes,
				} ) }
			>
				<RichText
					className="text-box-title"
					onChange={ onChangeText }
					value={ text }
					placeholder={ __( 'Your Text', 'text-box' ) }
					tagName="p"
					allowedFormats={ [] }
				/>
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
