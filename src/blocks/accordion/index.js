/**
 * External dependencies
 */
import classnames from 'classnames';
import map from 'lodash/map';

/**
 * Internal dependencies
 */
import './styles/editor.scss';
import './styles/style.scss';
import Edit from './components/edit';
import icons from './../../utils/icons';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { createBlock } = wp.blocks;
const { InnerBlocks } = wp.blockEditor;

/**
 * Block constants
 */
const name = 'accordion';

const title = __( 'Accordion' );

const icon = icons.accordion;

const keywords = [
	__( 'tabs' ),
	__( 'faq' ),
	__( 'coblocks' ),
];

const blockAttributes = {
	count: {
		type: 'number',
		default: 1,
	},
	polyfill: {
		type: 'boolean',
		default: false,
	},
};

const settings = {

	title: title,

	description: __( 'Organize content within collapsable accordion items.' ),

	keywords: keywords,

	attributes: blockAttributes,

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
		]
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

export { name, title, icon, settings };
