/**
 * External dependencies
 */
import isEmpty from 'lodash/isEmpty';

/**
 * Internal dependencies
 */
import { BLOCKS_WITH_AUTOPADDING } from './';
import ResponsiveTabsControl from '../../components/responsive-tabs-control';

/**
 * WordPress dependencies
 */
import { __, _x } from '@wordpress/i18n';
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
			{ value: 'top left', label: _x( 'Top Left', 'block layout', 'coblocks' ) },
			{ value: 'top center', label: _x( 'Top Center', 'block layout', 'coblocks' ) },
			{ value: 'top right', label: _x( 'Top Right', 'block layout', 'coblocks' ) },
			{ value: 'center left', label: _x( 'Center Left', 'block layout', 'coblocks' ) },
			{ value: 'center center', label: _x( 'Center Center', 'block layout', 'coblocks' ) },
			{ value: 'center right', label: _x( 'Center Right', 'block layout', 'coblocks' ) },
			{ value: 'bottom left', label: _x( 'Bottom Left', 'block layout', 'coblocks' ) },
			{ value: 'bottom center', label: _x( 'Bottom Center', 'block layout', 'coblocks' ) },
			{ value: 'bottom right', label: _x( 'Bottom Right', 'block layout', 'coblocks' ) },
		];

		const backgroundRepeatOptions = [
			{ value: 'no-repeat', label: _x( 'No Repeat', 'block layout', 'coblocks' ) },
			{ value: 'repeat', label: _x( 'Repeat', 'block layout', 'coblocks' ) },
			{ value: 'repeat-x', label: _x( 'Repeat Horizontally', 'block layout', 'coblocks' ) },
			{ value: 'repeat-y', label: _x( 'Repeat Vertically', 'block layout', 'coblocks' ) },
		];

		const backgroundSizeOptions = [
			{ value: 'auto', label: _x( 'Auto', 'block layout', 'coblocks' ) },
			{ value: 'cover', label: _x( 'Cover', 'block layout', 'coblocks' ) },
			{ value: 'contain', label: _x( 'Contain', 'block layout', 'coblocks' ) },
		];

		const backgroundSizeDefault = 'cover';

		return (
			<Fragment>
				{ backgroundImg && (
					<PanelBody
						title={ __( 'Background Settings', 'coblocks' ) }
						initialOpen={ false }
						className="components-panel__body--coblocks-background-panel"
					>
						{ backgroundType === 'image' && (
							<ToggleControl
								label={ __( 'Fixed Background', 'coblocks' ) }
								checked={ !! hasParallax }
								onChange={ () => setAttributes( { hasParallax: ! hasParallax } ) }
							/>
						) }
						{ ! hasParallax && FocalPointPicker && backgroundType === 'image' && backgroundRepeat !== 'repeat' && (
							<FocalPointPicker
								label={ __( 'Focal Point', 'coblocks' ) }
								url={ backgroundImg }
								value={ focalPoint }
								onChange={ ( value ) => setAttributes( { focalPoint: value } ) }
								className="components-focal-point-picker--coblocks"
							/>
						) }
						{ hasOverlay && (
							<RangeControl
								label={ __( 'Background Opacity', 'coblocks' ) }
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
										label={ __( 'Rounded Corners', 'coblocks' ) }
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
								className="components-background-display-select--coblocks"
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
								label={ __( 'Mute Video', 'coblocks' ) }
								help={ videoMuted ? __( 'Muting the background video.', 'coblocks' ) : __( 'Toggle to mute the video.', 'coblocks' ) }
								checked={ !! videoMuted }
								onChange={ () => setAttributes( { videoMuted: ! videoMuted } ) }
							/>
						) }
						{ backgroundType === 'video' && (
							<ToggleControl
								label={ __( 'Loop Video', 'coblocks' ) }
								help={ videoLoop ? __( 'Looping the background video.', 'coblocks' ) : __( 'Toggle to loop the video.', 'coblocks' ) }
								checked={ !! videoLoop }
								onChange={ () => setAttributes( { videoLoop: ! videoLoop } ) }
							/>
						) }
						<Button
							className="components-button--coblocks-remove-background-image"
							type="button"
							isDefault
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
							{ __( 'Remove ' + backgroundType ) }
						</Button>
					</PanelBody>
				) }
			</Fragment>
		);
	}
}

export default BackgroundPanel;
