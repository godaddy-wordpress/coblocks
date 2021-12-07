/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { getColorClassName } from '@wordpress/block-editor';

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

	const classes = classnames( className, {
		[ `has-text-align-${ contentAlign }` ]: contentAlign,
	} );

	const innerClasses = classnames( 'wp-block-coblocks-icon__inner', {
		[ backgroundClass ]: backgroundClass,
		'has-background': backgroundColor || customBackgroundColor,
		'has-text-color': iconColor || customIconColor,
		[ textClass ]: textClass,
	} );

	const innerStyles = {
		backgroundColor: backgroundClass ? undefined : customBackgroundColor,
		borderRadius: borderRadius ? borderRadius + 'px' : undefined,
		color: textClass ? undefined : customIconColor,
		fill: textClass ? undefined : customIconColor,
		height,
		padding: padding ? padding + 'px' : undefined,
		width,
	};

	return (
		<div className={ classes }>
			<div className={ innerClasses } style={ innerStyles }>
				{ typeof icon !== 'undefined' &&
					( href
						? <a href={ href } rel={ rel } target={ linkTarget }>
							{ svgs[ iconStyle ][ icon ] && svgs[ iconStyle ][ icon ].icon }
						</a>
						: svgs[ iconStyle ][ icon ] && svgs[ iconStyle ][ icon ].icon
					)
				}
			</div>
		</div>
	);
};

export default save;
