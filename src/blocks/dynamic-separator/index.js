/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import './styles/editor.scss';
import './styles/style.scss';
import icons from './icons';
import edit from './edit';
import transforms from './transforms';
import metadata from './block.json';

/**
 * WordPress dependencies
 */
const { __, _x } = wp.i18n;
const { getColorClassName } = wp.blockEditor;

/**
 * Block constants
 */
const { name } = metadata;

const icon = icons.hr;

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
	title: __( 'Dynamic HR' ),
	description: __( 'Add a resizable spacer between other blocks.' ),
	keywords: [ __( 'hr' ), __( 'spacer' ), __( 'coblocks' ) ],
	attributes: metadata.attributes,
	styles: [
		{ name: 'dots', label: _x( 'Dot', 'block style' ), isDefault: true },
		{ name: 'line', label: _x( 'Line', 'block style' ) },
		{ name: 'fullwidth', label: _x( 'Fullwidth', 'block style' ) },
	],
	transforms,
	edit,
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

export { name, icon, settings };

