/**
 * External dependencies
 */
import classnames from 'classnames';
import map from 'lodash/map';

/**
 * Internal dependencies
 */
import { DesktopIcon, TabletIcon, MobileIcon, SyncIcon } from '@godaddy-wordpress/coblocks-icons';
import DimensionsSelect from './dimensions-select';

/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { withInstanceId } from '@wordpress/compose';
import { dispatch } from '@wordpress/data';
import { Component, Fragment } from '@wordpress/element';
import { ButtonGroup, BaseControl, Button, Tooltip, TabPanel } from '@wordpress/components';

class DimensionsControl extends Component {
	constructor( props ) {
		super( ...arguments );
		this.onChangeTop = this.onChangeTop.bind( this );
		this.onChangeRight = this.onChangeRight.bind( this );
		this.onChangeBottom = this.onChangeBottom.bind( this );
		this.onChangeLeft = this.onChangeLeft.bind( this );
		this.onChangeAll = this.onChangeAll.bind( this );
		this.onChangeUnits = this.onChangeUnits.bind( this );
		this.onChangeSize = this.onChangeSize.bind( this );
		this.syncUnits = this.syncUnits.bind( this );
		this.saveMeta = this.saveMeta.bind( this );

		if ( props.attributes.saveCoBlocksMeta ) {
			this.saveMeta();
			dispatch( 'core/block-editor' ).updateBlockAttributes( props.attributes.clientId, { saveCoBlocksMeta: false } );
		}
	}

	onChangeTop( value, device ) {
		if ( this.props.type === 'padding' ) {
			this.props.setAttributes( { [ 'paddingTop' + device ]: value } );
		} else {
			this.props.setAttributes( { [ 'marginTop' + device ]: value } );
		}
		this.saveMeta();
	}

	onChangeRight( value, device ) {
		if ( this.props.type === 'padding' ) {
			this.props.setAttributes( { [ 'paddingRight' + device ]: value } );
		} else {
			this.props.setAttributes( { [ 'marginRight' + device ]: value } );
		}
		this.saveMeta();
	}

	onChangeBottom( value, device ) {
		if ( this.props.type === 'padding' ) {
			this.props.setAttributes( { [ 'paddingBottom' + device ]: value } );
		} else {
			this.props.setAttributes( { [ 'marginBottom' + device ]: value } );
		}
		this.saveMeta();
	}

	onChangeLeft( value, device ) {
		if ( this.props.type === 'padding' ) {
			this.props.setAttributes( { [ 'paddingLeft' + device ]: value } );
		} else {
			this.props.setAttributes( { [ 'marginLeft' + device ]: value } );
		}
		this.saveMeta();
	}

	onChangeAll( value, device ) {
		if ( this.props.type === 'padding' ) {
			this.props.setAttributes( { [ 'paddingTop' + device ]: value, [ 'paddingRight' + device ]: value, [ 'paddingBottom' + device ]: value, [ 'paddingLeft' + device ]: value } );
		} else {
			this.props.setAttributes( { [ 'marginTop' + device ]: value, [ 'marginRight' + device ]: value, [ 'marginBottom' + device ]: value, [ 'marginLeft' + device ]: value } );
		}
		this.saveMeta();
	}

	onChangeUnits( value ) {
		if ( this.props.type === 'padding' ) {
			this.props.setAttributes( { paddingUnit: value } );
		} else {
			this.props.setAttributes( { marginUnit: value } );
		}

		this.saveMeta();
	}

	onChangeSize( value, size ) {
		//fix reset for specific blocks
		if ( [ 'coblocks/hero' ].includes( this.props.name ) && value === 'no' ) {
			if ( size < 0 ) {
				value = 'huge';
				size = 60;
			} else {
				size = -1;
			}
		}

		if ( this.props.type === 'padding' ) {
			this.props.setAttributes( { paddingSyncUnits: true } );
			this.props.setAttributes( { paddingSize: value } );
			if ( size ) {
				if ( size < 0 ) {
					size = '';
				}
				this.props.setAttributes( { paddingTop: size, paddingRight: size, paddingBottom: size, paddingLeft: size, paddingUnit: 'px' } );
			}
		} else {
			this.props.setAttributes( { marginSize: value } );
			if ( size ) {
				if ( size < 0 ) {
					size = '';
				}
				this.props.setAttributes( { marginTop: size, marginRight: 0, marginBottom: size, marginLeft: 0, marginUnit: 'px' } );
			}
		}

		this.saveMeta();
	}

	syncUnits( value, device ) {
		const numbers = [ this.props[ 'valueTop' + device ], this.props[ 'valueRight' + device ], this.props[ 'valueBottom' + device ], this.props[ 'valueLeft' + device ] ];

		const syncValue = Math.max.apply( null, numbers );

		if ( this.props.type === 'padding' ) {
			this.props.setAttributes( { [ 'paddingSyncUnits' + device ]: ! this.props[ 'syncUnits' + device ] } );
			this.props.setAttributes( { [ 'paddingTop' + device ]: syncValue, [ 'paddingRight' + device ]: syncValue, [ 'paddingBottom' + device ]: syncValue, [ 'paddingLeft' + device ]: syncValue } );
		} else {
			this.props.setAttributes( { [ 'marginSyncUnits' + device ]: ! this.props[ 'syncUnits' + device ] } );
			this.props.setAttributes( { [ 'marginTop' + device ]: syncValue, [ 'marginRight' + device ]: syncValue, [ 'marginBottom' + device ]: syncValue, [ 'marginLeft' + device ]: syncValue } );
		}

		this.saveMeta();
	}

	saveMeta() {
		const meta = wp.data.select( 'core/editor' ).getEditedPostAttribute( 'meta' );
		const block = wp.data.select( 'core/block-editor' ).getBlock( this.props.clientId );
		let dimensions = {};

		if ( typeof this.props.attributes.coblocks !== 'undefined' && typeof this.props.attributes.coblocks.id !== 'undefined' ) {
			const id = this.props.name.split( '/' ).join( '-' ) + '-' + this.props.attributes.coblocks.id;
			const paddingUnit = block.attributes.paddingUnit;
			const marginUnit = block.attributes.marginUnit;
			const padding = {
				paddingTop: ( typeof block.attributes.paddingTop !== 'undefined' ) ? block.attributes.paddingTop + paddingUnit : null,
				paddingRight: ( typeof block.attributes.paddingRight !== 'undefined' ) ? block.attributes.paddingRight + paddingUnit : null,
				paddingBottom: ( typeof block.attributes.paddingBottom !== 'undefined' ) ? block.attributes.paddingBottom + paddingUnit : null,
				paddingLeft: ( typeof block.attributes.paddingLeft !== 'undefined' ) ? block.attributes.paddingLeft + paddingUnit : null,
				paddingTopTablet: ( typeof block.attributes.paddingTopTablet !== 'undefined' ) ? block.attributes.paddingTopTablet + paddingUnit : null,
				paddingRightTablet: ( typeof block.attributes.paddingRightTablet !== 'undefined' ) ? block.attributes.paddingRightTablet + paddingUnit : null,
				paddingBottomTablet: ( typeof block.attributes.paddingBottomTablet !== 'undefined' ) ? block.attributes.paddingBottomTablet + paddingUnit : null,
				paddingLeftTablet: ( typeof block.attributes.paddingLeftTablet !== 'undefined' ) ? block.attributes.paddingLeftTablet + paddingUnit : null,
				paddingTopMobile: ( typeof block.attributes.paddingTopMobile !== 'undefined' ) ? block.attributes.paddingTopMobile + paddingUnit : null,
				paddingRightMobile: ( typeof block.attributes.paddingRightMobile !== 'undefined' ) ? block.attributes.paddingRightMobile + paddingUnit : null,
				paddingBottomMobile: ( typeof block.attributes.paddingBottomMobile !== 'undefined' ) ? block.attributes.paddingBottomMobile + paddingUnit : null,
				paddingLeftMobile: ( typeof block.attributes.paddingLeftMobile !== 'undefined' ) ? block.attributes.paddingLeftMobile + paddingUnit : null,
			};
			const margin = {
				marginTop: ( typeof block.attributes.marginTop !== 'undefined' ) ? block.attributes.marginTop + marginUnit : null,
				marginRight: ( typeof block.attributes.marginRight !== 'undefined' ) ? block.attributes.marginRight + marginUnit : null,
				marginBottom: ( typeof block.attributes.marginBottom !== 'undefined' ) ? block.attributes.marginBottom + marginUnit : null,
				marginLeft: ( typeof block.attributes.marginLeft !== 'undefined' ) ? block.attributes.marginLeft + marginUnit : null,
				marginTopTablet: ( typeof block.attributes.marginTopTablet !== 'undefined' ) ? block.attributes.marginTopTablet + marginUnit : null,
				marginRightTablet: ( typeof block.attributes.marginRightTablet !== 'undefined' ) ? block.attributes.marginRightTablet + marginUnit : null,
				marginBottomTablet: ( typeof block.attributes.marginBottomTablet !== 'undefined' ) ? block.attributes.marginBottomTablet + marginUnit : null,
				marginLeftTablet: ( typeof block.attributes.marginLeftTablet !== 'undefined' ) ? block.attributes.marginLeftTablet + marginUnit : null,
				marginTopMobile: ( typeof block.attributes.marginTopMobile !== 'undefined' ) ? block.attributes.marginTopMobile + marginUnit : null,
				marginRightMobile: ( typeof block.attributes.marginRightMobile !== 'undefined' ) ? block.attributes.marginRightMobile + marginUnit : null,
				marginBottomMobile: ( typeof block.attributes.marginBottomMobile !== 'undefined' ) ? block.attributes.marginBottomMobile + marginUnit : null,
				marginLeftMobile: ( typeof block.attributes.marginLeftMobile !== 'undefined' ) ? block.attributes.marginLeftMobile + marginUnit : null,
			};

			if ( typeof meta === 'undefined' || typeof meta._coblocks_dimensions === 'undefined' || ( typeof meta._coblocks_dimensions !== 'undefined' && meta._coblocks_dimensions === '' ) ) {
				dimensions = {};
			} else {
				dimensions = JSON.parse( meta._coblocks_dimensions );
			}

			if ( typeof dimensions[ id ] === 'undefined' ) {
				dimensions[ id ] = {};
				dimensions[ id ][ this.props.type ] = {};
			} else if ( typeof dimensions[ id ][ this.props.type ] === 'undefined' ) {
				dimensions[ id ][ this.props.type ] = {};
			}

			if ( this.props.dimensionSize === 'advanced' ) {
				dimensions[ id ][ this.props.type ] = ( this.props.type === 'padding' ) ? padding : margin;
			} else {
				dimensions[ id ][ this.props.type ] = {};
			}

			// Save values to metadata.
			wp.data.dispatch( 'core/editor' ).editPost( {
				meta: {
					_coblocks_dimensions: JSON.stringify( dimensions ),
				},
			} );

			//add CSS to head
			const head = document.head || document.getElementsByTagName( 'head' )[ 0 ];
			const style = document.createElement( 'style' );
			let responsiveCss = '';
			style.type = 'text/css';

			//add responsive styling for tablet device
			responsiveCss += '@media only screen and (max-width: 768px) {';
			responsiveCss += '.' + id + ' > div{';
			if ( typeof padding.paddingTopTablet !== 'undefined' ) {
				responsiveCss += 'padding-top: ' + padding.paddingTopTablet + ' !important;';
			}
			if ( typeof padding.paddingBottomTablet !== 'undefined' ) {
				responsiveCss += 'padding-bottom: ' + padding.paddingBottomTablet + ' !important;';
			}
			if ( typeof padding.paddingRightTablet !== 'undefined' ) {
				responsiveCss += 'padding-right: ' + padding.paddingRightTablet + ' !important;';
			}
			if ( typeof padding.paddingLeftTablet !== 'undefined' ) {
				responsiveCss += 'padding-left: ' + padding.paddingLeftTablet + ' !important;';
			}

			if ( typeof margin.marginTopTablet !== 'undefined' ) {
				responsiveCss += 'margin-top: ' + margin.marginTopTablet + ' !important;';
			}
			if ( typeof margin.marginBottomTablet !== 'undefined' ) {
				responsiveCss += 'margin-bottom: ' + margin.marginBottomTablet + ' !important;';
			}
			if ( typeof margin.marginRightTablet !== 'undefined' ) {
				responsiveCss += 'margin-right: ' + margin.marginRightTablet + ' !important;';
			}
			if ( typeof margin.marginleLtTablet !== 'undefined' ) {
				responsiveCss += 'margin-left: ' + margin.marginLeftTablet + ' !important;';
			}

			responsiveCss += '}';
			responsiveCss += '}';

			responsiveCss += '@media only screen and (max-width: 514px) {';
			responsiveCss += '.' + id + ' > div{';
			if ( typeof padding.paddingTopMobile !== 'undefined' ) {
				responsiveCss += 'padding-top: ' + padding.paddingTopMobile + ' !important;';
			}
			if ( typeof padding.paddingBottomMobile !== 'undefined' ) {
				responsiveCss += 'padding-bottom: ' + padding.paddingBottomMobile + ' !important;';
			}
			if ( typeof padding.paddingRightMobile !== 'undefined' ) {
				responsiveCss += 'padding-right: ' + padding.paddingRightMobile + ' !important;';
			}
			if ( typeof padding.paddingLeftMobile !== 'undefined' ) {
				responsiveCss += 'padding-left: ' + padding.paddingLeftMobile + ' !important;';
			}

			if ( typeof margin.marginTopMobile !== 'undefined' ) {
				responsiveCss += 'margin-top: ' + margin.marginTopMobile + ' !important;';
			}
			if ( typeof margin.marginBottomMobile !== 'undefined' ) {
				responsiveCss += 'margin-bottom: ' + margin.marginBottomMobile + ' !important;';
			}
			if ( typeof margin.marginRightMobile !== 'undefined' ) {
				responsiveCss += 'margin-right: ' + margin.marginRightMobile + ' !important;';
			}
			if ( typeof margin.marginleLtMobile !== 'undefined' ) {
				responsiveCss += 'margin-left: ' + margin.marginLeftMobile + ' !important;';
			}

			responsiveCss += '}';
			responsiveCss += '}';

			if ( style.styleSheet ) {
				style.styleSheet.cssText = responsiveCss;
			} else {
				style.appendChild( document.createTextNode( responsiveCss ) );
			}

			head.appendChild( style );
		}
	}

	render() {
		const {
			help,
			instanceId,
			label = __( 'Margin', 'coblocks' ),
			type = 'margin',
			unit,
			valueBottom,
			valueLeft,
			valueRight,
			valueTop,
			valueBottomTablet,
			valueLeftTablet,
			valueRightTablet,
			valueTopTablet,
			valueBottomMobile,
			valueLeftMobile,
			valueRightMobile,
			valueTopMobile,
			syncUnits,
			syncUnitsTablet,
			syncUnitsMobile,
			dimensionSize,
			setAttributes,
		} = this.props;

		const { paddingSize, marginSize } = this.props.attributes;

		const classes = classnames(
			'components-base-control',
			'components-coblocks-dimensions-control', {
			}
		);

		const id = `inspector-coblocks-dimensions-control-${ instanceId }`;

		const onChangeTopValue = ( event ) => {
			const newValue = ( event.target.value === '' ) ? undefined : Number( event.target.value );

			let device = '';
			if ( typeof event.target.getAttribute( 'data-device-type' ) !== 'undefined' && typeof event.target.getAttribute( 'data-device-type' ) !== 'undefined' ) {
				device = event.target.getAttribute( 'data-device-type' );
			}

			if ( this.props[ 'syncUnits' + device ] ) {
				this.onChangeAll( newValue, device );
			} else {
				this.onChangeTop( newValue, device );
			}
		};

		const onChangeRightValue = ( event ) => {
			const newValue = ( event.target.value === '' ) ? undefined : Number( event.target.value );

			let device = '';
			if ( typeof event.target.getAttribute( 'data-device-type' ) !== 'undefined' && typeof event.target.getAttribute( 'data-device-type' ) !== 'undefined' ) {
				device = event.target.getAttribute( 'data-device-type' );
			}

			if ( this.props[ 'syncUnits' + device ] ) {
				this.onChangeAll( newValue, device );
			} else {
				this.onChangeRight( newValue, device );
			}
		};

		const onChangeBottomValue = ( event ) => {
			const newValue = ( event.target.value === '' ) ? undefined : Number( event.target.value );

			let device = '';
			if ( typeof event.target.getAttribute( 'data-device-type' ) !== 'undefined' && typeof event.target.getAttribute( 'data-device-type' ) !== 'undefined' ) {
				device = event.target.getAttribute( 'data-device-type' );
			}

			if ( this.props[ 'syncUnits' + device ] ) {
				this.onChangeAll( newValue, device );
			} else {
				this.onChangeBottom( newValue, device );
			}
		};

		const onChangeLeftValue = ( event ) => {
			const newValue = ( event.target.value === '' ) ? undefined : Number( event.target.value );

			let device = '';
			if ( typeof event.target.getAttribute( 'data-device-type' ) !== 'undefined' && typeof event.target.getAttribute( 'data-device-type' ) !== 'undefined' ) {
				device = event.target.getAttribute( 'data-device-type' );
			}

			if ( this.props[ 'syncUnits' + device ] ) {
				this.onChangeAll( newValue, device );
			} else {
				this.onChangeLeft( newValue, device );
			}
		};

		const unitSizes = [
			{
				/* translators: a unit of size (px) for css markup */
				name: __( 'Pixel', 'coblocks' ),
				unitValue: 'px',
			},
			{
				/* translators: a unit of size (em) for css markup */
				name: __( 'Em', 'coblocks' ),
				unitValue: 'em',
			},
			{
				/* translators: a unit of size (vw) for css markup */
				name: __( 'Viewport width', 'coblocks' ),
				unitValue: 'vw',
			},
			{
				/* translators: a unit of size (vh) for css markup */
				name: __( 'Viewport height', 'coblocks' ),
				unitValue: 'vh',
			},
			{
				/* translators: a unit of size for css markup */
				name: __( 'Percentage', 'coblocks' ),
				unitValue: '%',
			},
		];

		const onSelect = ( tabName ) => {
			let selected = 'desktop';

			switch ( tabName ) {
				case 'desktop':
					selected = 'tablet';
					break;
				case 'tablet':
					selected = 'mobile';
					break;
				case 'mobile':
					selected = 'desktop';
					break;
				default:
					break;
			}

			//Reset z-index
			const buttons = document.getElementsByClassName( `components-coblocks-dimensions-control__mobile-controls-item--${ this.props.type }` );

			for ( let i = 0; i < buttons.length; i++ ) {
				buttons[ i ].style.display = 'none';
			}
			if ( tabName === 'default' ) {
				const button = document.getElementsByClassName( `components-coblocks-dimensions-control__mobile-controls-item-${ this.props.type }--tablet` );
				button[ 0 ].click();
			} else {
				const button = document.getElementsByClassName( `components-coblocks-dimensions-control__mobile-controls-item-${ this.props.type }--${ selected }` );
				button[ 0 ].style.display = 'block';
			}
		};

		return (
			<Fragment>
				<div className={ classes }>
					{ dimensionSize === 'advanced'
						? <Fragment>
							<div className="components-coblocks-dimensions-control__header">
								{ label && <p className={ 'components-coblocks-dimensions-control__label' }>{ label }</p> }
								<div className="components-coblocks-dimensions-control__actions">
									<ButtonGroup className="components-coblocks-dimensions-control__units" aria-label={ __( 'Select Units', 'coblocks' ) }>
										{ map( unitSizes, ( { unitValue, name } ) => (
											<Tooltip text={ sprintf(
												/* translators: %s: values associated with CSS syntax, 'Pixel', 'Em', 'Percentage' */
												__( '%s units', 'coblocks' ),
												name
											) }>
												<Button
													key={ unitValue }
													className={ 'components-coblocks-dimensions-control__units--' + name }
													isSmall
													isPrimary={ unit === unitValue }
													isSecondary={ unit !== unitValue }
													aria-pressed={ unit === unitValue }
													aria-label={ sprintf(
														/* translators: %s: values associated with CSS syntax, 'Pixel', 'Em', 'Percentage' */
														__( '%s units', 'coblocks' ),
														name
													) }
													onClick={ () => this.onChangeUnits( unitValue ) }
												>
													{ unitValue }
												</Button>
											</Tooltip>
										) ) }
									</ButtonGroup>
									<Button
										type="button"
										onClick={ () => this.onChangeSize( 'no', -1 ) }
										isSmall
										isSecondary
										aria-label={ sprintf(
											/* translators: %s: a texual label  */
											__( 'Turn off advanced %s settings', 'coblocks' ),
											label.toLowerCase()
										) }
									>
										{ __( 'Reset', 'coblocks' ) }
									</Button>
								</div>
							</div>
							<TabPanel
								className="components-coblocks-dimensions-control__mobile-controls"
								activeClass="is-active"
								initialTabName="default"
								onSelect={ onSelect }
								tabs={ [
									{
										name: 'default',
										title: DesktopIcon,
										className: `components-coblocks-dimensions-control__mobile-controls-item components-coblocks-dimensions-control__mobile-controls-item--${ this.props.type } components-button is-button is-default is-secondary components-coblocks-dimensions-control__mobile-controls-item--default components-coblocks-dimensions-control__mobile-controls-item-${ this.props.type }--default`,
									},
									{
										name: 'desktop',
										title: DesktopIcon,
										className: `components-coblocks-dimensions-control__mobile-controls-item components-coblocks-dimensions-control__mobile-controls-item--${ this.props.type } components-button is-button is-default is-secondary components-coblocks-dimensions-control__mobile-controls-item--desktop components-coblocks-dimensions-control__mobile-controls-item-${ this.props.type }--desktop`,
									},
									{
										name: 'tablet',
										title: TabletIcon,
										className: `components-coblocks-dimensions-control__mobile-controls-item components-coblocks-dimensions-control__mobile-controls-item--${ this.props.type } components-button is-button is-default is-secondary components-coblocks-dimensions-control__mobile-controls-item--tablet components-coblocks-dimensions-control__mobile-controls-item-${ this.props.type }--tablet`,
									},
									{
										name: 'mobile',
										title: MobileIcon,
										className: `components-coblocks-dimensions-control__mobile-controls-item components-coblocks-dimensions-control__mobile-controls-item--${ this.props.type } components-button is-button is-default is-secondary components-coblocks-dimensions-control__mobile-controls-item--mobile components-coblocks-dimensions-control__mobile-controls-item-${ this.props.type }--mobile`,
									},
								] }>
								{
									( tab ) => {
										if ( 'mobile' === tab.name ) {
											return (
												<Fragment>
													<div className="components-coblocks-dimensions-control__inputs">
														<input
															className="components-coblocks-dimensions-control__number"
															type="number"
															onChange={ onChangeTopValue }
															aria-label={ sprintf(
																/* translators: %s: values associated with CSS syntax, 'Margin', 'Padding' */
																__( '%s top', 'coblocks' ),
																label
															) }
															aria-describedby={ !! help ? id + '__help' : undefined }
															value={ valueTopMobile !== '' ? valueTopMobile : '' }
															min={ type === 'padding' ? 0 : undefined }
															data-device-type="Mobile"
														/>
														<input
															className="components-coblocks-dimensions-control__number"
															type="number"
															onChange={ onChangeRightValue }
															aria-label={ sprintf(
																/* translators: %s: values associated with CSS syntax, 'Margin', 'Padding' */
																__( '%s right', 'coblocks' ),
																label
															) }
															aria-describedby={ !! help ? id + '__help' : undefined }
															value={ valueRightMobile !== '' ? valueRightMobile : '' }
															min={ type === 'padding' ? 0 : undefined }
															data-device-type="Mobile"
														/>
														<input
															className="components-coblocks-dimensions-control__number"
															type="number"
															onChange={ onChangeBottomValue }
															aria-label={ sprintf(
																/* translators: %s: values associated with CSS syntax, 'Margin', 'Padding' */
																__( '%s bottom', 'coblocks' ),
																label
															) }
															aria-describedby={ !! help ? id + '__help' : undefined }
															value={ valueBottomMobile !== '' ? valueBottomMobile : '' }
															min={ type === 'padding' ? 0 : undefined }
															data-device-type="Mobile"
														/>
														<input
															className="components-coblocks-dimensions-control__number"
															type="number"
															onChange={ onChangeLeftValue }
															aria-label={ sprintf(
																/* translators: %s: values associated with CSS syntax, 'Margin', 'Padding' */
																__( '%s left', 'coblocks' ),
																label
															) }
															aria-describedby={ !! help ? id + '__help' : undefined }
															value={ valueLeftMobile !== '' ? valueLeftMobile : '' }
															min={ type === 'padding' ? 0 : undefined }
															data-device-type="Mobile"
														/>
														<Tooltip text={ !! syncUnitsMobile ? __( 'Unsync', 'coblocks' ) : __( 'Sync', 'coblocks' ) } >
															<Button
																className="components-coblocks-dimensions-control_sync"
																aria-label={ __( 'Sync units', 'coblocks' ) }
																isPrimary={ syncUnitsMobile ? true : false }
																isSecondary={ syncUnitsMobile ? false : true }
																aria-pressed={ syncUnitsMobile ? true : false }
																onClick={ ( value ) => this.syncUnits( value, 'Mobile' ) }
																data-device-type="Mobile"
																isSmall
															>
																{ SyncIcon }
															</Button>
														</Tooltip>
													</div>
												</Fragment>
											);
										} else if ( 'tablet' === tab.name ) {
											return (
												<Fragment>
													<div className="components-coblocks-dimensions-control__inputs">
														<input
															className="components-coblocks-dimensions-control__number"
															type="number"
															onChange={ onChangeTopValue }
															aria-label={ sprintf(
																/* translators: %s:  values associated with CSS syntax, 'Margin', 'Padding' */
																__( '%s top', 'coblocks' ),
																label
															) }
															aria-describedby={ !! help ? id + '__help' : undefined }
															value={ valueTopTablet !== '' ? valueTopTablet : '' }
															min={ type === 'padding' ? 0 : undefined }
															data-device-type="Tablet"
														/>
														<input
															className="components-coblocks-dimensions-control__number"
															type="number"
															onChange={ onChangeRightValue }
															aria-label={ sprintf(
																/* translators: %s: values associated with CSS syntax, 'Margin', 'Padding' */
																__( '%s right', 'coblocks' ),
																label
															) }
															aria-describedby={ !! help ? id + '__help' : undefined }
															value={ valueRightTablet !== '' ? valueRightTablet : '' }
															min={ type === 'padding' ? 0 : undefined }
															data-device-type="Tablet"
														/>
														<input
															className="components-coblocks-dimensions-control__number"
															type="number"
															onChange={ onChangeBottomValue }
															aria-label={ sprintf(
																/* translators: %s: values associated with CSS syntax, 'Margin', 'Padding' */
																__( '%s bottom', 'coblocks' ),
																label
															) }
															aria-describedby={ !! help ? id + '__help' : undefined }
															value={ valueBottomTablet !== '' ? valueBottomTablet : '' }
															min={ type === 'padding' ? 0 : undefined }
															data-device-type="Tablet"
														/>
														<input
															className="components-coblocks-dimensions-control__number"
															type="number"
															onChange={ onChangeLeftValue }
															aria-label={ sprintf(
																/* translators: %s: values associated with CSS syntax, 'Margin', 'Padding' */
																__( '%s left', 'coblocks' ),
																label
															) }
															aria-describedby={ !! help ? id + '__help' : undefined }
															value={ valueLeftTablet !== '' ? valueLeftTablet : '' }
															min={ type === 'padding' ? 0 : undefined }
															data-device-type="Tablet"
														/>
														<Tooltip text={ !! syncUnitsTablet ? __( 'Unsync', 'coblocks' ) : __( 'Sync', 'coblocks' ) } >
															<Button
																className="components-coblocks-dimensions-control_sync"
																aria-label={ __( 'Sync units', 'coblocks' ) }
																isPrimary={ syncUnitsTablet ? true : false }
																isSecondary={ syncUnitsTablet ? false : true }
																aria-pressed={ syncUnitsTablet ? true : false }
																onClick={ ( value ) => this.syncUnits( value, 'Tablet' ) }
																data-device-type="Tablet"
																isSmall
															>
																{ SyncIcon }
															</Button>
														</Tooltip>
													</div>
												</Fragment>
											);
										}
										return (
											<Fragment>
												<div className="components-coblocks-dimensions-control__inputs">
													<input
														className="components-coblocks-dimensions-control__number"
														type="number"
														onChange={ onChangeTopValue }
														aria-label={ sprintf(
															/* translators: %s: values associated with CSS syntax, 'Margin', 'Padding' */
															__( '%s top', 'coblocks' ),
															label
														) }
														aria-describedby={ !! help ? id + '__help' : undefined }
														value={ valueTop !== '' ? valueTop : '' }
														min={ type === 'padding' ? 0 : undefined }
														data-device-type=""
													/>
													<input
														className="components-coblocks-dimensions-control__number"
														type="number"
														onChange={ onChangeRightValue }
														aria-label={ sprintf(
															/* translators: %s: values associated with CSS syntax, 'Margin', 'Padding' */
															__( '%s right', 'coblocks' ),
															label
														) }
														aria-describedby={ !! help ? id + '__help' : undefined }
														value={ valueRight !== '' ? valueRight : '' }
														min={ type === 'padding' ? 0 : undefined }
														data-device-type=""
													/>
													<input
														className="components-coblocks-dimensions-control__number"
														type="number"
														onChange={ onChangeBottomValue }
														aria-label={ sprintf(
															/* translators: %s:  values associated with CSS syntax, 'Margin', 'Padding' */
															__( '%s bottom', 'coblocks' ),
															label
														) }
														aria-describedby={ !! help ? id + '__help' : undefined }
														value={ valueBottom !== '' ? valueBottom : '' }
														min={ type === 'padding' ? 0 : undefined }
														data-device-type=""
													/>
													<input
														className="components-coblocks-dimensions-control__number"
														type="number"
														onChange={ onChangeLeftValue }
														aria-label={ sprintf(
															/* translators: %s:  values associated with CSS syntax, 'Margin', 'Padding' */
															__( '%s left', 'coblocks' ), label
														) }
														aria-describedby={ !! help ? id + '__help' : undefined }
														value={ valueLeft !== '' ? valueLeft : '' }
														min={ type === 'padding' ? 0 : undefined }
														data-device-type=""
													/>
													<Tooltip text={ !! syncUnits ? __( 'Unsync', 'coblocks' ) : __( 'Sync', 'coblocks' ) } >
														<Button
															className="components-coblocks-dimensions-control_sync"
															aria-label={ __( 'Sync units', 'coblocks' ) }
															isPrimary={ syncUnits ? true : false }
															isSecondary={ syncUnits ? false : true }
															aria-pressed={ syncUnits ? true : false }
															onClick={ ( value ) => this.syncUnits( value, '' ) }
															data-device-type=""
															isSmall
														>
															{ SyncIcon }
														</Button>
													</Tooltip>
												</div>
											</Fragment>
										);
									}
								}
							</TabPanel>
							<div className="components-coblocks-dimensions-control__input-labels">
								<span className="components-coblocks-dimensions-control__number-label">{ __( 'Top', 'coblocks' ) }</span>
								<span className="components-coblocks-dimensions-control__number-label">{ __( 'Right', 'coblocks' ) }</span>
								<span className="components-coblocks-dimensions-control__number-label">{ __( 'Bottom', 'coblocks' ) }</span>
								<span className="components-coblocks-dimensions-control__number-label">{ __( 'Left', 'coblocks' ) }</span>
								<span className="components-coblocks-dimensions-control__number-label-blank"></span>
							</div>
						</Fragment>
						:						<BaseControl id="textarea-1" label={ label } help={ help }>
							<div className="components-font-size-picker__controls">
								<DimensionsSelect
									type={ type }
									setAttributes={ setAttributes }
									paddingSize={ paddingSize }
									marginSize={ marginSize }
								/>

								<Button
									type="button"
									onClick={ () => this.onChangeSize( 'advanced', '' ) }
									isSmall
									isSecondary
									aria-label={ sprintf(
										/* translators: %s: a texual label */
										__( 'Advanced %s settings', 'coblocks' ),
										label.toLowerCase()
									) }
									isPrimary={ dimensionSize === 'advanced' }
								>
									{ __( 'Advanced', 'coblocks' ) }
								</Button>
							</div>
						</BaseControl>
					}
				</div>
			</Fragment>
		);
	}
}

export default withInstanceId( DimensionsControl );
