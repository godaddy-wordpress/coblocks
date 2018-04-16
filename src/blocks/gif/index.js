import Inspector from './components/inspector';
import Controls from './components/controls';
import GifSize from './components/gif-size';

import classnames from 'classnames';
import ResizableBox from 're-resizable';
import { noop } from 'lodash';

import './styles/editor.scss';
import './styles/style.scss';

const { __ } = wp.i18n;

const { Component } = wp.element;

const { registerBlockType } = wp.blocks;

const { Placeholder, Spinner } = wp.components;

const { keycodes, viewPort } = wp.utils;

const { ESCAPE } = keycodes;

const GIPHY_URL = 'https://api.giphy.com/v1/gifs/search?api_key=w0o6fO8pv5gSM334gfqUlcdrVaaoiA81&limit=10&offset=0&rating=G&lang=en&q=';

const MIN_SIZE = 20;

class GifBlock extends Component {

	render() {

		const {
			attributes,
			className,
			isSelected,
			setAttributes,
			toggleSelection,
		} = this.props;

		const {
			align,
			alt,
			caption,
			height,
			href,
			id,
			url,
			width,
		} = attributes;

		const isResizable = [ 'wide', 'full' ].indexOf( align ) === -1 && ( ! viewPort.isExtraSmall() );

		const figureStyle = width ? { width } : {};

		const classes = classnames( className, {
			'is-resized': !! width,
			'is-focused': !! focus,
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

				<figure key="image" className={ classes } style={ figureStyle }>
					<GifSize src={ url } dirtynessTrigger={ align }>
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
							const img = <img src={ url }/>;

							// if ( ! isResizable || ! imageWidthWithinContainer ) {
							// 	return img;
							// }

							const currentWidth = width || imageWidthWithinContainer;
							const currentHeight = height || imageHeightWithinContainer;

							const ratio = imageWidth / imageHeight;
							const minWidth = imageWidth < imageHeight ? MIN_SIZE : MIN_SIZE * ratio;
							const minHeight = imageHeight < imageWidth ? MIN_SIZE : MIN_SIZE / ratio;

							return (
								<ResizableBox
									size={ {
										width: currentWidth,
										height: currentHeight,
									} }
									minWidth={ minWidth }
									minHeight={ minHeight }
									lockAspectRatio
									handleClasses={ {
										topRight: 'gutenkit-gif__resize-handler-top-right',
										bottomRight: 'gutenkit-gif__resize-handler-bottom-right',
										topLeft: 'gutenkit-gif__resize-handler-top-left',
										bottomLeft: 'gutenkit-gif__resize-handler-bottom-left',
									} }
									enable={ { top: false, right: true, bottom: false, left: false, topRight: true, bottomRight: true, bottomLeft: true, topLeft: true } }
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
					</GifSize>
				</figure>,
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
				results = <Spinner />;
			}

			return [
				<Placeholder
					key="placeholder"
					icon="format-image"
					label={ __( 'Gif' ) }
					instructions={ __( 'Search for that perfect gif' ) }
					className="giphy__placeholder">

						<input
							type="search"
							key="search-field"
							placeholder={ __( 'Search for gifs here…' ) }
							onChange={ ( event ) => fetchGifs(  event.target.value ) }
							onKeyDown={ ( event ) => {
								if ( event.keyCode === ESCAPE ) {
									event.target.value = '';
									setAttributes( { matches: [] } );
								}
							} } />

						<div key="results-wrapper" className="giphy__results"> </div>

						<ul key="results" className="" > { results }</ul>
				</Placeholder>
			]
		}
	}
}

registerBlockType( 'coblocks/gif', {

	title: __( 'Gif ' ),

	description: __( 'Pick a gif, any gif.' ),

	icon: 'format-image',

	category: 'formatting',

	keywords: [
		__( 'gif' ),
		__( 'giphy' ),
		__( 'coblocks' ),
	],

	attributes: {
		url: {
			attribute: 'src',
			selector: 'img',
			source: 'attribute',
			type: 'string',
		},
		alt: {
			attribute: 'alt',
			selector: 'img',
			source: 'attribute',
			type: 'string',
		},
		caption: {
			selector: 'figcaption',
			source: 'children',
			type: 'array',
		},
		href: {
			attribute: 'href',
			selector: 'a',
			source: 'attribute',
			type: 'string',
		},
		id: {
			type: 'number',
		},
		align: {
			type: 'string',
		},
		width: {
			type: 'number',
		},
		height: {
			type: 'number',
		},
	},

	supports: {
		customClassName: false,
		html: false,
	},

	edit: GifBlock,

	save( { attributes } ) {

		const {
			url,
			alt,
			caption,
			align,
			href,
			width,
			height,
		} = attributes;

		const image  = <img src={ url } />;

		if ( url ) {
			return ( image );
		}

		return null;
	},
} );
