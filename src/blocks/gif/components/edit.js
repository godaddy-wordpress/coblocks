/**
 * External dependencies
 */
import classnames from 'classnames';
import ResizableBox from 're-resizable';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { compose } = wp.compose;
const { Placeholder, Spinner, Button } = wp.components;
const { registerBlockType } = wp.blocks;
const { withViewportMatch } = wp.viewport;
const { withSelect } = wp.data;

/**
 * Internal dependencies
 */
import Controls from './controls';
import icons from './../../../utils/icons';
import Inspector from './inspector';
import Size from './size';

/**
 * Block constants
 */
const GIPHY_URL = 'https://api.giphy.com/v1/gifs/search?api_key=w0o6fO8pv5gSM334gfqUlcdrVaaoiA81&limit=10&offset=0&rating=G&lang=en&q=';
const MIN_SIZE = 20;

const applyWithSelect = withSelect( ( select ) => {
	const { getEditorSettings } = select( 'core/editor' );
	const { maxWidth, isRTL } = getEditorSettings();

	return {
		maxWidth,
		isRTL,
	};
} );

/**
 * Block edit function
 */
export default compose( applyWithSelect, withViewportMatch( { isLargeViewport: 'medium' } ) ) ( class Edit extends Component {

	constructor() {
		super( ...arguments );
	}

	render() {

		const {
			attributes,
			className,
			isSelected,
			setAttributes,
			settings,
			isLargeViewport,
			isRTL,
			toggleSelection,
			maxWidth,
		} = this.props;

		const {
			align,
			alt,
			height,
			id,
			url,
			width,
		} = attributes;

		const figureStyle = width ? { width } : {};
		const isResizable = [ 'wide', 'full' ].indexOf( align ) === -1 && isLargeViewport;
		const classes = classnames( className, {
			'is-resized': !! width,
			'is-focused': isSelected,
		} );

		var results = [];

		var fetchGifs = _.debounce( function fetchGifs( search ) {

			if ( attributes.fetching ) {
				return;
			}

			setAttributes( { fetching: true } );

			$.getJSON( GIPHY_URL + encodeURI( search ) )
				.success( function fetchSuccess( data ) {
					setAttributes( { fetching: false, matches: data.data } );
				} )
				.fail( function fetchFail() {
					setAttributes( { fetching: false } );
				} );
		}, 1000 );

		if ( url ) {
			return [
				<Fragment>
					{ isSelected && (
						<Controls
							{ ...this.props }
						/>
					) }
					{ isSelected && (
						<Inspector
							{ ...this.props }
						/>
					) }
					<figure key="image" className={ classes } style={ figureStyle }>
						<Size src={ url } dirtynessTrigger={ align }>
							{ ( sizes ) => {
								const {
									imageWidthWithinContainer,
									imageHeightWithinContainer,
									imageWidth,
									imageHeight,
								} = sizes;

								// Disable reason: Image itself is not meant to be
								// interactive, but should direct focus to block
								// eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
								const img = <img src={ url } alt={ alt }/>;

								if ( ! isResizable || ! imageWidthWithinContainer ) {
									return img;
								}

								const currentWidth = width || imageWidthWithinContainer;
								const currentHeight = height || imageHeightWithinContainer;

								const ratio = imageWidth / imageHeight;
								const minWidth = imageWidth < imageHeight ? MIN_SIZE : MIN_SIZE * ratio;
								const minHeight = imageHeight < imageWidth ? MIN_SIZE : MIN_SIZE / ratio;

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
									<ResizableBox
										size={ {
											width: currentWidth,
											height: currentHeight,
										} }
										minWidth={ minWidth }
										maxWidth={ maxWidth }
										minHeight={ minHeight }
										maxHeight={ maxWidth / ratio }
										lockAspectRatio
										handleClasses={ {
											right: 'block-library-image__resize-handler-right',
											bottom: 'block-library-image__resize-handler-bottom',
											left: 'block-library-image__resize-handler-left',
										} }
										enable={ {
											top: false,
											right: showRightHandle,
											bottom: true,
											left: showLeftHandle,
										} }
										onResizeStart={ () => {
											toggleSelection( false );
										} }
										onResizeStop={ ( event, direction, elt, delta ) => {
											setAttributes( {
												width: parseInt( currentWidth + delta.width, 10 ),
												height: parseInt( currentHeight + delta.height, 10 ),
											} );
											toggleSelection( true );
										} }
									>
										{ img }
									</ResizableBox>
								);
							} }
						</Size>
					</figure>
				</Fragment>
			];

		} else {
			// If there are results, create thumbnails to select from.
			if ( attributes.matches && attributes.matches.length ) {

				results = _.map( attributes.matches, function mapSearchResults( gif ) {

					var gifImage = wp.element.createElement( 'img', {
						key: gif.id + '-img',
						src: gif.images.fixed_height_small.url,
					} );

					return wp.element.createElement( 'li', {
						key: gif.id,
						onClick: function onClickFetchedGif() {
							setAttributes( { url: gif.images.original.url } );
						}
					}, gifImage );

				} );
			}

			// If there is a giphy request happening, lets show a spinner.
			if ( ! results.length && attributes.fetching ) {
				results = <Spinner/>;
			}

			return [
				<Fragment>
					<Placeholder
						key="placeholder"
						icon={ icons.gif }
						label={ __( 'Gif' ) }
						instructions={ __( 'Search for that perfect gif on Giphy' ) }
						className={ className }>
						<form>
							{ icons.giphy }
							<input
								key="search-field"
								type="text"
								placeholder={ __( 'Search for gifs' ) }
								onChange={ ( event ) => fetchGifs( event.target.value ) }
							/>
							<ul
								key="results"
								className={ `${ className }__results` }
							>
								{ results }
							</ul>
						</form>
					</Placeholder>
				</Fragment>
			]
		}
	}
} );