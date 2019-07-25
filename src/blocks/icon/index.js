/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import './styles/style.scss';
import './styles/editor.scss';
import icons from './components/icons';
import edit from './components/edit';
import svgs from './components/svgs';
import metadata from './block.json';

/**
 * WordPress dependencies
 */
const { __, _x } = wp.i18n;
const { getColorClassName } = wp.blockEditor;

/**
 * Set default icon size equivalent to "Medium".
 */
export const DEFAULT_ICON_SIZE = 60;

/**
 * Block constants
 */
const { name } = metadata;

const icon = icons.icon;

const settings = {
	title: __( 'Icon' ),
	description: __( 'Add a stylized graphic symbol to communicate something more.' ),
	keywords: [ __( 'svg' ), __( 'icons' ), __( 'coblocks' ) ],
	attributes: metadata.attributes,
	styles: [
		{ name: 'outlined', label: _x( 'Outlined', 'block style' ), isDefault: true },
		{ name: 'filled', label: _x( 'Filled', 'block style' ) },
	],
	edit,
	save( { attributes, className } ) {
		const {
			icon,
			backgroundColor,
			customBackgroundColor,
			customIconColor,
			contentAlign,
			iconColor,
			height,
			width,
			borderRadius,
			padding,
			href,
			linkTarget,
			rel,
		} = attributes;

		let iconStyle = 'outlined';

		if ( attributes.className ) {
			if ( attributes.className.includes( 'is-style-filled' ) ) {
				iconStyle = 'filled';
			}
		}

		const textClass = getColorClassName( 'color', iconColor );
		const backgroundClass = getColorClassName( 'background-color', backgroundColor );

		const classes = classnames( 'wp-block-coblocks-icon__inner', {
			'has-text-color': iconColor || customIconColor,
			[ textClass ]: textClass,
			'has-background': backgroundColor || customBackgroundColor,
			[ backgroundClass ]: backgroundClass,
		} );

		const styles = {
			backgroundColor: backgroundClass ? undefined : customBackgroundColor,
			color: textClass ? undefined : customIconColor,
			fill: textClass ? undefined : customIconColor,
			height: height,
			width: width,
			borderRadius: borderRadius ? borderRadius + 'px' : undefined,
			padding: padding ? padding + 'px' : undefined,
		};

		return (
			<div className={ className } style={ { textAlign: contentAlign ? contentAlign : undefined } }>
				<div className={ classes } style={ styles }>
					{ href ?
						( <a href={ href } target={ linkTarget } rel={ rel }>
							{ svgs[ iconStyle ][ icon ].icon }
						</a> ) :
						svgs[ iconStyle ][ icon ].icon
					}
				</div>
			</div>
		);
	},
};

export { name, icon, settings };
