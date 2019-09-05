/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import { getDividerFromStyle } from './utils';

/**
 * WordPress dependencies
 */
const { getColorClassName } = wp.blockEditor;

const save = ( { attributes, className } ) => {
	const {
		backgroundColor,
		backgroundHeight,
		coblocks,
		color,
		customBackgroundColor,
		customColor,
		horizontalFlip,
		shapeHeight,
		verticalFlip,
	} = attributes;

	const shapeClass = getColorClassName( 'color', color );
	const backgroundClass = getColorClassName( 'background-color', backgroundColor );

	let classes = classnames(
		className, {
			'is-vertically-flipped': verticalFlip,
			'is-horizontally-flipped': horizontalFlip,
			[ shapeClass ]: shapeClass,
			[ backgroundClass ]: backgroundClass,
		} );

	if ( coblocks && ( typeof coblocks.id !== 'undefined' ) ) {
		classes = classnames( classes, `coblocks-shape-divider-${ coblocks.id }` );
	}

	const styles = {
		backgroundColor: backgroundClass ? undefined : customBackgroundColor,
		color: shapeClass ? undefined : customColor,
	};

	return (
		<div className={ classes } style={ styles } aria-hidden="true">
			<div className="wp-block-coblocks-shape-divider__svg-wrapper" style={ { minHeight: shapeHeight } }>
				{ getDividerFromStyle( attributes.className ) }
			</div>
			<div className="wp-block-coblocks-shape-divider__alt-wrapper" style={ { minHeight: backgroundHeight } }></div>
		</div>
	);
};

export default save;
