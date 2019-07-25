
/**
 * Internal dependencies
 */
import './styles/editor.scss';
import './styles/style.scss';
import Edit from './components/edit';
import icons from './../../utils/icons';
import metadata from './block.json';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { createBlock } = wp.blocks;
const { InnerBlocks } = wp.blockEditor;

/**
 * Block constants
 */
const { name } = metadata;

const icon = icons.accordion;

const settings = {
	title: __( 'Accordion' ),
	description: __( 'Organize content within collapsable accordion items.' ),
	keywords: [ __( 'tabs' ), __( 'faq' ), __( 'coblocks' ) ],
	attributes: metadata.attributes,
	supports: {
		align: [ 'wide', 'full' ],
		html: false,
	},
	transforms: {
		from: [
			{
				type: 'prefix',
				prefix: ':accordion',
				transform: function( content ) {
					return createBlock( `coblocks/${ name }`, {
						content,
					} );
				},
			},
			...[ 2, 3, 4, 5 ].map( ( count ) => ( {
				type: 'prefix',
				prefix: Array( count + 1 ).join( ':' ) + 'accordion',
				transform( content ) {
					return createBlock( `coblocks/${ name }`, {
						content,
						count,
					} );
				},
			} ) ),
		],
	},

	edit: Edit,

	save() {
		return (
			<div>
				<InnerBlocks.Content />
			</div>
		);
	},
};

export { name, icon, settings };
