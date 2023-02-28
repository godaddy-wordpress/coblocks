/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { RichText, getColorClassName } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

const save = ( { attributes } ) => {
	const {
		backgroundColor,
		className,
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

	const getAriaLabel = () => {
		const type = className?.match( /is-style-(\w+)/ );

		return type && type[ 1 ]
			/* translators: text for accessibility defining the type of alert used */
			? `${ __( 'Alert section of type', 'coblocks' ) } ${ type[ 1 ] }`
			/* translators: text for accessibility defining the block's type */
			: __( 'Alert section', 'coblocks' );
	};

	return (
		<div
			className={ classes }
			style={ styles }
			aria-label={ getAriaLabel() }
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
