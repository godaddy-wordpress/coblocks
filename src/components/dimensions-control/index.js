/**
 * External dependencies
 */
import classnames from 'classnames';
import map from 'lodash/map';

/**
 * Internal dependencies
 */
import icons from './icons';
import './styles/editor.scss';
import DimensionsSelect from './dimensions-select';

/**
 * WordPress dependencies
 */
import { __, _x, sprintf } from '@wordpress/i18n';
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
				paddingTop: ( block.attributes.paddingTop ) ? block.attributes.paddingTop + paddingUnit : null,
				paddingRight: ( block.attributes.paddingRight ) ? block.attributes.paddingRight + paddingUnit : null,
				paddingBottom: ( block.attributes.paddingBottom ) ? block.attributes.paddingBottom + paddingUnit : null,
				paddingLeft: ( block.attributes.paddingLeft ) ? block.attributes.paddingLeft + paddingUnit : null,
				paddingTopTablet: ( block.attributes.paddingTopTablet ) ? block.attributes.paddingTopTablet + paddingUnit : null,
				paddingRightTablet: ( block.attributes.paddingRightTablet ) ? block.attributes.paddingRightTablet + paddingUnit : null,
				paddingBottomTablet: ( block.attributes.paddingBottomTablet ) ? block.attributes.paddingBottomTablet + paddingUnit : null,
				paddingLeftTablet: ( block.attributes.paddingLeftTablet ) ? block.attributes.paddingLeftTablet + paddingUnit : null,
				paddingTopMobile: ( block.attributes.paddingTopMobile ) ? block.attributes.paddingTopMobile + paddingUnit : null,
				paddingRightMobile: ( block.attributes.paddingRightMobile ) ? block.attributes.paddingRightMobile + paddingUnit : null,
				paddingBottomMobile: ( block.attributes.paddingBottomMobile ) ? block.attributes.paddingBottomMobile + paddingUnit : null,
				paddingLeftMobile: ( block.attributes.paddingLeftMobile ) ? block.attributes.paddingLeftMobile + paddingUnit : null,
			};
			const margin = {
				marginTop: ( block.attributes.marginTop ) ? block.attributes.marginTop + marginUnit : null,
				marginRight: ( block.attributes.marginRight ) ? block.attributes.marginRight + marginUnit : null,
				marginBottom: ( block.attributes.marginBottom ) ? block.attributes.marginBottom + marginUnit : null,
				marginLeft: ( block.attributes.marginLeft ) ? block.attributes.marginLeft + marginUnit : null,
				marginTopTablet: ( block.attributes.marginTopTablet ) ? block.attributes.marginTopTablet + marginUnit : null,
				marginRightTablet: ( block.attributes.marginRightTablet ) ? block.attributes.marginRightTablet + marginUnit : null,
				marginBottomTablet: ( block.attributes.marginBottomTablet ) ? block.attributes.marginBottomTablet + marginUnit : null,
				marginLeftTablet: ( block.attributes.marginLeftTablet ) ? block.attributes.marginLeftTablet + marginUnit : null,
				marginTopMobile: ( block.attributes.marginTopMobile ) ? block.attributes.marginTopMobile + marginUnit : null,
				marginRightMobile: ( block.attributes.marginRightMobile ) ? block.attributes.marginRightMobile + marginUnit : null,
				marginBottomMobile: ( block.attributes.marginBottomMobile ) ? block.attributes.marginBottomMobile + marginUnit : null,
				marginLeftMobile: ( block.attributes.marginLeftMobile ) ? block.attributes.marginLeftMobile + marginUnit : null,
			};

			if ( typeof meta._coblocks_dimensions === 'undefined' || ( typeof meta._coblocks_dimensions !== 'undefined' && meta._coblocks_dimensions === '' ) ) {
				dimensions = {};
			} else {
				dimensions = JSON.parse( meta._coblocks_dimensions );
			}

			if ( typeof dimensions[ id ] === 'undefined' ) {
				dimensions[ id ] = {};
				dimensions[ id ][ this.props.type ] = {};
			} else {
				if ( typeof dimensions[ id ][ this.props.type ] === 'undefined' ) {
					dimensions[ id ][ this.props.type ] = {};
				}
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
			if ( padding.paddingTopTablet ) {
				responsiveCss += 'padding-top: ' + padding.paddingTopTablet + ' !important;';
			}
			if ( padding.paddingBottomTablet ) {
				responsiveCss += 'padding-bottom: ' + padding.paddingBottomTablet + ' !important;';
			}
			if ( padding.paddingRightTablet ) {
				responsiveCss += 'padding-right: ' + padding.paddingRightTablet + ' !important;';
			}
			if ( padding.paddingLeftTablet ) {
				responsiveCss += 'padding-left: ' + padding.paddingLeftTablet + ' !important;';
			}

			if ( margin.marginTopTablet ) {
				responsiveCss += 'margin-top: ' + margin.marginTopTablet + ' !important;';
			}
			if ( margin.marginBottomTablet ) {
				responsiveCss += 'margin-bottom: ' + margin.marginBottomTablet + ' !important;';
			}
			if ( margin.marginRightTablet ) {
				responsiveCss += 'margin-right: ' + margin.marginRightTablet + ' !important;';
			}
			if ( margin.marginleLtTablet ) {
				responsiveCss += 'margin-left: ' + margin.marginLeftTablet + ' !important;';
			}

			responsiveCss += '}';
			responsiveCss += '}';

			responsiveCss += '@media only screen and (max-width: 514px) {';
			responsiveCss += '.' + id + ' > div{';
			if ( padding.paddingTopMobile ) {
				responsiveCss += 'padding-top: ' + padding.paddingTopMobile + ' !important;';
			}
			if ( padding.paddingBottomMobile ) {
				responsiveCss += 'padding-bottom: ' + padding.paddingBottomMobile + ' !important;';
			}
			if ( padding.paddingRightMobile ) {
				responsiveCss += 'padding-right: ' + padding.paddingRightMobile + ' !important;';
			}
			if ( padding.paddingLeftMobile ) {
				responsiveCss += 'padding-left: ' + padding.paddingLeftMobile + ' !important;';
			}

			if ( margin.marginTopMobile ) {
				responsiveCss += 'margin-top: ' + margin.marginTopMobile + ' !important;';
			}
			if ( margin.marginBottomMobile ) {
				responsiveCss += 'margin-bottom: ' + margin.marginBottomMobile + ' !important;';
			}
			if ( margin.marginRightMobile ) {
				responsiveCss += 'margin-right: ' + margin.marginRightMobile + ' !important;';
			}
			if ( margin.marginleLtMobile ) {
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
			label = __( 'Margin' ),
			onChange,
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

		const resetValue = () => onChange();

		const onChangeTopValue = ( event ) => {
			const newValue = event.target.value;
			if ( newValue === '' ) {
				resetValue();
				return;
			}

			let device = '';
			if ( typeof event.target.getAttribute( 'data-device-type' ) !== 'undefined' && typeof event.target.getAttribute( 'data-device-type' ) !== 'undefined' ) {
				device = event.target.getAttribute( 'data-device-type' );
			}

			if ( this.props[ 'syncUnits' + device ] ) {
				this.onChangeAll( Number( newValue ), device );
			} else {
				this.onChangeTop( Number( newValue ), device );
			}
		};

		const onChangeRightValue = ( event ) => {
			const newValue = event.target.value;
			if ( newValue === '' ) {
				resetValue();
				return;
			}

			let device = '';
			if ( typeof event.target.getAttribute( 'data-device-type' ) !== 'undefined' && typeof event.target.getAttribute( 'data-device-type' ) !== 'undefined' ) {
				device = event.target.getAttribute( 'data-device-type' );
			}

			if ( this.props[ 'syncUnits' + device ] ) {
				this.onChangeAll( Number( newValue ), device );
			} else {
				this.onChangeRight( Number( newValue ), device );
			}
		};

		const onChangeBottomValue = ( event ) => {
			const newValue = event.target.value;
			if ( newValue === '' ) {
				resetValue();
				return;
			}

			let device = '';
			if ( typeof event.target.getAttribute( 'data-device-type' ) !== 'undefined' && typeof event.target.getAttribute( 'data-device-type' ) !== 'undefined' ) {
				device = event.target.getAttribute( 'data-device-type' );
			}

			if ( this.props[ 'syncUnits' + device ] ) {
				this.onChangeAll( Number( newValue ), device );
			} else {
				this.onChangeBottom( Number( newValue ), device );
			}
		};

		const onChangeLeftValue = ( event ) => {
			const newValue = event.target.value;
			if ( newValue === '' ) {
				resetValue();
				return;
			}

			let device = '';
			if ( typeof event.target.getAttribute( 'data-device-type' ) !== 'undefined' && typeof event.target.getAttribute( 'data-device-type' ) !== 'undefined' ) {
				device = event.target.getAttribute( 'data-device-type' );
			}

			if ( this.props[ 'syncUnits' + device ] ) {
				this.onChangeAll( Number( newValue ), device );
			} else {
				this.onChangeLeft( Number( newValue ), device );
			}
		};

		const unitSizes = [
			{
				name: _x( 'Pixel', 'A size unit for CSS markup' ),
				unitValue: 'px',
			},
			{
				name: _x( 'Em', 'A size unit for CSS markup' ),
				unitValue: 'em',
			},
			{
				name: _x( 'Percentage', 'A size unit for CSS markup' ),
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
					{ dimensionSize === 'advanced' ?
						<Fragment>
							<div className="components-coblocks-dimensions-control__header">
								{ label && <p className={ 'components-coblocks-dimensions-control__label' }>{ label }</p> }
								<div className="components-coblocks-dimensions-control__actions">
									<ButtonGroup className="components-coblocks-dimensions-control__units" aria-label={ __( 'Select Units' ) }>
										{ map( unitSizes, ( { unitValue, name } ) => (
											/* translators: %s: values associated with CSS syntax, 'Pixel', 'Em', 'Percentage' */
											<Tooltip text={ sprintf( __( '%s Units' ), name ) }>
												<Button
													key={ unitValue }
													className={ 'components-coblocks-dimensions-control__units--' + name }
													isSmall
													isPrimary={ unit === unitValue }
													aria-pressed={ unit === unitValue }
													/* translators: %s: values associated with CSS syntax, 'Pixel', 'Em', 'Percentage' */
													aria-label={ sprintf( __( '%s Units' ), name ) }
													onClick={ () => this.onChangeUnits( unitValue ) }
												>
													{ unitValue }
												</Button>
											</Tooltip>
										) ) }
									</ButtonGroup>
									<Button
										className="components-color-palette__clear"
										type="button"
										onClick={ () => this.onChangeSize( 'no', -1 ) }
										isSmall
										isDefault
										/* translators: %s: a texual label  */
										aria-label={ sprintf( __( 'Turn off advanced %s settings' ), label.toLowerCase() ) }
									>
										{ __( 'Reset' ) }
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
										title: icons.desktopChrome,
										className: `components-coblocks-dimensions-control__mobile-controls-item components-coblocks-dimensions-control__mobile-controls-item--${ this.props.type } components-button components-coblocks-dimensions-control__mobile-controls-item--default components-coblocks-dimensions-control__mobile-controls-item-${ this.props.type }--default`,
									},
									{
										name: 'desktop',
										title: icons.mobile,
										className: `components-coblocks-dimensions-control__mobile-controls-item components-coblocks-dimensions-control__mobile-controls-item--${ this.props.type } components-button components-coblocks-dimensions-control__mobile-controls-item--desktop components-coblocks-dimensions-control__mobile-controls-item-${ this.props.type }--desktop`,
									},
									{
										name: 'tablet',
										title: icons.desktopChrome,
										className: `components-coblocks-dimensions-control__mobile-controls-item components-coblocks-dimensions-control__mobile-controls-item--${ this.props.type } components-button components-coblocks-dimensions-control__mobile-controls-item--tablet components-coblocks-dimensions-control__mobile-controls-item-${ this.props.type }--tablet`,
									},
									{
										name: 'mobile',
										title: icons.tablet,
										className: `components-coblocks-dimensions-control__mobile-controls-item components-coblocks-dimensions-control__mobile-controls-item--${ this.props.type } components-button components-coblocks-dimensions-control__mobile-controls-item--mobile components-coblocks-dimensions-control__mobile-controls-item-${ this.props.type }--mobile`,
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
															/* translators: %s:  values associated with CSS syntax, 'Margin', 'Padding' */
															aria-label={ sprintf( __( '%s Top' ), label ) }
															aria-describedby={ !! help ? id + '__help' : undefined }
															value={ valueTopMobile ? valueTopMobile : '' }
															min={ type === 'padding' ? 0 : undefined }
															data-device-type="Mobile"
														/>
														<input
															className="components-coblocks-dimensions-control__number"
															type="number"
															onChange={ onChangeRightValue }
															/* translators: %s:  values associated with CSS syntax, 'Margin', 'Padding' */
															aria-label={ sprintf( __( '%s Right' ), label ) }
															aria-describedby={ !! help ? id + '__help' : undefined }
															value={ valueRightMobile ? valueRightMobile : '' }
															min={ type === 'padding' ? 0 : undefined }
															data-device-type="Mobile"
														/>
														<input
															className="components-coblocks-dimensions-control__number"
															type="number"
															onChange={ onChangeBottomValue }
															/* translators: %s:  values associated with CSS syntax, 'Margin', 'Padding' */
															aria-label={ sprintf( __( '%s Bottom' ), label ) }
															aria-describedby={ !! help ? id + '__help' : undefined }
															value={ valueBottomMobile ? valueBottomMobile : '' }
															min={ type === 'padding' ? 0 : undefined }
															data-device-type="Mobile"
														/>
														<input
															className="components-coblocks-dimensions-control__number"
															type="number"
															onChange={ onChangeLeftValue }
															/* translators: %s:  values associated with CSS syntax, 'Margin', 'Padding' */
															aria-label={ sprintf( __( '%s Left' ), label ) }
															aria-describedby={ !! help ? id + '__help' : undefined }
															value={ valueLeftMobile ? valueLeftMobile : '' }
															min={ type === 'padding' ? 0 : undefined }
															data-device-type="Mobile"
														/>
														<Tooltip text={ !! syncUnitsMobile ? __( 'Unsync' ) : __( 'Sync' ) } >
															<Button
																className="components-coblocks-dimensions-control_sync"
																aria-label={ __( 'Sync Units' ) }
																isPrimary={ syncUnitsMobile ? syncUnitsMobile : false }
																aria-pressed={ syncUnitsMobile ? syncUnitsMobile : false }
																onClick={ ( value ) => this.syncUnits( value, 'Mobile' ) }
																data-device-type="Mobile"
																isSmall
															>
																{ !! syncUnitsMobile ? icons.sync : icons.sync }
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
															/* translators: %s:  values associated with CSS syntax, 'Margin', 'Padding' */
															aria-label={ sprintf( __( '%s Top' ), label ) }
															aria-describedby={ !! help ? id + '__help' : undefined }
															value={ valueTopTablet ? valueTopTablet : '' }
															min={ type === 'padding' ? 0 : undefined }
															data-device-type="Tablet"
														/>
														<input
															className="components-coblocks-dimensions-control__number"
															type="number"
															onChange={ onChangeRightValue }
															/* translators: %s:  values associated with CSS syntax, 'Margin', 'Padding' */
															aria-label={ sprintf( __( '%s Right' ), label ) }
															aria-describedby={ !! help ? id + '__help' : undefined }
															value={ valueRightTablet ? valueRightTablet : '' }
															min={ type === 'padding' ? 0 : undefined }
															data-device-type="Tablet"
														/>
														<input
															className="components-coblocks-dimensions-control__number"
															type="number"
															onChange={ onChangeBottomValue }
															/* translators: %s:  values associated with CSS syntax, 'Margin', 'Padding' */
															aria-label={ sprintf( __( '%s Bottom' ), label ) }
															aria-describedby={ !! help ? id + '__help' : undefined }
															value={ valueBottomTablet ? valueBottomTablet : '' }
															min={ type === 'padding' ? 0 : undefined }
															data-device-type="Tablet"
														/>
														<input
															className="components-coblocks-dimensions-control__number"
															type="number"
															onChange={ onChangeLeftValue }
															/* translators: %s:  values associated with CSS syntax, 'Margin', 'Padding' */
															aria-label={ sprintf( __( '%s Left' ), label ) }
															aria-describedby={ !! help ? id + '__help' : undefined }
															value={ valueLeftTablet ? valueLeftTablet : '' }
															min={ type === 'padding' ? 0 : undefined }
															data-device-type="Tablet"
														/>
														<Tooltip text={ !! syncUnitsTablet ? __( 'Unsync' ) : __( 'Sync' ) } >
															<Button
																className="components-coblocks-dimensions-control_sync"
																aria-label={ __( 'Sync Units' ) }
																isPrimary={ syncUnitsTablet ? syncUnitsTablet : false }
																aria-pressed={ syncUnitsTablet ? syncUnitsTablet : false }
																onClick={ ( value ) => this.syncUnits( value, 'Tablet' ) }
																data-device-type="Tablet"
																isSmall
															>
																{ !! syncUnitsTablet ? icons.sync : icons.sync }
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
														/* translators: %s:  values associated with CSS syntax, 'Margin', 'Padding' */
														aria-label={ sprintf( __( '%s Top' ), label ) }
														aria-describedby={ !! help ? id + '__help' : undefined }
														value={ valueTop ? valueTop : '' }
														min={ type === 'padding' ? 0 : undefined }
														data-device-type=""
													/>
													<input
														className="components-coblocks-dimensions-control__number"
														type="number"
														onChange={ onChangeRightValue }
														/* translators: %s:  values associated with CSS syntax, 'Margin', 'Padding' */
														aria-label={ sprintf( __( '%s Right' ), label ) }
														aria-describedby={ !! help ? id + '__help' : undefined }
														value={ valueRight ? valueRight : '' }
														min={ type === 'padding' ? 0 : undefined }
														data-device-type=""
													/>
													<input
														className="components-coblocks-dimensions-control__number"
														type="number"
														onChange={ onChangeBottomValue }
														/* translators: %s:  values associated with CSS syntax, 'Margin', 'Padding' */
														aria-label={ sprintf( __( '%s Bottom' ), label ) }
														aria-describedby={ !! help ? id + '__help' : undefined }
														value={ valueBottom ? valueBottom : '' }
														min={ type === 'padding' ? 0 : undefined }
														data-device-type=""
													/>
													<input
														className="components-coblocks-dimensions-control__number"
														type="number"
														onChange={ onChangeLeftValue }
														/* translators: %s:  values associated with CSS syntax, 'Margin', 'Padding' */
														aria-label={ sprintf( __( '%s Left' ), label ) }
														aria-describedby={ !! help ? id + '__help' : undefined }
														value={ valueLeft ? valueLeft : '' }
														min={ type === 'padding' ? 0 : undefined }
														data-device-type=""
													/>
													<Tooltip text={ !! syncUnits ? __( 'Unsync' ) : __( 'Sync' ) } >
														<Button
															className="components-coblocks-dimensions-control_sync"
															aria-label={ __( 'Sync Units' ) }
															isPrimary={ syncUnits ? syncUnits : false }
															aria-pressed={ syncUnits ? syncUnits : false }
															onClick={ ( value ) => this.syncUnits( value, '' ) }
															data-device-type=""
															isSmall
														>
															{ !! syncUnits ? icons.sync : icons.sync }
														</Button>
													</Tooltip>
												</div>
											</Fragment>
										);
									}
								}
							</TabPanel>
							<div className="components-coblocks-dimensions-control__input-labels">
								<span className="components-coblocks-dimensions-control__number-label">{ __( 'Top' ) }</span>
								<span className="components-coblocks-dimensions-control__number-label">{ __( 'Right' ) }</span>
								<span className="components-coblocks-dimensions-control__number-label">{ __( 'Bottom' ) }</span>
								<span className="components-coblocks-dimensions-control__number-label">{ __( 'Left' ) }</span>
								<span className="components-coblocks-dimensions-control__number-label-blank"></span>
							</div>
						</Fragment>						:
						<BaseControl id="textarea-1" label={ label } help={ help }>
							<div className="components-font-size-picker__controls">
								<DimensionsSelect
									type={ type }
									setAttributes={ setAttributes }
									paddingSize={ paddingSize }
									marginSize={ marginSize }
								/>

								<Button
									className="components-color-palette__clear"
									type="button"
									onClick={ () => this.onChangeSize( 'advanced', '' ) }

									isDefault
									/* translators: %s:  a texual label */
									aria-label={ sprintf( __( 'Advanced %s settings' ), label.toLowerCase() ) }
									isPrimary={ dimensionSize === 'advanced' }
								>
									{ __( 'Advanced' ) }
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
