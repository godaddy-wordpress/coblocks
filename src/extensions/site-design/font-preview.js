/* global siteDesign */

/**
 * External dependencies
 */
import classnames from 'classnames';
import { CustomTypographyIcon } from '@godaddy-wordpress/coblocks-icons';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import FontSizePicker from './font-size-picker';
import { useInstanceId } from '@wordpress/compose';
import { Icon, PanelBody } from '@wordpress/components';
import { useCallback, useEffect, useState } from '@wordpress/element';
import { useDispatch, useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import FontAdvanced from './font-advanced';
import { getIndexFromFontPair } from './data/resolvers';
import STORE_KEY from './data/constants';
import useFonts from './hooks/useFonts';

export function FontPreviews() {
	const instanceId = useInstanceId( FontPreviews );
	const id = `font-preview-${ instanceId }`;

	const [ fonts, currentFonts ] = useFonts();
	const fontsPanelOpen = useSelect( ( select ) => select( STORE_KEY ).isFontsPanelOpen(), [] );
	const { toggleFontsPanel } = useDispatch( STORE_KEY );

	if ( ! fonts ) {
		return null;
	}

	const selected = getIndexFromFontPair( currentFonts, fonts );

	return (
		<PanelBody
			className="components-site-design components-site-design-fonts site-design--fonts__panel"
			onToggle={ toggleFontsPanel }
			opened={ fontsPanelOpen }
			title={ __( 'Fonts', 'coblocks' ) }>
			<div className="components-site-design-fonts__heading">
				<FontAdvancedWrapper selected={ selected } />
				<p>{ __( 'Font Pairings', 'coblocks' ) }</p>
			</div>
			<ul className="components-site-design-fonts__options">
				{ fonts.map( ( font, index ) => (
					<FontPreview font={ font } isSelected={ index === selected } key={ `${ id }-${ index }` } />
				) ) }
			</ul>
		</PanelBody>
	);
}

export function FontAdvancedWrapper( { selected } ) {
	const [ isCustomOpen, setIsCustomOpen ] = useState( false );

	useEffect( () => {
		if ( selected === -1 ) {
			setIsCustomOpen( true );
		}
	}, [ selected ] );

	if ( ! siteDesign.isAdvancedFontsEnabled ) {
		return null;
	}

	return (
		<>
			{ isCustomOpen && <FontAdvanced onClose={ () => setIsCustomOpen( false ) } /> }
			{
				! isCustomOpen &&
				<button
					className={ classnames(
						'components-site-design-fonts__heading__custom', {
							'components-site-design-fonts__heading__custom--open': isCustomOpen,
						}
					) }
					onClick={ () => setIsCustomOpen( ( isOpen ) => ! isOpen ) }>
					{ __( 'Custom', 'coblocks' ) }
				</button>
			}
		</>
	);
}

export function FontPreview( { font, isSelected } ) {
	const { updateSelectedFonts } = useDispatch( STORE_KEY );
	const [ isFontSizeOpen, setIsFontSizeOpen ] = useState( false );

	const selectedFontCb = useCallback( () => {
		updateSelectedFonts( font );
		setIsFontSizeOpen( false );
	}, [ font, setIsFontSizeOpen ] );

	const Wrapper = isSelected ? 'div' : 'button';
	const wrapperProps = {};

	if ( Wrapper === 'button' ) {
		wrapperProps.onClick = selectedFontCb;
	}

	return (
		<li
			className={ classnames(
				'components-site-design-fonts__option',
				{ 'is-selected': isSelected }
			) } >
			<Wrapper { ...wrapperProps } className="components-site-design-fonts__option__section">
				<p
					className="components-site-design-fonts__option__primary"
					style={ { fontFamily: font[ 0 ][ 0 ] } }>
					{ font[ 0 ][ 0 ] }
				</p>
				<p
					className="components-site-design-fonts__option__secondary"
					style={ { fontFamily: font[ 1 ][ 0 ] } }>
					{ __( 'The quick brown fox jumped over the lazy dog.', 'coblocks' ) }
				</p>
				{
					isSelected &&
					<button
						className="components-site-design-fonts__option__edit"
						onClick={ () => setIsFontSizeOpen( ( isOpen ) => ! isOpen ) } >
						<span className="icon"><Icon icon={ CustomTypographyIcon } /></span>
						{ isFontSizeOpen ? __( 'Hide font sizes', 'coblocks' ) : __( 'Edit font sizes', 'coblocks' ) }
					</button>
				}
			</Wrapper>
			{
				( isSelected && isFontSizeOpen ) &&
				<div className="components-site-design-fonts__option__settings components-site-design-fonts__option__section">
					<FontSizePicker />
				</div>
			}
		</li>
	);
}

export default FontPreviews;

