
/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import applyWithColors from './colors';
import { DEFAULT_ICON_SIZE } from '.';
import IconSizeSelect from './icon-size-select';
import { MAX_ICON_SIZE, MIN_ICON_SIZE } from './edit';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';
import { BaseControl, Button, PanelBody, RangeControl, Spinner, TextControl, ToggleControl, Tooltip, withFallbackStyles } from '@wordpress/components';
import { ContrastChecker, InspectorControls, PanelColorSettings } from '@wordpress/block-editor';
import { useEffect, useState } from '@wordpress/element';

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
		attributes,
		backgroundColor,
		className,
		clientId,
		fallbackBackgroundColor,
		fallbackIconColor,
		help,
		iconColor,
		label = __( 'Size', 'coblocks' ),
		setAttributes,
		setBackgroundColor,
		setIconColor,
	} = props;

	const {
		borderRadius,
		href,
		icon,
		iconSize,
		linkTarget,
		padding,
		rel = '',
		width,
	} = attributes;

	const [ svgs, setSvgs ] = useState();
	const [ filteredIcons, setFilteredIcons ] = useState();
	const [ searchValue, setSearchValue ] = useState( '' );
	const [ isSearching, setIsSearching ] = useState( false );

	useEffect( () => {
		( async () => {
			const importedSvgs = await import( './svgs' );

			setSvgs( importedSvgs.default );
			setFilteredIcons( importedSvgs.default );
		} )();
	}, [] );

	if ( ! svgs || ! filteredIcons ) {
		return <Spinner />;
	}

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

		const updatedList = Object.entries( svgs[ iconStyle ] ).filter( function( item ) {
			const text = item[ 0 ] + ' ' + item[ 1 ].keywords;
			return text.toLowerCase().search(
				event.toLowerCase() ) !== -1;
		} );

		filtered.outlined = {};
		filtered.filled = {};
		updatedList.forEach( ( [ key ] ) => {
			filtered.outlined[ key ] = svgs.outlined[ key ];
			filtered.filled[ key ] = svgs.filled[ key ];
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
									aria-label={ __( 'Reset icon size', 'coblocks' ) }
									isSecondary
									isSmall
									onClick={ () => {
										document.getElementById( 'block-' + clientId ).getElementsByClassName( 'wp-block-coblocks-icon__inner' )[ 0 ].style.height = 'auto';
										onChangeSize( 'medium', DEFAULT_ICON_SIZE );
									} }
									type="button"
								>
									{ __( 'Reset', 'coblocks' ) }
								</Button>
								<RangeControl
									label={ __( 'Size', 'coblocks' ) }
									max={ MAX_ICON_SIZE }
									min={ padding ? MIN_ICON_SIZE + 28 : MIN_ICON_SIZE }
									onChange={ ( nextWidth ) => {
										document.getElementById( 'block-' + clientId ).getElementsByClassName( 'wp-block-coblocks-icon__inner' )[ 0 ].style.height = 'auto';
										setAttributes( {
											height: nextWidth,
											width: nextWidth,
										} );
									} }
									step={ 1 }
									value={ width }
								/>
							</div>
						</>
						: <BaseControl help={ help } id={ `icon-size-control-${ clientId }` } label={ label }>
							<div className="components-coblocks-icon-size__controls">
								<IconSizeSelect
									iconSize={ iconSize }
									setAttributes={ setAttributes }
									width={ width }
								/>
								<Button
									aria-label={ __( 'Apply custom size', 'coblocks' ) }
									isPrimary={ iconSize === 'advanced' }
									isSecondary
									isSmall
									onClick={ () => onChangeSize( 'advanced', '' ) }
									type="button"
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
								max={ 200 }
								min={ 0 }
								onChange={ ( nextBorderRadius ) => setAttributes( { borderRadius: nextBorderRadius } ) }
								step={ 1 }
								value={ borderRadius }
							/>
							<RangeControl
								label={ __( 'Padding', 'coblocks' ) }
								max={ generateMaxPadding( width ) }
								min={ 5 }
								onChange={ ( nextPadding ) => setAttributes( { padding: nextPadding } ) }
								step={ 1 }
								value={ padding }
							/>
						</>
					}
					<TextControl
						autoComplete="off"
						className="coblocks-icon-types-list__search"
						label={ __( 'Icon search', 'coblocks' ) }
						onChange={ ( evt ) => {
							filterList( evt );
						} }
						type="text"
						value={ searchValue }
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
											{ icon && svgs[ iconStyle ][ icon ].icon }
										</span>
									</Button>
								</li>
								: null
							}
							{ Object.keys( filteredIcons[ iconStyle ] ).length > 0
								? Object.keys( filteredIcons[ iconStyle ] ).map( ( keyName, i ) => {
									return (
										<li
											className={ classnames( 'block-editor-block-types-list__list-item', {}, ) }
											key={ `editor-pblock-types-list-item-${ i }` } >
											<Tooltip text={ ( svgs[ iconStyle ][ keyName ].label ) ? svgs[ iconStyle ][ keyName ].label : keyName }>
												<Button
													className="editor-block-list-item-button"
													isPrimary={ icon && icon === keyName }
													isSecondary
													onClick={ () => {
														setAttributes( { icon: keyName } );
													} }
												>
													<span className="block-editor-block-types-list__item-icon">
														{ icon && svgs[ iconStyle ][ keyName ].icon }
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
					initialOpen={ false }
					title={ __( 'Link settings', 'coblocks' ) } >
					<TextControl
						label={ __( 'Link URL', 'coblocks' ) }
						onChange={ ( value ) => setAttributes( { href: value } ) }
						placeholder="https://"
						value={ href || '' }
					/>
					<TextControl
						label={ __( 'Link rel', 'coblocks' ) }
						onChange={ ( value ) => setAttributes( { rel: value } ) }
						value={ rel || '' }
					/>
					<ToggleControl
						checked={ linkTarget === '_blank' }
						label={ !! linkTarget ? __( 'Opening in new tab', 'coblocks' ) : __( 'Open in new tab', 'coblocks' ) }
						onChange={ onSetNewTab }
					/>
				</PanelBody>
				<PanelColorSettings
					colorSettings={ [
						{
							isLargeText: true,
							label: __( 'Icon color', 'coblocks' ),
							onChange: setIconColor,
							value: iconColor.color,
						},
						{
							label: __( 'Background color', 'coblocks' ),
							onChange: ( newBackground ) => {
								// Auto assign padding.
								if ( padding === 0 ) {
									setAttributes( { padding: 10 } );
								}

								// Reset padding when colors are cleared.
								if ( ! newBackground ) {
									setAttributes( { borderRadius: 0, padding: 0 } );
								}

								setBackgroundColor( newBackground );
							},
							value: backgroundColor.color,
						},
					] }
					initialOpen={ false }
					title={ __( 'Color settings', 'coblocks' ) }
				>
					<ContrastChecker
						{ ...{
							backgroundColor: backgroundColor.color,
							fallbackBackgroundColor,
							fallbackIconColor,
							iconColor: iconColor.color,
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
