/**
 * External dependencies
 */
import classnames from 'classnames';
import map from 'lodash/map';

/**
 * Internal dependencies
 */
import DimensionsAttributes from './attributes';
import icons from './icons';
import './styles/editor.scss';

/**
 * WordPress dependencies
 */
const { __, _x, sprintf } = wp.i18n;
const { withInstanceId } = wp.compose;
const { Component, Fragment } = wp.element;
const { ButtonGroup, Dropdown, NavigableMenu, BaseControl, Button, Tooltip, Dashicon, TabPanel } = wp.components;

class ResponsiveBaseControl extends Component {

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

		let meta = wp.data.select( 'core/editor' ).getEditedPostAttribute( 'meta' );
		// console.log( props.attributes );
	}

	onChangeTop( value, device ) {
		if  ( this.props.type == 'padding' ) {
			this.props.setAttributes( { [ 'paddingTop' + device ]: value } );
		} else {
			this.props.setAttributes( { [ 'marginTop' + device ]: value } );
		}
		this.saveMeta();

	}

	onChangeRight( value, device ) {
		if  ( this.props.type == 'padding' ) {
			this.props.setAttributes( { [ 'paddingRight' + device ]: value } );
		} else {
			this.props.setAttributes( { [ 'marginRight' + device ]: value } );
		}
		this.saveMeta();

	}

	onChangeBottom( value, device ) {
		if  ( this.props.type == 'padding' ) {
			this.props.setAttributes( { [ 'paddingBottom' + device ]: value } );
		} else {
			this.props.setAttributes( { [ 'marginBottom' + device ]: value } );
		}
		this.saveMeta();

	}

	onChangeLeft( value, device ) {
		if  ( this.props.type == 'padding' ) {
			this.props.setAttributes( { [ 'paddingLeft' + device ]: value } );
		} else {
			this.props.setAttributes( { [ 'marginLeft' + device ]: value } );
		}
		this.saveMeta();

	}

	onChangeAll( value, device ) {
		if  ( this.props.type == 'padding' ) {
			this.props.setAttributes( { [ 'paddingTop' + device ]: value, [ 'paddingRight' + device ]: value, [ 'paddingBottom' + device ]: value, [ 'paddingLeft' + device ]: value } );
		} else {
			this.props.setAttributes( { [ 'marginTop' + device ]: value, [ 'marginRight' + device ]: value, [ 'marginBottom' + device ]: value, [ 'marginLeft' + device ]: value } );
		}
		this.saveMeta();

	}

	onChangeUnits( value ) {
		if  ( this.props.type == 'padding' ) {
			this.props.setAttributes( { paddingUnit: value } );
		} else {
			this.props.setAttributes( { marginUnit: value } );
		}

		this.saveMeta();
	}

	onChangeSize( value, size ) {
		if  ( this.props.type == 'padding' ) {
			this.props.setAttributes( {  paddingSyncUnits: true } )
			this.props.setAttributes( { paddingSize: value } );
			if( size ){
				if( size < 0 ){
					size = '';
				}
				this.props.setAttributes( { paddingTop: size, paddingRight: size, paddingBottom: size, paddingLeft: size, paddingUnit: 'px' } );
			}
		} else {
			this.props.setAttributes( { marginSize: value } );
			if( size ){
				if( size < 0 ){
					size = '';
				}
				this.props.setAttributes( { marginTop: size, marginRight: 0, marginBottom: size, marginLeft: 0, marginUnit: 'px' } );
			}
		}

		this.saveMeta();
	}

	syncUnits( value, device ) {

		var numbers = [ this.props[ 'valueTop' + device ], this.props[ 'valueRight' + device ], this.props[ 'valueBottom' + device ], this.props[ 'valueLeft' + device ]];

		const syncValue = Math.max.apply( null, numbers )

		if  ( this.props.type == 'padding' ) {
			this.props.setAttributes( {  [ 'paddingSyncUnits' + device ]: ! this.props[ 'syncUnits' + device ] } )
			this.props.setAttributes( { [ 'paddingTop' + device ]: syncValue, [ 'paddingRight' + device ]: syncValue, [ 'paddingBottom' + device ]: syncValue, [ 'paddingLeft' + device ]: syncValue } );
		} else {
			this.props.setAttributes( {  [ 'marginSyncUnits' + device ]: ! this.props[ 'syncUnits' + device ] } )
			this.props.setAttributes( { [ 'marginTop' + device ]: syncValue, [ 'marginRight' + device ]: syncValue, [ 'marginBottom' + device ]: syncValue, [ 'marginLeft' + device ]: syncValue } );
		}

		this.saveMeta();
	}

	saveMeta( event ){
		let meta = wp.data.select( 'core/editor' ).getEditedPostAttribute( 'meta' );
		let block = wp.data.select( 'core/editor' ).getBlock( this.props.clientId );
		let dimensions = {};

		if ( typeof this.props.attributes.coblocks !== 'undefined' && typeof this.props.attributes.coblocks.id !== 'undefined' ) {
			let id = this.props.name.split('/').join('-') + '-' + this.props.attributes.coblocks.id;
			let paddingUnit = block.attributes.paddingUnit;
			let marginUnit = block.attributes.marginUnit;
			let padding = {
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
			let margin = {
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

			if ( typeof meta._coblocks_dimensions === 'undefined' || ( typeof meta._coblocks_dimensions !== 'undefined' && meta._coblocks_dimensions  == '' ) ){
				dimensions = {};
			} else {
				dimensions = JSON.parse( meta._coblocks_dimensions );
			}

			if ( typeof dimensions[ id ] === 'undefined' ) {
				dimensions[ id ] = {};
				dimensions[ id ][ this.props.type ] = {};
			} else {
				if ( typeof dimensions[ id ][ this.props.type ] === 'undefined' ){
					dimensions[ id ][ this.props.type ] = {};
				}
			}

			if ( this.props.dimensionSize == 'advanced' ) {
				dimensions[ id ][ this.props.type ] = ( this.props.type == 'padding' ) ? padding : margin;
			} else {
				dimensions[ id ][ this.props.type ] = {};
			}

			// Save values to metadata.
			wp.data.dispatch( 'core/editor' ).editPost({
				meta: {
					_coblocks_dimensions: JSON.stringify( dimensions ),
				}
			});

			//add CSS to head
			let head 			= document.head || document.getElementsByTagName('head')[0],
			responsiveCss		= '',
		    style 				= document.createElement('style');
		    style.type 			= 'text/css';

		    //add responsive styling for tablet device
		    responsiveCss += '@media only screen and (max-width: 768px) {';
		   		responsiveCss += '.'+ id + ' > div{';
		   		if( padding.paddingTopTablet ){
		   			responsiveCss += 'padding-top: ' + padding.paddingTopTablet + ' !important;';
		   		}
		    	if( padding.paddingBottomTablet ){
		    		responsiveCss += 'padding-bottom: ' + padding.paddingBottomTablet + ' !important;';
		    	}
		    	if( padding.paddingRightTablet ){
		    		responsiveCss += 'padding-right: ' + padding.paddingRightTablet + ' !important;';
		    	}
		    	if( padding.paddingLeftTablet ){
		    		responsiveCss += 'padding-left: ' + padding.paddingLeftTablet + ' !important;';
		    	}

		    	if( margin.marginTopTablet ){
		   			responsiveCss += 'margin-top: ' + margin.marginTopTablet + ' !important;';
		   		}
		    	if( margin.marginBottomTablet ){
		    		responsiveCss += 'margin-bottom: ' + margin.marginBottomTablet + ' !important;';
		    	}
		    	if( margin.marginRightTablet ){
		    		responsiveCss += 'margin-right: ' + margin.marginRightTablet + ' !important;';
		    	}
		    	if( margin.marginleLtTablet ){
		    		responsiveCss += 'margin-left: ' + margin.marginLeftTablet + ' !important;';
		    	}

		    	responsiveCss += '}';
		    responsiveCss += '}';

		    responsiveCss += '@media only screen and (max-width: 514px) {';
		   		responsiveCss += '.'+ id + ' > div{';
		   		if( padding.paddingTopMobile ){
		   			responsiveCss += 'padding-top: ' + padding.paddingTopMobile + ' !important;';
		   		}
		    	if( padding.paddingBottomMobile ){
		    		responsiveCss += 'padding-bottom: ' + padding.paddingBottomMobile + ' !important;';
		    	}
		    	if( padding.paddingRightMobile ){
		    		responsiveCss += 'padding-right: ' + padding.paddingRightMobile + ' !important;';
		    	}
		    	if( padding.paddingLeftMobile ){
		    		responsiveCss += 'padding-left: ' + padding.paddingLeftMobile + ' !important;';
		    	}

		    	if( margin.marginTopMobile ){
		   			responsiveCss += 'margin-top: ' + margin.marginTopMobile + ' !important;';
		   		}
		    	if( margin.marginBottomMobile ){
		    		responsiveCss += 'margin-bottom: ' + margin.marginBottomMobile + ' !important;';
		    	}
		    	if( margin.marginRightMobile ){
		    		responsiveCss += 'margin-right: ' + margin.marginRightMobile + ' !important;';
		    	}
		    	if( margin.marginleLtMobile ){
		    		responsiveCss += 'margin-left: ' + margin.marginLeftMobile + ' !important;';
		    	}


		    	responsiveCss += '}';
		    responsiveCss += '}';

		    if ( style.styleSheet ){
			  style.styleSheet.cssText = responsiveCss;
			}else {
			  style.appendChild( document.createTextNode(responsiveCss) );
			}

			head.appendChild(style);
		}
	}

	render() {

		const {
			bottom = true,
			className,
			help,
			instanceId,
			label = __( 'Height' ),
			left = true,
			reset = false,
			right = true,
			setAttributes,
			top = true,
			type = 'margin',
			unit,
			units = true,
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



			height,
			heightTablet,
			heightMobile,
			onChange,
			onChangeTablet,
			onChangeMobile,
			sync,
			min = 10,
			max = 1000,
			step = 1,


		} = this.props;

		const resetValue = () => onChange();

		const onChangeTopValue = ( event ) => {
			const newValue = event.target.value;
			if ( newValue === '' ) {
				resetValue();
				return;
			}

			let device = '';
			if( typeof event.target.getAttribute('data-device-type') !== 'undefined' && typeof event.target.getAttribute('data-device-type') !== 'null' ){
				device = event.target.getAttribute('data-device-type');
			}

			if  ( this.props[ 'syncUnits' + device ] ) {
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
			if( typeof event.target.getAttribute('data-device-type') !== 'undefined' && typeof event.target.getAttribute('data-device-type') !== 'null' ){
				device = event.target.getAttribute('data-device-type');
			}

			if  ( this.props[ 'syncUnits' + device ] ) {
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
			if( typeof event.target.getAttribute('data-device-type') !== 'undefined' && typeof event.target.getAttribute('data-device-type') !== 'null' ){
				device = event.target.getAttribute('data-device-type');
			}

			if  ( this.props[ 'syncUnits' + device ] ) {
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
			if( typeof event.target.getAttribute('data-device-type') !== 'undefined' && typeof event.target.getAttribute('data-device-type') !== 'null' ){
				device = event.target.getAttribute('data-device-type');
			}

			if  ( this.props[ 'syncUnits' + device ] ) {
				this.onChangeAll( Number( newValue ), device );
			} else {
				this.onChangeLeft( Number( newValue ), device );
			}
		};

		const unitSizes = [
			{
				name: __( 'Pixel' ),
				unitValue: 'px',
			},
			{
				name: __( 'Em' ),
				unitValue: 'em',
			},
			{
				name: __( 'Percentage' ),
				unitValue: '%',
			},
		];

		const utilitySizes = [
			{
				name: __( 'None' ),
				size: 0,
				slug: 'no',
			},
			{
				name: __( 'Small' ),
				size: 14,
				slug: 'small',
			},
			{
				name: __( 'Medium' ),
				size: 24,
				slug: 'medium',
			},
			{
				name: __( 'Large' ),
				size: 34,
				slug: 'large',
			},{
				name: __( 'Huge' ),
				size: 60,
				slug: 'huge',
			},
		];

		const currentSize = utilitySizes.find( ( utility ) => utility.slug === dimensionSize );

		const onSelect = ( tabName ) => {
			let selected = 'desktop';

			switch( tabName ){
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
			const buttons = document.getElementsByClassName( `components-coblocks-dimensions-control__mobile-controls-item--${ this.props.type }`);

			for(var i = 0; i < buttons.length; i++) {
				buttons[i].style.display = 'none';
			}
			if( tabName == 'default' ){
				const button = document.getElementsByClassName( `components-coblocks-dimensions-control__mobile-controls-item-${ this.props.type }--tablet`);
				button[0].click();
			}else{
				const button = document.getElementsByClassName( `components-coblocks-dimensions-control__mobile-controls-item-${ this.props.type }--${ selected }`);
				button[0].style.display = 'block';
			}
		};

		const classes = classnames(
			'components-base-control',
			'components-coblocks-dimensions-control',
			'components-coblocks-responsive-base-control', {
			}
		);

		const id = `inspector-coblocks-dimensions-control-${ instanceId }`;

		// The idea behind the sync button is:
		// 1. It is set to true by default.
		// 2. The Sync button only shows up on the desktop view
		// 3. When a user changes the input value for tablet or mobile, it is set to false (as now all three values will no longer be synced)
		// 4. If the sync button is turned back on, then the 'height' attribute (the main desktop one) takes precendence and all three will be set to it.
		const syncButton = (
			<Tooltip text={ !! sync ? __( 'Unsync' ) : __( 'Sync' ) } >
				<Button
					className="components-coblocks-dimensions-control_sync"
					aria-label={ __( 'Sync Units' ) }
					isPrimary={ sync ? sync : false }
					aria-pressed={ sync ? sync : false }
					// onClick={ ( value ) => this.syncUnits( value, 'Mobile' ) }
					isSmall
				>
					{ !! sync ? icons.sync : icons.sync }
				</Button>
			</Tooltip>
		);

		return (
			<Fragment>
				<div className={ classes }>
					<Fragment>
						<span className="components-base-control__label">{ label }</span>
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
												<div className='components-coblocks-dimensions-control__inputs component-coblocks-is-mobile'>
													<BaseControl>
														<input
															type="number"
															onChange={ onChangeMobile }
															value={ heightMobile ? heightMobile : '' }
															min={ min }
															step={ step }
															max={ max }
														/>
													</BaseControl>
												</div>
											</Fragment>
										)
									} else if ( 'tablet' === tab.name ) {
										return (
											<Fragment>
												<div className='components-coblocks-dimensions-control__inputs component-coblocks-is-tablet'>
													<BaseControl>
														<input
															type="number"
															onChange={ onChangeTablet }
															value={ heightTablet ? heightTablet : '' }
															min={ min }
															step={ step }
															max={ max }
														/>
													</BaseControl>
												</div>
											</Fragment>
										)
									} else {
										return (
											<Fragment>
												<div className='components-coblocks-dimensions-control__inputs component-coblocks-is-desktop'>
													<BaseControl>
														<input
															type="number"
															onChange={ onChange }
															value={ height ? height : '' }
															min={ min }
															step={ step }
															max={ max }
														/>
													</BaseControl>
													{ syncButton }
												</div>
											</Fragment>
										)
									}
								}
							}
						</TabPanel>
					</Fragment>
				</div>
			</Fragment>
		);
	}
}

export default withInstanceId( ResponsiveBaseControl );