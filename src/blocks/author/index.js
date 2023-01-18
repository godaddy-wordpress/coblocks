/**
 * Internal dependencies
 */
import metadata from './block.json';

/**
 * WordPress dependencies
 */
import { createBlock } from '@wordpress/blocks';
import { dispatch, select } from '@wordpress/data';

/**
 * Block constants
 */
const { name } = metadata;

const settings = {
	edit: ( props ) => {
		const parentBlock = select( 'core/editor' ).getBlocksByClientId( props.clientId )[ 0 ];
		if ( ! parentBlock ) {
			return null;
		}

		const { replaceBlocks } = dispatch( 'core/block-editor' );
		const isRTL = select( 'core/editor' ).getEditorSettings().isRTL;

		const authorNameBlock = createBlock( 'core/heading', {
			content: props.attributes.name,
			level: 4,
			// Font controls - default is fontSize and style is used for custom setting.
			...( props.attributes.hasOwnProperty( 'fontSize' ) && { fontSize: props.attributes.fontSize } ),
			...( props.attributes.hasOwnProperty( 'style' ) && { style: props.attributes.style } ),

			// Headings do not inherit color from parent - we descend the style here for initial match.
			...( props.attributes.hasOwnProperty( 'textColor' ) && { textColor: props.attributes.textColor } ),
		} );

		const authorBioBlock = createBlock( 'core/paragraph', {
			content: props.attributes.biography,
			// Font controls - default is fontSize and style is used for custom setting.
			...( props.attributes.hasOwnProperty( 'fontSize' ) && { fontSize: props.attributes.fontSize } ),
			...( props.attributes.hasOwnProperty( 'style' ) && { style: props.attributes.style } ),
		} );

		const buttonBlock = parentBlock.innerBlocks;
		const imageBlock = createBlock( 'core/image', { className: 'is-style-rounded', id: props.attributes.imgId, url: props.attributes.imgUrl } );

		// Set buttons to align.
		buttonBlock.forEach( function( button, index ) {
			buttonBlock[ index ].attributes.align = isRTL ? 'right' : 'left';
		} );

		const leftColumn = createBlock( 'core/column', { width: '25%' }, [ imageBlock ] );
		const rightColumn = createBlock( 'core/column', { width: '75%' }, [ authorNameBlock, authorBioBlock, ...buttonBlock ] );
		const columnsStyleProps = {
			style: {
				spacing: {
					padding: {
						bottom: '2.5rem',
						left: '2.5rem',
						right: '2.5rem',
						top: '2.5rem',
					},
				},
			},
		};

		let animationProps = {};
		if ( typeof props.attributes.animation !== 'undefined' ) {
			animationProps = {
				animation: props.attributes.animation,
			};
		}

		let fontSizeProps = {};
		if ( typeof props.attributes.fontSize !== 'undefined' ) {
			fontSizeProps = {
				fontSize: props.attributes.fontSize,
			};
		}

		let columnsBlockProps = {
			className: props.attributes?.className ?? '',
			content: props.attributes.biography,
			...animationProps,
			...columnsStyleProps,
			...fontSizeProps,
			...( props.attributes.hasOwnProperty( 'textColor' ) && { textColor: props.attributes.textColor } ),
			...( props.attributes.hasOwnProperty( 'backgroundColor' ) && { backgroundColor: props.attributes.backgroundColor } ),
		};

		// Does not have background color set. Use default block color from CoBlocks.
		if ( ! props.attributes.hasOwnProperty( 'backgroundColor' ) ) {
			// $dark-opacity-light-200 computed #8C8C971A - no variable access in root.
			columnsBlockProps = {
				...columnsBlockProps,
				style: {
					...columnsBlockProps?.style,
					color: {
						background: '#8C8C971A',
					},
				},
			};
		}

		const columnsBlock = createBlock( 'core/columns', columnsBlockProps, [ leftColumn, rightColumn ] );

		replaceBlocks(
			[ props.clientId ],
			columnsBlock
		);

		return null;
	},
	parent: [],
	save: () => null,
	/* translators: block name */
	title: metadata.title,
	transforms: {
		to: [
			{
				blocks: [ 'core/author' ],
				transform: ( attributes ) => {
					return createBlock( 'core/author', attributes );
				},
				type: 'block',
			},
		],
	},
};

export { name, metadata, settings };
