/**
 * External dependencies
 */
import classnames from 'classnames';
import ResizableBox from 're-resizable';

/**
 * Internal dependencies
 */
import './styles/editor.scss';
import './styles/style.scss';
import GifBlock from './components/edit';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const { registerBlockType } = wp.blocks;

/**
 * Block registration
 */
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

	getEditWrapperProps( attributes ) {
		const { align, width } = attributes;
		if ( 'left' === align || 'center' === align || 'right' === align || 'wide' === align || 'full' === align ) {
			return { 'data-align': align, 'data-resized': !! width };
		}
	},

	edit: GifBlock,

	save( { attributes } ) {

		const {
			url,
			alt,
			align,
			width,
			height,
		} = attributes;

		const image = (
			<img
				src={ url }
				alt={ alt }
				width={ width }
				height={ height }
			/>
		);

		if ( url ) {
			return (
				<figure className={ align ? `align${ align }` : null }>
					{ image }
				</figure>
			);
		}

		return null;
	},
} );
