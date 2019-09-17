/*global $*/

/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { compose } = wp.compose;
const { Placeholder, Spinner, ResizableBox } = wp.components;
const { withViewportMatch } = wp.viewport;
const { withSelect } = wp.data;
const { RichText } = wp.blockEditor;

/**
 * Internal dependencies
 */
import Controls from './controls';
import icons from './../../utils/icons';
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
class Edit extends Component {
	constructor() {
		super( ...arguments );
		this.onFocusCaption = this.onFocusCaption.bind( this );
		this.onImageClick = this.onImageClick.bind( this );

		this.state = {
			captionFocused: false,
		};
	}

	componentDidUpdate( prevProps ) {
		if ( ! this.props.isSelected && prevProps.isSelected && this.state.captionFocused ) {
			this.setState( {
				captionFocused: false,
			} );
		}
	}

	onFocusCaption() {
		if ( ! this.state.captionFocused ) {
			this.setState( {
				captionFocused: true,
			} );
		}
	}

	onImageClick() {
		if ( this.state.captionFocused ) {
			this.setState( {
				captionFocused: false,
			} );
		}
	}

	render() {
		const {
			attributes,
			className,
			isSelected,
			setAttributes,
			isLargeViewport,
			isRTL,
			maxWidth,
		} = this.props;

		const {
			align,
			alt,
			height,
			url,
			width,
			caption,
		} = attributes;

		const isResizable = [ 'wide', 'full' ].indexOf( align ) === -1 && isLargeViewport;
		const classes = classnames( className, 'wp-block-image', {
			'is-resized': !! width,
			'is-focused': isSelected,
		} );

		let results = [];

		const fetchGifs = _.debounce( function fetchGifs( search ) {
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
			return (
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
									defaultedAlt = __( 'This gif has an empty alt attribute' );
								}

								// Disable reason: Image itself is not meant to be
								// interactive, but should direct focus to block
								// eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
								const img = <img src={ url } alt={ defaultedAlt } onClick={ this.onImageClick } />;

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
									<Fragment>
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
										>
											{ img }
										</ResizableBox>
									</Fragment>
								);
							} }
						</Size>
						{ ( ! RichText.isEmpty( caption ) || isSelected ) && (
							<RichText
								tagName="figcaption"
								placeholder={ __( 'Write caption…' ) }
								value={ caption }
								unstableOnFocus={ this.onFocusCaption }
								onChange={ ( value ) => setAttributes( { caption: value } ) }
								isSelected={ this.state.captionFocused }
								inlineToolbar
							/>
						) }
					</figure>
				</Fragment>
			);
		}
		// If there are results, create thumbnails to select from.
		if ( attributes.matches && attributes.matches.length ) {
			results = _.map( attributes.matches, function mapSearchResults( gif ) {
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

		return (
			<Fragment>
				<Placeholder
					key="placeholder"
					icon={ icons.gif }
					label="Gif"
					instructions={ __( 'Search for that perfect gif on Giphy' ) }
					className={ className }>
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
				</Placeholder>
			</Fragment>
		);
	}
}

export default compose( [
	applyWithSelect,
	withViewportMatch( { isLargeViewport: 'medium' } ),
] )( Edit );
