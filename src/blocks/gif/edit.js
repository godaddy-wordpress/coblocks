/**
 * External dependencies
 */
import classnames from 'classnames';
import { debounce, map } from 'lodash';
import { GifIcon } from '@godaddy-wordpress/coblocks-icons';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';
import { compose, usePrevious } from '@wordpress/compose';
import { Placeholder, Spinner, ResizableBox, Icon } from '@wordpress/components';
import { withSelect } from '@wordpress/data';
import { RichText } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import Controls from './controls';
import icons from './icons.js';
import Inspector from './inspector';
import Size from './size';

/**
 * Block constants
 */
const GIPHY_URL = 'https://api.giphy.com/v1/gifs/search?api_key=w0o6fO8pv5gSM334gfqUlcdrVaaoiA81&limit=10&offset=0&rating=G&lang=en&q=';
const MIN_SIZE = 20;

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
	const {
		attributes,
		className,
		isSelected,
		setAttributes,
		isLargeViewport,
		isRTL,
		maxWidth,
	} = props;

	const {
		align,
		alt,
		height,
		url,
		width,
		caption,
	} = attributes;

	const [ captionFocused, setCaptionFocused ] = useState( false );

	const prevIsSelected = usePrevious( isSelected );

	useEffect( () => {
		if ( ! isSelected && prevIsSelected && captionFocused ) {
			setCaptionFocused( false );
		}
	}, [ prevIsSelected, captionFocused, isSelected ] );

	const onFocusCaption = () => {
		if ( ! captionFocused ) {
			setCaptionFocused( true );
		}
	};

	const onImageClick = () => {
		if ( captionFocused ) {
			setCaptionFocused( false );
		}
	};

	const isResizable = [ 'wide', 'full' ].indexOf( align ) === -1 && isLargeViewport;
	const classes = classnames( className, 'wp-block-image', {
		'is-resized': !! width,
		'is-focused': isSelected,
	} );

	let results = [];

	if ( url ) {
		return (
			<>
				{ isSelected && (
					<Controls
						{ ...props }
					/>
				) }
				{ isSelected && (
					<Inspector
						{ ...props }
					/>
				) }
				<figure key="image" className={ classes }>
					<Size src={ url } dirtynessTrigger={ align }>
						{ ( sizes ) => {
							const {
								imageWidthWithinContainer,
								imageHeightWithinContainer,
								imageWidth,
								imageHeight,
							} = sizes;

							let defaultedAlt;
							if ( alt ) {
								defaultedAlt = alt;
							} else {
								defaultedAlt = __( 'This gif has an empty alt attribute', 'coblocks' );
							}

							const img = (
								<button onClick={ onImageClick }>
									<img src={ url } alt={ defaultedAlt } />
								</button> );

							if ( ! isResizable || ! imageWidthWithinContainer ) {
								return img;
							}

							const currentWidth = width || imageWidthWithinContainer;
							const currentHeight = height || imageHeightWithinContainer;

							const ratio = imageWidth / imageHeight;
							const minWidth = imageWidth < imageHeight ? MIN_SIZE : MIN_SIZE * ratio;
							const minHeight = imageHeight < imageWidth ? MIN_SIZE : MIN_SIZE / ratio;

							// With the current implementation of ResizableBox, an image needs an explicit pixel value for the max-width.
							// In absence of being able to set the content-width, this max-width is currently dictated by the vanilla editor style.
							// The following variable adds a buffer to this vanilla style, so 3rd party themes have some wiggleroom.
							// This does, in most cases, allow you to scale the image beyond the width of the main column, though not infinitely.
							// @todo It would be good to revisit this once a content-width variable becomes available.
							const maxWidthBuffer = maxWidth * 2.5;

							let showRightHandle = false;
							let showLeftHandle = false;

							/* eslint-disable no-lonely-if */
							// See https://github.com/WordPress/gutenberg/issues/7584.
							if ( align === 'center' ) {
								// When the image is centered, show both handles.
								showRightHandle = true;
								showLeftHandle = true;
							} else if ( isRTL ) {
								// In RTL mode the image is on the right by default.
								// Show the right handle and hide the left handle only when it is aligned left.
								// Otherwise always show the left handle.
								if ( align === 'left' ) {
									showRightHandle = true;
								} else {
									showLeftHandle = true;
								}
							} else {
								// Show the left handle and hide the right handle only when the image is aligned right.
								// Otherwise always show the right handle.
								if ( align === 'right' ) {
									showLeftHandle = true;
								} else {
									showRightHandle = true;
								}
							}
							/* eslint-enable no-lonely-if */

							return (
								<>
									<ResizableBox
										size={
											width && height ? {
												width,
												height,
											} : undefined
										}
										minWidth={ minWidth }
										maxWidth={ maxWidthBuffer }
										minHeight={ minHeight }
										maxHeight={ maxWidthBuffer / ratio }
										lockAspectRatio
										enable={ {
											top: false,
											right: showRightHandle,
											bottom: true,
											left: showLeftHandle,
										} }
										onResizeStop={ ( _event, _direction, _elt, delta ) => {
											setAttributes( {
												width: parseInt( currentWidth + delta.width, 10 ),
												height: parseInt( currentHeight + delta.height, 10 ),
											} );
										} }
										showHandle={ isSelected }
									>
										{ img }
									</ResizableBox>
								</>
							);
						} }
					</Size>
					{ ( ! RichText.isEmpty( caption ) || isSelected ) && (
						<RichText
							tagName="figcaption"
							placeholder={ __( 'Write caption…', 'coblocks' ) }
							value={ caption }
							unstableOnFocus={ onFocusCaption }
							onChange={ ( value ) => setAttributes( { caption: value } ) }
							isSelected={ captionFocused }
							inlineToolbar
						/>
					) }
				</figure>
			</>
		);
	}
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
				key="placeholder"
				label="Gif"
				icon={ <Icon icon={ GifIcon } /> }
				instructions={ __( 'Search for that perfect gif on Giphy', 'coblocks' ) }
				className={ className }>
				{ icons.giphy }
				<input
					key="search-field"
					type="text"
					placeholder={ __( 'Search for gifs', 'coblocks' ) }
					onChange={ ( event ) => fetchGifs( event.target.value ) }
				/>
				<ul
					key="results"
					className="wp-block-coblocks-gif__results"
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
