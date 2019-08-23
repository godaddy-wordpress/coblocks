/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const { getColorClassName } = wp.blockEditor;

/**
 * Internal dependencies
 */
import svgs from './svgs';

const save = ( { attributes, className } ) => {
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
};

export default save;
