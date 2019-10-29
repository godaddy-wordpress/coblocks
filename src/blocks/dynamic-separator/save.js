/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { getColorClassName } from '@wordpress/block-editor';

const save = ( { attributes } ) => {
	const {
		color,
		customColor,
		height,
		className,
	} = attributes;

	const colorClass = getColorClassName( 'color', color );

	const styles = {
		color: colorClass ? undefined : customColor,
		height: height ? height + 'px' : undefined,
	};

	let hrClasses = classnames(
		className,
		'wp-block-separator', {
			'has-text-color': color || customColor,
			[ colorClass ]: colorClass,
		} );

	// Set class for default style
	hrClasses = classnames( hrClasses, {
		'is-style-dots': ! hrClasses.includes( 'is-style-line' ) && ! hrClasses.includes( 'is-style-fullwidth' ) && ! hrClasses.includes( 'is-style-dots' ),
	} );

	return (
		<hr className={ hrClasses } style={ styles }></hr>
	);
};

export default save;
