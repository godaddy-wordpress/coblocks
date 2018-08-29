/**
 * External dependencies
 */
import classnames from 'classnames';
import omit from 'lodash/omit';

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
const { registerBlockType, createBlock } = wp.blocks;
const { getColorClass } = wp.editor;

/**
 * Block attributes
 */
const blockAttributes = {
	height: {
		type: 'number',
		default: 50,
	},
	color: {
		type: 'string',
	},
	customColor: {
		type: 'string',
	},
};

/**
 * Block registration
 */
registerBlockType( 'coblocks/dynamic-separator', {

	title: __( 'Dynamic HR' ),

	description: __( 'Add a resizable spacer between other blocks.' ),

	icon: {
		src: icons.hr,
	},

	category: 'coblocks',

	keywords: [
		__( 'hr' ),
		__( 'separator' ),
		__( 'coblocks' ),
	],

	attributes: blockAttributes,

	styles: [
		{ name: 'dots', label: __( 'Dot' ), isDefault: true },
		{ name: 'line', label: __( 'Line' ) },
		{ name: 'fullwidth', label: __( 'Fullwidth' ) },
	],

	transforms: {
		from: [
			{
				type: 'block',
				blocks: [ 'core/spacer' ],
				transform: ( { height } ) => (
					createBlock( 'core/spacer', { height: height } )
				),
			},
			{
				type: 'block',
				blocks: [ 'core/separator' ],
				transform: () => createBlock( 'coblocks/dynamic-separator' ),
			},
			{
				type: 'raw',
				selector: 'hr.wp-block-coblocks-dynamic-separator',
				schema: {
					hr: {
						classes: [ 'wp-block-coblocks-dynamic-separator' ],
					},
				},
			},
		],
		to: [
			{
				type: 'block',
				blocks: [ 'core/spacer' ],
				transform: ( { height } ) => (
					createBlock( 'core/spacer', { height: height } )
				),
			},
			{
				type: 'block',
				blocks: [ 'core/separator' ],
				transform: () => (
					createBlock( 'core/separator' )
				),
			},
		],
	},

	edit: Edit,

	save( { attributes, className } ) {

		const {
			color,
			customColor,
			height,
		} = attributes;

		const colorClass = getColorClass( 'color', color );

		const classes = classnames(
			className, {
			'has-text-color': color || customColor,
			[ colorClass ]: colorClass,
		} );

		const styles = {
			color: colorClass ? undefined : customColor,
			height: height ? height + 'px' : undefined,
		};

		return (
			<hr className={ classes } style={ styles }></hr>
		);
	},
} );
