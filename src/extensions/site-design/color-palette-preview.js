/* global siteDesign */
/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	BaseControl,
	Button,
	ColorIndicator,
	ColorPicker,
	Dropdown,
	PanelBody,
} from '@wordpress/components';
import { useCallback, useEffect, useState } from '@wordpress/element';
import { useDispatch, useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import STORE_KEY from './data/constants';

export function ColorPalettePreviews() {
	const getSettings = useSelect( ( select ) => select( 'core/block-editor' ).getSettings, [] );
	const designStyleObj = useSelect( ( select ) => select( STORE_KEY ).getDesignStyleObj(), [] );
	const designStyle = useSelect( ( select ) => select( STORE_KEY ).getDesignStyle(), [] );
	const colorPalette = useSelect( ( select ) => select( STORE_KEY ).getColorPalette(), [] );
	const currentColors = useSelect( ( select ) => select( STORE_KEY ).getCurrentColors(), [] );
	const colorsPanelOpen = useSelect( ( select ) => select( STORE_KEY ).isColorsPanelOpen(), [] );
	const updateSettings = useDispatch( 'core/block-editor' ).updateSettings;

	const { updateCustomColors, updateColorPalette, toggleColorsPanel } = useDispatch( STORE_KEY );

	const [ previousPalette, setPreviousPalette ] = useState( null );

	useEffect( () => {
		if ( ! currentColors ) {
			return;
		}

		updateColors();

		Object.entries( currentColors ).forEach( ( [ name, color ] ) => {
			const editor = document.getElementsByClassName( siteDesign.editorClass )[ 0 ];
			if ( editor ) {
				document.getElementsByClassName( siteDesign.editorClass )[ 0 ].style.setProperty( `--go--color--${ name }`, color );
			}
		} );
	}, [ currentColors ] );

	const updateColors = ( newColors = {} ) => {
		const colors = {
			...currentColors,
			...newColors,
		};

		if ( colorPalette === 'custom' ) {
			setPreviousPalette( null );
		}

		updateSettings( {
			...getSettings(),
			colors: Object.entries( colors ).map( ( [ name, color ] ) => ( {
				name,
				slug: name,
				color,
			} ) ),
		} );

		updateCustomColors( {
			...currentColors,
			...newColors,
		} );
	};

	const useCustomColors = () => {
		setPreviousPalette( colorPalette );
		updateColorPalette( 'custom' );
		updateColors();
	};

	return (
		<PanelBody
			className="site-design--colors__panel"
			onToggle={ toggleColorsPanel }
			opened={ colorsPanelOpen }
			title={ __( 'Colors', 'coblocks' ) }>
			<BaseControl className="components-site-design-color-palettes">
				<ColorPalettePreviewCustom
					onDismissCustom={ () => updateColorPalette( previousPalette ) }
					onUpdateColors={ updateColors }
					previousPalette={ previousPalette } />

				<div className="color-palettes">
					<div className="color-palettes__title">
						<span>{ __( 'Color Palettes', 'coblocks' ) }</span>
						{ colorPalette !== 'custom' &&
							<button
								className="color-palettes__custom-button"
								onClick={ useCustomColors }>
								{ __( 'Custom', 'coblocks' ) }
							</button>
						}
					</div>
					<div className="color-palettes__palettes">
						{
							designStyleObj && designStyleObj.palettes.map(
								( [ slug, colors ] ) => (
									<ColorPalettePreview
										isActive={ colorPalette.replace( `${ designStyle }-`, '' ) === slug }
										key={ `palette-${ slug }` }
										palette={ colors }
										slug={ slug } />
								)
							)
						}
					</div>
				</div>
			</BaseControl>
		</PanelBody>
	);
}

export function ColorPalettePreview( { slug, palette, isActive } ) {
	const designStyle = useSelect( ( select ) => select( STORE_KEY ).getDesignStyle(), [] );
	const colorPalette = useSelect( ( select ) => select( STORE_KEY ).getColorPalette(), [] );

	const { updateColorPalette } = useDispatch( STORE_KEY );

	const classes = classnames( 'color-palette', {
		'is-selected': isActive,
	} );

	const setColorPalette = useCallback( () => {
		if ( colorPalette === slug ) {
			return;
		}

		updateColorPalette( slug );
	}, [ slug, colorPalette, designStyle ] );

	return (
		<Button
			className={ classes }
			onClick={ setColorPalette }>

			{ Object.entries( palette ).reverse().map(
				( [ name, colorValue ] ) => {
					if ( name !== 'background' ) {
						return <ColorIndicator colorValue={ colorValue } key={ `color-preview-${ name }` } />;
					}

					return null;
				}
			) }
		</Button>
	);
}

export function ColorPalettePreviewCustom( { previousPalette, onUpdateColors, onDismissCustom } ) {
	const currentColors = useSelect( ( select ) => select( STORE_KEY ).getCurrentColors(), [] );
	const colorPalette = useSelect( ( select ) => select( STORE_KEY ).getColorPalette(), [] );

	if ( ! currentColors || colorPalette !== 'custom' ) {
		return null;
	}

	return (
		<div className="color-palette-custom components-site-design__custom">
			<div className="color-palette-custom__title">{ __( 'Custom Colors', 'coblocks' ) }</div>

			{ previousPalette && (
				<button
					className="components-site-design__custom__dismiss"
					onClick={ onDismissCustom }>
					<span>{ __( 'Dismiss custom color', 'coblocks' ) }</span>
				</button>
			) }

			{ Object.entries( currentColors ).map( ( [ name, color ] ) =>
				<Dropdown
					key={ `color-picker-${ name }` }
					position="bottom center"
					renderContent={ () =>
						<ColorPicker
							color={ getColorValue( currentColors, name, color ) }
							disableAlpha
							onChangeComplete={ ( newColor ) => {
								const backgroundElements = document.getElementsByClassName( `has-${ name }-background-color` );
								if ( backgroundElements.length ) {
									for ( let i = 0; i < backgroundElements.length; i++ ) {
										backgroundElements[ i ].style.backgroundColor = newColor.hex;
									}
								}
								const colorElements = document.getElementsByClassName( `has-${ name }-color` );
								if ( colorElements.length ) {
									for ( let i = 0; i < colorElements.length; i++ ) {
										colorElements[ i ].style.color = newColor.hex;
									}
								}
								onUpdateColors( { [ name ]: newColor.hex } );
							} }
						/>
					}
					renderToggle={ ( { isOpen, onToggle } ) =>
						<Button aria-expanded={ isOpen } className="color-palette-custom__color" isLink onClick={ onToggle }>
							<ColorIndicator colorValue={ getColorValue( currentColors, name, color ) } key={ `color-${ name }` } />
							{ titleCase( name ) }
						</Button>
					}
				/>
			) }
		</div>
	);
}

export const getColorValue = ( currentColors, name, defaultColor ) => {
	const activePalette = Object.keys( currentColors ).shift();

	if ( typeof activePalette !== 'undefined' && currentColors[ name ] ) {
		return currentColors[ name ].includes( '#' ) ? currentColors[ name ] : `#${ currentColors[ name ] }`;
	}

	return defaultColor;
};

const titleCase = ( str ) => {
	const splitStr = str.toLowerCase().split( ' ' );
	for ( let i = 0; i < splitStr.length; i++ ) {
		splitStr[ i ] = splitStr[ i ].charAt( 0 ).toUpperCase() + splitStr[ i ].substring( 1 );
	}
	return splitStr.join( ' ' );
};

export default ColorPalettePreviews;
