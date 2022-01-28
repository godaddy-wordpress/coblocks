/**
 * External dependencies
 */
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import { BLOCKS_WITH_AUTOPADDING } from './';
import ResponsiveTabsControl from '../../components/responsive-tabs-control';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Button, FocalPointPicker, PanelBody, RangeControl, SelectControl, ToggleControl } from '@wordpress/components';
import { Component, Fragment } from '@wordpress/element';

class BackgroundPanel extends Component {
	constructor() {
		super( ...arguments );
		this.setBackgroundPaddingTo = this.setBackgroundPaddingTo.bind( this );
		this.setBackgroundPaddingMobileTo = this.setBackgroundPaddingMobileTo.bind( this );
		this.onSelectRepeat = this.onSelectRepeat.bind( this );
	}

	setBackgroundPaddingTo( value ) {
		const { setAttributes, attributes } = this.props;

		setAttributes( { backgroundPadding: value } );

		if ( attributes.backgroundPadding <= 0 ) {
			setAttributes( {
				backgroundRadius: 0,
			} );
		}
	}

	setBackgroundPaddingMobileTo( value ) {
		const { setAttributes } = this.props;
		setAttributes( { backgroundPaddingMobile: value } );
	}

	onSelectRepeat( value ) {
		const { setAttributes } = this.props;

		if ( value === 'no-repeat' ) {
			setAttributes( {
				backgroundRepeat: value,
				backgroundSize: 'cover',
			} );
		} else {
			setAttributes( {
				backgroundRepeat: value,
				backgroundSize: 'contain',
				focalPoint: undefined,
			} );
		}
	}

	render() {
		const {
			attributes,
			backgroundColor,
			hasGalleryControls,
			hasOverlay,
			name,
			setAttributes,
		} = this.props;

		const {
			align,
			backgroundImg,
			backgroundOverlay,
			backgroundPadding,
			backgroundPaddingMobile,
			backgroundPosition,
			backgroundRadius,
			backgroundRepeat,
			backgroundSize,
			backgroundType = 'image',
			focalPoint,
			hasParallax,
			videoLoop,
			videoMuted,
		} = attributes;

		const backgroundPositionOptions = [
			{
				/* translators: block layout */
				label: __( 'Top left', 'coblocks' ),
				value: 'top left',
			},
			{
				/* translators: block layout */
				label: __( 'Top center', 'coblocks' ),
				value: 'top center',
			},
			{
				/* translators: block layout */
				label: __( 'Top right', 'coblocks' ),
				value: 'top right',
			},
			{
				/* translators: block layout */
				label: __( 'Center left', 'coblocks' ),
				value: 'center left',
			},
			{
				/* translators: block layout */
				label: __( 'Center center', 'coblocks' ),
				value: 'center center',
			},
			{
				/* translators: block layout */
				label: __( 'Center right', 'coblocks' ),
				value: 'center right',
			},
			{
				/* translators: block layout */
				label: __( 'Bottom left', 'coblocks' ),
				value: 'bottom left',
			},
			{
				/* translators: block layout */
				label: __( 'Bottom center', 'coblocks' ),
				value: 'bottom center',
			},
			{
				/* translators: block layout */
				label: __( 'Bottom right', 'coblocks' ),
				value: 'bottom right',
			},
		];

		const backgroundRepeatOptions = [
			{
				/* translators: block layout */
				label: __( 'No repeat', 'coblocks' ),
				value: 'no-repeat',
			},
			{
				/* translators: block layout */
				label: __( 'Repeat', 'coblocks' ),
				value: 'repeat',
			},
			{
				/* translators: block layout */
				label: __( 'Repeat horizontally', 'coblocks' ),
				value: 'repeat-x',
			},
			{
				/* translators: block layout */
				label: __( 'Repeat vertically', 'coblocks' ),
				value: 'repeat-y',
			},
		];

		const backgroundSizeOptions = [
			{
				/* translators: block layout */
				label: __( 'Auto', 'coblocks' ),
				value: 'auto',
			},
			{
				/* translators: block layout */
				label: __( 'Cover', 'coblocks' ),
				value: 'cover',
			},
			{
				/* translators: block layout */
				label: __( 'Contain', 'coblocks' ),
				value: 'contain',
			},
		];

		const backgroundSizeDefault = 'cover';

		return (
			<Fragment>
				{ backgroundImg && (
					<PanelBody
						initialOpen={ false }
						title={ __( 'Background settings', 'coblocks' ) }
					>
						{ backgroundType === 'image' && (
							<ToggleControl
								checked={ !! hasParallax }
								label={ __( 'Fixed background', 'coblocks' ) }
								onChange={ () => setAttributes( { hasParallax: ! hasParallax } ) }
							/>
						) }
						{ ! hasParallax && FocalPointPicker && backgroundType === 'image' && backgroundRepeat !== 'repeat' && (
							<FocalPointPicker
								className="components-focal-point-picker--coblocks"
								label={ __( 'Focal point', 'coblocks' ) }
								onChange={ ( value ) => setAttributes( { focalPoint: value } ) }
								url={ backgroundImg }
								value={ focalPoint }
							/>
						) }
						{ hasOverlay && (
							<RangeControl
								label={ __( 'Background opacity', 'coblocks' ) }
								max={ 100 }
								min={ 0 }
								onChange={ ( nextBackgroundOverlay ) => setAttributes( { backgroundOverlay: nextBackgroundOverlay } ) }
								step={ 10 }
								value={ backgroundOverlay }
							/>
						) }
						{ hasGalleryControls && (
							<Fragment>
								<ResponsiveTabsControl { ...this.props }
									label={ __( 'Padding', 'coblocks' ) }
									max={ 100 }
									min={ 5 }
									onChange={ this.setBackgroundPaddingTo }
									onChangeMobile={ this.setBackgroundPaddingMobileTo }
									value={ backgroundPadding }
									valueMobile={ backgroundPaddingMobile }
								/>
								{ ( ( ! isEmpty( backgroundImg ) || ! isEmpty( backgroundColor.color ) ) && backgroundPadding > 0 ) && align !== 'full' &&
									<RangeControl
										label={ __( 'Rounded corners', 'coblocks' ) }
										max={ 20 }
										min={ 0 }
										onChange={ ( nextBackgroundRadius ) => setAttributes( { backgroundRadius: nextBackgroundRadius } ) }
										step={ 1 }
										value={ backgroundRadius }
									/>
								}
							</Fragment>
						) }
						{ backgroundType === 'image' && (
							<SelectControl
								label={ __( 'Repeat', 'coblocks' ) }
								onChange={ ( nextbackgroundRepeat ) => this.onSelectRepeat( nextbackgroundRepeat ) }
								options={ backgroundRepeatOptions }
								value={ backgroundRepeat ? backgroundRepeat : 'no-repeat' }
							/>
						) }
						{ ! FocalPointPicker && backgroundType === 'image' && (
							<SelectControl
								label={ __( 'Position', 'coblocks' ) }
								onChange={ ( nextbackgroundPosition ) => setAttributes( { backgroundPosition: nextbackgroundPosition } ) }
								options={ backgroundPositionOptions }
								value={ backgroundPosition ? backgroundPosition : 'center center' }
							/>
						) }
						{ backgroundRepeat === 'no-repeat' && backgroundType === 'image' && (
							<SelectControl
								label={ __( 'Display', 'coblocks' ) }
								onChange={ ( nextbackgroundSize ) => setAttributes( { backgroundSize: nextbackgroundSize } ) }
								options={ backgroundSizeOptions }
								value={ backgroundSize ? backgroundSize : backgroundSizeDefault }
							/>
						) }
						{ backgroundType === 'video' && (
							<ToggleControl
								checked={ !! videoMuted }
								help={ videoMuted ? __( 'Muting the background video.', 'coblocks' ) : __( 'Toggle to mute the video.', 'coblocks' ) }
								label={ __( 'Mute video', 'coblocks' ) }
								onChange={ () => setAttributes( { videoMuted: ! videoMuted } ) }
							/>
						) }
						{ backgroundType === 'video' && (
							<ToggleControl
								checked={ !! videoLoop }
								help={ videoLoop ? __( 'Looping the background video.', 'coblocks' ) : __( 'Toggle to loop the video.', 'coblocks' ) }
								label={ __( 'Loop video', 'coblocks' ) }
								onChange={ () => setAttributes( { videoLoop: ! videoLoop } ) }
							/>
						) }
						<Button
							isSecondary
							isSmall
							label={ __( 'Remove background', 'coblocks' ) }
							onClick={ () => {
								setAttributes( {
									backgroundImg: '',
									backgroundOverlay: 0,
									backgroundPadding: 0,
									backgroundPaddingMobile: 0,
									backgroundPosition: '',
									backgroundRepeat: 'no-repeat',
									backgroundSize: 'cover',
									hasParallax: false,
								} );

								// Remove padding when background image is removed.
								if ( BLOCKS_WITH_AUTOPADDING.includes( name ) ) {
									if ( attributes.paddingSize ) {
										setAttributes( { paddingSize: 'no' } );
									}
								}
							} }
							type="button"
						>
							{ __( 'Clear Media', 'coblocks' ) }
						</Button>
					</PanelBody>
				) }
			</Fragment>
		);
	}
}

BackgroundPanel.propTypes = {
	attributes: PropTypes.object,
	name: PropTypes.string,
	setAttributes: PropTypes.func,
};

export default BackgroundPanel;
