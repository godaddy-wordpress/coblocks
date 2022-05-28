/**
 * External dependencies
 */
import { debounce, map } from 'lodash';
import { GifIcon } from '@godaddy-wordpress/coblocks-icons';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element';
import { compose, usePrevious } from '@wordpress/compose';
import { Icon, Placeholder, Spinner } from '@wordpress/components';
import { useDispatch, useSelect, withSelect } from '@wordpress/data';
import { switchToBlockType } from '@wordpress/blocks';
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import icons from './icons.js';

/**
 * Block constants
 */
const GIPHY_URL = 'https://api.giphy.com/v1/gifs/search?api_key=w0o6fO8pv5gSM334gfqUlcdrVaaoiA81&limit=10&offset=0&rating=G&lang=en&q=';

const applyWithSelect = withSelect( ( select ) => {
	const { getEditorSettings } = select( 'core/editor' );
	const { isViewportMatch } = select( 'core/viewport' );
	const { maxWidth, isRTL } = getEditorSettings();

	return {
		maxWidth,
		isRTL,
		isLargeViewport: isViewportMatch( 'medium' ),
	};
} );

/**
 * Block edit function
 *
 * @param {Object} props
 */
const Edit = ( props ) => {
	const blockProps = useBlockProps();

	const {
		attributes,
		setAttributes,
		clientId,
	} = props;

	const {
		url,
	} = attributes;

	const prevUrl = usePrevious( url );

	const { replaceBlocks } = useDispatch( 'core/block-editor' );
	const { getBlock } = useSelect( ( select ) => select( 'core/block-editor' ) );

	useEffect( () => {
		if ( url && ! prevUrl ) {
			replaceBlocks(
				[ clientId ],
				switchToBlockType( getBlock( clientId ), 'core/image' )
			);
		}
	}, [ url ] );

	let results = [];

	// If there are results, create thumbnails to select from.
	if ( attributes.matches && attributes.matches.length ) {
		results = map( attributes.matches, function mapSearchResults( gif ) {
			const gifImage = wp.element.createElement( 'img', {
				key: gif.id + '-img',
				src: gif.images.fixed_height_small.url,
			} );

			return wp.element.createElement( 'li', {
				key: gif.id,
				onClick: function onClickFetchedGif() {
					setAttributes( { url: gif.images.original.url } );
				},
			}, gifImage );
		} );
	}

	// If there is a giphy request happening, lets show a spinner.
	if ( ! results.length && attributes.fetching ) {
		results = <Spinner />;
	}

	const fetchGifs = debounce( function fetchGifs( search ) {
		if ( attributes.fetching ) {
			return;
		}

		setAttributes( { fetching: true } );

		fetch( GIPHY_URL + encodeURI( search ),
			{ method: 'GET' }
		)
			.then( ( response ) => {
				return response.json();
			} )
			.then( ( data ) => {
				setAttributes( { fetching: false, matches: data.data } );
			} ).catch( ( ) => {
				setAttributes( { fetching: false } );
			} );
	}, 1000 );

	return (
		<>
			<Placeholder
				icon={ <Icon icon={ GifIcon } /> }
				instructions={ __( 'Search for that perfect gif on Giphy', 'coblocks' ) }
				key="placeholder"
				label="Gif"
				{ ...blockProps }
			>
				{ icons.giphy }
				<input
					key="search-field"
					onChange={ ( event ) => fetchGifs( event.target.value ) }
					placeholder={ __( 'Search for gifs', 'coblocks' ) }
					type="text"
				/>
				<ul
					className="wp-block-coblocks-gif__results"
					key="results"
				>
					{ results }
				</ul>
			</Placeholder>
		</>
	);
};

export default compose( [
	applyWithSelect,
] )( Edit );
