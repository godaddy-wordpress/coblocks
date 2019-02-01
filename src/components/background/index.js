/**
 * Internal dependencies
 */
import BackgroundAttributes from './attributes';
import BackgroundClasses from './classes';
import BackgroundImageToolbarControls from './controls';
import BackgroundImageDropZone from './dropzone';
import BackgroundImageTransforms from './transforms';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { SelectControl, RangeControl, ToggleControl, PanelBody, Button } = wp.components;

/**
 * Module constants.
 */
export const ALLOWED_BG_MEDIA_TYPES = [ 'image' ];
export const BLOCKS_WITH_AUTOPADDING = [ 'coblocks/media-card', 'coblocks/features', 'coblocks/feature' ];

/**
 * Export
 */
export {
	BackgroundAttributes,
	BackgroundClasses,
	BackgroundImageToolbarControls,
	BackgroundImageDropZone,
	BackgroundImageTransforms,
};

/**
 * Background Options Component
 */
function BackgroundImagePanel( props, options ) {

	const {
		attributes,
		setAttributes,
	} = props;

	const {
		backgroundPosition,
		backgroundRepeat,
		backgroundSize,
		backgroundOverlay,
		hasParallax,
		backgroundImg,
	} = attributes;

	const backgroundPositionOptions = [
		{ value: 'top left', label: __( 'Top Left' ) },
		{ value: 'top center', label: __( 'Top Center' ) },
		{ value: 'top right', label: __( 'Top Right' ) },
		{ value: 'center left', label: __( 'Center Left' ) },
		{ value: 'center center', label: __( 'Center Center' ) },
		{ value: 'center right', label: __( 'Center Right' ) },
		{ value: 'bottom left', label: __( 'Bottom Left' ) },
		{ value: 'bottom center', label: __( 'Bottom Center' ) },
		{ value: 'bottom right', label: __( 'Bottom Right' ) },
	];

	const backgroundRepeatOptions = [
		{ value: 'no-repeat', label: __( 'No Repeat' ) },
		{ value: 'repeat', label: __( 'Repeat' ) },
		{ value: 'repeat-x', label: __( 'Repeat Horizontally' ) },
		{ value: 'repeat-y', label: __( 'Repeat Vertically' ) },
	];

	const backgroundSizeOptions = [
		{ value: 'auto', label: __( 'Auto' ) },
		{ value: 'cover', label: __( 'Cover' ) },
		{ value: 'contain', label: __( 'Contain' ) },
	];

	const overlayStyleOptions = [
		{ value: 'dark', label: __( 'Dark' ) },
		{ value: 'gray', label: __( 'Gray' ) },
		{ value: 'light', label: __( 'Light' ) },
		{ value: 'background', label: __( 'Background Color' ) },
	];

	const overlaySelect = () => {
		if ( typeof options !== 'undefined' && typeof options.overlay !== 'undefined' && options.overlay ) {
			return(
				<RangeControl
					label={ __( 'Image Overlay' ) }
					value={ backgroundOverlay }
					onChange={ ( nextBackgroundOverlay ) => setAttributes( {  backgroundOverlay: nextBackgroundOverlay } ) }
					min={ 0 }
					max={ 90 }
					step={ 10 }
				/>
			);
		}
	}

	if ( backgroundImg ) {
		const backgroundSizeDefault = ( typeof options !== 'undefined' && typeof options.backgroundSize !== 'undefined' ) ? options.backgroundSize : 'cover';
		return(
			<Fragment>
				<PanelBody
					title={ ( typeof options !== 'undefined' && typeof options.label !== 'undefined' ) ? options.label : __( 'Background Settings' ) }
					initialOpen={ false }
				>
					{ overlaySelect() }
					<SelectControl
						label={ __( 'Position' ) }
						value={ backgroundPosition ? backgroundPosition : 'center center' }
						options={ backgroundPositionOptions }
						onChange={ ( nextbackgroundPosition ) => setAttributes( { backgroundPosition: nextbackgroundPosition } ) }
					/>
					<SelectControl
						label={ __( 'Repeat' ) }
						value={ backgroundRepeat ? backgroundRepeat : 'no-repeat' }
						options={ backgroundRepeatOptions }
						onChange={ ( nextbackgroundRepeat ) => setAttributes( { backgroundRepeat: nextbackgroundRepeat } ) }
					/>
					<SelectControl
						label={ __( 'Display' ) }
						value={ backgroundSize ? backgroundSize : backgroundSizeDefault }
						options={ backgroundSizeOptions }
						onChange={ ( nextbackgroundSize ) => setAttributes( { backgroundSize: nextbackgroundSize } ) }
					/>
					<ToggleControl
						label={ __( 'Fixed Background' ) }
						checked={ !! hasParallax }
						onChange={ () => setAttributes( {  hasParallax: ! hasParallax } ) }
					/>
				</PanelBody>
			</Fragment>
		);
	}
}

export default BackgroundImagePanel;