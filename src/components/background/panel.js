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
import { Component, Fragment } from '@wordpress/element';
import { SelectControl, RangeControl, ToggleControl, PanelBody, Button, FocalPointPicker } from '@wordpress/components';

class BackgroundPanel extends Component {
	constructor() {
		super( ...arguments );
		this.setBackgroundPaddingTo = this.setBackgroundPaddingTo.bind( this );
		this.setBackgroundPaddingMobileTo = this.setBackgroundPaddingMobileTo.bind( this );
		this.onSelectRepeat = this.onSelectRepeat.bind( this );
	}

	setBackgroundPaddingTo( value ) {
		this.props.setAttributes( { backgroundPadding: value } );

		if ( this.props.attributes.backgroundPadding <= 0 ) {
			this.props.setAttributes( {
				backgroundRadius: 0,
			} );
		}
	}

	setBackgroundPaddingMobileTo( value ) {
		this.props.setAttributes( { backgroundPaddingMobile: value } );
	}

	onSelectRepeat( value ) {
		if ( value === 'no-repeat' ) {
			this.props.setAttributes( {
				backgroundRepeat: value,
				backgroundSize: 'cover',
			} );
		} else {
			this.props.setAttributes( {
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
				value: 'top left',
				/* translators: block layout */
				label: __( 'Top left', 'coblocks' ),
			},
			{
				value: 'top center',
				/* translators: block layout */
				label: __( 'Top center', 'coblocks' ),
			},
			{
				value: 'top right',
				/* translators: block layout */
				label: __( 'Top right', 'coblocks' ),
			},
			{
				value: 'center left',
				/* translators: block layout */
				label: __( 'Center left', 'coblocks' ),
			},
			{
				value: 'center center',
				/* translators: block layout */
				label: __( 'Center center', 'coblocks' ),
			},
			{
				value: 'center right',
				/* translators: block layout */
				label: __( 'Center right', 'coblocks' ),
			},
			{
				value: 'bottom left',
				/* translators: block layout */
				label: __( 'Bottom left', 'coblocks' ),
			},
			{
				value: 'bottom center',
				/* translators: block layout */
				label: __( 'Bottom center', 'coblocks' ),
			},
			{
				value: 'bottom right',
				/* translators: block layout */
				label: __( 'Bottom right', 'coblocks' ),
			},
		];

		const backgroundRepeatOptions = [
			{
				value: 'no-repeat',
				/* translators: block layout */
				label: __( 'No repeat', 'coblocks' ),
			},
			{
				value: 'repeat',
				/* translators: block layout */
				label: __( 'Repeat', 'coblocks' ),
			},
			{
				value: 'repeat-x',
				/* translators: block layout */
				label: __( 'Repeat horizontally', 'coblocks' ),
			},
			{
				value: 'repeat-y',
				/* translators: block layout */
				label: __( 'Repeat vertically', 'coblocks' ),
			},
		];

		const backgroundSizeOptions = [
			{
				value: 'auto',
				/* translators: block layout */
				label: __( 'Auto', 'coblocks' ),
			},
			{
				value: 'cover',
				/* translators: block layout */
				label: __( 'Cover', 'coblocks' ),
			},
			{
				value: 'contain',
				/* translators: block layout */
				label: __( 'Contain', 'coblocks' ),
			},
		];

		const backgroundSizeDefault = 'cover';

		return (
			<Fragment>
				{ backgroundImg && (
					<PanelBody
						title={ __( 'Background settings', 'coblocks' ) }
						initialOpen={ false }
					>
						{ backgroundType === 'image' && (
							<ToggleControl
								label={ __( 'Fixed background', 'coblocks' ) }
								checked={ !! hasParallax }
								onChange={ () => setAttributes( { hasParallax: ! hasParallax } ) }
							/>
						) }
						{ ! hasParallax && FocalPointPicker && backgroundType === 'image' && backgroundRepeat !== 'repeat' && (
							<FocalPointPicker
								label={ __( 'Focal point', 'coblocks' ) }
								url={ backgroundImg }
								value={ focalPoint }
								onChange={ ( value ) => setAttributes( { focalPoint: value } ) }
								className="components-focal-point-picker--coblocks"
							/>
						) }
						{ hasOverlay && (
							<RangeControl
								label={ __( 'Background opacity', 'coblocks' ) }
								value={ backgroundOverlay }
								onChange={ ( nextBackgroundOverlay ) => setAttributes( { backgroundOverlay: nextBackgroundOverlay } ) }
								min={ 0 }
								max={ 100 }
								step={ 10 }
							/>
						) }
						{ hasGalleryControls && (
							<Fragment>
								<ResponsiveTabsControl { ...this.props }
									label={ __( 'Padding', 'coblocks' ) }
									value={ backgroundPadding }
									valueMobile={ backgroundPaddingMobile }
									onChange={ this.setBackgroundPaddingTo }
									onChangeMobile={ this.setBackgroundPaddingMobileTo }
									min={ 5 }
									max={ 100 }
								/>
								{ ( ( ! isEmpty( backgroundImg ) || ! isEmpty( backgroundColor.color ) ) && backgroundPadding > 0 ) && align !== 'full' &&
									<RangeControl
										label={ __( 'Rounded corners', 'coblocks' ) }
										value={ backgroundRadius }
										onChange={ ( nextBackgroundRadius ) => setAttributes( { backgroundRadius: nextBackgroundRadius } ) }
										min={ 0 }
										max={ 20 }
										step={ 1 }
									/>
								}
							</Fragment>
						) }
						{ backgroundType === 'image' && (
							<SelectControl
								label={ __( 'Repeat', 'coblocks' ) }
								value={ backgroundRepeat ? backgroundRepeat : 'no-repeat' }
								options={ backgroundRepeatOptions }
								onChange={ ( nextbackgroundRepeat ) => this.onSelectRepeat( nextbackgroundRepeat ) }
							/>
						) }
						{ ! FocalPointPicker && backgroundType === 'image' && (
							<SelectControl
								label={ __( 'Position', 'coblocks' ) }
								value={ backgroundPosition ? backgroundPosition : 'center center' }
								options={ backgroundPositionOptions }
								onChange={ ( nextbackgroundPosition ) => setAttributes( { backgroundPosition: nextbackgroundPosition } ) }
							/>
						) }
						{ backgroundRepeat === 'no-repeat' && backgroundType === 'image' && (
							<SelectControl
								label={ __( 'Display', 'coblocks' ) }
								value={ backgroundSize ? backgroundSize : backgroundSizeDefault }
								options={ backgroundSizeOptions }
								onChange={ ( nextbackgroundSize ) => setAttributes( { backgroundSize: nextbackgroundSize } ) }
							/>
						) }
						{ backgroundType === 'video' && (
							<ToggleControl
								label={ __( 'Mute video', 'coblocks' ) }
								help={ videoMuted ? __( 'Muting the background video.', 'coblocks' ) : __( 'Toggle to mute the video.', 'coblocks' ) }
								checked={ !! videoMuted }
								onChange={ () => setAttributes( { videoMuted: ! videoMuted } ) }
							/>
						) }
						{ backgroundType === 'video' && (
							<ToggleControl
								label={ __( 'Loop video', 'coblocks' ) }
								help={ videoLoop ? __( 'Looping the background video.', 'coblocks' ) : __( 'Toggle to loop the video.', 'coblocks' ) }
								checked={ !! videoLoop }
								onChange={ () => setAttributes( { videoLoop: ! videoLoop } ) }
							/>
						) }
						<Button
							type="button"
							isSmall
							isSecondary
							label={ __( 'Remove background', 'coblocks' ) }
							onClick={ () => {
								setAttributes( {
									backgroundImg: '',
									backgroundOverlay: 0,
									backgroundRepeat: 'no-repeat',
									backgroundPosition: '',
									backgroundSize: 'cover',
									hasParallax: false,
									backgroundPadding: 0,
									backgroundPaddingMobile: 0,
								} );

								// Remove padding when background image is removed.
								if ( BLOCKS_WITH_AUTOPADDING.includes( this.props.name ) ) {
									if ( attributes.paddingSize ) {
										setAttributes( { paddingSize: 'no' } );
									}
								}
							} }
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
}

export default BackgroundPanel;
