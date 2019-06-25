export const save = ( { attributes, className } ) => {

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

		const classes = classnames(
			className, {
			[ `coblocks-shape-divider-${ coblocks.id }` ] : coblocks && ( typeof coblocks.id != 'undefined' ),
			'is-vertically-flipped' : verticalFlip,
			'is-horizontally-flipped' : horizontalFlip,
			[ shapeClass ]: shapeClass,
			[ backgroundClass ]: backgroundClass,
		} );

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
	}
