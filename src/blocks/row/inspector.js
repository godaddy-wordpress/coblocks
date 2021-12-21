/**
 * External dependencies
 */
import map from 'lodash/map';
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import { layoutOptions } from './utilities';
import applyWithColors from './colors';
import { BackgroundPanel } from '../../components/background';
import DimensionsControl from '../../components/dimensions-control';
import GutterControl from '../../components/gutter-control/gutter-control';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';
import { PanelColorSettings } from '@wordpress/block-editor';
import { PanelBody, withFallbackStyles } from '@wordpress/components';

/**
 * Fallback styles
 */
const { getComputedStyle } = window;

const FallbackStyles = withFallbackStyles( ( node, ownProps ) => {
	const { backgroundColor } = ownProps.attributes;

	const editableNode = node.querySelector( '[contenteditable="true"]' );

	//verify if editableNode is available, before using getComputedStyle.
	const computedStyles = editableNode ? getComputedStyle( editableNode ) : null;

	return {
		fallbackBackgroundColor: backgroundColor || ! computedStyles ? undefined : computedStyles.backgroundColor,
	};
} );

/**
 * Inspector controls
 *
 * @param {Object} props
 */
const Inspector = ( props ) => {
	const {
		attributes,
		backgroundColor,
		clientId,
		setAttributes,
		setBackgroundColor,
		setTextColor,
		textColor,
		updateBlockAttributes,
		getBlocksByClientId,
	} = props;

	const {
		columns,
		layout,
		marginBottom,
		marginLeft,
		marginRight,
		marginSize,
		marginTop,
		marginBottomTablet,
		marginLeftTablet,
		marginRightTablet,
		marginTopTablet,
		marginBottomMobile,
		marginLeftMobile,
		marginRightMobile,
		marginTopMobile,
		marginSyncUnits,
		marginSyncUnitsTablet,
		marginSyncUnitsMobile,
		marginUnit,
		paddingBottom,
		paddingLeft,
		paddingRight,
		paddingSize,
		paddingTop,
		paddingBottomTablet,
		paddingLeftTablet,
		paddingRightTablet,
		paddingTopTablet,
		paddingBottomMobile,
		paddingLeftMobile,
		paddingRightMobile,
		paddingTopMobile,
		paddingSyncUnits,
		paddingSyncUnitsTablet,
		paddingSyncUnitsMobile,
		paddingUnit,
		hasMarginControl,
	} = attributes;

	let selectedRows = 1;

	if ( columns ) {
		selectedRows = parseInt( columns.toString().split( '-' ) );
	}

	const handleEvent = ( key ) => {
		const selectedWidth = key.toString().split( '-' );
		const children = getBlocksByClientId( clientId );
		setAttributes( {
			layout: key,
		} );

		if ( typeof children[ 0 ].innerBlocks !== 'undefined' ) {
			map( children[ 0 ].innerBlocks, ( blockProps, index ) => (
				updateBlockAttributes( blockProps.clientId, { width: selectedWidth[ index ] } )
			) );
		}
	};

	return (
		<>
			{ ( columns && selectedRows >= 1 ) &&
			<>
				{ layout &&
				<>
					{ selectedRows > 1 &&
						<PanelBody title={ __( 'Styles', 'coblocks' ) } initialOpen={ false }>
							<div className={ classnames(
								'block-editor-block-styles',
								'coblocks-editor-block-styles',
							) } >
								{ map( layoutOptions[ selectedRows ], ( { name, key, icon } ) => (
									<div
										key={ `style-${ name }` }
										className={ classnames(
											'block-editor-block-styles__item',
											{ 'is-active': layout === key },
										) }
										onClick={ () => handleEvent( key ) }
										onKeyPress={ () => handleEvent( key ) }
										role="button"
										tabIndex="0"
										aria-label={ name }
									>
										<div className="block-editor-block-styles__item-preview">
											{ icon }
										</div>
									</div>
								) ) }
							</div>
						</PanelBody>
					}
					{ layout &&
						<>
							<PanelBody title={ __( 'Row settings', 'coblocks' ) }>
								{ selectedRows >= 2 && <GutterControl { ...props } /> }
								<DimensionsControl { ...props }
									type={ 'padding' }
									label={ __( 'Padding', 'coblocks' ) }
									help={ __( 'Space inside of the container.', 'coblocks' ) }
									valueTop={ paddingTop }
									valueRight={ paddingRight }
									valueBottom={ paddingBottom }
									valueLeft={ paddingLeft }
									valueTopTablet={ paddingTopTablet }
									valueRightTablet={ paddingRightTablet }
									valueBottomTablet={ paddingBottomTablet }
									valueLeftTablet={ paddingLeftTablet }
									valueTopMobile={ paddingTopMobile }
									valueRightMobile={ paddingRightMobile }
									valueBottomMobile={ paddingBottomMobile }
									valueLeftMobile={ paddingLeftMobile }
									unit={ paddingUnit }
									syncUnits={ paddingSyncUnits }
									syncUnitsTablet={ paddingSyncUnitsTablet }
									syncUnitsMobile={ paddingSyncUnitsMobile }
									dimensionSize={ paddingSize }
								/>
								{ hasMarginControl &&
									<DimensionsControl { ...props }
										type={ 'margin' }
										label={ __( 'Margin', 'coblocks' ) }
										help={ __( 'Space around the container.', 'coblocks' ) }
										valueTop={ marginTop }
										valueRight={ marginRight }
										valueBottom={ marginBottom }
										valueLeft={ marginLeft }
										valueTopTablet={ marginTopTablet }
										valueRightTablet={ marginRightTablet }
										valueBottomTablet={ marginBottomTablet }
										valueLeftTablet={ marginLeftTablet }
										valueTopMobile={ marginTopMobile }
										valueRightMobile={ marginRightMobile }
										valueBottomMobile={ marginBottomMobile }
										valueLeftMobile={ marginLeftMobile }
										unit={ marginUnit }
										syncUnits={ marginSyncUnits }
										syncUnitsTablet={ marginSyncUnitsTablet }
										syncUnitsMobile={ marginSyncUnitsMobile }
										dimensionSize={ marginSize }
									/>
								}
							</PanelBody>
							<PanelColorSettings
								title={ __( 'Color settings', 'coblocks' ) }
								initialOpen={ false }
								colorSettings={ [
									{
										value: backgroundColor.color,
										onChange: ( nextBackgroundColor ) => {
											setBackgroundColor( nextBackgroundColor );

											if ( ! paddingSize || paddingSize === 'no' ) {
												setAttributes( { paddingSize: 'medium' } );
											}

											if ( ! nextBackgroundColor ) {
												setAttributes( { paddingSize: 'no' } );
											}
										},
										label: __( 'Background color', 'coblocks' ),
									},
									{
										value: textColor.color,
										onChange: setTextColor,
										label: __( 'Text color', 'coblocks' ),
									},
								] }
							>
							</PanelColorSettings>
							<BackgroundPanel { ...props }
								hasOverlay={ true }
							/>
						</>
					}
				</>
				}
			</>
			}
		</>
	);
};

export default compose( [
	applyWithColors,
	FallbackStyles,
] )( Inspector );
