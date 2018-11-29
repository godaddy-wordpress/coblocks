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
const { createBlock } = wp.blocks;
const { getColorClassName } = wp.editor;

/**
 * Block constants
 */
const name = 'dynamic-separator';

const title = __( 'Dynamic HR' );

const icon = icons.hr;

const keywords = [
	__( 'hr' ),
	__( 'separator' ),
	__( 'coblocks' ),
];

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

const settings = {

	title: title,

	description: __( 'Add a resizable spacer between other blocks.' ),

	icon: {
		src: icon,
	},

	keywords: keywords,

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
				transform: ( { height } ) => createBlock( `coblocks/${ name }`, {
					height: height,
				} ),
			},
			{
				type: 'block',
				blocks: [ 'core/separator' ],
				transform: () => createBlock( `coblocks/${ name }` ),
			},
		],
		to: [
			{
				type: 'block',
				blocks: [ 'core/spacer' ],
				transform: ( { height } ) => createBlock( 'core/spacer', {
					height: height,
				} ),
			},
			{
				type: 'block',
				blocks: [ 'core/separator' ],
				transform: () => createBlock( 'core/separator' ),
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

		const colorClass = getColorClassName( 'color', color );

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
};

export { name, title, icon, settings };

