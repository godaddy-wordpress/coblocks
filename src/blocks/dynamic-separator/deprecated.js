/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import { attributes } from './block.json';

/**
 * WordPress dependencies
 */
import { getColorClassName } from '@wordpress/block-editor';

const deprecatedClassBlockSeparator = ( { attributes } ) => {
	const {
		color,
		customColor,
		height,
		className,
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
};

const deprecated = [ {
	attributes,
	save: deprecatedClassBlockSeparator,
} ];

export default deprecated;
