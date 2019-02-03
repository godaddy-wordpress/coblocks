/**
 * Internal dependencies
 */
import './styles/editor.scss';
import icons from './../../utils/icons';
import Edit from './components/edit';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { createBlock } = wp.blocks;


/**
 * Block constants
 */
const name = 'inserter';

const title = __( 'CoBlocks' );

const icon = icons.templateInserter;

const keywords = [
	__( 'layouts' ),
	__( 'sections' ),
	__( 'templates' ),
];

const settings = {

	title: title,

	description : __( 'Add a saved CoBlocks section or template.' ),

	icon: {
		src: icon,
		background: '#f9f9f9',
		foreground: '#536DFF',
	},

	keywords: keywords,

	transforms: {
		from: [
			{
				type: 'prefix',
				prefix: ':coblocks',
				transform: function( content ) {
					return createBlock( `coblocks/${ name }`, {
						content,
					} );
				},
			},
			{
				type: 'prefix',
				prefix: ':section',
				transform: function( content ) {
					return createBlock( `coblocks/${ name }`, {
						content,
					} );
				},
			},
			{
				type: 'prefix',
				prefix: ':template',
				transform: function( content ) {
					return createBlock( `coblocks/${ name }`, {
						content,
					} );
				},
			},
		],
	},

	edit:  Edit,

	save( { attributes } ) {

		const { content } = attributes;

		return (
			<div>
				{ content }
			</div>
		);
	},
};

export { name, title, icon, settings };
