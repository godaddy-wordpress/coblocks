/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const { RichText, getColorClassName, getFontSizeClass } = wp.blockEditor;

const save = ( { attributes } ) => {
	const {
		backgroundColor,
		content,
		customBackgroundColor,
		customFontSize,
		customTextColor,
		fontSize,
		align,
		textColor,
	} = attributes;

	const textClass = getColorClassName( 'color', textColor );

	const backgroundClass = getColorClassName( 'background-color', backgroundColor );

	const fontSizeClass = getFontSizeClass( fontSize );

	const classes = classnames( 'wp-block-coblocks-highlight__content', {
		'has-text-color': textColor || customTextColor,
		[ textClass ]: textClass,
		'has-background': backgroundColor || customBackgroundColor,
		[ backgroundClass ]: backgroundClass,
		[ fontSizeClass ]: fontSizeClass,
	} );

	const styles = {
		backgroundColor: backgroundClass ? undefined : customBackgroundColor,
		color: textClass ? undefined : customTextColor,
		fontSize: fontSizeClass ? undefined : customFontSize,
	};

	return (
		<p style={ { textAlign: align } }>
			{ ! RichText.isEmpty( content ) && (
				<RichText.Content
					tagName="mark"
					className={ classes }
					style={ styles }
					value={ content }
				/>
			) }
		</p>
	);
};

export default save;
