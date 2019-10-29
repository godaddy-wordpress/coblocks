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

	let divClasses = classnames(	className, 'wp-block-separator',
		{ 'has-text-color': color || customColor,
			[ colorClass ]: colorClass } );

	// Set class for default style
	divClasses = classnames( divClasses, {
		'is-style-dots': ! divClasses.includes( 'is-style-line' ) && ! divClasses.includes( 'is-style-fullwidth' ) && ! divClasses.includes( 'is-style-dots' ),
	} );

	return (
		<div className={ divClasses } style={ styles } />
	);
};

export default save;
