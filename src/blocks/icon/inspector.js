
/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import applyWithColors from './colors';
import svg from './svgs';
import { DEFAULT_ICON_SIZE } from '.';
import { MIN_ICON_SIZE, MAX_ICON_SIZE } from './edit';
import IconSizeSelect from './icon-size-select';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { InspectorControls, ContrastChecker, PanelColorSettings } from '@wordpress/block-editor';
import { PanelBody, withFallbackStyles, RangeControl, TextControl, Button, BaseControl, Tooltip, ToggleControl } from '@wordpress/components';

/**
 * Module constants
 */
const NEW_TAB_REL = 'noreferrer noopener';

/**
 * Fallback styles
 */
const { getComputedStyle } = window;
const applyFallbackStyles = withFallbackStyles( ( node, ownProps ) => {
	const { backgroundColor, iconColor } = ownProps.attributes;
	const editableNode = node.querySelector( '[contenteditable="true"]' );
	const computedStyles = editableNode ? getComputedStyle( editableNode ) : null;
	return {
		fallbackBackgroundColor: backgroundColor || ! computedStyles ? undefined : computedStyles.backgroundColor,
		fallbackIconColor: iconColor || ! computedStyles ? undefined : computedStyles.color,
	};
} );

/**
 * Inspector controls
 *
 * @param {Object} props
 */
const Inspector = ( props ) => {
	const {
		setAttributes,
		attributes,
		clientId,
		backgroundColor,
		iconColor,
		fallbackBackgroundColor,
		fallbackIconColor,
		setBackgroundColor,
		setIconColor,
		className,
		label = __( 'Size', 'coblocks' ),
		help,
	} = props;

	const {
		rel = '',
		icon,
		borderRadius,
		padding,
		iconSize,
		width,
		href,
		linkTarget,
	} = attributes;

	const [ filteredIcons, setFilteredIcons ] = useState( svg );
	const [ searchValue, setSearchValue ] = useState( '' );
	const [ isSearching, setIsSearching ] = useState( false );

	const onChangeSize = ( value, size ) => {
		setAttributes( { iconSize: value } );
		if ( size ) {
			if ( size < 0 ) {
				size = '';
			}
			setAttributes( { height: size, width: size } );
		}
	};

	// Dynamically set the padding based on icon width.
	// Prevents disapearing icons when the combined padding is more than than width of the icon.
	const generateMaxPadding = ( newWidth ) => {
		if ( newWidth <= 60 ) {
			return 10;
		}
		return Math.round( newWidth / 4 );
	};

	const onSetNewTab = ( shouldOpenNewTab ) => {
		const newLinkTarget = shouldOpenNewTab ? '_blank' : undefined;
		const linkRelAttributes = NEW_TAB_REL.split( ' ' );
		let updatedRel = rel;

		// Should open new tab and set block specified rel
		if ( shouldOpenNewTab && linkRelAttributes.filter( ( att ) => updatedRel.includes( att ) ).length === 0 ) {
			linkRelAttributes.forEach( ( att ) => {
				updatedRel = updatedRel.includes( att ) ? updatedRel : updatedRel = `${ updatedRel } ${ att }`;
			} );
		}

		// Should not open in new tab and should remove block specified rel
		if ( ! shouldOpenNewTab && linkRelAttributes.filter( ( att ) => updatedRel.includes( att ) ).length > 0 ) {
			linkRelAttributes.forEach( ( att ) => {
				updatedRel = updatedRel.replace( att, '' );
				updatedRel = updatedRel.trim();
			} );
		}

		setAttributes( {
			linkTarget: newLinkTarget,
			rel: updatedRel || undefined,
		} );
	};

	let iconStyle = 'outlined';

	if ( className.includes( 'is-style-filled' ) ) {
		iconStyle = 'filled';
	}

	const filterList = ( event ) => {
		const filtered = {};

		setSearchValue( event );
		setIsSearching( true );

		if ( event === '' ) {
			setIsSearching( false );
		}

		const updatedList = Object.entries( svg[ iconStyle ] ).filter( function( item ) {
			const text = item[ 0 ] + ' ' + item[ 1 ].keywords;
			return text.toLowerCase().search(
				event.toLowerCase() ) !== -1;
		} );

		filtered.outlined = {};
		filtered.filled = {};
		updatedList.forEach( ( [ key ] ) => {
			filtered.outlined[ key ] = svg.outlined[ key ];
			filtered.filled[ key ] = svg.filled[ key ];
		} );

		setFilteredIcons( filtered );
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Icon settings', 'coblocks' ) }>
					{ iconSize === 'advanced'
						? <>
							<div className="components-base-control components-coblocks-icon-block--advanced-size">
								<Button
									type="button"
									onClick={ () => {
										document.getElementById( 'block-' + clientId ).getElementsByClassName( 'wp-block-coblocks-icon__inner' )[ 0 ].style.height = 'auto';
										onChangeSize( 'medium', DEFAULT_ICON_SIZE );
									} }
									isSmall
									isSecondary
									aria-label={ __( 'Reset icon size', 'coblocks' ) }
								>
									{ __( 'Reset', 'coblocks' ) }
								</Button>
								<RangeControl
									label={ __( 'Size', 'coblocks' ) }
									value={ width }
									onChange={ ( nextWidth ) => {
										document.getElementById( 'block-' + clientId ).getElementsByClassName( 'wp-block-coblocks-icon__inner' )[ 0 ].style.height = 'auto';
										setAttributes( { width: nextWidth, height: nextWidth } );
									} }
									min={ padding ? MIN_ICON_SIZE + 28 : MIN_ICON_SIZE }
									max={ MAX_ICON_SIZE }
									step={ 1 }
								/>
							</div>
						</>
						: <BaseControl id={ `icon-size-control-${ clientId }` } label={ label } help={ help }>
							<div className="components-coblocks-icon-size__controls">
								<IconSizeSelect
									setAttributes={ setAttributes }
									iconSize={ iconSize }
									width={ width }
								/>
								<Button
									type="button"
									onClick={ () => onChangeSize( 'advanced', '' ) }
									isSmall
									isSecondary
									aria-label={ __( 'Apply custom size', 'coblocks' ) }
									isPrimary={ iconSize === 'advanced' }
								>
									{ __( 'Custom', 'coblocks' ) }
								</Button>
							</div>
						</BaseControl>
					}
					{ backgroundColor.color &&
						<>
							<RangeControl
								label={ __( 'Radius', 'coblocks' ) }
								value={ borderRadius }
								onChange={ ( nextBorderRadius ) => setAttributes( { borderRadius: nextBorderRadius } ) }
								min={ 0 }
								max={ 200 }
								step={ 1 }
							/>
							<RangeControl
								label={ __( 'Padding', 'coblocks' ) }
								value={ padding }
								onChange={ ( nextPadding ) => setAttributes( { padding: nextPadding } ) }
								min={ 5 }
								max={ generateMaxPadding( width ) }
								step={ 1 }
							/>
						</>
					}
					<TextControl
						type="text"
						autoComplete="off"
						label={ __( 'Icon search', 'coblocks' ) }
						value={ searchValue }
						className="coblocks-icon-types-list__search"
						onChange={ ( evt ) => {
							filterList( evt );
						} }
					/>
					<div className="coblocks-icon-types-list-wrapper">
						<ul className="block-editor-block-types-list coblocks-icon-types-list">
							{ ! isSearching
								? <li className="block-editor-block-types-list__list-item selected-svg">
									<Button
										className="editor-block-list-item-button"
										onClick={ () => {
											return false;
										} }
									>
										<span className="block-editor-block-types-list__item-icon">
											{ icon && svg[ iconStyle ][ icon ].icon }
										</span>
									</Button>
								</li>
								: null
							}
							{ Object.keys( filteredIcons[ iconStyle ] ).length > 0
								? Object.keys( filteredIcons[ iconStyle ] ).map( ( keyName, i ) => {
									return (
										<li key={ `editor-pblock-types-list-item-${ i }` } className={ classnames(
											'block-editor-block-types-list__list-item', {
											},
										) }>
											<Tooltip text={ ( svg[ iconStyle ][ keyName ].label ) ? svg[ iconStyle ][ keyName ].label : keyName }>
												<Button
													isSecondary
													isPrimary={ icon && icon === keyName }
													className="editor-block-list-item-button"
													onClick={ () => {
														setAttributes( { icon: keyName } );
													} }
												>
													<span className="block-editor-block-types-list__item-icon">
														{ icon && svg[ iconStyle ][ keyName ].icon }
													</span>
												</Button>
											</Tooltip>
										</li>
									);
								} )
								: <li className="no-results"> { __( 'No results found.', 'coblocks' ) } </li>
							}
						</ul>
					</div>
				</PanelBody>
				<PanelBody
					title={ __( 'Link settings', 'coblocks' ) }
					initialOpen={ false } >
					<TextControl
						label={ __( 'Link URL', 'coblocks' ) }
						value={ href || '' }
						onChange={ ( value ) => setAttributes( { href: value } ) }
						placeholder="https://" />
					<TextControl
						label={ __( 'Link rel', 'coblocks' ) }
						value={ rel || '' }
						onChange={ ( value ) => setAttributes( { rel: value } ) }
					/>
					<ToggleControl
						label={ !! linkTarget ? __( 'Opening in new tab', 'coblocks' ) : __( 'Open in new tab', 'coblocks' ) }
						onChange={ onSetNewTab }
						checked={ linkTarget === '_blank' } />
				</PanelBody>
				<PanelColorSettings
					title={ __( 'Color settings', 'coblocks' ) }
					initialOpen={ false }
					colorSettings={ [
						{
							isLargeText: true,
							value: iconColor.color,
							onChange: setIconColor,
							label: __( 'Icon color', 'coblocks' ),
						},
						{
							value: backgroundColor.color,
							onChange: ( newBackground ) => {
								// Auto assign padding.
								if ( padding === 0 ) {
									setAttributes( { padding: 10 } );
								}

								// Reset padding when colors are cleared.
								if ( ! newBackground ) {
									setAttributes( { padding: 0, borderRadius: 0 } );
								}

								setBackgroundColor( newBackground );
							},
							label: __( 'Background color', 'coblocks' ),
						},

					] }
				>
					<ContrastChecker
						{ ...{
							iconColor: iconColor.color,
							backgroundColor: backgroundColor.color,
							fallbackIconColor,
							fallbackBackgroundColor,
						} }
					/>
				</PanelColorSettings>
			</InspectorControls>
		</>
	);
};

export default compose( [
	applyWithColors,
	applyFallbackStyles,
] )( Inspector );
