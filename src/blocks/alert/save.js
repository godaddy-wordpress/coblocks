/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const { RichText, getColorClassName } = wp.blockEditor;

const save = ( { attributes } ) => {
	const {
		backgroundColor,
		customBackgroundColor,
		customTextColor,
		textAlign,
		textColor,
		title,
		type,
		value,
	} = attributes;

	const backgroundClass = getColorClassName( 'background-color', backgroundColor );
	const textClass = getColorClassName( 'color', textColor );

	const classes = classnames( `is-${ type }-alert`, {
		'has-text-color': textColor || customTextColor,
		[ textClass ]: textClass,
		'has-background': backgroundColor || customBackgroundColor,
		[ backgroundClass ]: backgroundClass,
	} );

	const styles = {
		backgroundColor: backgroundClass ? undefined : customBackgroundColor,
		color: textClass ? undefined : customTextColor,
		textAlign: textAlign ? textAlign : null,
	};

	return (
		<div
			className={ classes }
			style={ styles }
		>
			{ ! RichText.isEmpty( title ) &&
			<RichText.Content
				tagName="p"
				className="wp-block-coblocks-alert__title"
				value={ title }
			/>
			}
			{ ! RichText.isEmpty( value ) &&
			<RichText.Content
				tagName="p"
				className="wp-block-coblocks-alert__text"
				value={ value }
			/>
			}
		</div>
	);
};

export default save;
