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

const deprecated = [
	{
		save( { attributes, className } ) {
			const {
				backgroundColor,
				backgroundHeight,
				color,
				customBackgroundColor,
				customColor,
				horizontalFlip,
				shapeHeight,
				verticalFlip,
			} = attributes;

			const shapeClass = getColorClassName( 'color', color );
			const backgroundClass = getColorClassName( 'background-color', backgroundColor );

			const classes = classnames(
				className, {
					'is-vertically-flipped': verticalFlip,
					'is-horizontally-flipped': horizontalFlip,
					[ shapeClass ]: shapeClass,
					[ backgroundClass ]: backgroundClass,
				} );

			const styles = {
				backgroundColor: backgroundClass ? undefined : customBackgroundColor,
				color: shapeClass ? undefined : customColor,
			};

			return (
				<div className={ classes } style={ styles } aria-hidden="true">
					<div className="wp-block-coblocks-shape-divider__svg-wrapper" style={ { height: shapeHeight } }>
						{ getDividerFromStyle( attributes.className ) }
					</div>
					<div className="wp-block-coblocks-shape-divider__alt-wrapper" style={ { height: backgroundHeight } }></div>
				</div>
			);
		},
	},
];

export default deprecated;
