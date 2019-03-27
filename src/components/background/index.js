/**
 * Internal dependencies
 */
import './styles/style.scss';
import './styles/editor.scss';
import BackgroundAttributes from './attributes';
import BackgroundClasses from './classes';
import BackgroundControls from './controls';
import BackgroundDropZone from './dropzone';
import BackgroundTransforms from './transforms';
import BackgroundVideo from './video';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { SelectControl, RangeControl, ToggleControl, PanelBody, Button, FocalPointPicker } = wp.components;

/**
 * Module constants.
 */
export const ALLOWED_BG_MEDIA_TYPES = [ 'image', 'video' ];
export const BLOCKS_WITH_AUTOPADDING = [ 'coblocks/row', 'coblocks/column', 'coblocks/media-card', 'coblocks/features', 'coblocks/feature' ];

/**
 * Export
 */
export {
	BackgroundAttributes,
	BackgroundClasses,
	BackgroundControls,
	BackgroundDropZone,
	BackgroundTransforms,
	BackgroundVideo,
};

/**
 * Background Options Component
 */
function BackgroundPanel( props, options ) {

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
		backgroundType,
		focalPoint,
		videoMuted,
		videoLoop,
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
					label={ __( 'Background Opacity' ) }
					value={ backgroundOverlay }
					onChange={ ( nextBackgroundOverlay ) => setAttributes( {  backgroundOverlay: nextBackgroundOverlay } ) }
					min={ 0 }
					max={ 100 }
					step={ 10 }
				/>
			);
		}
	}

	const onSelectRepeat = ( backgroundRepeat ) => {

		if ( backgroundRepeat === 'no-repeat' ) {
			setAttributes( {
				backgroundRepeat: backgroundRepeat,
				backgroundSize: 'cover',
			} );
		} else {
			setAttributes( {
				backgroundRepeat: backgroundRepeat,
				backgroundSize: 'contain',
				focalPoint: undefined,
			} );
		}
	}

	if ( backgroundImg ) {
		const backgroundSizeDefault = ( typeof options !== 'undefined' && typeof options.backgroundSize !== 'undefined' ) ? options.backgroundSize : 'cover';
		return(
			<Fragment>
				<PanelBody
					title={ ( typeof options !== 'undefined' && typeof options.label !== 'undefined' ) ? options.label : __( 'Background Settings' ) }
					initialOpen={ false }
					className="components-panel__body--coblocks-background-panel"
				>
					{ backgroundType == 'image' && (
						<ToggleControl
							label={ __( 'Fixed Background' ) }
							checked={ !! hasParallax }
							onChange={ () => setAttributes( {  hasParallax: ! hasParallax } ) }
						/>
					) }

					{ ! hasParallax && FocalPointPicker && backgroundType == 'image' && backgroundRepeat !== 'repeat' && (
						<FocalPointPicker
							label={ __( 'Focal Point' ) }
							url={ backgroundImg }
							value={ focalPoint }
							onChange={ ( value ) => setAttributes( { focalPoint: value } ) }
							className="components-focal-point-picker--coblocks"
						/>
					) }
					{ overlaySelect() }

					{ backgroundType == 'image' && (
						<SelectControl
							label={ __( 'Repeat' ) }
							className="components-background-display-select--coblocks"
							value={ backgroundRepeat ? backgroundRepeat : 'no-repeat' }
							options={ backgroundRepeatOptions }
							onChange={ ( nextbackgroundRepeat ) => onSelectRepeat( nextbackgroundRepeat ) }
						/>
					) }

					{ ! FocalPointPicker && backgroundType == 'image' && (
						<SelectControl
							label={ __( 'Position' ) }
							value={ backgroundPosition ? backgroundPosition : 'center center' }
							options={ backgroundPositionOptions }
							onChange={ ( nextbackgroundPosition ) => setAttributes( { backgroundPosition: nextbackgroundPosition } ) }
						/>
					) }

					{ backgroundRepeat == 'no-repeat' && backgroundType == 'image' && (
						<SelectControl
							label={ __( 'Display' ) }
							value={ backgroundSize ? backgroundSize : backgroundSizeDefault }
							options={ backgroundSizeOptions }
							onChange={ ( nextbackgroundSize ) => setAttributes( { backgroundSize: nextbackgroundSize } ) }
						/>
					) }

					{ backgroundType == 'video' && (
						<ToggleControl
							label={ __( 'Mute Video' ) }
							help={ videoMuted ? __( 'Muting the background video.' ) : __( 'Toggle to mute the video.' ) }
							checked={ !! videoMuted }
							onChange={ () => setAttributes( {  videoMuted: ! videoMuted } ) }
						/>
					) }

					{ backgroundType == 'video' && (
						<ToggleControl
							label={ __( 'Loop Video' ) }
							help={ videoLoop ? __( 'Looping the background video.' ) : __( 'Toggle to loop the video.' ) }
							checked={ !! videoLoop }
							onChange={ () => setAttributes( {  videoLoop: ! videoLoop } ) }
						/>
					) }

					<Button
						className="components-button--coblocks-remove-background-image"
						type="button"
						isDefault
						label={ __( 'Remove background' ) }
						onClick={ () => {
							setAttributes( {
								backgroundImg: '',
								backgroundOverlay: 0,
								backgroundRepeat: 'no-repeat',
								backgroundPosition: '',
								backgroundSize: 'cover',
								hasParallax: false,
							} );

							// Remove padding when background image is removed.
							if ( BLOCKS_WITH_AUTOPADDING.includes( props.name ) ){
								if( attributes.paddingSize ){
									setAttributes( { paddingSize: 'no' } );
								}
							}
						} }
					>
						{ __( 'Remove ' + backgroundType ) }
					</Button>
				</PanelBody>
			</Fragment>
		);
	}
}

export default BackgroundPanel;