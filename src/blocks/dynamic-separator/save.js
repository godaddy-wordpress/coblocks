/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { getColorClassName } from '@wordpress/block-editor';

const save = ( { attributes, className } ) => {
	const {
		color,
		customColor,
		height,
	} = attributes;

	const colorClass = getColorClassName( 'color', color );

	const classes = classnames(
		className, {
			'has-background': color || customColor,
			[ colorClass ]: colorClass,
		} );

	const styles = {
		color: colorClass ? undefined : customColor,
		height: height ? height + 'px' : undefined,
	};

	return (
		<hr className={ classes } style={ styles }></hr>
	);
};

export default save;
