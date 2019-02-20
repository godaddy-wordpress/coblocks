/**
 * Internal dependencies
 */
import './styles/editor.scss';
import brandAssets from '../../utils/brand-assets';
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
const name = 'layout';

const title = __( 'Layout' );

const icon = brandAssets.blockIcon;

const keywords = [
	__( 'coblocks' ),
	__( 'sections' ),
	__( 'templates' ),
];

const settings = {

	title: title,

	description : __( 'Add a beautifully designed layout from your theme or the CoBlocks Layout Libary.' ),

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
			{
				type: 'prefix',
				prefix: ':layout',
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
