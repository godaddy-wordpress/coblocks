/**
 * Internal dependencies
 */
import './styles/editor.scss';
import './styles/style.scss';
import SpacerBlock from './components/edit';
import icons from './components/icons';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

/**
 * Block registration
 */
registerBlockType( 'coblocks/spacer', {

	title: __( 'Spacer' ),

	description: __( 'Add space between other blocks.' ),

	icon: icons.spacer,

	category: 'layout',

	keywords: [
		__( 'hr' ),
		__( 'separator' ),
		__( 'coblocks' ),
	],

	supports: {
		html: false,
	},

	attributes: {
		height: {
			type: 'number',
			default: 50,
		},
	},

	edit: SpacerBlock,

	save( { attributes, className } ) {

		const { height } = attributes;

		return (
			<hr className={ className } style={ { height: height ? height + 'px' : undefined } }></hr>
		);
	},
} );
