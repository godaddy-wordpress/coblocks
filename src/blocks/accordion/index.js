/**
 * External dependencies
 */
import classnames from 'classnames';

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
const { registerBlockType } = wp.blocks;
const { InnerBlocks } = wp.editor;

/**
 * Block attributes
 */
const blockAttributes = {
	count: {
		type: 'number',
		default: 2,
	},
};

/**
 * Block registration
 */
registerBlockType( 'coblocks/accordion', {

	title: __( 'Accordion' ),

	description: __( 'Add an accordion.' ),

	icon: {
		src: icons.accordion,
	},

	category: 'coblocks',

	keywords: [
		__( 'tabs' ),
		__( 'list' ),
		__( 'coblocks' ),
	],

	attributes: blockAttributes,

	supports: {
		align: [ 'wide', 'full' ],
	},

	edit: Edit,

	save: function( props ) {

		return (
			<div className={ props.className } >
				<InnerBlocks.Content />
			</div>
		);
	},
} );
