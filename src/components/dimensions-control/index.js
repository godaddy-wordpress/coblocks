/**
 * External dependencies
 */
import classnames from 'classnames';
import map from 'lodash/map';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import DimensionsSelect from './dimensions-select';
import { DesktopIcon, MobileIcon, SyncIcon, TabletIcon } from '@godaddy-wordpress/coblocks-icons';

/**
 * WordPress dependencies
 */
import { useDispatch } from '@wordpress/data';
import { withInstanceId } from '@wordpress/compose';
import { __, sprintf } from '@wordpress/i18n';
import { BaseControl, Button, ButtonGroup, TabPanel, Tooltip } from '@wordpress/components';

const DIRECTIONS = [
	'Top',
	'Right',
	'Bottom',
	'Left',
];

const LABELS = {
	margin: {
		bottom: __( 'Margin bottom', 'coblocks' ),
		left: __( 'Margin left', 'coblocks' ),
		right: __( 'Margin right', 'coblocks' ),
		top: __( 'Margin top', 'coblocks' ),
	},
	padding: {
		bottom: __( 'Padding bottom', 'coblocks' ),
		left: __( 'Padding left', 'coblocks' ),
		right: __( 'Padding right', 'coblocks' ),
		top: __( 'Padding top', 'coblocks' ),
	},
};

/* eslint-disable react/destructuring-assignment */
const DimensionsControl = ( props ) => {
	const {
		attributes,
		clientId,
		dimensionSize,
		help,
		instanceId,
		label = __( 'Margin', 'coblocks' ),
		setAttributes,
		type = 'margin',
		unit,
	} = props;

	const {
		coblocks,
		marginSize,
		paddingSize,
		saveCoBlocksMeta,
	} = attributes;

	const { updateBlockAttributes } = useDispatch( 'core/block-editor' );

	const getAttributeValue = ( value, valueUnit ) => {
		return ( typeof value !== 'undefined' ) ? `${ value }${ valueUnit }` : null;
	};

	const getCssLine = ( value, property ) => {
		if ( typeof value !== 'undefined' ) {
			return `${ property }: ${ value } !important`;
		}
	};

	const saveMeta = () => {
		const meta = wp.data.select( 'core/editor' ).getEditedPostAttribute( 'meta' );
		const block = wp.data.select( 'core/block-editor' ).getBlock( clientId );
		let dimensions = {};

		if ( typeof coblocks !== 'undefined' && typeof coblocks.id !== 'undefined' ) {
			const id = props.name.split( '/' ).join( '-' ) + '-' + coblocks.id;
			const paddingUnit = block.attributes.paddingUnit;
			const marginUnit = block.attributes.marginUnit;
			const padding = {
				paddingBottom: getAttributeValue( block.attributes.paddingBottom, paddingUnit ),
				paddingBottomMobile: getAttributeValue( block.attributes.paddingBottomMobile, paddingUnit ),
				paddingBottomTablet: getAttributeValue( block.attributes.paddingBottomTablet, paddingUnit ),
				paddingLeft: getAttributeValue( block.attributes.paddingLeft, paddingUnit ),
				paddingLeftMobile: getAttributeValue( block.attributes.paddingLeftMobile, paddingUnit ),
				paddingLeftTablet: getAttributeValue( block.attributes.paddingLeftTablet, paddingUnit ),
				paddingRight: getAttributeValue( block.attributes.paddingRight, paddingUnit ),
				paddingRightMobile: getAttributeValue( block.attributes.paddingRightMobile, paddingUnit ),
				paddingRightTablet: getAttributeValue( block.attributes.paddingRightTablet, paddingUnit ),
				paddingTop: getAttributeValue( block.attributes.paddingTop, paddingUnit ),
				paddingTopMobile: getAttributeValue( block.attributes.paddingTopMobile, paddingUnit ),
				paddingTopTablet: getAttributeValue( block.attributes.paddingTopTablet, paddingUnit ),
			};
			const margin = {
				marginBottom: getAttributeValue( block.attributes.marginBottom, marginUnit ),
				marginBottomMobile: getAttributeValue( block.attributes.marginBottomMobile, marginUnit ),
				marginBottomTablet: getAttributeValue( block.attributes.marginBottomTablet, marginUnit ),
				marginLeft: getAttributeValue( block.attributes.marginLeft, marginUnit ),
				marginLeftMobile: getAttributeValue( block.attributes.marginLeftMobile, marginUnit ),
				marginLeftTablet: getAttributeValue( block.attributes.marginLeftTablet, marginUnit ),
				marginRight: getAttributeValue( block.attributes.marginRight, marginUnit ),
				marginRightMobile: getAttributeValue( block.attributes.marginRightMobile, marginUnit ),
				marginRightTablet: getAttributeValue( block.attributes.marginRightTablet, marginUnit ),
				marginTop: getAttributeValue( block.attributes.marginTop, marginUnit ),
				marginTopMobile: getAttributeValue( block.attributes.marginTopMobile, marginUnit ),
				marginTopTablet: getAttributeValue( block.attributes.marginTopTablet, marginUnit ),
			};

			if ( typeof meta === 'undefined' || typeof meta._coblocks_dimensions === 'undefined' || ( typeof meta._coblocks_dimensions !== 'undefined' && meta._coblocks_dimensions === '' ) ) {
				dimensions = {};
			} else {
				dimensions = JSON.parse( meta._coblocks_dimensions );
			}

			if ( typeof dimensions[ id ] === 'undefined' ) {
				dimensions[ id ] = {};
				dimensions[ id ][ type ] = {};
			} else if ( typeof dimensions[ id ][ type ] === 'undefined' ) {
				dimensions[ id ][ type ] = {};
			}

			if ( dimensionSize === 'advanced' ) {
				dimensions[ id ][ type ] = type === 'padding' ? padding : margin;
			} else {
				dimensions[ id ][ type ] = {};
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
			style.type = 'text/css';

			// add responsive styling
			const responsiveCss = `
				@media only screen and (max-width: 768px) {
					.${ id } > div {
						${ getCssLine( padding.paddingTopTablet, 'padding-top' ) }
						${ getCssLine( padding.paddingRightTablet, 'padding-right' ) }
						${ getCssLine( padding.paddingBottomTablet, 'padding-bottom' ) }
						${ getCssLine( padding.paddingLeftTablet, 'padding-left' ) }
						${ getCssLine( margin.marginTopTablet, 'margin-top' ) }
						${ getCssLine( margin.marginRightTablet, 'margin-right' ) }
						${ getCssLine( margin.marginBottomTablet, 'margin-bottom' ) }
						${ getCssLine( margin.marginLeftTablet, 'margin-left' ) }
					}
				}

				@media only screen and (max-width: 514px) {
					.${ id } > div {
						${ getCssLine( padding.paddingTopMobile, 'padding-top' ) }
						${ getCssLine( padding.paddingRightMobile, 'padding-right' ) }
						${ getCssLine( padding.paddingBottomMobile, 'padding-bottom' ) }
						${ getCssLine( padding.paddingLeftMobile, 'padding-left' ) }
						${ getCssLine( margin.marginTopMobile, 'margin-top' ) }
						${ getCssLine( margin.marginRightMobile, 'margin-right' ) }
						${ getCssLine( margin.marginBottomMobile, 'margin-bottom' ) }
						${ getCssLine( margin.marginLeftMobile, 'margin-left' ) }
					}
				}
			`;

			if ( style.styleSheet ) {
				style.styleSheet.cssText = responsiveCss;
			} else {
				style.appendChild( document.createTextNode( responsiveCss ) );
			}

			head.appendChild( style );
		}
	};

	if ( saveCoBlocksMeta ) {
		saveMeta();
		updateBlockAttributes( clientId, { saveCoBlocksMeta: false } );
	}

	const onChangeSingle = ( value, device, direction ) => {
		setAttributes( { [ `${ type }${ direction }${ device }` ]: value } );
		saveMeta();
	};

	const onChangeAll = ( value, device ) => {
		setAttributes( {
			[ `${ type }Top${ device }` ]: value,
			[ `${ type }Right${ device }` ]: value,
			[ `${ type }Bottom${ device }` ]: value,
			[ `${ type }Left${ device }` ]: value,
		} );
		saveMeta();
	};

	const onChangeUnits = ( value ) => {
		setAttributes( { [ `${ type }Unit` ]: value } );
		saveMeta();
	};

	const onChangeSize = ( value, size ) => {
		// fix reset for specific blocks
		if ( [ 'coblocks/hero' ].includes( props.name ) && value === 'no' ) {
			if ( size < 0 ) {
				value = 'huge';
				size = 60;
			} else {
				size = -1;
			}
		}

		if ( type === 'padding' ) {
			setAttributes( { paddingSyncUnits: true } );
		}

		setAttributes( { [ `${ type }Size` ]: value } );

		if ( size ) {
			size = size < 0 ? '' : size;
			setAttributes( {
				[ `${ type }Top` ]: size,
				[ `${ type }Right` ]: 0,
				[ `${ type }Bottom` ]: size,
				[ `${ type }Left` ]: 0,
				[ `${ type }Unit` ]: 'px',
			} );
		}

		saveMeta();
	};

	const syncUnitsOverwrite = ( device = '' ) => {
		const numbers = [ props[ 'valueTop' + device ], props[ 'valueRight' + device ], props[ 'valueBottom' + device ], props[ 'valueLeft' + device ] ];
		const syncValue = Math.max.apply( null, numbers );

		setAttributes( {
			[ `${ type }SyncUnits${ device }` ]: ! props[ `syncUnits${ device }` ],
			[ `${ type }Top${ device }` ]: syncValue,
			[ `${ type }Right${ device }` ]: syncValue,
			[ `${ type }Bottom${ device }` ]: syncValue,
			[ `${ type }Left${ device }` ]: syncValue,
		} );

		saveMeta();
	};

	const classes = classnames(
		'components-base-control',
		'components-coblocks-dimensions-control', {
		}
	);

	const id = `inspector-coblocks-dimensions-control-${ instanceId }`;

	const onChangeValue = ( event, direction ) => {
		const newValue = ( event.target.value === '' ) ? undefined : Number( event.target.value );

		let device = '';
		if ( typeof event.target.getAttribute( 'data-device-type' ) !== 'undefined' && typeof event.target.getAttribute( 'data-device-type' ) !== 'undefined' ) {
			device = event.target.getAttribute( 'data-device-type' );
		}

		if ( props[ 'syncUnits' + device ] ) {
			onChangeAll( newValue, device );
		} else {
			onChangeSingle( newValue, device, direction );
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

		// Reset z-index
		const buttons = document.getElementsByClassName( `components-coblocks-dimensions-control__mobile-controls-item--${ type }` );

		for ( let i = 0; i < buttons.length; i++ ) {
			buttons[ i ].style.display = 'none';
		}
		if ( tabName === 'default' ) {
			const button = document.getElementsByClassName( `components-coblocks-dimensions-control__mobile-controls-item-${ type }--tablet` );
			button[ 0 ].click();
		} else {
			const button = document.getElementsByClassName( `components-coblocks-dimensions-control__mobile-controls-item-${ type }--${ selected }` );
			button[ 0 ].style.display = 'block';
		}
	};

	const capitalize = ( str ) => ( str && str[ 0 ].toUpperCase() + str.slice( 1 ) ) || '';

	const renderAdvancedControls = ( device = '' ) => {
		const syncMode = props[ `syncUnits${ device }` ];

		return (
			<>
				<div className="components-coblocks-dimensions-control__inputs">
					{ DIRECTIONS.map( ( direction ) => (
						<input
							aria-describedby={ !! help ? id + '__help' : undefined }
							aria-label={ LABELS[ type ][ direction.toLowerCase() ] }
							className="components-coblocks-dimensions-control__number"
							data-device-type={ device }
							key={ `coblocks-dimensions-control-number-${ device }-${ direction }` }
							min={ type === 'padding' ? 0 : undefined }
							onChange={ ( event ) => onChangeValue( event, direction ) }
							type="number"
							value={ props[ `value${ direction }${ device }` ] }
						/>
					) ) }
					<Tooltip text={ !! syncMode ? __( 'Unsync', 'coblocks' ) : __( 'Sync', 'coblocks' ) } >
						<Button
							aria-label={ __( 'Sync units', 'coblocks' ) }
							aria-pressed={ !! syncMode }
							className="components-coblocks-dimensions-control_sync"
							data-device-type={ device }
							isPrimary={ !! syncMode }
							isSecondary={ ! syncMode }
							isSmall
							onClick={ () => syncUnitsOverwrite( device ) }
						>
							{ SyncIcon }
						</Button>
					</Tooltip>
				</div>
			</>
		);
	};

	return (
		<>
			<div className={ classes }>
				{ dimensionSize === 'advanced'
					? <>
						<div className="components-coblocks-dimensions-control__header">
							{ label && <p className={ 'components-coblocks-dimensions-control__label' }>{ label }</p> }
							<div className="components-coblocks-dimensions-control__actions">
								<ButtonGroup aria-label={ __( 'Select Units', 'coblocks' ) } className="components-coblocks-dimensions-control__units">
									{ map( unitSizes, ( { unitValue, name } ) => (
										<Tooltip
											key={ `coblocks-dimensions-control-unit-tooltip-${ name }` }
											text={ sprintf(
												/* translators: %s: values associated with CSS syntax, 'Pixel', 'Em', 'Percentage' */
												__( '%s units', 'coblocks' ),
												name
											) }>
											<Button
												aria-label={ sprintf(
													/* translators: %s: values associated with CSS syntax, 'Pixel', 'Em', 'Percentage' */
													__( '%s units', 'coblocks' ),
													name
												) }
												aria-pressed={ unit === unitValue }
												className={ 'components-coblocks-dimensions-control__units--' + name }
												isPrimary={ unit === unitValue }
												isSecondary={ unit !== unitValue }
												isSmall
												key={ unitValue }
												onClick={ () => onChangeUnits( unitValue ) }
											>
												{ unitValue }
											</Button>
										</Tooltip>
									) ) }
								</ButtonGroup>
								<Button
									aria-label={ sprintf(
										/* translators: %s: a texual label  */
										__( 'Turn off advanced %s settings', 'coblocks' ),
										label.toLowerCase()
									) }
									isSecondary
									isSmall
									onClick={ () => onChangeSize( 'no', -1 ) }
									type="button"
								>
									{ __( 'Reset', 'coblocks' ) }
								</Button>
							</div>
						</div>
						<TabPanel
							activeClass="is-active"
							className="components-coblocks-dimensions-control__mobile-controls"
							initialTabName="default"
							onSelect={ onSelect }
							tabs={ [
								{
									className: `components-coblocks-dimensions-control__mobile-controls-item components-coblocks-dimensions-control__mobile-controls-item--${ type } components-button is-button is-default is-secondary components-coblocks-dimensions-control__mobile-controls-item--default components-coblocks-dimensions-control__mobile-controls-item-${ type }--default`,
									name: 'default',
									title: DesktopIcon,
								},
								{
									className: `components-coblocks-dimensions-control__mobile-controls-item components-coblocks-dimensions-control__mobile-controls-item--${ type } components-button is-button is-default is-secondary components-coblocks-dimensions-control__mobile-controls-item--desktop components-coblocks-dimensions-control__mobile-controls-item-${ type }--desktop`,
									name: 'desktop',
									title: DesktopIcon,
								},
								{
									className: `components-coblocks-dimensions-control__mobile-controls-item components-coblocks-dimensions-control__mobile-controls-item--${ type } components-button is-button is-default is-secondary components-coblocks-dimensions-control__mobile-controls-item--tablet components-coblocks-dimensions-control__mobile-controls-item-${ type }--tablet`,
									name: 'tablet',
									title: TabletIcon,
								},
								{
									className: `components-coblocks-dimensions-control__mobile-controls-item components-coblocks-dimensions-control__mobile-controls-item--${ type } components-button is-button is-default is-secondary components-coblocks-dimensions-control__mobile-controls-item--mobile components-coblocks-dimensions-control__mobile-controls-item-${ type }--mobile`,
									name: 'mobile',
									title: MobileIcon,
								},
							] }>
							{
								( tab ) => renderAdvancedControls( [ 'default', 'desktop' ].includes( tab.name ) ? '' : capitalize( tab.name ) )
							}
						</TabPanel>
						<div className="components-coblocks-dimensions-control__input-labels">
							<span className="components-coblocks-dimensions-control__number-label">{ __( 'Top', 'coblocks' ) }</span>
							<span className="components-coblocks-dimensions-control__number-label">{ __( 'Right', 'coblocks' ) }</span>
							<span className="components-coblocks-dimensions-control__number-label">{ __( 'Bottom', 'coblocks' ) }</span>
							<span className="components-coblocks-dimensions-control__number-label">{ __( 'Left', 'coblocks' ) }</span>
							<span className="components-coblocks-dimensions-control__number-label-blank" />
						</div>
					</>
					: <BaseControl help={ help } id="textarea-1" label={ label }>
						<div className="components-font-size-picker__controls">
							<DimensionsSelect
								marginSize={ marginSize }
								paddingSize={ paddingSize }
								setAttributes={ setAttributes }
								type={ type }
							/>

							<Button
								aria-label={ sprintf(
									/* translators: %s: a texual label */
									__( 'Advanced %s settings', 'coblocks' ),
									label.toLowerCase()
								) }
								isPrimary={ dimensionSize === 'advanced' }
								isSecondary
								isSmall
								onClick={ () => onChangeSize( 'advanced', '' ) }
								type="button"
							>
								{ __( 'Advanced', 'coblocks' ) }
							</Button>
						</div>
					</BaseControl>
				}
			</div>
		</>
	);
};

DimensionsControl.propTypes = {
	attributes: PropTypes.number,
	clientId: PropTypes.number,
	dimensionSize: PropTypes.number,
	help: PropTypes.bool,
	instanceId: PropTypes.number,
	label: PropTypes.string,
	name: PropTypes.string,
	setAttributes: PropTypes.func,
	type: PropTypes.string,
	unit: PropTypes.number,
};

export default withInstanceId( DimensionsControl );
