/**
 * Internal dependencies
 */
import { attributes } from './block.json';

/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { getColorClassName } from '@wordpress/block-editor';

const deprecatedDynamicHR = ( { attributes, className } ) => {
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
};

const deprecated = [ {
	attributes,
	save: deprecatedDynamicHR,
} ];

export default deprecated;
