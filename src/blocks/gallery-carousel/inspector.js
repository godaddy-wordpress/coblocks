/**
 * Internal dependencies
 */
import OptionSelectorControl from '../../components/option-selector-control';
import ResponsiveTabsControl from '../../components/responsive-tabs-control';
import SliderPanel from '../../components/slider-panel';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { BaseControl, PanelBody, RangeControl, ToggleControl } from '@wordpress/components';
import { InspectorAdvancedControls, InspectorControls } from '@wordpress/block-editor';

/**
 * Inspector controls
 *
 * @param {Object} props passed from Edit functional component.
 */
const Inspector = ( props ) => {
	const { setAttributes } = props;
	const [ temporaryInput, setTemporaryInput ] = useState( null );

	const setRadiusTo = ( value ) => setAttributes( { radius: value } );
	const setGridSize = ( value ) => setAttributes( { gridSize: value } );
	const setHeightTo = ( value ) => setAttributes( { height: value } );
	const setTemporayInput = ( value ) => setTemporaryInput( value );

	const getThumbnailNavigationHelp = ( checked ) => checked
		? __( 'Showing thumbnail navigation.', 'coblocks' )
		: __( 'Toggle to show thumbnails.', 'coblocks' );

	const getResponsiveHeightHelp = ( checked ) => checked
		? __( 'Percentage based height is activated.', 'coblocks' )
		: __( 'Toggle for percentage based height.', 'coblocks' );

	const getLightboxHelp = ( checked ) => checked
		? __( 'Image lightbox is enabled.', 'coblocks' )
		: __( 'Toggle to enable the image lightbox.', 'coblocks' );

	const {
		attributes,
		isSelected,
	} = props;

	const {
		align,
		gridSize,
		gutter,
		height,
		radius,
		thumbnails,
		responsiveHeight,
		lightbox,
	} = attributes;

	/**
	 * Grid constant.
	 */
	const gridOptions = () => {
		const defaultOptions = [
			{
				/* translators: abbreviation for large size */
				label: __( 'L', 'coblocks' ),
				tooltip: __( 'Large', 'coblocks' ),
				value: 'lrg',
			},
			{
				/* translators: abbreviation for large size */
				label: __( 'XL', 'coblocks' ),
				tooltip: __( 'Extra Large', 'coblocks' ),
				value: 'xlrg',
			},
		];

		if ( !! align && align !== 'none' ) {
			defaultOptions.unshift( {
				/* translators: abbreviation for medium size */
				label: __( 'M', 'coblocks' ),
				tooltip: __( 'Medium', 'coblocks' ),
				value: 'med',
			} );
		}
		if ( align === 'full' ) {
			defaultOptions.unshift( {
				/* translators: abbreviation for small size */
				label: __( 'S', 'coblocks' ),
				tooltip: __( 'Small', 'coblocks' ),
				value: 'sml',
			} );
		}
		return defaultOptions;
	};

	return (
		isSelected && (
			<>
				<InspectorControls>
					<PanelBody title={ __( 'Carousel settings', 'coblocks' ) } >
						<OptionSelectorControl
							currentOption={ gridSize }
							label={ __( 'Size', 'coblocks' ) }
							onChange={ setGridSize }
							options={ gridOptions() }
						/>
						{ gridSize !== 'xlrg' && ( align === 'wide' || align === 'full' ) &&
							<ResponsiveTabsControl { ...props }
								max={ 20 }
							/>
						}
						{ gridSize !== 'xlrg' && ! align &&
							<ResponsiveTabsControl { ...props }
								max={ 20 }
							/>
						}
						{ gutter > 0 &&
							<RangeControl
								label={ __( 'Rounded corners', 'coblocks' ) }
								max={ 20 }
								min={ 0 }
								onChange={ setRadiusTo }
								step={ 1 }
								value={ radius }
							/>
						}
						{ ! responsiveHeight &&
							<BaseControl
								className={ 'block-height-control' }
								id="gallery-carousel-height-control"
								label={ __( 'Height in pixels', 'coblocks' ) }
							>
								<input
									className={ 'block-height-control__input' }
									min={ 0 }
									onChange={ ( event ) => {
										const unprocessedValue = event.target.value;
										const inputValue = unprocessedValue !== ''
											? parseInt( event.target.value, 10 )
											: undefined;
										if ( ( inputValue < 0 ) && inputValue !== undefined ) {
											setTemporayInput( inputValue );
											setHeightTo( 0 );
											return;
										}
										setTemporayInput( null );
										setHeightTo( inputValue );
									} }
									step="10"
									type="number"
									value={ temporaryInput || height }
								/>
							</BaseControl>
						}
						<ToggleControl
							checked={ !! lightbox }
							help={ getLightboxHelp }
							label={ __( 'Lightbox', 'coblocks' ) }
							onChange={ () => setAttributes( { lightbox: ! lightbox } ) }
						/>
						<ToggleControl
							checked={ !! thumbnails }
							help={ getThumbnailNavigationHelp }
							label={ __( 'Thumbnails', 'coblocks' ) }
							onChange={ () => setAttributes( { thumbnails: ! thumbnails } ) }
						/>
					</PanelBody>
					<SliderPanel { ...props } />
				</InspectorControls>
				<InspectorAdvancedControls>
					<ToggleControl
						checked={ !! responsiveHeight }
						help={ getResponsiveHeightHelp }
						label={ __( 'Responsive height', 'coblocks' ) }
						onChange={ () => setAttributes( { responsiveHeight: ! responsiveHeight } ) }
					/>
				</InspectorAdvancedControls>
			</>
		)
	);
};

export default Inspector;
