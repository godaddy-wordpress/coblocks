/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { RichText, getColorClassName } from '@wordpress/block-editor';

const save = ( { attributes } ) => {
	const {
		backgroundColor,
		customBackgroundColor,
		customTextColor,
		textAlign,
		textColor,
		title,
		value,
	} = attributes;

	const backgroundClass = getColorClassName( 'background-color', backgroundColor );
	const textClass = getColorClassName( 'color', textColor );

	const classes = classnames( {
		'has-text-color': textColor || customTextColor,
		[ textClass ]: textClass,
		[ `has-text-align-${ textAlign }` ]: textAlign,
		'has-background': backgroundColor || customBackgroundColor,
		[ backgroundClass ]: backgroundClass,
	} );

	const styles = {
		backgroundColor: backgroundClass ? undefined : customBackgroundColor,
		color: textClass ? undefined : customTextColor,
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
