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

		// Used to set text color props
		const hasTextColor = ( props.attributes.hasOwnProperty( 'textColor' ) );
		const hasCustomTextColor = ( props.attributes.hasOwnProperty( 'style' ) &&
			props.attributes.style.hasOwnProperty( 'color' ) && props.attributes.style.color.hasOwnProperty( 'text' ) );

		// Used to set background color props
		const hasBackgroundColor = ( props.attributes.hasOwnProperty( 'backgroundColor' ) );
		const hasCustomBackgroundColor = ( props.attributes.hasOwnProperty( 'style' ) &&
			props.attributes.style.hasOwnProperty( 'color' ) && props.attributes.style.color.hasOwnProperty( 'background' ) );

		// Used to set font props
		const hasFontSize = ( props.attributes.hasOwnProperty( 'fontSize' ) );
		const hasCustomFont = ( props.attributes.hasOwnProperty( 'style' ) &&
			props.attributes.style.hasOwnProperty( 'typography' ) );

		const { replaceBlocks } = dispatch( 'core/block-editor' );
		const isRTL = select( 'core/editor' ).getEditorSettings().isRTL;

		const authorNameBlock = () => {
			let authorNameBlockProps = {
				content: props.attributes.name,
				level: 4,
			};

			// Font controls - default is fontSize and style is used for custom setting.
			// All font controls should apply to the bio and name.
			if ( hasFontSize ) {
				authorNameBlockProps = { ...authorNameBlockProps,
					fontSize: props.attributes.fontSize,
				};
			}
			if ( hasCustomFont ) {
				authorNameBlockProps = { ...authorNameBlockProps,
					style: { ...authorNameBlockProps?.style,
						typography: props.attributes.style.typography,
					},
				};
			}

			// Headings do not inherit color from parent - we descend the style here for initial match.
			if ( hasCustomTextColor ) {
				authorNameBlockProps = { ...authorNameBlockProps,
					style: { ...authorNameBlockProps?.style,
						color: { ...authorNameBlockProps?.style?.color,
							text: props.attributes.style.color.text,
						},
					},
				};
			}
			if ( hasTextColor ) {
				authorNameBlockProps = { ...authorNameBlockProps,
					textColor: props.attributes.textColor,
				};
			}

			return createBlock( 'core/heading', authorNameBlockProps );
		};

		const authorBioBlock = () => {
			let authorBioBlockProps = {
				content: props.attributes.biography,
			};

			// Font controls - default is fontSize and style is used for custom setting.
			// All font controls should apply to the bio and name.
			if ( hasFontSize ) {
				authorBioBlockProps = {
					...authorBioBlockProps,
					fontSize: props.attributes.fontSize,
				};
			}
			if ( hasCustomFont ) {
				authorBioBlockProps = {
					...authorBioBlockProps,
					style: {
						...authorBioBlockProps?.style,
						typography: props.attributes.style.typography,
					},
				};
			}

			return createBlock( 'core/paragraph', authorBioBlockProps );
		};

		const buttonBlock = parentBlock.innerBlocks;
		const imageBlock = createBlock( 'core/image', { className: 'is-style-rounded', id: props.attributes.imgId, url: props.attributes.imgUrl } );

		// Set buttons to align.
		buttonBlock.forEach( function( button, index ) {
			buttonBlock[ index ].attributes.align = isRTL ? 'right' : 'left';
		} );

		const leftColumn = createBlock( 'core/column', { verticalAlignment: 'center', width: '25%' }, [ imageBlock ] );
		const rightColumn = createBlock( 'core/column', { verticalAlignment: 'center', width: '75%' }, [ authorNameBlock(), authorBioBlock(), ...buttonBlock ] );

		const columnsBlock = () => {
			let columnsBlockProps = {
				...( props.attributes.hasOwnProperty( 'className' ) && { className: props.attributes.className } ),
				...( props.attributes.hasOwnProperty( 'animation' ) && { animation: props.attributes.animation } ),
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

			// Headings do not inherit color from parent - we descend the style here for initial match.
			if ( hasCustomTextColor ) {
				columnsBlockProps = { ...columnsBlockProps,
					style: { ...columnsBlockProps?.style,
						color: { ...columnsBlockProps?.style?.color,
							text: props.attributes.style.color.text,
						},
					},
				};
			}
			if ( hasTextColor ) {
				columnsBlockProps = { ...columnsBlockProps,
					textColor: props.attributes.textColor,
				};
			}

			// Headings do not inherit color from parent - we descend the style here for initial match.
			if ( hasCustomBackgroundColor ) {
				columnsBlockProps = { ...columnsBlockProps,
					style: { ...columnsBlockProps?.style,
						color: { ...columnsBlockProps?.style?.color,
							background: props.attributes.style.color.background,
						},
					},
				};
			}
			if ( hasBackgroundColor ) {
				columnsBlockProps = { ...columnsBlockProps,
					backgroundColor: props.attributes.backgroundColor,
				};
			}

			// Does not have background color set. Use default block color from CoBlocks.
			const hasNoBackgroundColorSet = ! props.attributes.hasOwnProperty( 'backgroundColor' ) &&
				! props.attributes?.style?.color?.hasOwnProperty( 'background' );
			if ( hasNoBackgroundColorSet ) {
				// $dark-opacity-light-200 computed #8C8C971A - no variable access in root.
				columnsBlockProps = { ...columnsBlockProps,
					style: { ...columnsBlockProps?.style,
						color: { ...columnsBlockProps?.style?.color,
							background: '#8C8C971A',
						},
					},
				};
			}

			return createBlock( 'core/columns', columnsBlockProps, [ leftColumn, rightColumn ] );
		};

		replaceBlocks(
			[ props.clientId ],
			columnsBlock()
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
