/**
 * Internal dependencies
 */
import ResponsiveTabsControl from '../../components/responsive-tabs-control';
import SizeControl from '../../components/size-control';
import SliderPanel from '../../components/slider-panel';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { InspectorControls, InspectorAdvancedControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl, ToggleControl, BaseControl } from '@wordpress/components';

/**
 * Inspector controls
 *
 * @param {Object} props passed from Edit functional component.
 */
const Inspector = ( props ) => {
	const [ temporaryInput, setTemporaryInput ] = useState( null );

	const setRadiusTo = ( value ) => {
		props.setAttributes( { radius: value } );
	};

	const setSizeControl = ( value ) => {
		props.setAttributes( { gridSize: value } );
	};

	const setHeightTo = ( value ) => {
		props.setAttributes( { height: value } );
	};

	const setTemporayInput = ( value ) => {
		setTemporaryInput( value );
	};

	const getThumbnailNavigationHelp = ( checked ) => {
		return checked ? __( 'Showing thumbnail navigation.', 'coblocks' ) : __( 'Toggle to show thumbnails.', 'coblocks' );
	};

	const getResponsiveHeightHelp = ( checked ) => {
		return checked ? __( 'Percentage based height is activated.', 'coblocks' ) : __( 'Toggle for percentage based height.', 'coblocks' );
	};

	const getLightboxHelp = ( checked ) => {
		return checked ? __( 'Image lightbox is enabled.', 'coblocks' ) : __( 'Toggle to enable the image lightbox.', 'coblocks' );
	};

	const {
		attributes,
		isSelected,
		setAttributes,
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

	return (
		isSelected && (
			<>
				<InspectorControls>
					<PanelBody title={ __( 'Carousel settings', 'coblocks' ) } >
						<SizeControl { ...props }
							type={ 'grid' }
							label={ __( 'Size', 'coblocks' ) }
							onChange={ setSizeControl }
							value={ gridSize }
							resetValue={ 'xlrg' }
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
							value={ radius }
							onChange={ setRadiusTo }
							min={ 0 }
							max={ 20 }
							step={ 1 }
						/>
						}
						{ ! responsiveHeight &&
							<BaseControl
								label={ __( 'Height in pixels', 'coblocks' ) }
								className={ 'block-height-control' }
								id="gallery-carousel-height-control"
							>
								<input
									type="number"
									className={ 'block-height-control__input' }
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
									value={ temporaryInput || height }
									min={ 0 }
									step="10"
								/>
							</BaseControl>
						}
						<ToggleControl
							label={ __( 'Lightbox', 'coblocks' ) }
							checked={ !! lightbox }
							onChange={ () => setAttributes( { lightbox: ! lightbox } ) }
							help={ getLightboxHelp }
						/>
						<ToggleControl
							label={ __( 'Thumbnails', 'coblocks' ) }
							checked={ !! thumbnails }
							onChange={ () => setAttributes( { thumbnails: ! thumbnails } ) }
							help={ getThumbnailNavigationHelp }
						/>
					</PanelBody>
					<SliderPanel { ...props } />
				</InspectorControls>
				<InspectorAdvancedControls>
					<ToggleControl
						label={ __( 'Responsive height', 'coblocks' ) }
						checked={ !! responsiveHeight }
						onChange={ () => setAttributes( { responsiveHeight: ! responsiveHeight } ) }
						help={ getResponsiveHeightHelp }
					/>
				</InspectorAdvancedControls>
			</>
		)
	);
};

export default Inspector;
