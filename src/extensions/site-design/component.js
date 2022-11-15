/* global siteDesign */
/**
 * External dependencies
 */
import { ColorPaletteStyles } from '@godaddy-wordpress/coblocks-icons';
const icon = ColorPaletteStyles?.outlined;
import { PluginSidebar } from '@wordpress/edit-post';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element';
import { useEntityProp } from '@wordpress/core-data';
import { useDispatch, useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { CoBlocksMenuIcon } from '../../components/common';
import ColorPalettePreviews from './color-palette-preview';
import DesignPreviews from './design-preview';
import FontPreviews from './font-preview';
import STORE_KEY from './data/constants';
import useFonts from './hooks/useFonts';
import useFontSize from './hooks/useFontSize';
import useTypeRatio from './hooks/useTypeRatio';
import './data/store';
import './site-design-control';

let fontStylesCache = false;
let saveBtn = false;
const META_KEY = '_coblocks_non_existing_meta';

const componentTitle = __( 'Site design', 'coblocks' );

const SiteDesignComponent = () => (
	<>
		<PluginSidebar
			icon={
				<CoBlocksMenuIcon
					icon={ icon }
					label={ __( 'Site design', 'coblocks' ) }
					slug="site-design" />
			}
			title={ componentTitle }>
			<SiteDesignControls />
		</PluginSidebar>
		<SiteDesignStyles />
	</>
);

export function SiteDesignStyles() {
	const isUpdating = useSelect( ( select ) => select( STORE_KEY ).isUpdating(), [] );
	const designResp = useSelect( ( select ) => select( STORE_KEY ).getDesignResp(), [] );
	useFonts();
	useFontSize();
	useTypeRatio();

	useEffect( () => {
		if ( ! designResp || isUpdating ) {
			return;
		}

		// The style elements living in the body are those initialized by `add_editor_style` call.
		// These style elements are non-mutable and need to be manipulated on the fly for the purpose of this component.
		const taggedStyle = Array.from( document.querySelectorAll( 'style.is-design-style' ) );
		const originalStyle = () => Array.from( document.querySelectorAll( '.is-desktop-preview style' ) )
			.filter( ( elem ) => elem?.innerHTML?.includes( `style-${ siteDesign.currentDesignStyle }` ) );

		// Reference to the present style tag if class is defined or by original query if not yet modified.
		const currentDesignStyleTag = ( taggedStyle.length ? taggedStyle : originalStyle() )[ 0 ];

		fontStylesCache = !! fontStylesCache ? fontStylesCache : designResp.fontStyles;

		// Set the style element innerHTML to remove the old design style.
		currentDesignStyleTag.innerHTML = [
			designResp.stylesheet,
			fontStylesCache,
		].join( ' ' );

		// Here we tag the style element so that we can continue to target and change on user action.
		if ( currentDesignStyleTag.className !== 'is-design-style' ) {
			currentDesignStyleTag.className = 'is-design-style';
		}
	}, [ isUpdating, designResp ] );

	useEffect( () => {
		const elems = document.getElementsByClassName( 'interface-interface-skeleton__content' );

		if ( elems.length > 0 ) {
			elems[ 0 ].classList.toggle( 'site-design-updating', isUpdating );
		}
	}, [ isUpdating ] );

	return null;
}

export function SiteDesignControls() {
	const showSaveBtn = useSelect( ( select ) => select( STORE_KEY ).showSaveBtn(), [] );
	const designStyle = useSelect( ( select ) => select( STORE_KEY ).getDesignStyle(), [] );

	const { updateDesign } = useDispatch( STORE_KEY );
	const updateDesignCallback = () => updateDesign( { saveChanges: true } );

	const postType = useSelect( ( select ) => select( 'core/editor' ).getCurrentPostType(), [] );
	const postId = useSelect( ( select ) => select( 'core/editor' ).getCurrentPostId(), [] );
	const { editEntityRecord } = useDispatch( 'core' );

	const [ meta ] = useEntityProp( 'postType', postType, 'meta' );

	// This is a workaround until we have a core preferred way of playing with the save btn state.
	useEffect( () => {
		if ( ! showSaveBtn ) {
			if ( saveBtn ) {
				// By setting a non-existant meta we can enable the publish/save button for click event.
				// https://github.com/WordPress/gutenberg/issues/13774
				delete meta[ META_KEY ];

				editEntityRecord(
					'postType',
					postType,
					postId,
					{
						meta: {
							...meta,
						},
					},
					{ undoIgnore: true }
				);

				saveBtn.removeEventListener( 'click', updateDesignCallback );
				saveBtn = false;
			}
			return;
		}

		saveBtn = document.getElementsByClassName( 'editor-post-publish-button' )[ 0 ] || false;

		if ( ! saveBtn ) {
			return;
		}

		// We can't use useEntityProp here because it won't allow undoIgnore
		// Because we don't have an handler for undoing change currently.
		editEntityRecord(
			'postType',
			postType,
			postId,
			{
				meta: {
					...meta,
					[ META_KEY ]: true,
				},
			},
			{ undoIgnore: true }
		);
		saveBtn.addEventListener( 'click', updateDesignCallback );

		return function cleanup() {
			if ( saveBtn ) {
				saveBtn.removeEventListener( 'click', updateDesignCallback );
			}
		};
	}, [ showSaveBtn ] );

	// The store might not be loaded yet.
	if ( ! designStyle ) {
		return null;
	}

	return (
		<>
			<DesignPreviews />
			<ColorPalettePreviews />
			<FontPreviews />
		</>
	);
}
export default SiteDesignComponent;
