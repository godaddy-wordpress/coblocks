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
import icons from './components/icons';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { createBlock } = wp.blocks;
const { getColorClassName } = wp.editor;

/**
 * Block constants
 */
const name = 'shape-divider';

const title = __( 'Shape Divider' );

const icon = icons.shapeDivider;

const keywords = [
	__( 'hr' ),
	__( 'separator' ),
	__( 'shape' ),
];

const blockAttributes = {
	align: {
		type: 'string',
		default: 'full',
	},
	height: {
		type: 'number',
		default: 50,
	},
	verticalFlip: {
		type: 'boolean',
		default: false,
	},
	horizontalFlip: {
		type: 'boolean',
		default: false,
	},
	color: {
		type: 'string',
	},
	customColor: {
		type: 'string',
	},
	backgroundColor: {
		type: 'string',
	},
	customBackgroundColor: {
		type: 'string',
	},
};

const settings = {

	title: title,

	description: __( 'Add a shape divder between other blocks.' ),

	keywords: keywords,

	attributes: blockAttributes,

	supports: {
		align: [ 'wide', 'full' ],
		coBlocksSpacing: true,
	},

	styles: [
		{ name: 'angled', label: __( 'Angled' ), isDefault: true },
		{ name: 'sloped', label: __( 'Sloped' ) },
		{ name: 'rounded', label: __( 'Rounded' ) },
		{ name: 'wavy', label: __( 'Wavy' ) },
		{ name: 'triangle', label: __( 'Triangle' ) },
		{ name: 'waves', label: __( 'Waves' ) },
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
				blocks: [ 'coblocks/dynamic-separator' ],
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
		],
	},

	edit: Edit,

	save() {
		return null;
	},

	// save( { attributes, className } ) {

	// 	const {
	// 		color,
	// 		customColor,
	// 		height,
			// verticalFlip,
			// horizontalFlip,
			// backgroundColor,
			// customBackgroundColor,
	// 	} = attributes;

	// 	const colorClass = getColorClassName( 'color', color );

	// 	const classes = classnames(
	// 		className, {
	// 		'has-text-color': color || customColor,
	// 		[ colorClass ]: colorClass,
	// 	} );

	// 	const styles = {
	// 		color: colorClass ? undefined : customColor,
	// 		height: height ? height + 'px' : undefined,
	// 	};

	// 	return (
	// 		<hr className={ classes } style={ styles }></hr>
	// 	);
	// },
};

export { name, title, icon, settings };

