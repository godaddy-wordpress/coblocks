/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import './styles/editor.scss';
import './styles/style.scss';
import DynamicSeparatorBlock from './components/edit';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

/**
 * Block registration
 */
registerBlockType( 'coblocks/dynamic-separator', {

	title: __( 'Separator (Dynamic)' ),

	description: __( 'Add a separator with custom spacing between other blocks.' ),

	icon: 'minus',

	category: 'layout',

	keywords: [
		__( 'hr' ),
		__( 'spacer' ),
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
		style: {
			type: 'string',
			default: 'dots',
		},
		color: {
			type: 'string',
		},
	},

	edit: DynamicSeparatorBlock,

	save( { attributes, className } ) {

		const {
			color,
			height,
			style,
		} = attributes;

		const classes = classnames(
			className,
			style ? `hr-style--${ style }` : `hr-style----dots`,
		);

		// Set the default separator color based on the style selected.
		function defaultSeparatorColor( attributes ) {
			if ( attributes.color ) {
				return attributes.color;
			} else if ( 'line' === attributes.style || 'fullwidth' === attributes.style ) {
				return 'rgba(0, 0, 0, .15)';
			} else {
				return 'rgba(0, 0, 0, .8)';
			}
		}

		return (
			<hr className={ classes } style={ { height: height ? height + 'px' : undefined, color: defaultSeparatorColor( attributes ) } }></hr>
		);
	},
} );
